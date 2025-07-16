import supabase from "@/utils/SupabaseConfig"
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, ChevronRight } from "lucide-react";

// Recursive tree node component
function TreeNode({ node }: { node: any }) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="pl-4 border-l border-gray-200">
      <div
        className="flex items-center gap-2 cursor-pointer py-1"
        onClick={() => hasChildren && setOpen((o) => !o)}
      >
        {hasChildren ? (
          open ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        ) : (
          <span className="w-4" />
        )}
        <span className="font-mono text-xs text-gray-700">
          <b>{node.name}</b>
        </span>
        <span className="text-xs text-gray-500">
          SN: {node.serial_number || "—"}
        </span>
        <span className="text-xs text-gray-400">
          PN: {node.part_number || "—"}
        </span>
        {node.main_equipment && (
          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
            Main
          </span>
        )}
      </div>
      {open && hasChildren && (
        <div>
          {node.children.map((child: any) => (
            <TreeNode key={child.id + child.serial_number} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

// Main popup tree dialog
export function EquipmentTreeDialog({
  open,
  onOpenChange,
  equipmentId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  equipmentId: string;
}) {
  const [tree, setTree] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!open) return;
    setLoading(true);
    supabase
      .rpc("get_equipment_children", { equipment_id: equipmentId })
      .then(({ data, error }) => {
        setTree(data);
        setLoading(false);
      });
  }, [open, equipmentId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Árbol de Equipos</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="text-center text-gray-400 py-8">Cargando...</div>
        ) : tree ? (
          <div className="max-h-[60vh] overflow-auto">
            <TreeNode node={tree} />
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">Sin datos</div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export async function fetchEquipmentChildren(equipment_id: unknown) {

const { data, error } = await supabase
  .rpc('get_equipment_children', {
    equipment_id: equipment_id,
  })
  if (error) {
    console.error(error)
    return
  } else {
    console.log(data)
    return data
  }
}

