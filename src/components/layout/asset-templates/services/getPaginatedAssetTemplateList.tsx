import { getPagesLogic } from "@/utils/getPagesLogic";
import supabase from "@/utils/SupabaseConfig";

const pageSize = 2



//Fetch Paginated Data, it returns a list of assets
export async function fetchAllAssetTemplatesList(currentPage: number = 1) {
    
    const {count: totalCount} = await supabase
  .from('asset_templates')
  .select('*', { count: 'exact' })
  .range(0, 0)

  const {top,bottom,totalPages} = getPagesLogic(totalCount ?? 0, currentPage, pageSize)

   console.log(totalPages)
    const {data, error} = await supabase
  .from('asset_templates')
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


async function getAssetTemplatesCount() {
    const { data, error } = await supabase.rpc('count_asset_templates');

    if (error) {
        console.error('Error calling count_asset_templates function:', error);
        return null;
    }

    return data;
}

getAssetTemplatesCount();