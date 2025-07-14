import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createEquipment } from "../calls/equipmentsApi";

interface AddEquipmentFormProps {
  operationId: string;
  onEquipmentAdded: () => void;
}

const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({ operationId, onEquipmentAdded }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await createEquipment({ ...data, operation_id: operationId });
      toast.success("Equipment added successfully!");
      reset();
      onEquipmentAdded();
    } catch (error: any) {
      toast.error("Error adding equipment: " + (error?.message || "Unknown error"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Add Equipment</h2>
      <Input {...register("name")} placeholder="Equipment Name" required />
      <Input {...register("type")} placeholder="Equipment Type" required />
      <Button type="submit">Add Equipment</Button>
    </form>
  );
};

export default AddEquipmentForm;