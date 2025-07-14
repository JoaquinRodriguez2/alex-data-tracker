import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Pencil, Trash } from "lucide-react";
import { useEquipments } from "../hooks/useEquipments";

export interface DrillingOperationFormProps {
  data?: any;
  onSubmit: (values: any) => Promise<void>;
  isLoading?: boolean;
  editing?: boolean;
  setEditing?: (editing: boolean) => void;
}

export const DrillingOperationForm: React.FC<DrillingOperationFormProps> = ({
  data = {},
  onSubmit,
  isLoading,
  editing = false,
  setEditing = () => {},
}) => {
  const form = useForm({
    defaultValues: normalizeData(data),
    values: normalizeData(data),
  });

  const { equipments, addEquipment, deleteEquipment } = useEquipments(data.id);

  React.useEffect(() => {
    form.reset(normalizeData(data));
  }, [data]);

  async function handleSave(values: any) {
    try {
      await onSubmit(values);
      toast.success("Saved successfully!");
    } catch (err: any) {
      toast.error("Error saving: " + (err?.message || "Unknown error"));
    }
  }

  function handleCancel() {
    form.reset({ ...data });
    setEditing(false);
  }

  function handleEdit() {
    setEditing(true);
  }

  const handleAddEquipment = async (equipmentData: any) => {
    await addEquipment(equipmentData);
  };

  const handleDeleteEquipment = async (equipmentId: string) => {
    await deleteEquipment(equipmentId);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSave)}
        className="space-y-6 p-6 bg-white rounded shadow-md"
      >
        <div className="flex justify-end pb-4 gap-2">
          {!editing ? (
            <Button type="button" onClick={() => handleEdit()}>
              <Pencil className="size-4 mr-2" strokeWidth="2" />
              Edit
            </Button>
          ) : (
            <>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          )}
        </div>
        <h2 className="text-xl font-bold mb-2">General Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="job_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Status</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Other form fields... */}
        </div>
        <Separator />
        <h2 className="text-xl font-bold mb-2">Equipments</h2>
        <div>
          <EquipmentsTable
            equipments={equipments}
            onDelete={handleDeleteEquipment}
          />
          <AddEquipmentForm onAdd={handleAddEquipment} />
        </div>
      </form>
    </Form>
  );
};

function normalizeData(data: any) {
  const safeData = data ?? {};
  return {
    job_status: safeData.job_status ?? "",
    // Other fields...
  };
}