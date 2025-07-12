"use client"
import React from "react";
import { DrillingOperationForm } from "./ui/DrillingOperationForm";
import { useDrillingOperation } from "./hooks/useDrillingOperation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { data, loading, error, save } = useDrillingOperation(params.id);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Drilling Operation Details</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <DrillingOperationForm data={data} onSubmit={save} isLoading={loading} />
    </div>
  );
}