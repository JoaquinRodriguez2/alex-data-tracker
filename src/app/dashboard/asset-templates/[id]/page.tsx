"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { getAssetTemplateById } from "./components/services/getAssetTemplateById";
import { AssetTemplate } from "@/types/AssetTemplate";
import { assetTemplateByList } from "./components/services/getTemplatesByList";

export default function AssetTemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [assetTemplate, setAssetTemplate] = useState<AssetTemplate | null>(null);
  const [assetFatherList, setAssetFatherList] = useState<AssetTemplate[] | null>(null);
  const [assetChildrenList, setAssetChildrenList] = useState<AssetTemplate[] | null>(null);

  useEffect(() => {
    getAssetTemplateById(id).then((data) => {
      setAssetTemplate(data);
    });
  }, [id]);

  useEffect(() => {
    if (assetTemplate != null) {
      assetTemplateByList(assetTemplate.parentField).then((data) => {
        setAssetFatherList(data);
      });
      assetTemplateByList(assetTemplate.childFields).then((data) => {
        setAssetChildrenList(data);
      });
    }
  }, [assetTemplate]);

  return (
    <div className="container mx-auto p-4">
      {assetTemplate ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Plantilla de: {assetTemplate.name}</h1>
          <p>{assetTemplate.description}</p>

          {/* Parent Templates Table */}
          <h2 className="text-xl font-bold mt-4">Lista de Plantillas Padre</h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {assetFatherList &&
                  assetFatherList.map((parent) => (
                    <tr key={parent.id}>
                      <td className="border border-gray-300 px-4 py-2">{parent.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{parent.description}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Child Templates Table */}
          <h2 className="text-xl font-bold mt-4">Lista de Plantillas Hijas</h2>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {assetChildrenList &&
                  assetChildrenList.map((child) => (
                    <tr key={child.id}>
                      <td className="border border-gray-300 px-4 py-2">{child.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{child.description}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              getAssetTemplateById(id).then((data) => {
                setAssetTemplate(data);
              });
            }}
          >
            Recargar
          </button>
        </div>
      )}
    </div>
  );
}
