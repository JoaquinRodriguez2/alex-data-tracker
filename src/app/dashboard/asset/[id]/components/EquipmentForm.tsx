import React, { useEffect, useState } from "react";
import { getParentIdByChildId } from "../calls/getParentRelationByChildId";

interface EquipmentFormProps {
  equipmentId: string;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ equipmentId }) => {
  const [parentId, setParentId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchParentId() {
      if (equipmentId) {
        const result = await getParentIdByChildId(equipmentId);
        setParentId(result);
      }
    }
    fetchParentId();
  }, [equipmentId]);

  return (
    <form>
      {/* ...otros campos del formulario... */}
      <div>
        <label>Parent ID:</label>
        <input type="text" value={parentId ?? ""} readOnly />
      </div>
      {/* ...otros campos del formulario... */}
    </form>
  );
};

export default EquipmentForm;