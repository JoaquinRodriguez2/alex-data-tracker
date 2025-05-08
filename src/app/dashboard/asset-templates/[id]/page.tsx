"use client";

import { useEffect } from "react";
import { use } from "react";

export default function AssetTemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  useEffect(() => {
    // Fetch data for the specific asset template using the id
    console.log("Fetching data for template ID:", id);
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Plantilla de Activos</h1>
      <p>Detalles de: {id}</p>
      {/* Add more details or components here */}
    </div>
  );
}
