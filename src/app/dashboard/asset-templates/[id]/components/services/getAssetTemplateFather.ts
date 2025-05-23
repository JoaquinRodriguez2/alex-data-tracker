import { AssetTemplate } from "@/types/AssetTemplate";

export const assetTemplateFather = async (id: string): Promise<AssetTemplate[] | null> => {
  try {
    console.log("father ids", id);

    // return a little dummy list of assetTemplates
    const assetTemplates: AssetTemplate[] = [
      {
        id: "123123123123",
        name: "Dummy Asset Template",
        description: "This is a dummy asset template for testing purposes.",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        childFields: [],
      },
      {
        id: "456456456456",
        name: "Another Dummy Asset Template",
        description: "This is another dummy asset template for testing purposes.",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        childFields: [],
      },
    ];
    return assetTemplates;
  } catch (error) {
    console.error("Error fetching asset templates father:", error);
    return null;
  }
};