import React, { useEffect } from "react";
import { useEquipments } from "../hooks/useEquipments";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";

interface EquipmentsTableProps {
  operationId: string;
}

export const EquipmentsTable: React.FC<EquipmentsTableProps> = ({ operationId }) => {
  const { equipments, loading, error, fetchEquipments, deleteEquipment } = useEquipments(operationId);

  useEffect(() => {
    fetchEquipments();
  }, [fetchEquipments]);

  const handleDelete = async (id: string) => {
    await deleteEquipment(id);
    fetchEquipments(); // Refresh the list after deletion
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Equipments</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 p-2">Equipment</th>
              <th className="border-b-2 border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((equipment) => (
              <tr key={equipment.id}>
                <td className="border-b border-gray-300 p-2">{equipment.name}</td>
                <td className="border-b border-gray-300 p-2">
                  <Button variant="outline" onClick={() => handleDelete(equipment.id)}>
                    <Trash className="mr-2" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Separator />
      {/* AddEquipmentForm component can be included here for adding new equipment */}
    </div>
  );
};