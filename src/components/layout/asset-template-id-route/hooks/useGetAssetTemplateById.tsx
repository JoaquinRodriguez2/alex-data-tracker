import {useEffect, useState } from "react";
import { AssetTemplate } from "@/types/AssetTemplate";
import { getAssetTemplateById } from "../services/getAssetTemplateById";

export const useAssetTemplateItem = (idParam:string) => {
  
    const [assetTemplate, setAssetTemplate] = useState<AssetTemplate | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const [id, setId] = useState<string | null>(idParam);
    
    const fetchAssetTemplateById = async (id: string) => {
        try {
        setLoading(true);
        const asset = await getAssetTemplateById(id);
        if (asset) {
            setAssetTemplate(asset);
        } else {
            setError("Asset template not found");
        }
        } catch (err) {
        setError("Failed to fetch asset template" + (err as Error).message);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        setId(idParam);
        if (id) {
            fetchAssetTemplateById(id);
            
        }
    }, [id,error, idParam]);
    return { assetTemplate, loading, error, fetchAssetTemplateById };


  
};