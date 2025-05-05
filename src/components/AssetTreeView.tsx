"use client";

import * as React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Asset } from "@/types/asset";

interface AssetTreeViewProps {
  assets: Asset[];
  onAssetSelect?: (asset: Asset) => void;
}

export function AssetTreeView({ assets, onAssetSelect }: AssetTreeViewProps) {
  const [expandedAssets, setExpandedAssets] = React.useState<Set<string>>(new Set());
  const [selectedAsset, setSelectedAsset] = React.useState<string | null>(null);

  const toggleAsset = (assetId: string) => {
    setExpandedAssets((prev) => {
      const next = new Set(prev);
      if (next.has(assetId)) {
        next.delete(assetId);
      } else {
        next.add(assetId);
      }
      return next;
    });
  };

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset.id);
    onAssetSelect?.(asset);
  };

  const renderAsset = (asset: Asset, level: number = 0) => {
    const isExpanded = expandedAssets.has(asset.id);
    const isSelected = selectedAsset === asset.id;

    return (
      <div key={asset.id}>
        <div
          className={cn(
            "flex items-center gap-2 px-2 py-1.5 hover:bg-accent cursor-pointer rounded-md",
            isSelected && "bg-accent"
          )}
          style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
          onClick={() => handleAssetClick(asset)}
        >
          <button
            className="p-1 hover:bg-accent rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleAsset(asset.id);
            }}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          <div className="flex flex-col">
            <span className="font-medium">{asset.asset_name}</span>
            <span className="text-sm text-muted-foreground">
              Serial: {asset.asset_serial}
            </span>
          </div>
        </div>
        {isExpanded && asset.asset_tags.length > 0 && (
          <div className="mt-1">
            {asset.asset_tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground"
                style={{ paddingLeft: `${(level + 1) * 1.5 + 0.5}rem` }}
              >
                <span>#{tag.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full border rounded-lg p-2">
      {assets.map((asset) => renderAsset(asset))}
    </div>
  );
} 