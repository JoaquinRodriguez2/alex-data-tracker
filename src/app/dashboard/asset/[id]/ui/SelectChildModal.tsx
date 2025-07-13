import React, { useEffect, useState } from "react";
import { Equipment } from "../types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { fetchEquipmentsPaginated } from "../calls/fetchEquipmentsPaginated";
import { DataTable } from "@/components/ui/data-table"; // Import your DataTable
import type { ColumnDef } from "@tanstack/react-table"; // Adjust import if needed

export function SelectChildModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (equipment: Equipment) => void;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [treeData, setTreeData] = useState<Equipment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data, total } = await fetchEquipmentsPaginated({ page, pageSize, search });
    setTreeData(data);
    setTotal(total);
    setLoading(false);
  };

  useEffect(() => {
    if (open) fetchData();
    // eslint-disable-next-line
  }, [open, page, search]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPage(1);
      fetchData();
    }
  };

  // Define columns for DataTable
  const columns: ColumnDef<Equipment>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "serial_number",
      header: "S/N",
      cell: ({ row }) => row.original.serial_number,
    },
    {
      accessorKey: "part_number",
      header: "P/N",
      cell: ({ row }) => row.original.part_number,
    },
    // Add more columns if needed
  ];

  // Row click handler
  const handleRowClick = (row: Equipment) => {
    onSelect(row);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecciona un nuevo hijo</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          placeholder="Buscar por S/N o P/N"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="mb-2 w-full p-2 border rounded"
        />
        <div className="max-h-96 overflow-auto">
          <DataTable
            columns={columns}
            data={treeData}
            loading={loading}
            onRowClick={handleRowClick}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </Button>
          <span>
            Página {page} de {Math.ceil(total / pageSize)}
          </span>
          <Button
            variant="outline"
            disabled={page * pageSize >= total}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}