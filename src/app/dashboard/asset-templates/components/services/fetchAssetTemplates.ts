import { AssetTemplate } from "@/types/AssetTemplate";

export const fetchAssetTemplates = async (query: string = "", page: number = 1) => {
  try {
    console.log("The query is", query , "and the page is", page);
    const response = {
      items: Array(10).fill(null).map((_, index) => ({
        id: `template-${index + 1}`,
        name: `Asset Template ${index + 1}`,
        description: `Description for Asset Template ${index + 1}`,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      }))  as AssetTemplate[],
      totalPages: 5,
    };

    return {
      items: response.items,
      totalPages: response.totalPages,
    };
  } catch (error) {
    console.error("Error fetching asset templates:", error);
    throw error;
  }
};
