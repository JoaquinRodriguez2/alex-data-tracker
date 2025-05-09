import { useEffect, useState } from "react";
import { AssetTemplate } from "@/types/AssetTemplate";
import { fetchAssetTemplates } from "../services/fetchAssetTemplates";

export const useAssetTemplates = () => {
  const [assetTemplates, setAssetTemplates] = useState<AssetTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { items, totalPages } = await fetchAssetTemplates(searchQuery, currentPage);
        setAssetTemplates(items);
        setTotalPages(totalPages);
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