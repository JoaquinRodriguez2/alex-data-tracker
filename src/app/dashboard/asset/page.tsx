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
  parent_id: string | null;
  parent?: EquipmentParent[];
};

type EquipmentParent = {
  name: string;
  serial_number: string;
};

// --- Data fetching hook ---
function useEquipments(search: string, page: number, pageSize: number = 20) {
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
  .select(`
    *,
    parent: equipments (
      name,
      serial_number
    )
  `, { count: "exact" })
  .order("name", { ascending: true })
  .range(page * pageSize, page * pageSize + pageSize - 1);

    if (search.trim()) {

      query = query.or(
        `name.ilike.%${search}%,serial_number.ilike.%${search}%,part_number.ilike.%${search}%`
      );
    
    }

    query
      .then(({ data, count, error }) => {
        if (!isMounted) return;
        if (error) {
          setError(error.message);
        } else {
            console.log("Fetched equipments:", data);
          setData(data || []);
          setCount(count || 0);
        }
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [search, page, pageSize]);

  return { data, count, loading, error };
}

// --- Search component ---
function EquipmentSearch({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      placeholder="🔍 Busca por nombre, serial o numero de parte"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full mb-5 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-base focus:outline-none focus:border-blue-500 transition"
    />
  );
}

// --- Grid component ---
function EquipmentGrid({ equipments,loading,onClick }: { equipments: Equipment[], loading: boolean, onClick: (id: string) => void }) {
  const clickHandler = (id: string) => {
    onClick(id);
  }
  if (!equipments.length)
    return <div className="text-gray-400 mt-6 text-center">{loading ? "Loading..." : "No equipments found."}</div>;
  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className="min-w-full text-sm text-left font-normal">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 font-medium">Nombre</th>
            <th className="py-3 px-4 font-medium">S/N</th>
            <th className="py-3 px-4 font-medium">P/N</th>
            <th className="py-3 px-4 font-medium">Equipo Padre</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((eq, i) => (
            <tr
              key={eq.id}
              onClick={() => clickHandler(eq.id)}
              className={`transition hover:bg-blue-50 cursor-pointer ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="py-3 px-4 border-b border-gray-100">{eq.name}</td>
              <td className="py-3 px-4 border-b border-gray-100">{eq.serial_number}</td>
              <td className="py-3 px-4 border-b border-gray-100">{eq.part_number}</td>
              <td className="py-3 px-4 border-b border-gray-100">
            {eq.parent?.[0] ? eq.parent[0].name + "[" + eq.parent[0].serial_number + "]" : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
  const pageSize = 20;
  const { data, count, loading, error } = useEquipments(search, page, pageSize);
  const router = useRouter();

  React.useEffect(() => {
    setPage(0); // Reset to first page on search
  }, [search]);

  return (
    <div className="p-4 w-full">
      <EquipmentSearch value={search} onChange={setSearch} />
      {loading && <div className="text-gray-400 mb-4">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error + "/ Verifique su conectividad a la red"}</div>}
      <EquipmentGrid equipments={data} loading={loading} onClick={(id:string) => {router.push(`asset/${id}`)}} />
      <Pagination page={page} total={count} pageSize={pageSize} onPage={setPage} />
    </div>
  );
}
