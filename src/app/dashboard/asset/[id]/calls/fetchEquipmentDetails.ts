import supabase from "@/utils/SupabaseConfig";

export async function getEquipmentDetails(id: string) {
  const { data, error } = await supabase
    .from("equipments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching equipment data:", error);
    return null;
  }
  return data;
}
