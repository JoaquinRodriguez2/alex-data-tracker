"use client";
import supabase from "@/utils/SupabaseConfig";
import { DataTable } from "@/components/ui/data-table";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SubComponentSearchPopup from "./ui/SubComponentSearchPopup";

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
    .select("child_id, equipment_templates:child_id(id, name, description,part_number)")
    .eq("parent_id", id);
  if (error) {
    console.log("Error fetching child templates:", error);
    throw error
  };
  console.log("Structure:", data);
  return data?.map((row: any) => row.equipment_templates) || [];
}

// Obtener padres directos de la plantilla
async function getParentTemplates(id: string) {
  const { data, error } = await supabase
    .from("equipment_template_relations")
    .select("parent_id, equipment_templates:parent_id(id, name, description,part_number)")
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
    .eq("is_active", true);
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

// Actualizar detalles de la plantilla
async function updateAssetTemplate(
  id: string,
  updates: { name: string; description: string; part_number: string; is_active: boolean }
) {
  const { error } = await supabase
    .from("equipment_templates")
    .update(updates)
    .eq("id", id);
  if (error) {
    console.log("Error updating asset template:", error);
    throw error;
  }
}

// Tarjeta de detalles
function DetailsCard({ assetTemplate, isEditing, setIsEditing, form, setForm, handleChange, handleSave, handleCancel }) {
  return (
    <div className="bg-white rounded shadow p-8 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Asset Structure Details</h1>
        {!isEditing ? (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
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
          <label className="block font-semibold mb-1">P/N:</label>
          {isEditing ? (
            <input
              type="text"
              name="part_number"
              value={form.part_number}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          ) : (
            <p className="px-2 py-1">{assetTemplate?.part_number}</p>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Activo:</label>
          {isEditing ? (
            <select
              name="is_active"
              value={form.is_active ? "true" : "false"}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          ) : (
            <p className="px-2 py-1">{assetTemplate?.is_active ? "Sí" : "No"}</p>
          )}
        </div>
      </form>
    </div>
  );
}

// Tarjeta de hijos (treeview simple)
function ChildrenCard({ childrenTemplates, onAdd, onRemove, allTemplates, loading, isEditing }) {
  const [selected, setSelected] = useState("");
  const router = useRouter();
  // Excluir los hijos actuales y el propio nodo de la lista de posibles hijos
  const available = allTemplates.filter(
    (t) => !childrenTemplates.some((c) => c.id === t.id)
  );

  return (
    <div className="bg-white rounded shadow p-8 mb-6">
      <h2 className="text-xl font-bold mb-4">Sub Components</h2>
      {/* Selector y botón arriba */}
      <div className="flex flex-col sm:flex-row sm:space-x-2 mb-4 gap-2">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
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
          className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
          disabled={!selected || !isEditing}
          onClick={() => {
            onAdd(selected);
            setSelected("");
          }}
        >
          Add Component
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          columns={[
            { accessorKey: "name", header: "Nombre" },
            { accessorKey: "part_number", header: "P/N" },
            { accessorKey: "description", header: "Descripción" },
            {
              id: "actions",
              header: "Acciones",
              cell: ({ row }) => (
                <button
                  className="text-red-600 text-xs"
                  onClick={e => {
                    e.stopPropagation();
                    onRemove(row.original.id);
                  }}
                  disabled={!isEditing}
                >
                  Remove
                </button>
              ),
            },
          ]}
          data={childrenTemplates}
          rowClassName="cursor-pointer hover:bg-blue-50"
          onRowClick={row => router.push(`/dashboard/asset-templates/${row.id}`)}
        />
      )}
    </div>
  );
}

// Tarjeta de padres
function ParentsCard({ parentTemplates, loading }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded shadow p-8 mb-6">
      <h2 className="text-xl font-bold mb-4">Is a Component Of</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable
          columns={[
            { accessorKey: "name", header: "Nombre" },
            { accessorKey: "part_number", header: "P/N" },
            { accessorKey: "description", header: "Descripción" },
          ]}
          data={parentTemplates}
          rowClassName="cursor-pointer hover:bg-blue-50"
          onRowClick={row => router.push(`/dashboard/asset-templates/${row.id}`)}
        />
      )}
    </div>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function AssetTemplatePage() {
  
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
  const [form, setForm] = useState({ name: "", description: "", part_number: "", is_active: true });
  // Popup de búsqueda
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    setLoading(true);
    getAssetTemplateById(templateId)
      .then((data) => {
        setAssetTemplate(data);
        setForm({
          name: data?.name || "",
          description: data?.description || "",
          part_number: data?.part_number || "",
          is_active: data?.is_active ?? true
        });
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

  // Nuevo: agregar varios hijos desde el popup
  const handleAddChildren = async (childIds: string[]) => {
    for (const childId of childIds) {
      await addParent(childId, templateId);
    }
    getChildrenTemplates(templateId).then(setChildrenTemplates);
  };

  const handleRemoveChild = async (childId: string) => {
    await removeParent(childId, templateId);
    getChildrenTemplates(templateId).then(setChildrenTemplates);
  };

  // (Opcional) Puedes agregar aquí handlers para editar padres si lo necesitas

  // Handlers para editar detalles
  const handleChange = (e: any) => {
    if (e.target.name === "is_active") {
      setForm({ ...form, is_active: e.target.value === "true" });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    try {
      await updateAssetTemplate(templateId, form);
      setIsEditing(false);
      // Refrescar datos
      getAssetTemplateById(templateId).then((data) => {
        setAssetTemplate(data);
        setForm({
          name: data?.name || "",
          description: data?.description || "",
          part_number: data?.part_number || "",
          is_active: data?.is_active ?? true
        });
      });
    } catch (error) {
      alert("Error saving changes");
    }
  };

  const handleCancel = () => {
    setForm({
      name: assetTemplate?.name || "",
      description: assetTemplate?.description || "",
      part_number: assetTemplate?.part_number || "",
      is_active: assetTemplate?.is_active ?? true
    });
    setIsEditing(false);
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
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
        {/* Botón para abrir el buscador de subcomponentes */}
        <div className="mb-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setSearchPopupOpen(true)}
            disabled={!isEditing}
          >
            Buscar y agregar Sub Componentes
          </button>
        </div>
        {/* Tarjeta 2: Hijos */}
        <ChildrenCard
          childrenTemplates={childrenTemplates}
          onAdd={handleAddChild}
          onRemove={handleRemoveChild}
          allTemplates={allTemplates.filter((t) => t.id !== templateId)}
          loading={loadingChildren}
          isEditing={isEditing}
        />
        {/* Popup de búsqueda de subcomponentes */}
        <SubComponentSearchPopup
          open={searchPopupOpen}
          onClose={() => setSearchPopupOpen(false)}
          templates={allTemplates.filter((t) => t.id !== templateId && !childrenTemplates.some((c) => c.id === t.id))}
          onAddChildren={handleAddChildren}
        />
        {/* Tarjeta 3: Padres */}
        <ParentsCard parentTemplates={parentTemplates} loading={loadingParents} />
      </div>
    </div>
  );
}