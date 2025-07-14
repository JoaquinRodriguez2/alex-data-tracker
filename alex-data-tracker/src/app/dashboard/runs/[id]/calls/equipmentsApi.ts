import supabase from "@/utils/SupabaseConfig";

export async function createEquipment(operationId: number, equipmentId: string) {
  const { data, error } = await supabase
    .from("drilling_operations_equipments")
    .insert([{ operation_id: operationId, parent_id: equipmentId }])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function readEquipments(operationId: number) {
  const { data, error } = await supabase
    .from("drilling_operations_equipments")
    .select("*")
    .eq("operation_id", operationId);
  if (error) throw new Error(error.message);
  return data;
}

export async function updateEquipment(operationId: number, equipmentId: string) {
  const { data, error } = await supabase
    .from("drilling_operations_equipments")
    .update({ parent_id: equipmentId })
    .eq("operation_id", operationId)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteEquipment(operationId: number, equipmentId: string) {
  const { data, error } = await supabase
    .from("drilling_operations_equipments")
    .delete()
    .eq("operation_id", operationId)
    .eq("parent_id", equipmentId);
  if (error) throw new Error(error.message);
  return data;
}