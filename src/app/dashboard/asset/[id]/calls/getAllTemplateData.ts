import supabase from "@/utils/SupabaseConfig";

/**
 * Fetches all equipment templates without pagination.
 * @returns An object with templates.
 */
export async function getAllTemplateData() {
  const { data, error } = await supabase
    .from("equipment_templates")
    .select("*");

  if (error) {
    console.error("Error fetching templates:", error);
    return { templates: [] };
  }

  return { templates: data };
}