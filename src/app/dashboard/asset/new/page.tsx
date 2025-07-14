"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createEquipmentRelations } from "./calls/createAssetChildren";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Equipment {
  name: string;
  serial_number: string;
  part_number: string | null;
  equipment_template_id: string;
  main_equipment: boolean; // Nuevo campo
}

interface EquipmentTemplate {
  id: string;
  name: string;
  description: string;
  part_number: string;
}

const EquipmentTemplateSelector: React.FC<{
  open: boolean;
  onClose: () => void;
  onSelect: (template: EquipmentTemplate) => void;
}> = ({ open, onClose, onSelect }) => {
  const [templates, setTemplates] = useState<EquipmentTemplate[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!open) return;
    const fetchTemplates = async () => {
      let query = supabase
        .from("equipment_templates")
        .select("*", { count: "exact" })
        .order("name", { ascending: true })
        .range((page - 1) * 10, page * 10 - 1);

      if (search) {
        query = query.or(
          `name.ilike.%${search}%,part_number.ilike.%${search}%`
        );
      }

      const { data, count } = await query;
      setTemplates(data || []);
      setTotal(count || 0);
    };
    fetchTemplates();
  }, [open, search, page]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Seleccionar Template</h2>
        <input
          className="border px-3 py-2 rounded w-full mb-4"
          placeholder="Buscar por nombre o part number..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <table className="w-full border mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Descripción</th>
              <th className="p-2 text-left">Part Number</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {templates.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.name}</td>
                <td className="p-2">{t.description}</td>
                <td className="p-2">{t.part_number}</td>
                <td className="p-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => {
                      onSelect(t);
                      onClose();
                    }}
                  >
                    Seleccionar
                  </button>
                </td>
              </tr>
            ))}
            {templates.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No hay resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center">
          <button
            className="px-3 py-1 rounded bg-gray-200"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Anterior
          </button>
          <span>
            Página {page} de {Math.ceil(total / 10) || 1}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-200"
            disabled={page * 10 >= total}
            onClick={() => setPage((p) => p + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

const CreateEquipmentPage: React.FC = () => {
  const [formData, setFormData] = useState<Equipment>({
    name: "",
    serial_number: "",
    part_number: "",
    equipment_template_id: "",
    main_equipment: false, // Inicializa como false
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EquipmentTemplate | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      // 1. Crear el equipo y obtener el ID
      const { data: inserted, error } = await supabase
        .from("equipments")
        .insert({
          name: formData.name,
          serial_number: formData.serial_number,
          part_number: formData.part_number || null,
          equipment_template_id: formData.equipment_template_id,
          main_equipment: formData.main_equipment,
        })
        .select()
        .single();

      if (error) throw error;
      const inserted_id = inserted.id;
      const templateID = inserted.equipment_template_id;
      createEquipmentRelations(inserted_id, templateID);
      router.push(`../asset/${inserted_id}`);
    } catch (err: any) {
      setError(err.message || "Failed to create equipment");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Crear Nuevo Equipo</h1>
        <div className="flex gap-4">
          <button
            type="submit"
            form="create-equipment-form"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={saving}
          >
            {saving ? "Creando..." : "Crear"}
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => router.push("../asset")}
            disabled={saving}
          >
            Cancelar
          </button>
        </div>
      </div>
      <form
        id="create-equipment-form"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        onSubmit={handleSave}
      >
        {/* ID solo lectura, vacío */}
        <div>
          <label className="block text-sm font-medium mb-1">ID</label>
          <input
            className="w-full border rounded px-3 py-2 bg-gray-100"
            value=""
            name="id"
            readOnly
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={formData.name}
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Serial Number</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={formData.serial_number}
            name="serial_number"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Part Number</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={formData.part_number || ""}
            name="part_number"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Equipment Template</label>
          <div className="flex gap-2">
            <input
              className="w-full border rounded px-3 py-2 bg-gray-100"
              value={selectedTemplate ? `${selectedTemplate.name} (${selectedTemplate.part_number})` : ""}
              name="equipment_template_id"
              readOnly
              required
            />
            <button
              type="button"
              className="bg-blue-600 text-white px-3 py-2 rounded"
              onClick={() => setShowTemplateSelector(true)}
            >
              Seleccionar
            </button>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <label className="block text-sm font-medium mb-1 mr-2">¿Is this main equipment?</label>
            <input
              type="checkbox"
              className="mr-2"
              checked={formData.main_equipment}
              name="main_equipment"
              onChange={handleChange}
            />
          </div>
        </div>
        {error && <div className="col-span-2 text-red-500 mt-2">{error}</div>}
      </form>
      <EquipmentTemplateSelector
        open={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelect={(template) => {
          setSelectedTemplate(template);
          setFormData((fd) => ({
            ...fd,
            equipment_template_id: template.id,
            part_number: template.part_number, // <-- Agrega esto para copiar el P/N
          }));
        }}
      />
    </div>
  );
};

export default CreateEquipmentPage;
