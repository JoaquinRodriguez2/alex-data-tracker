import supabase from "@/utils/SupabaseConfig";

export async function getDrillingOperation(id: string) {
  const { data, error } = await supabase
    .from("drilling_operations")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function postDrillingOperation(id: string, values: any) {
  // If id exists, update; else, insert
  if (id) {
    const { data, error } = await supabase
      .from("drilling_operations")
      .update(values)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return data;
  } else {
    const { data, error } = await supabase
      .from("drilling_operations")
      .insert([values])
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
}
