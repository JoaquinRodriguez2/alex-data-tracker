"use client";
import supabase from "@/utils/SupabaseConfig";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// --- Types ---


type Equipment = {
  id: string;
  name: string;
  serial_number: string;
  part_number: string | null;
  equipment_template_id: string;

};

// --- Data fetching hook ---
function useEquipments(search: string, page: number, pageSize: number = 20, stockMode: boolean = false) {
  const [data, setData] = React.useState<Equipment[]>([]);
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    let query = supabase
      .from("equipments")
      .select(
        `
        `,
        { count: "exact" }
      )
      .order("name", { ascending: true })
      .range(page * pageSize, page * pageSize + pageSize - 1);

    if (stockMode) {
      query = query
        .eq("main_equipment", false)
    } else if (search.trim()) {
      query = query.or(
        `name.ilike.%${search}%,serial_number.ilike.%${search}%,part_number.ilike.%${search}%`
      );
    } else {
      query = query.eq("main_equipment", true);
    }

    query
      .then(({ data, count, error }) => {
        if (!isMounted) return;
        if (error) {
          setError(error.message);
        } else {
          setData(data || []);
          setCount(count || 0);
        }
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [search, page, pageSize, stockMode]);

  return { data, count, loading, error };
}

// --- Search component ---
function EquipmentSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      placeholder="🔍 Name, Serial or P/N "
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full mb-5 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-base focus:outline-none focus:border-blue-500 transition"
    />
  );
}

// --- Grid component ---
import { DataTable } from "@/components/ui/data-table";

function EquipmentGrid({ equipments, loading, onClick }: { equipments: Equipment[]; loading: boolean; onClick: (id: string) => void }) {
  const columns = React.useMemo<import("@tanstack/react-table").ColumnDef<Equipment, unknown>[]>( 
    () => [
      {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => (
          <span>{row.original.name}</span>
        ),
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
      
    ],
    []
  );

  if (!equipments.length) {
    return <div className="text-gray-400 mt-6 text-center">{loading ? "Loading..." : "No equipments found."}</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={equipments}
      onRowClick={(row: Equipment) => onClick(row.id)}
      rowClassName="cursor-pointer hover:bg-blue-50"
    />
  );
}

// --- Pagination component ---
function Pagination({
  page,
  total,
  pageSize,
  onPage,
}: {
  page: number;
  total: number;
  pageSize: number;
  onPage: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="mt-6 flex items-center gap-4 justify-center">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 0}
        className="px-3 py-1 rounded border border-gray-200 bg-white text-gray-600 disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-gray-500">
        Page <span className="font-semibold">{page + 1}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>
      <button
        onClick={() => onPage(page + 1)}
        disabled={page + 1 >= totalPages}
        className="px-3 py-1 rounded border border-gray-200 bg-white text-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

// --- Main Page ---
export default function Page() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [stockMode, setStockMode] = useState(false);
  const pageSize = 20;
  const { data, count, loading, error } = useEquipments(search, page, pageSize, stockMode);
  const router = useRouter();

  React.useEffect(() => {
    setPage(0); // Reset to first page on search or stock toggle
  }, [search, stockMode]);

  return (
    <div className="p-4 w-full">
      <div className="flex justify-center items-center p-1">
        <EquipmentSearch value={search} onChange={setSearch} />
      </div>
      <div className="flex items-center mb-3">
        <button
          className="px-4 py-2 rounded-lg bg-blue-400 text-white font-semibold shadow hover:bg-blue-700 transition"
          onClick={() => router.push("asset/new")}
        >
          Crear
        </button>
        <button
          className={`ml-4 px-4 py-2 rounded-lg font-semibold shadow transition ${
            stockMode
              ? "bg-gray-400 text-white"
              : "bg-yellow-400 text-gray-700 hover:bg-blue-100"
          }`}
          onClick={() => setStockMode((prev) => !prev)}
        >
          {stockMode ? "Main Equipment" : "Stock"}
        </button>
      </div>
      {loading && <div className="text-gray-400 mb-4">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error + "/ Verifique su conectividad a la red"}</div>}
      <EquipmentGrid equipments={data} loading={loading} onClick={(id:string) => {router.push(`asset/${id}`)}} />
      <Pagination page={page} total={count} pageSize={pageSize} onPage={setPage} />
    </div>
  );
}
