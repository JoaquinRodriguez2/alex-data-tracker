import { useEffect, useState } from "react";
import { getAssetTemplateById } from "@/app/dashboard/asset-templates/[id]/components/services/getAssetTemplateById";
import { assetTemplateByList } from "@/app/dashboard/asset-templates/[id]/components/services/getTemplatesByList";
import { AssetTemplate } from "@/types/AssetTemplate";
import { assetTemplateFather } from "../services/getAssetTemplateFather";

export function useAssetTemplate(id: string) {
  const [assetTemplate, setAssetTemplate] = useState<AssetTemplate | null>(null);
  const [assetFatherList, setAssetFatherList] = useState<AssetTemplate[] | null>(null);
  const [assetChildrenList, setAssetChildrenList] = useState<AssetTemplate[] | null>(null);

  useEffect(() => {
    getAssetTemplateById(id).then((data) => setAssetTemplate(data));
  }, [id]);

  useEffect(() => {
    if (assetTemplate) {
        assetTemplateByList(assetTemplate.childFields).then((data) => {
            setAssetChildrenList(data);
            console.log("assetChildrenList", data);
        });

        assetTemplateFather(assetTemplate.id).then((data) => {
            setAssetFatherList(data);
            console.log("assetFatherList", data);
        });
        
    }else{
        console.log("test2")
    }
  }, [assetTemplate]);

  return { assetTemplate, assetFatherList, assetChildrenList };
}