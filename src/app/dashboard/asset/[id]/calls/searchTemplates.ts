import supabase from "@/utils/SupabaseConfig";

export async function searchTemplates(query: string) {
  const { data, error } = await supabase
    .from("equipment_templates")
    .select("id, name,part_number")
    .ilike("name", `%${query}%`)
    .limit(10);

  if (error) {
    console.error("Error searching templates:", error);
    return [];
  }

  return (data || []).map((t) => ({
    value: t.id,
    label: `${t.id} - ${t.name} - ${t.part_number}`,
  }));
}