import { AssetTemplate } from "@/types/AssetTemplate";

export function AssetTemplateCard({ template,onClick }: { template: AssetTemplate,onClick:()=>void }) {
    return (
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition" onClick={onClick}>
        <h2 className="text-lg font-semibold">{template.name}</h2>
        <p className="text-sm text-gray-600">{template.description}</p>
        <p className="text-xs text-gray-500">
          Creado en: {new Date(template.created).toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">
          Actualizado: {new Date(template.updated).toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">Actualizado por: . . .</p>
      </div>
    );
  }