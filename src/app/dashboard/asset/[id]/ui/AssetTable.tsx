import * as React from "react";
import { useRouter } from "next/navigation"; // Or use react-router-dom if not Next.js
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { EquipmentRelation } from "../types";
import { SelectChildModal } from "./SelectChildModal";
import { updateRelationChild } from "../calls/editAssetChildren";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fetchAllEquipments } from "../calls/fetchAllEquipments";

interface AssetTableProps {
  data: EquipmentRelation[];
  editing: boolean;
  onEdit?: (id: string, field: keyof EquipmentRelation, value: unknown) => void;
}

export function AssetTable({ data, editing, onEdit }: AssetTableProps) {
  const router = useRouter();

  const handleCellClick = (
    row: EquipmentRelation,
    field: keyof EquipmentRelation
  ) => {
    if (editing) return;
    // Example navigation logic:
    if (field === "child_id") {
      router.push(`${row.child_id.id}`);
    } else if (field === "children_template") {
      router.push(`asset/${row.children_template.id}`);
    } else {
      router.push(`asset/${row.id}`);
    }
  };

  // Modal state
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRelationId, setSelectedRelationId] = React.useState<string | null>(null);

  // Dummy tree data, replace with your actual tree fetch logic
  const [treeData, setTreeData] = React.useState<TreeNode[]>([]);

  // Open modal to select new child
  const handleChangeChild = async (relationId: string) => {
    setSelectedRelationId(relationId);
    setModalOpen(true);
    // Fetch all equipments and set as treeData
    const equipments = await fetchAllEquipments();
    setTreeData(equipments); // If you want a flat list, or build a tree if needed
  };

  // Handle selection from modal
  const handleSelectChild = async (equipment: Equipment) => {
    if (!selectedRelationId) return;
    const updated = await updateRelationChild(selectedRelationId, equipment.id);
    if (updated) {
      toast.success("Sub component updated!");
      setModalOpen(false);
      setSelectedRelationId(null);
      // Optionally refresh data here
    } else {
      toast.error("Failed to update child.");
    }
  };

  const columns: ColumnDef<EquipmentRelation>[] = [
    {
      accessorKey: "children_template",
      header: "Estructuras",
      cell: ({ row }) =>
        editing ? (
          <input
            value={row.original.children_template?.name ?? ""}
            onChange={e =>
              onEdit?.(row.original.id, "children_template", {
                ...row.original.children_template,
                name: e.target.value,
              })
            }
          />
        ) : (
          <span
            style={{ cursor: "pointer", color: "#2563eb" }}
            onClick={() => handleCellClick(row.original, "children_template")}
          >
            {row.original.children_template?.name ?? "N/A"}
          </span>
        ),
    },
    {
      accessorKey: "child_id",
      header: "P/N",
      cell: ({ row }) => (
        <span
          style={{ cursor: "pointer", color: editing ? "#16a34a" : "#2563eb" }}
          onClick={() => {
            if (editing) {
              handleChangeChild(row.original.id);
            } else {
              handleCellClick(row.original, "child_id");
            }
          }}
        >
          {row.original.children_template?.part_number ?? "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "child_id.serial_number",
      header: "Sub Component S/N",
      cell: ({ row }) => (
        <span
          style={{ cursor: "pointer", color: editing ? "#16a34a" : "#2563eb" }}
          onClick={() => {
            if (editing) {
              handleChangeChild(row.original.id);
            } else {
              handleCellClick(row.original, "child_id");
            }
          }}
        >
          {row.original.child_id?.serial_number ?? "[Not Assigned]"}
        </span>
      ),
    },
    // Add more columns as needed
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />
      <SelectChildModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelectChild}
      />
    </>
  );
}