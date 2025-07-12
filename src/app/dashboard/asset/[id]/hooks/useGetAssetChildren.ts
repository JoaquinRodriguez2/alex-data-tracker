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