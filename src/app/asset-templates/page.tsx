"use client";

import { useEffect, useState } from "react";
import { pocketbaseConection } from "@/services/core/pocketbase";

interface AssetTemplate {
  id: string;
  name: string;
  description: string;
  created: string;
  updated: string;
}

export default function AssetPage() {
  const [assetTemplates, setAssetTemplates] = useState<AssetTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<AssetTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchAssetTemplates = async () => {
      try {
        setLoading(true);
        const response = await pocketbaseConection
          .collection("assetTemplates")
          .getList(1, 1); // Fetch the first page with 30 items per page
        setAssetTemplates(response.items);
        setFilteredTemplates(response.items); // Initialize filtered templates
      } catch (error) {
        console.error("Error fetching asset templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssetTemplates();
  }, []);

  useEffect(() => {
    // Filter templates based on the search query
    const filtered = assetTemplates.filter((template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTemplates(filtered);
  }, [searchQuery, assetTemplates]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Templates</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{template.name}</h2>
              <p className="text-sm text-gray-600">{template.description}</p>
              <p className="text-xs text-gray-500">
                Created: {new Date(template.created).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Updated: {new Date(template.updated).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}