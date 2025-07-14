import { useState, useEffect } from "react";
import { createEquipment, readEquipments, updateEquipment, deleteEquipment } from "../calls/equipmentsApi";

export function useEquipments(operationId: string) {
  const [equipments, setEquipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEquipments();
  }, [operationId]);

  const loadEquipments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await readEquipments(operationId);
      setEquipments(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const addEquipment = async (equipment: any) => {
    setLoading(true);
    setError(null);
    try {
      const newEquipment = await createEquipment({ ...equipment, operation_id: operationId });
      setEquipments((prev) => [...prev, newEquipment]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const editEquipment = async (id: string, updatedData: any) => {
    setLoading(true);
    setError(null);
    try {
      const updatedEquipment = await updateEquipment(id, updatedData);
      setEquipments((prev) => prev.map((eq) => (eq.id === id ? updatedEquipment : eq)));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const removeEquipment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteEquipment(id);
      setEquipments((prev) => prev.filter((eq) => eq.id !== id));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { equipments, loading, error, addEquipment, editEquipment, removeEquipment };
}