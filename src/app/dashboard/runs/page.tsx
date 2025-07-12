"use client"
import { DataTable } from "@/components/ui/data-table";
import { useGetRunsData } from "./components/hooks/useGetRunsData";
import type { Run } from "./components/calls/getRunsData";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

const columns: ColumnDef<Run>[] = [
	{
		accessorKey: "id",
		header: "ID",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "rig",
		header: "Rig",
		cell: (info) => info.getValue(),
	}
];

export default function Page() {
	const { runs, loading, error } = useGetRunsData();
	const router = useRouter();

	const handleRowClick = (row: Run) => {
		router.push(`/dashboard/runs/${row.id}`);
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">RUNS</h1>
			{error && <p className="text-red-500 mb-2">Error: {error}</p>}
			{loading ? (
				<p className="text-gray-600">Cargando...</p>
			) : (
				<DataTable
					columns={columns}
					data={runs}
					onRowClick={handleRowClick}
				/>
			)}
		</div>
	);
}