"use client";
import supabase from "@/utils/SupabaseConfig";
import React, { useEffect, useState,useRef } from "react";
import { useRouter } from "next/navigation"; // Import useRouter



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

// ...existing code...
// ...existing code...
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
// ...existing code...

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // ...existing code...
return (
  <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 to-white flex flex-col justify-start py-12 p-4">
    <div className="w-max">
      <h1 className="text-4xl font-extrabold mb-10 text-blue-900 drop-shadow-sm tracking-tight">
        <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Tracked Field Templates
        </span>
      </h1>
      {/* Search bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or description..."
            className="w-full sm:w-80 px-4 py-2 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {/* Filter buttons */}
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => setFilter(filter === "date" ? "" : "date")}
              className={`px-4 py-2 rounded-full font-semibold border transition-all ${
                filter === "date"
                  ? "bg-blue-600 text-white border-blue-700"
                  : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
              }`}
            >
              Date
            </button>
            <button
              onClick={() => setFilter(filter === "boolean" ? "" : "boolean")}
              className={`px-4 py-2 rounded-full font-semibold border transition-all ${
                filter === "boolean"
                  ? "bg-green-600 text-white border-green-700"
                  : "bg-white text-green-700 border-green-300 hover:bg-green-50"
              }`}
            >
              Boolean
            </button>
            <button
              onClick={() => setFilter(filter === "double" ? "" : "double")}
              className={`px-4 py-2 rounded-full font-semibold border transition-all ${
                filter === "double"
                  ? "bg-red-600 text-red border-red-700"
                  : "bg-red text-red-700 border-red-300 hover:bg-purple-50"
              }`}
            >
              Double
            </button>
          </div>
        </div>
        
      {loading && (
        <div className="flex justify-center items-center py-8">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 gap-5 align-middle-center">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => { router.push(`/dashboard/tracked-fields/${item.id}`); }}
            className="bg-white border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-1xl font-bold text-blue-700">{item.name}</span>
              {item.value_type === "date" && (
                <span title="Date">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" />
                    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" />
                  </svg>
                </span>
              )}
              {item.value_type === "boolean" && (
                <span title="Boolean">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" />
                  </svg>
                </span>
              )}
              {item.value_type === "double" && (
                <span title="Number">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" />
                    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">#</text>
                  </svg>
                </span>
              )}
            </div>
                <p className="text-gray-500 text-center mb-4 min-h-[40px] w-full max-w-[220px] mx-auto break-words line-clamp-2">
                {item.description || (
                    <span className="italic text-gray-300">N/A</span>
                )}
                </p>
            <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold
              ${item.value_type === "date" ? "bg-blue-100 text-blue-700" : ""}
              ${item.value_type === "boolean" ? "bg-green-100 text-green-700" : ""}
              ${item.value_type === "double" ? "bg-purple-100 text-purple-700" : ""}
            `}>
            {item.value_type === "date"
                ? "Fecha"
                : item.value_type === "boolean"
                ? "Verdadero/Falso"
                : item.value_type === "double"
                ? "Numero"
                : ""}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-12">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`px-5 py-2 rounded-lg border font-semibold shadow-sm transition-all ${
            page === 1
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50 hover:shadow"
          }`}
        >
          Previous
        </button>
        <span className="text-blue-900 font-semibold tracking-wide">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`px-5 py-2 rounded-lg border font-semibold shadow-sm transition-all ${
            page === totalPages
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50 hover:shadow"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);
}