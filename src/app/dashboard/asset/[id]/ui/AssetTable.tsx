import * as React from "react";
import { useRouter } from "next/navigation"; // Or use react-router-dom if not Next.js
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { EquipmentRelation } from "../types";

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
      router.push(`/dashboard/equipment/${row.child_id.id}`);
    } else if (field === "children_template") {
      router.push(`/dashboard/template/${row.children_template.id}`);
    } else {
      router.push(`/dashboard/asset/${row.id}`);
    }
  };

  const columns: ColumnDef<EquipmentRelation>[] = [
        {
      accessorKey: "children_template",
      header: "Template",
      cell: ({ row }) =>
        editing ? (
          <input
            value={row.original.children_template.name}
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
            {row.original.children_template.name}
          </span>
        ),
    },
    {
      accessorKey: "child_id",
      header: "P/N",
      cell: ({ row }) =>
        editing ? (
          <input
            value={row.original.child_id.part_number}
            onChange={e =>
              onEdit?.(row.original.id, "child_id", {
                ...row.original.child_id.part_number,
                part_number: e.target.value,
              })
            }
          />
        ) : (
          <span
            style={{ cursor: "pointer", color: "#2563eb" }}
            onClick={() => handleCellClick(row.original, "child_id")}
          >
            {row.original.child_id.part_number}
          </span>
        ),
    },

    {
      accessorKey: "child_id.serial_number",
      header: "Child S/N",
      cell: ({ row }) =>
        editing ? (
          <input
            value={row.original.child_id.serial_number}
            onChange={e =>
              onEdit?.(row.original.id, "child_id", e.target.value)
            }
          />
        ) : (
          <span
            style={{ cursor: "pointer", color: "#2563eb" }}
            onClick={() => handleCellClick(row.original, "child_id")}
          >
            {row.original.child_id.serial_number}
          </span>
        ),
    },
    // Add more columns as needed
  ];

  return (
    <DataTable columns={columns} data={data} />
  );
}