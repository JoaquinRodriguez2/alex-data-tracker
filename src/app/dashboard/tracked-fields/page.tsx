"use client";
import supabase from "@/utils/SupabaseConfig";
import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";

type TrackedFieldTemplate = {
  id: string;
  name: string;
  description: string | null;
  value_type: "date" | "boolean" | "double";
};

const PAGE_SIZE = 5;

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<TrackedFieldTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filter, setFilter] = useState<"date" | "boolean" | "double" | "">("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }: { row: { original: TrackedFieldTemplate } }) => (
          <span>{row.original.name}</span>
        ),
      },
      {
        accessorKey: "description",
        header: "Descripción",
        cell: ({ row }: { row: { original: TrackedFieldTemplate } }) => row.original.description || <span className='italic text-gray-300'>N/A</span>,
      },
      {
        accessorKey: "value_type",
        header: "Tipo",
        cell: ({ row }: { row: { original: TrackedFieldTemplate } }) => (
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
              ${row.original.value_type === "date" ? "bg-blue-100 text-blue-700" : ""}
              ${row.original.value_type === "boolean" ? "bg-green-100 text-green-700" : ""}
              ${row.original.value_type === "double" ? "bg-purple-100 text-purple-700" : ""}
            `}
          >
            {row.original.value_type === "date"
              ? "Fecha"
              : row.original.value_type === "boolean"
              ? "Verdadero/Falso"
              : row.original.value_type === "double"
              ? "Numero"
              : ""}
          </span>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Get total count
      const { count } = await supabase
        .from("tracked_field_templates")
        .select("*", { count: "exact", head: true })
        .eq("is_invisible", false);

      setTotal(count || 0);

      // Get paginated data
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from("tracked_field_templates")
        .select("id, name, description, value_type")
        .eq("is_invisible", false)
        .range(from, to)
        .order("name", { ascending: true });

      if (!error && data) setData(data as TrackedFieldTemplate[]);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  // Debounce search input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page on new search
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Build base filter
      let baseFilter = supabase
        .from("tracked_field_templates")
        .select("*", { count: "exact" })
        .eq("is_invisible", false);

      // Apply search
      if (debouncedSearch.trim()) {
        baseFilter = baseFilter.or(
          `name.ilike.%${debouncedSearch.trim()}%,description.ilike.%${debouncedSearch.trim()}%`
        );
      }

      // Apply filter
      if (filter) {
        baseFilter = baseFilter.eq("value_type", filter);
      }

      // Get total count with applied search and filter conditions
      let countQuery = supabase
        .from("tracked_field_templates")
        .select("*", { count: "exact", head: true })
        .eq("is_invisible", false);

      if (debouncedSearch.trim()) {
        countQuery = countQuery.or(`name.ilike.%${debouncedSearch.trim()}%,description.ilike.%${debouncedSearch.trim()}%`);
      }

      if (filter) {
        countQuery = countQuery.eq("value_type", filter);
      }

      const { count, error: countError } = await countQuery;

      setTotal(count || 0);

      // Get paginated data
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let dataQuery = supabase
        .from("tracked_field_templates")
        .select("id, name, description, value_type")
        .eq("is_invisible", false);

      if (debouncedSearch.trim()) {
        dataQuery = dataQuery.or(
          `name.ilike.%${debouncedSearch.trim()}%,description.ilike.%${debouncedSearch.trim()}%`
        );
      }
      if (filter) {
        dataQuery = dataQuery.eq("value_type", filter);
      }

      const { data, error } = await dataQuery
        .order("name", { ascending: true })
        .range(from, to);

      if (!error && data) setData(data as TrackedFieldTemplate[]);
      setLoading(false);
    };

    fetchData();
  }, [page, debouncedSearch, filter]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tracked Field Templates</h1>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <input
          type="text"
          placeholder="Buscar por nombre o descripción..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-80 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={() => router.push('/dashboard/tracked-fields/new')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition-all"
        >
          Crear
        </button>
      </div>
      <div className="mb-4 flex flex-row space-x-2">
        <button
          onClick={() => setFilter(filter === "date" ? "" : "date")}
          className={`px-4 py-2 rounded-lg font-semibold border transition-all ${
            filter === "date"
              ? "bg-blue-600 text-white border-blue-700"
              : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
          }`}
        >
          Date
        </button>
        <button
          onClick={() => setFilter(filter === "boolean" ? "" : "boolean")}
          className={`px-4 py-2 rounded-lg font-semibold border transition-all ${
            filter === "boolean"
              ? "bg-green-600 text-white border-green-700"
              : "bg-white text-green-700 border-green-300 hover:bg-green-50"
          }`}
        >
          Boolean
        </button>
        <button
          onClick={() => setFilter(filter === "double" ? "" : "double")}
          className={`px-4 py-2 rounded-lg font-semibold border transition-all ${
            filter === "double"
              ? "bg-purple-600 text-white border-purple-700"
              : "bg-white text-purple-700 border-purple-300 hover:bg-purple-50"
          }`}
        >
          Double
        </button>
      </div>
      {loading ? (
        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="min-w-full text-sm text-left font-normal">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 font-medium">Nombre</th>
                <th className="py-3 px-4 font-medium">Descripción</th>
                <th className="py-3 px-4 font-medium">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index} className="bg-white animate-pulse">
                  <td className="py-3 px-4 border-b border-gray-100">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          onRowClick={(row: TrackedFieldTemplate) => router.push(`/dashboard/tracked-fields/${row.id}`)}
          rowClassName="cursor-pointer hover:bg-blue-50"
        />
      )}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}