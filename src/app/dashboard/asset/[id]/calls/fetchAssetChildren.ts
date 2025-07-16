import supabase from "@/utils/SupabaseConfig";
import { EquipmentRelation } from "../types";

/**
 * Fetches equipment_relations by parent_id, including children_template data.
 * @param parentId The parent equipment ID.
 * @returns Array of EquipmentRelation with children_template or empty array on error.
 */
export async function fetchAssetChildren(parentId: string): Promise<EquipmentRelation[]> {
  const { data, error } = await supabase
    .from("equipment_relations")
    .select("*, children_template(*),child_id(*)") // Join children_template
    .eq("parent_id", parentId);

  if (error) {
    return [];
  }





  return data as EquipmentRelation[];
}
