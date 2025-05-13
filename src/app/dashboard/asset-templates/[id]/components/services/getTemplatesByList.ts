import { AssetTemplate } from "@/types/AssetTemplate";

export const assetTemplateByList = async (ids: string[]): Promise<AssetTemplate[] | null> => {
  try {
    console.log("child ids", ids);
    // return a little dummy list of assetTemplates
    const assetTemplates: AssetTemplate[] = [
      {
        id: "123123123123",
        name: "Child Dummy Asset Template",
        description: "This is a dummy asset template for testing purposes.",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        childFields: [],
      },
      {
        id: "456456456456",
        name: "Another Child Dummy Asset Template",
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