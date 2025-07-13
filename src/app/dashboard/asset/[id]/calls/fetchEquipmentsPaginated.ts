import supabase from "@/utils/SupabaseConfig";
import { Equipment } from "../types";

export async function fetchEquipmentsPaginated({
  page = 1,
  pageSize = 10,
  search = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
}): Promise<{ data: Equipment[]; total: number }> {
  let query = supabase
    .from("equipments")
    .select("*", { count: "exact" })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (search) {
    query = query.or(
      `serial_number.ilike.%${search}%,part_number.ilike.%${search}%`
    );
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    return { data: [], total: 0 };
  }
  return { data: data as Equipment[], total: count ?? 0 };
}