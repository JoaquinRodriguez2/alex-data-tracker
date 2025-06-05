import { AssetNestedTemplatCall } from "@/types/AssetNestedTemplate";
import { AssetTemplate } from "@/types/AssetTemplate";
import supabase from "@/utils/SupabaseConfig";

export async function getAssetTemplateChildrenById(id: string) {
  const { data: relation, error } = await supabase
    .from('template_hierarchy')
    .select('*')
    .eq('parent_template_id', id);
    
  if (error) {
    console.error('Error fetching asset template children:', error);
    return null
  }else{
    console.log(relation);
    const childIds = relation.map((item: AssetNestedTemplatCall) => item.child_template_id);
    const assetTemplate: AssetTemplate[] | null = await getAssetTemplateTree(childIds);
    if (!assetTemplate) {
      console.error('No asset templates found for the given IDs');
      return null;
    }else{
        console.log('Asset templates fetched:', assetTemplate);
        return assetTemplate;
    }

    }
}



async function getAssetTemplateTree(ids: string[]) {
  const {data: asset_templates, error} = await supabase
    .from('equipment_templates')
    .select('*')
    .in('id', ids);

    if (error) {
        return null;
    } else {
        console.log('Asset templates fetched:', asset_templates);
        return asset_templates as AssetTemplate[];
    }
}