"use client";

import { useEffect } from "react";

export default function AssetTemplateDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  useEffect(() => {
    // Fetch data for the specific asset template using the id
    console.log("Fetching data for template ID:", id);
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Template Details</h1>
      <p>Details for template ID: {id}</p>
      {/* Add more details or components here */}
    </div>
  );
}
