"use client"
import React, { useState } from "react";
import { DrillingOperationForm } from "./ui/DrillingOperationForm";
import { useDrillingOperation } from "./hooks/useDrillingOperation";
import { useEquipments } from "./hooks/useEquipmentOperation";
import { EquipmentsTable } from "./ui/EquipmentsTable";
import { EquipmentsModal } from "./ui/EquipmentsModal"; // New modal component

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const { data, loading, error, save } = useDrillingOperation(resolvedParams.id);
  const [editing, setEditing] = React.useState(false);
  const operationId = Number(resolvedParams.id);
  const {
    equipments,
    loading: eqLoading,
    error: eqError,
    addEquipment,
    deleteEquipment,
  } = useEquipments(operationId);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full mx-auto py-8 p-5">
      <DrillingOperationForm
        editing={editing}
        setEditing={setEditing}
        data={data}
        onSubmit={save}
        isLoading={loading}
      />
      <EquipmentsTable equipments={equipments} onDelete={deleteEquipment} />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded my-4"
        onClick={() => setModalOpen(true)}
      >
        Add Equipment
      </button>
      <EquipmentsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addEquipment}
      />
      {eqError && <div className="text-red-500">{eqError}</div>}
    </div>
  );
}