import { AssetTemplate } from "@/types/AssetTemplate";
import supabase from "@/utils/SupabaseConfig";
import { getAssetTemplateChildrenById } from "./getAssetTemplateTree";



export async function getAssetTemplateById(id: string){
   const { data: asset_templates, error } = await supabase
  .from('equipment_templates') 
  .select('*') 
  .eq('id', id) 
  .single();


  if (error || asset_templates === null) {
    return null;
  }else{
    getAssetTemplateChildrenById(id);
    return asset_templates as AssetTemplate;
  }

  

  
}
