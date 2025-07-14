import supabase from "@/utils/SupabaseConfig";

// Obtener equipos asignados a una operación
export async function getOperationEquipments(operation_id: number) {
  const { data, error } = await supabase
    .from("drilling_operations_equipments")
    .select("parent_id, equipments(*)")
    .eq("operation_id", operation_id);
  if (error) throw new Error(error.message);
  return data;
}

// Agregar equipo a operación
export async function addEquipmentToOperation(operation_id: number, parent_id: string) {
  const { data, error } = await supabase
    .from("drilling_operations_equipments")
    .insert([{ operation_id, parent_id }]);
  if (error) throw new Error(error.message);
  return data;
}

// Eliminar equipo de operación
export async function deleteEquipmentFromOperation(operation_id: number, parent_id: string) {
  const { error } = await supabase
    .from("drilling_operations_equipments")
    .delete()
    .eq("operation_id", operation_id)
    .eq("parent_id", parent_id);
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