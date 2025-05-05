export interface Asset {
  id: string;
  asset_name: string;
  asset_serial: string;
  asset_tags: AssetTag[];
}

export interface AssetTag {
  id: string;
  name: string;
} 