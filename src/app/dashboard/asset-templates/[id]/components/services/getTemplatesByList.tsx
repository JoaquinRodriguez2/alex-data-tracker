import { pocketbaseConection } from "@/services/core/pocketbase";
import { AssetTemplate } from "@/types/AssetTemplate";

export const assetTemplateByList = async (ids: Array<string>): Promise<AssetTemplate[] | null> => {
    try {
        const records = await pocketbaseConection.collection('assetTemplates').getFullList({
            filter: ids.map((id) => pocketbaseConection.filter("id = {:id}", { id })).join("||")
        });

        // Map the records to match the AssetTemplate type
        const assetTemplatesList: AssetTemplate[] = records.map((record) => ({
            id: record.id,
            name: record.name,
            description: record.description,
            created: record.created,
            updated: record.updated,
            parentField: record.parentField || [], // Ensure parentField is included
            childFields: record.childFields || [],   // Ensure childFields is included
            tags: record.tags || []                 // Ensure tags is included
        }));

        return assetTemplatesList;
    } catch (error) {
        console.error("Error fetching asset templates:", error);
        return null;
    }
};