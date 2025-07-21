// This file defines TypeScript interfaces and types used throughout the project.
export interface EquipmentRelation {
  id: string;
  parent_id: string;
  child_id: Equipment;
  children_template: ChildrenTemplate;
}

export interface Equipment {
  id: string;
  name: string;
  part_number: string;
  serial_number: string;
  main_equipment: boolean;
  equipment_template_id: string;
  revision?: string;

}

export interface ChildrenTemplate {
  id: string;
  name: string;
  is_active: boolean;
  description: string;
  part_number: string;
}

export interface EquipmentDetails {
  id: string;
  name: string;
  part_number: string;
  serial_number: string;
  main_equipment: boolean;
  equipment_template_id: string;
  revision?: string;
}
