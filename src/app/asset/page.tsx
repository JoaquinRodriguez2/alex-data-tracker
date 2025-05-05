"use client";

import { AssetTreeView } from "@/components/AssetTreeView";
import type { Asset } from "@/types/asset";

// This is mock data - replace with actual data fetching
const mockAssets: Asset[] = [
  {
    id: "1",
    asset_name: "Laptop Dell XPS 15",
    asset_serial: "DLXPS15001",
    asset_tags: [
      { id: "1", name: "electronics" },
      { id: "2", name: "laptop" },
    ],
  },
  {
    id: "2",
    asset_name: "Office Printer HP",
    asset_serial: "HPOFF001",
    asset_tags: [
      { id: "3", name: "printer" },
      { id: "4", name: "office" },
    ],
  },
];

export default function AssetPage() {
  const handleAssetSelect = (asset: Asset) => {
    console.log("Selected asset:", asset);
    // Handle asset selection here
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Assets</h1>
      <AssetTreeView assets={mockAssets} onAssetSelect={handleAssetSelect} />
    </div>
  );
}
