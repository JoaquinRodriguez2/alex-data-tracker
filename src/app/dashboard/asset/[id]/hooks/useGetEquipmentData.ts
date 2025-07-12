import { useEffect, useState } from "react";
import { getEquipmentDetails } from "../calls/fetchEquipmentDetails";
import { EquipmentDetails } from "../types";

export const useGetEquipmentData = (parentId: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [equipmentDetails, setEquipmentDetails] = useState<EquipmentDetails | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const equipmentDetailsResponse = await getEquipmentDetails(parentId);
        setEquipmentDetails(equipmentDetailsResponse);
        console.log("Equipment Details:", equipmentDetailsResponse);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);

      }
    };

    fetchData();
  }, [parentId]);

  return {
    //equipmentData,
    error,
    isLoading: loading,
    equipmentDetails: equipmentDetails,
  };
}


