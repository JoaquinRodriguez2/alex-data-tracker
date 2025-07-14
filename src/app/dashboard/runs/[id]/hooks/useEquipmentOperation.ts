import { useState, useEffect } from "react";
import { addEquipmentToOperation, createEquipment, deleteEquipmentFromOperation, getOperationEquipments } from "../calls/EquipmentsApi";

export function useEquipments(operation_id: number) {
  const [equipments, setEquipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEquipments = async () => {
    setLoading(true);
    try {
      const data = await getOperationEquipments(operation_id);
      setEquipments(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, [operation_id]);

  const addEquipment = async (parent_id: string) => {
    setLoading(true);
    try {
      await addEquipmentToOperation(operation_id, parent_id);
      await fetchEquipments();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEquipment = async (parent_id: string) => {
    setLoading(true);
    try {
      await deleteEquipmentFromOperation(operation_id, parent_id);
      await fetchEquipments();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const createNewEquipment = async (equipment: any) => {
    setLoading(true);
    try {
      const newEquipment = await createEquipment(equipment);
      await addEquipment(newEquipment.id);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { equipments, loading, error, addEquipment, deleteEquipment, createNewEquipment };
}