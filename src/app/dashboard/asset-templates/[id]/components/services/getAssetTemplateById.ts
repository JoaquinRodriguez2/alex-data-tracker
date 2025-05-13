import { AssetTemplate } from "@/types/AssetTemplate";

export const getAssetTemplateById = async (id: string): Promise<AssetTemplate | null> => {
    try {
        console.log("curren id", id);
        const assetTemplate: AssetTemplate = {
            id:"123123123123",
            name: "Dummy Asset Template",
            description: "This is a dummy asset template for testing purposes.",
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            childFields: []
        };
        return assetTemplate;
    } catch (error) {
        console.error("Error fetching asset template by ID:", error);
        return null;
    }
};
