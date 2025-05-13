import { AssetTemplate } from "@/types/AssetTemplate";

interface TemplatesTableProps {
  title: string;
  templates: AssetTemplate[] | null;
}

export function TemplatesTable({ title, templates }: TemplatesTableProps) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {templates?.map((template) => (
              <tr key={template.id}>
                <td className="border border-gray-300 px-4 py-2">{template.name}</td>
                <td className="border border-gray-300 px-4 py-2">{template.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
