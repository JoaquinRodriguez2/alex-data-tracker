import { useState, useEffect } from "react";
import { AssetTemplate } from "@/types/AssetTemplate";
import { getAssetTemplateChildrenById } from "../services/getAssetTemplateTree";

export function useGetAssetChildren(assetTemplateId: string) {
  const [assetChildren, setAssetChildren] = useState<AssetTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

    const fetchAssetTemplateById = async (id: string) => {
        try {
        setLoading(true);
        const asset = await getAssetTemplateChildrenById(id);
        if (asset !=  null) {
            setAssetChildren(asset);
        } else {
            setError("No asset children found");
        }
        } catch (err) {
        setError("Failed to fetch asset template" + (err as Error).message);
        } finally {
        setLoading(false);
        }
    };

  useEffect(() => {
    if (!assetTemplateId) return;
    fetchAssetTemplateById(assetTemplateId);
  }, [assetTemplateId]);

  return { assetChildren, loading, error, fetchAssetTemplateById };
}