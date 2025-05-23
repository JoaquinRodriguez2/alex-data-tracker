"use client";

import { useRouter } from "next/navigation"; // Import useRouter
import { AssetTemplateCard } from "./AssetTemplateCard";
import { useAssetTemplates } from "./hooks/useAssetTemplates";

export default function ListAssetTemplatePage() {
  const {
    assetTemplates,
    loading,
    searchQuery,
    setSearchQuery,
    currentPage,
    totalPages,
    handlePageChange,
  } = useAssetTemplates();

  const router = useRouter(); // Initialize useRouter
  const createNewAssetTemplate = () =>{
    router.push('/dashboard/asset-templates/new-asset-template')
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Plantilla de Equipos</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4 flex flex-row space-x-2">
      <button
      disabled={false}
      onClick={() => createNewAssetTemplate()}
      className="px-4 py-2 bg-blue-200 rounded-lg disabled:opacity-50 hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
    >
      Crear
    </button>
    <button
      onClick={() => console.log("Export all assets")}
      className="px-4 py-2 bg-green-200 rounded-lg disabled:opacity-50 hover:bg-green-300 focus:outline-none focus:ring focus:ring-green-300"
    >
      Exportar Todo
    </button>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border rounded-lg p-4 shadow animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {assetTemplates.map((template) => (
              <AssetTemplateCard 
                key={template.id} 
                template={template} 
                onClick={() => router.push(`asset-templates/${template.id}`)} // Navigate to dynamic route
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}