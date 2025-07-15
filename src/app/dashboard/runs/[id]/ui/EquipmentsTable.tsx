import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export function EquipmentsTable({ equipments, onDelete }: { equipments: any[], onDelete: (id: string) => void }) {
  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">Equipments</h3>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Type</th>
            {/* Otros campos si existen */}
          </tr>
        </thead>
        <tbody>
          {equipments.map(eq => (
            <tr key={eq.equipments?.id}>
              <td>
                <button onClick={() => onDelete(eq.parent_id)}>
                  <Trash2 className="text-red-500" size={18} />
                </button>
              </td>
              <td>{eq.equipments?.name}</td>
              <td>{eq.equipments?.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AddEquipmentForm({ onAdd, onCreate }: { onAdd: (id: string) => void, onCreate: (data: any) => void }) {
  const [equipmentId, setEquipmentId] = useState("");
  const [newEquipment, setNewEquipment] = useState({ name: "", type: "" });

  return (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">Add Equipment</h4>
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Existing Equipment ID"
          value={equipmentId}
          onChange={e => setEquipmentId(e.target.value)}
        />
        <Button onClick={() => onAdd(equipmentId)}>Assign</Button>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="New Equipment Name"
          value={newEquipment.name}
          onChange={e => setNewEquipment({ ...newEquipment, name: e.target.value })}
        />
        <Input
          placeholder="Type"
          value={newEquipment.type}
          onChange={e => setNewEquipment({ ...newEquipment, type: e.target.value })}
        />
        <Button onClick={() => onCreate(newEquipment)}>Create & Assign</Button>
      </div>
    </div>
  );
}