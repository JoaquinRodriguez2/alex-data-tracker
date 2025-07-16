import { useState } from "react";

type Template = {
  id: string;
  name: string;
  part_number: string;
  description: string;
};

interface SubComponentSearchPopupProps {
  open: boolean;
  onClose: () => void;
  templates: Template[];
  onAddChildren: (ids: string[]) => void;
}

export default function SubComponentSearchPopup({ open, onClose, templates, onAddChildren }: SubComponentSearchPopupProps) {
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);

  // Filtrar por part number o nombre
  const filtered = templates.filter(
    (t: Template) =>
      t.part_number?.toLowerCase().includes(search.toLowerCase()) ||
      t.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    onAddChildren(selected);
    setSelected([]);
    setSearch("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Buscar Sub Componentes</h2>
        <input
          type="text"
          placeholder="Buscar por P/N o nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <div className="max-h-64 overflow-y-auto mb-4">
          {filtered.length === 0 ? (
            <p className="text-gray-500">No se encontraron resultados.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th></th>
                  <th>Nombre</th>
                  <th>P/N</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t: Template) => (
                  <tr key={t.id} className="hover:bg-blue-50">
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(t.id)}
                        onChange={() => handleSelect(t.id)}
                      />
                    </td>
                    <td>{t.name}</td>
                    <td>{t.part_number}</td>
                    <td>{t.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAdd}
            disabled={selected.length === 0}
          >
            Agregar seleccionados
          </button>
        </div>
      </div>
    </div>
  );
}
