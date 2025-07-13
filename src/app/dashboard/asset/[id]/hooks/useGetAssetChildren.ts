import { useEffect, useState } from "react";
import { fetchAssetChildren } from "../calls/fetchAssetChildren";
import { EquipmentRelation } from "../types";

export function useGetAssetChildren(parentId: string) {
  const [children, setChildren] = useState<EquipmentRelation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!parentId) return;

    setLoading(true);
    setError(null);

    fetchAssetChildren(parentId)
      .then((data) => {
        setChildren(data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [parentId]);

  return {children, loading, error };
}

export function useSaveAssetChildren(parentId: string, children: EquipmentRelation[]) {
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<Error | null>(null);

  const saveChildren = async () => {
    if (!parentId || !children.length) return;

    setSaving(true);
    setSaveError(null);

    try {
      // Assuming there's a function to save children
      await saveAssetChildren(parentId, children);
    } catch (err) {
      setSaveError(err as Error);
    } finally {
      setSaving(false);
    }
  };

  return { saveChildren, saving, saveError };
}
