// This file defines TypeScript interfaces and types used throughout the project.

export interface EquipmentDetails {
    id: string;
    name: string;
    serial_number: string;
    part_number: string | null;
    equipment_template_id: string;
    main_equipment: boolean;
}

export interface EquipmentRelation {
    id: string;
    parent_id: string;
    children_template_id: ChildrenTemplate;
    child_id: string;
}

export interface ChildrenTemplate {
    id: string;
    name: string;
    part_number: string | null;
    is_active: boolean;
}

export interface EquipmentData {
    equipment: Equipment;
    children: ChildrenTemplate[];
}
