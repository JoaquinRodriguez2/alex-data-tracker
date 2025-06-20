"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (adjust with your env variables or config)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Equipment {
    id: string;
    name: string;
    serial_number: string;
    part_number: string | null;
    equipment_template_id: string;
    parent_id: string | null;
}

interface PageProps {
    params: Promise<{ id: string }>;

}

const AssetPage: React.FC<PageProps> = ({ params }) => {
    const { id } = React.use(params);

    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [editFormData, setEditFormData] = useState<Equipment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const { data, error } = await supabase
                    .from("equipments")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) throw error;
                setEquipment(data);
            } catch (err: any) {
                setError(err.message || "Failed to fetch equipment");
            } finally {
                setLoading(false);
            }
        };
        fetchEquipment();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editFormData) return;
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editFormData) return;
        setSaving(true);
        setError(null);
        try {
            const { error } = await supabase
                .from("equipments")
                .update({
                    name: editFormData.name,
                    serial_number: editFormData.serial_number,
                    part_number: editFormData.part_number,
                    equipment_template_id: editFormData.equipment_template_id,
                    parent_id: editFormData.parent_id || null,
                })
                .eq("id", editFormData.id);

            if (error) throw error;
            setEquipment(editFormData); // Update with new data
            setEditMode(false);
            setEditFormData(null);
        } catch (err: any) {
            setError(err.message || "Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = () => {
        if (equipment) {
            setEditMode(true);

        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditFormData(null); // Discard changes
    };

    if (loading) return <div className="w-full flex justify-center py-10">Loading...</div>;
    if (error) return <div className="w-full flex justify-center py-10 text-red-500">{error}</div>;
    if (!equipment) return <div className="w-full flex justify-center py-10">No equipment found.</div>;

    // Use editFormData in edit mode, otherwise use equipment
    const formData = editMode ? editFormData : equipment;

    return (
        <div className="max-w-4xl mx-auto w-full p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Equipment Details</h1>
            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
                onSubmit={handleSave}
            >
                <div>
                    <label className="block text-sm font-medium mb-1">ID</label>
                    <input
                        className="w-full border rounded px-3 py-2 bg-gray-100"
                        value={formData?.id || ""}
                        name="id"
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={formData?.name || ""}
                        name="name"
                        onChange={editMode ? handleChange : undefined}
                        readOnly={!editMode}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Serial Number</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={formData?.serial_number || ""}
                        name="serial_number"
                        onChange={editMode ? handleChange : undefined}
                        readOnly={!editMode}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Part Number</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={formData?.part_number || ""}
                        name="part_number"
                        onChange={editMode ? handleChange : undefined}
                        readOnly={!editMode}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Equipment Template ID</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={formData?.equipment_template_id || ""}
                        name="equipment_template_id"
                        onChange={editMode ? handleChange : undefined}
                        readOnly={!editMode}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Parent ID</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={formData?.parent_id || ""}
                        name="parent_id"
                        onChange={editMode ? handleChange : undefined}
                        readOnly={!editMode}
                    />
                </div>
                <div className="col-span-2 flex gap-4 mt-6">
                    {!editMode ? (
                        <button
                            type="button"
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                    ) : (
                        <>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                            <button
                                type="button"
                                className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AssetPage;
