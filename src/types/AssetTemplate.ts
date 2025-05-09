export interface AssetTag {
  id: string;
  name: string;
} 

export interface AssetTemplate {
  id: string;
  name: string;
  description: string;
  created: string;
  updated: string;
  parentField: Array<string>;
  childFields: Array<string>;
  tags: Array<AssetTag>;
}
