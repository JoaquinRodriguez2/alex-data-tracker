// Obtiene los datos de runs desde Supabase
import supabase from "@/utils/SupabaseConfig";

export type Run = {
  id: number;
  name: string;
  rig: string;
};

export async function getRunsData(): Promise<Run[]> {
  const { data, error } = await supabase
    .from("drilling_operations")
    .select("id, well_name, rig_name")
    .order("id", { ascending: false });

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data.map(item => ({
    id: item.id,
    name: item.well_name,
    rig: item.rig_name,
  }));
}
