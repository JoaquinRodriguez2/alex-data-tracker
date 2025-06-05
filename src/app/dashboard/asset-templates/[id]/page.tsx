"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// SUPABASE CLIENT
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// --- HOOKS Y SERVICIOS ---

// Obtener detalles de la plantilla
async function getAssetTemplateById(id: string) {
  const { data, error } = await supabase
    .from("equipment_templates")
    .select("*")
    .eq("id", id)
    .single();
  if (error){
    console.log("Error fetching asset template:", error);
    throw error
  };
  return data;
}

// Obtener hijos directos de la plantilla
async function getChildrenTemplates(id: string) {
  const { data, error } = await supabase
    .from("equipment_template_relations")
    .select("child_id, equipment_templates:child_id(id, name, description)")
    .eq("parent_id", id);
  if (error) {
    console.log("Error fetching child templates:", error);
    throw error
  };
  return data?.map((row: any) => row.equipment_templates) || [];
}

// Obtener padres directos de la plantilla
async function getParentTemplates(id: string) {
  const { data, error } = await supabase
    .from("equipment_template_relations")
    .select("parent_id, equipment_templates:parent_id(id, name, description)")
    .eq("child_id", id);
  if (error) {
    console.log("Error fetching parent templates:", error);
    throw error
  };
  return data?.map((row: any) => row.equipment_templates) || [];
}

// Obtener todas las plantillas activas (para añadir como padre)
async function getAllTemplates() {
  const { data, error } = await supabase
    .from("equipment_templates")
    .select("id, name, description")
    .eq("isActive", true);
  if (error) throw error;
  return data || [];
}

// Añadir padre
async function addParent(childId: string, parentId: string) {
  const { error } = await supabase
    .from("equipment_template_relations")
    .insert([{ parent_id: parentId, child_id: childId }]);
  if (error) {
    console.log("Error adding parent:", error);
    throw error};
}

// Quitar padre
async function removeParent(childId: string, parentId: string) {
  const { error } = await supabase
    .from("equipment_template_relations")
    .delete()
    .eq("parent_id", parentId)
    .eq("child_id", childId);
  if (error)  {
    console.log("Error removing parent:", error);
    throw error};
}

// Tarjeta de detalles
function DetailsCard({ assetTemplate, isEditing, setIsEditing, form, setForm, handleChange }) {
  return (
    <div className="bg-white rounded shadow p-8 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Asset Template Details</h1>
        {!isEditing ? (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        )}
      </div>
      <form className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <p className="px-2 py-1">{assetTemplate?.name}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Description:</label>
          {isEditing ? (
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={5}
            />
          ) : (
            <p className="px-2 py-1">{assetTemplate?.description}</p>
          )}
        </div>
      </form>
    </div>
  );
}

// Tarjeta de hijos (treeview simple)
function ChildrenCard({ childrenTemplates, onAdd, onRemove, allTemplates, loading, isEditing }) {
  const [selected, setSelected] = useState("");
  // Excluir los hijos actuales y el propio nodo de la lista de posibles hijos
  const available = allTemplates.filter(
    (t) => !childrenTemplates.some((c) => c.id === t.id)
  );

  return (
    <div className="bg-white rounded shadow p-8 mb-6">
      <h2 className="text-xl font-bold mb-4">Children Templates</h2>
      {/* Selector y botón arriba */}
      <div className="flex space-x-2 mb-4">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border rounded px-2 py-1"
          disabled={!isEditing}
        >
          <option value="">Select template to add as child</option>
          {available.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          disabled={!selected || !isEditing}
          onClick={() => {
            onAdd(selected);
            setSelected("");
          }}
        >
          Add Child
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mb-4">
          {childrenTemplates.length === 0 && <li>No children.</li>}
          {childrenTemplates.map((child) => (
            <li key={child.id} className="flex justify-between items-center border-b py-2">
              <div>
                <div className="font-semibold">{child.name}</div>
                <div className="text-sm text-gray-500">{child.description}</div>
              </div>
              <button
                className="text-red-600 text-xs"
                onClick={() => onRemove(child.id)}
                disabled={!isEditing}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Tarjeta de padres
function ParentsCard({ parentTemplates, loading }) {
  return (
    <div className="bg-white rounded shadow p-8 mb-6">
      <h2 className="text-xl font-bold mb-4">Parent Templates</h2>
      {loading ? (
        <p>Loading...</p>
      ) : parentTemplates.length === 0 ? (
        <p>No parents.</p>
      ) : (
        <ul>
          {parentTemplates.map((parent) => (
            <li key={parent.id} className="border-b py-2">
              <div className="font-semibold">{parent.name}</div>
              <div className="text-sm text-gray-500">{parent.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// --- PÁGINA PRINCIPAL ---

export default function AssetTemplateDetailsPage() {
  const { id } = useParams();
  const templateId = String(id);

  // Estados
  const [assetTemplate, setAssetTemplate] = useState<any>(null);
  const [childrenTemplates, setChildrenTemplates] = useState<any[]>([]);
  const [parentTemplates, setParentTemplates] = useState<any[]>([]);
  const [allTemplates, setAllTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingChildren, setLoadingChildren] = useState(true);
  const [loadingParents, setLoadingParents] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  // Cargar datos iniciales
  useEffect(() => {
    setLoading(true);
    getAssetTemplateById(templateId)
      .then((data) => {
        setAssetTemplate(data);
        setForm({ name: data?.name || "", description: data?.description || "" });
      })
      .finally(() => setLoading(false));
  }, [templateId]);

  useEffect(() => {
    setLoadingChildren(true);
    getChildrenTemplates(templateId)
      .then(setChildrenTemplates)
      .finally(() => setLoadingChildren(false));
  }, [templateId]);

  useEffect(() => {
    setLoadingParents(true);
    getParentTemplates(templateId)
      .then(setParentTemplates)
      .finally(() => setLoadingParents(false));
  }, [templateId]);

  useEffect(() => {
    getAllTemplates().then(setAllTemplates);
  }, []);

  // Handlers para editar hijos/padres
  const handleAddChild = async (childId: string) => {
    await addParent(childId, templateId); // childId es el hijo, templateId es el padre
    getChildrenTemplates(templateId).then(setChildrenTemplates);
  };

  const handleRemoveChild = async (childId: string) => {
    await removeParent(childId, templateId);
    getChildrenTemplates(templateId).then(setChildrenTemplates);
  };

  // (Opcional) Puedes agregar aquí handlers para editar padres si lo necesitas

  // Handlers para editar detalles
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="w-full max-w-4xl mx-auto pt-8">
        {/* Tarjeta 1: Detalles */}
        <DetailsCard
          assetTemplate={assetTemplate}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
        {/* Tarjeta 2: Hijos */}
        <ChildrenCard
          childrenTemplates={childrenTemplates}
          onAdd={handleAddChild}
          onRemove={handleRemoveChild}
          allTemplates={allTemplates.filter((t) => t.id !== templateId)}
          loading={loadingChildren}
          isEditing={isEditing}
        />
        {/* Tarjeta 3: Padres */}
        <ParentsCard parentTemplates={parentTemplates} loading={loadingParents} />
      </div>
    </div>
  );
}