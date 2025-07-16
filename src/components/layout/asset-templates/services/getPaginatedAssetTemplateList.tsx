import { getPagesLogic } from "@/utils/getPagesLogic";
import supabase from "@/utils/SupabaseConfig";

const pageSize = 10; // Define the number of items per page



//Fetch Paginated Data, it returns a list of assets
export async function fetchAllAssetTemplatesList(currentPage: number, searchQuery: string = "") {
  // 1. Contar el total de resultados filtrados
  let countQuery = supabase
    .from("equipment_templates")
    .select("id", { count: "exact" });

  if (searchQuery && searchQuery.trim()) {
    countQuery = countQuery.or(
      `name.ilike.%${searchQuery.trim()}%,description.ilike.%${searchQuery.trim()}%,part_number.ilike.%${searchQuery.trim()}%`
    );
  }
  const { count: totalCount, error: countError } = await countQuery.range(0, 0);
  if (countError) {
    console.error("Error counting asset templates:", countError);
    return { items: [], totalPages: 0 };
  }

  // 2. Calcular paginación
  const { top, bottom, totalPages } = getPagesLogic(totalCount ?? 0, currentPage, pageSize);

  // 3. Traer solo la página solicitada, con el filtro aplicado
  let dataQuery = supabase
    .from("equipment_templates")
    .select("*")
    .order("name", { ascending: true })
    .range(bottom, top);

  if (searchQuery && searchQuery.trim()) {
    dataQuery = dataQuery.or(
      `name.ilike.%${searchQuery.trim()}%,description.ilike.%${searchQuery.trim()}%,part_number.ilike.%${searchQuery.trim()}%`
    );
  }

  const { data, error } = await dataQuery;

  if (error) {
    console.error("Error fetching asset templates:", error);
    return {
      items: [],
      totalPages: totalPages,
    };
  } else {
    return {
      items: data,
      totalPages: totalPages,
    };
  }
}
