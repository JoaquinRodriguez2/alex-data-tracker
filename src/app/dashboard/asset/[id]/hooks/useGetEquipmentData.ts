import { useEffect, useState } from "react";
import { getEquipmentDetails } from "../calls/getEquipmentDetails";
import { Equipment, EquipmentData, EquipmentDetails, EquipmentRelation } from "../types";
import { getAllChildrenData } from "../calls/getAllChildrenData";






export const useGetEquipmentData = (parentId: string) => {
  const [loading, setLoading] = useState(true);
  const [childrenData, setChildrenData] = useState([]);
  const [error, setError] = useState(null);
  const [equipmentDetails, setEquipmentDetails] = useState<EquipmentDetails | null>(null);
  const [equipmentChildren, setEquipmentChildren] = useState<EquipmentRelation[] | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const equipmentDetailsResponse = await getEquipmentDetails(parentId);
        setEquipmentDetails(equipmentDetailsResponse);

  

        const equipmentChildrenResponse = await getAllChildrenData(parentId);
        setEquipmentChildren(equipmentChildrenResponse);

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
    childrenData,
    error,
    isLoading: loading,
    equipmentDetails: equipmentDetails,
  };
}


