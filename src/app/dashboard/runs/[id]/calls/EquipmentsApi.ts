import supabase from "@/utils/SupabaseConfig";

// Obtener equipos asignados a una operación
export async function getOperationEquipments(operation_id: number) {
  const { data, error } = await supabase
    .from("drilling_operation_equipments")
    .select("equipment_id, equipments(*)")
    .eq("drilling_operation_id", operation_id);
  if (error) throw new Error(error.message);
  return data;
}

// Agregar equipo a operación
export async function addEquipmentToOperation(operation_id: number, equipment_id: string) {
const  { data, error } = await supabase
  .rpc('assign_equipment_tree_to_drilling_operation', {
    drilling_op_id: operation_id,
    parent_eq_id: equipment_id
  })
  if (error) throw new Error(error.message);
  return data;
}

// Eliminar equipo de operación
export async function deleteEquipmentFromOperation(operation_id: number, equipment_id: string) {
  const { error } = await supabase
    .from("drilling_operation_equipments")
    .delete()
    .eq("drilling_operation_id", operation_id)
    .eq("equipment_id", equipment_id);
  if (error) throw new Error(error.message);
}

// CRUD de equipos (opcional)
export async function createEquipment(equipment: any) {
  const { data, error } = await supabase
    .from("equipments")
    .insert([equipment])
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}