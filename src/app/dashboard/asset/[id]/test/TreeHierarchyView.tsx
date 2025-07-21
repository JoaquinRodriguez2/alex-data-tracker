import supabase from "@/utils/SupabaseConfig"
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, ChevronRight } from "lucide-react";

// Recursive tree node component
function TreeNode({ node }: { node: any }) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="pl-8 border-l-2 border-gray-300">
      <div
        className="flex items-center gap-4 cursor-pointer py-3 text-lg sm:text-base md:text-lg lg:text-xl"
        onClick={() => hasChildren && setOpen((o) => !o)}
      >
        {hasChildren ? (
          open ? <ChevronDown size={28} /> : <ChevronRight size={28} />
        ) : (
          <span className="w-7" />
        )}
        <span className="font-mono text-lg sm:text-base md:text-lg lg:text-xl text-gray-700">
          <b>{node.name}</b>
        </span>
        <span className="text-lg sm:text-base md:text-lg lg:text-xl text-gray-500">
          SN: {node.serial_number || "—"}
        </span>
        <span className="text-lg sm:text-base md:text-lg lg:text-xl text-gray-400">
          PN: {node.part_number || "—"}
        </span>
        {node.main_equipment && (
          <span className="ml-4 px-3 py-1 bg-green-100 text-green-700 rounded text-lg sm:text-xs md:text-sm lg:text-base">
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
        console.log(data)
        setLoading(false);
      });
  }, [open, equipmentId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-[98vw] md:max-w-4xl lg:max-w-6xl min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] p-0 md:p-0 lg:p-0"
        style={{ maxWidth: '98vw', width: '100%', minWidth: 0, overflow: 'visible', background: 'none', boxShadow: 'none' }}
      >
        <div className="p-6 md:p-8 lg:p-10 animate-dialog-height-width bg-white rounded-lg shadow-xl w-full h-full">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl lg:text-4xl">Structure</DialogTitle>
          </DialogHeader>
          {loading ? (
            <div className="text-center text-gray-400 py-16 text-xl md:text-2xl">Cargando...</div>
          ) : tree ? (
            <div className="max-h-[60vh] md:max-h-[70vh] lg:max-h-[75vh] overflow-auto p-2 md:p-4 lg:p-6">
              <TreeNode node={tree} />
            </div>
          ) : (
            <div className="text-center text-gray-400 py-16 text-xl md:text-2xl">Sin datos</div>
          )}
        </div>
      </DialogContent>
      <style jsx global>{`
        @keyframes dialog-height-width {
          0% {
            opacity: 0;
            height: 0;
            width: 0;
          }
          50% {
            opacity: 1;
            height: 100%;
            width: 0;
          }
          100% {
            opacity: 1;
            height: 100%;
            width: 100%;
          }
        }
        .animate-dialog-height-width {
          animation: dialog-height-width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
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

