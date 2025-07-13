import supabase from "@/utils/SupabaseConfig";

/**
 * Gets the parent_id for a given child_id (equipment id) from equipment_relations.
 * @param childId The equipment's id you want to find the parent for.
 * @returns The parent_id or null if not found.
 */
export async function getParentIdByChildId(childId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("equipment_relations")
    .select("parent_id")
    .eq("child_id", childId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching parent_id for child_id:", error.message);
    return null;
  }
  if (!data) {
    console.warn(`No parent found for child_id: ${childId}`);
    return null;
  }
  return data.parent_id;
}
