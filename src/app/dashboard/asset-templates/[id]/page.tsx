'use client';

import { use } from "react";
import { TemplatesTable } from "./components/ui/TemplatesTable";
import { useAssetTemplate } from "./components/hooks/useAssetTemplate";


export default function AssetTemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { assetTemplate, assetFatherList, assetChildrenList } = useAssetTemplate(id);

  return (
    <div className="container mx-auto p-4">
      {assetTemplate ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Plantilla de: {assetTemplate.name}</h1>
          <p>{assetTemplate.description}</p>

          {/* Parent Templates Table */}
          <TemplatesTable title="Lista de Plantillas Padre" templates={assetFatherList} />
          <TemplatesTable title="Lista de Plantillas Hijas" templates={assetChildrenList} />

          {/* Child Templates Table */}
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Recargar
          </button>
        </div>
      )}
    </div>
  );
}
