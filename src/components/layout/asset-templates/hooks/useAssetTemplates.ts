import { useEffect, useState } from "react";
import { AssetTemplate } from "@/types/AssetTemplate";
import { fetchAllAssetTemplatesList } from "../services/getPaginatedAssetTemplateList";

export const useAssetTemplates = () => {
  const [assetTemplates, setAssetTemplates] = useState<AssetTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const tryGetData = async () =>{
        const {items,totalPages} = await fetchAllAssetTemplatesList(currentPage);
        setAssetTemplates(items);
        setTotalPages(totalPages);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await tryGetData();
      } catch (error) {
        console.error("Error fetching asset templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return {
    assetTemplates,
    loading,
    searchQuery,
    setSearchQuery,
    currentPage,
    totalPages,
    handlePageChange,
  };
};