import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type Template = {
  id: string;
  name: string;
  part_number: string;
  description: string;
};

interface SubComponentSearchPopupProps {
  open: boolean;
  onClose: () => void;
  templates: Template[];
  onAddChildren: (ids: string[]) => void;
}

export default function SubComponentSearchPopup({
  open,
  onClose,
  templates,
  onAddChildren,
}: SubComponentSearchPopupProps) {
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = templates.filter(
    (t: Template) =>
      t.part_number?.toLowerCase().includes(search.toLowerCase()) ||
      t.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    onAddChildren(selected);
    setSelected([]);
    setSearch("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Buscar Subcomponentes</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Buscar por P/N o nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />
        <div className="max-h-64 overflow-y-auto mb-4 border rounded">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground px-2 py-4 text-center">
              No se encontraron resultados.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead />
                  <TableHead>Nombre</TableHead>
                  <TableHead>P/N</TableHead>
                  <TableHead>Descripción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t: Template) => (
                  <TableRow key={t.id} className="hover:bg-accent">
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(t.id)}
                        onCheckedChange={() => handleSelect(t.id)}
                        aria-label={`Seleccionar ${t.name}`}
                      />
                    </TableCell>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.part_number}</TableCell>
                    <TableCell>{t.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </DialogClose>
          <Button onClick={handleAdd} disabled={selected.length === 0}>
            Agregar seleccionados
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
