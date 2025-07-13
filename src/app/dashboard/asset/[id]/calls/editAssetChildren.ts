import supabase from "@/utils/SupabaseConfig";

/**
 * Updates an equipment by ID.
 * @param id Equipment UUID
 * @param updates Object with fields to update
 * @returns Updated equipment or null on error
 */
export async function updateEquipment(id: string, updates: {
  name?: string;
  serial_number?: string;
  part_number?: string;
  equipment_template_id?: string;
  main_equipment?: boolean;
}) {
  const { data, error } = await supabase
    .from("equipments")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating equipment:", error.message);
    return null;
  }
  return data;
}

/**
 * Updates the child_id of an equipment_relation by relation ID.
 * @param relationId equipment_relations.id
 * @param newChildId equipments.id
 * @returns Updated relation or null on error
 */
export async function updateRelationChild(relationId: string, newChildId: string) {
  const { data, error } = await supabase
    .from("equipment_relations")
    .update({ child_id: newChildId })
    .eq("id", relationId)
    .select()
    .single();

  if (error) {
    console.error("Error updating relation child:", error.message);
    return null;
  }
  return data;
}