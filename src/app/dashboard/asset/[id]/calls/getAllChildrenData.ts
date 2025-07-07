import supabase from "@/utils/SupabaseConfig";

/**
 * Fetch all equipment_relations rows by parent_id.
 * @param parentId The parent_id to filter by.
 */
export async function getAllChildrenData(parentId: string) {
  const { data, error } = await supabase
    .from("equipment_relations")
    .select("*")
    .eq("parent_id", parentId);

  if (error) {
    throw error;
  }
  console.log("Fetched all children data:", data);
  return data;
}