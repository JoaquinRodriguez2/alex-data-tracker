import { pocketbaseConection } from "@/services/core/pocketbase"
import { AssetTemplate } from "@/types/AssetTemplate";

export const getAssetTemplateById = async (id: string): Promise<AssetTemplate | null> => {
    try {
        const assetTemplate = await pocketbaseConection.collection('assetTemplates').getOne<AssetTemplate>(id, {});
        return assetTemplate;
    } catch (error) {
        console.error("Error fetching asset template by ID:", error);
        return null;
    }
};
