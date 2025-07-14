import React, { useEffect, useState } from "react";
import supabase from "@/utils/SupabaseConfig"; // Adjust path if needed

interface Equipment {
  id: string;
  name: string;
  type?: string;
}

interface EquipmentsModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (equipmentId: string) => void;
}

export const EquipmentsModal: React.FC<EquipmentsModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      supabase
        .from("equipments")
        .select("*")
        .then(({ data }) => {
          setEquipments(data || []);
          setLoading(false);
        });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 min-w-[350px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Select Equipment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">&times;</button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {equipments.map(eq => (
              <li key={eq.id} className="flex justify-between items-center py-2 border-b">
                <span>
                  <span className="font-semibold">{eq.name}</span>
                  {eq.type && <span className="text-gray-500 ml-2">({eq.type})</span>}
                </span>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => {
                    onAdd(eq.id);
                    onClose();
                  }}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};