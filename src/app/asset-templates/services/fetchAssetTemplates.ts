import { pocketbaseConection } from "@/services/core/pocketbase";
import { AssetTemplate } from "@/types/asset";

export const fetchAssetTemplates = async (query: string = "", page: number = 1) => {
  try {
    const response = await pocketbaseConection
      .collection("assetTemplates")
      .getList(page, 10, {
        filter: query ? `name ~ "${query}"` : undefined,
      });
    return {
      items: response.items as unknown as AssetTemplate[],
      totalPages: response.totalPages,
    };
  } catch (error) {
    console.error("Error fetching asset templates:", error);
    throw error;
  }
};
