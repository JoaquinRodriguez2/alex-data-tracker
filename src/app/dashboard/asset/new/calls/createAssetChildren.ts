import supabase from "@/utils/SupabaseConfig";

export async function createEquipment() {
    try {
        
        const { data, error } = await supabase
        .from('equipments')
        .insert(
            {  
                serial_number: 'otherValue',
                part_number: 'partNumberValue', 
                name: 'nameValue', 
                equipment_template_id: "6a7f9a58-b1d6-4426-8488-0f5ec68e1d75", 
                main_equipment: true }
        )
        .select();

        if (error) {
            throw error;
        }

        console.log('Equipment created successfully:', data);
        return data;
    } catch (error: any) {
        // Log the full error object for better debugging
        console.error('Error al crear equipo:', error?.message || error);
        throw error;
    }
}


export async function createEquipmentRelations(parentID: string, templateID: string) {
    try {
        // Step 1: Get all child templates for the given templateID
        const { data: templateRelations, error: templateError } = await supabase
            .from('equipment_template_relations')
            .select('child_id')
            .eq('parent_id', templateID);

        if (templateError) {
            throw templateError;
        }

        if (!templateRelations || templateRelations.length === 0) {
            console.log('No child templates found for this template.');
            return [];
        }

        // Step 2: Create equipment_relations for each child template
        const relationsToInsert = templateRelations.map((relation: any) => ({
            parent_id: parentID,
            child_id: null, // No child equipment yet, just template
            children_template: relation.child_id,
        }));

        const { data, error } = await supabase
            .from('equipment_relations')
            .insert(relationsToInsert);

        if (error) {
            throw error;
        }

        console.log('Equipment relations created successfully:', data);
        return data;
    } catch (error: any) {
        console.error('Error creating equipment relations:', error?.message || error);
        throw error;
    }
}