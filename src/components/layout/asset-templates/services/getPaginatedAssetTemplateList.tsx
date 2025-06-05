import { getPagesLogic } from "@/utils/getPagesLogic";
import supabase from "@/utils/SupabaseConfig";

const pageSize = 4



//Fetch Paginated Data, it returns a list of assets
export async function fetchAllAssetTemplatesList(currentPage:number) {
    
    const {count: totalCount} = await supabase
  .from('equipment_templates')
  .select('*', { count: 'exact' })
  .range(0, 0)

  const {top,bottom,totalPages} = getPagesLogic(totalCount ?? 0, currentPage, pageSize)

    const {data, error} = await supabase
  .from('equipment_templates')
  .select('*')
  .range(bottom,top)
  
  console.log(data)
  
  if (error) {
    console.error('Error fetching asset templates:', error);
    return {
      items: [],
      totalPages: 0
    }
  }else{

    return {
      items: data,
      totalPages: totalPages
    }

  }
  
}
