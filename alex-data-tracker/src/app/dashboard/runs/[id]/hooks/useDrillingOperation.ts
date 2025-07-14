import { useState, useEffect } from "react";
import { getDrillingOperation, postDrillingOperation } from "../calls/drillingOperationApi";
import { createEquipment, readEquipments, updateEquipment, deleteEquipment } from "../calls/equipmentsApi";

export function useDrillingOperation(id: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getDrillingOperation(id)
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const save = async (values: any) => {
    setLoading(true);
    setError(null);
    try {
      await postDrillingOperation(id, values);
      setData({ ...data, ...values });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, save };
}

export function useEquipments(operationId: string) {
  const [equipments, setEquipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    readEquipments(operationId)
      .then(setEquipments)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [operationId]);

  const addEquipment = async (equipment: any) => {
    setLoading(true);
    setError(null);
    try {
      const newEquipment = await createEquipment(equipment);
      setEquipments(prev => [...prev, newEquipment]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const editEquipment = async (id: string, updatedEquipment: any) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateEquipment(id, updatedEquipment);
      setEquipments(prev => prev.map(eq => (eq.id === id ? updated : eq)));
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
      setEquipments(prev => prev.filter(eq => eq.id !== id));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { equipments, loading, error, addEquipment, editEquipment, removeEquipment };
}