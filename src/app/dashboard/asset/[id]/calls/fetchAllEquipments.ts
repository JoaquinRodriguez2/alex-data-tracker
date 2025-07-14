import supabase from "@/utils/SupabaseConfig";
import { Equipment } from "../types";

export async function fetchAllEquipments(): Promise<Equipment[]> {
  const { data, error } = await supabase
    .from("equipments")
    .select("*");
  if (error) {
    console.error("Error fetching equipments:", error);
    return [];
  }
  return data as Equipment[];
}