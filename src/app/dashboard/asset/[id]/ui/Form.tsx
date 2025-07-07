"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Save, Trash2, Hash, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { EquipmentDetails } from "../types";
import Select from "react-select";

type AssetFormProps = {
  isEditable: boolean;
  setIsEditable: (value: boolean) => void;
  equipmentDetails?: EquipmentDetails; // Replace with actual type if available
  listOfTemplates?: { value: string; label: string }[]; // Optional, if you want to pass templates
  isTemplatesListLoading?: boolean; // Optional, if you want to handle loading state for templates
  isTemplatesListError?: boolean; // Optional, if you want to handle error state for templates
};

export default function AssetForm({
  isEditable,
  setIsEditable,
  equipmentDetails,
  listOfTemplates,
  isTemplatesListLoading = false,
  isTemplatesListError = false
}: AssetFormProps) {
  const formSchema = z.object({
    "text-input-0": z
      .string()
      .min(1, { message: "This field is required" })
      .max(50, { message: "Must be at most 50 characters" }),
    "text-input-1": z
      .string()
      .min(1, { message: "This field is required" })
      .max(30, { message: "Must be at most 30 characters" }),
    "text-input-2": z.string().min(1, { message: "This field is required" }),
    "text-input-5": z.string().min(1, { message: "This field is required" }),
    "switch-0": z.boolean().default(false).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-input-0": equipmentDetails?.name || "",
      "text-input-1": equipmentDetails?.serial_number || "",
      "text-input-2": equipmentDetails?.equipment_template_id || "",
      "text-input-5": equipmentDetails?.part_number || "",
      "switch-0": equipmentDetails?.main_equipment || false,
    },
  });

  // Add this useEffect to update form values when equipmentDetails changes
  React.useEffect(() => {
    if (equipmentDetails) {
      form.reset({
        "text-input-0": equipmentDetails.name || "",
        "text-input-1": equipmentDetails.serial_number || "",
        "text-input-2": equipmentDetails.part_number || "",
        "text-input-5": equipmentDetails.equipment_template_id || "",
        "switch-0": equipmentDetails.main_equipment || false,
      });
    }
  }, [equipmentDetails, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsEditable(true);
    } catch (error) {
      console.error("Error saving form:", error);
    }
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  // Opciones de ejemplo para el autocompletado
  const templateOptions = [
    { value: "template-1", label: "Template 1" },
    { value: "template-2", label: "Template 2" },
    { value: "template-3", label: "Template 3" },
    // Puedes agregar muchas más aquí...
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="space-y-8 @container"
      >
        <div className="grid grid-cols-12 gap-4">
          <FormField
            control={form.control}
            name="edit-button-0"
            render={({ field }) => (
              <FormItem
                className={`col-span-4 cursor-pointer col-start-auto flex self-end flex-col gap-2 space-y-0 items-start ${
                  isEditable ? "" : "invisible"
                }`}
              >
                <FormLabel className="hidden shrink-0">Edit</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Button
                      key="edit-button-0"
                      id="edit-button-0"
                      name=""
                      className="w-full cursor-pointer"
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setIsEditable(false);
                      }}
                    >
                      <Pencil className="size-4" strokeWidth="2" />
                      Edit
                    </Button>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="submit-button-0"
            render={({ field }) => (
              <FormItem
                className={`col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start ${
                  !isEditable ? "" : "invisible"
                }`}
              >
                <FormLabel className="hidden shrink-0">Submit</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Button
                      key="submit-button-0"
                      id="submit-button-0"
                      name=""
                      className="w-full cursor-pointer"
                      type="submit"
                      variant="default"
                    >
                      <Save className="size-4" strokeWidth="2" />
                      Save
                    </Button>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reset-button-0"
            render={({ field }) => (
              <FormItem
                className={`col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start ${
                  !isEditable ? "" : "invisible"
                }`}
              >
                <FormLabel className="hidden shrink-0">Reset</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Button
                      key="reset-button-0"
                      id="reset-button-0"
                      name=""
                      className="w-full cursor-pointer"
                      type="reset"
                      variant="outline"
                      onClick={() => {
                        setIsEditable(true);
                      }}
                    >
                      <Trash2 className="size-4" strokeWidth="2" />
                      Cancel
                    </Button>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text-input-0"
            render={({ field }) => (
              <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Name</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-0"
                        placeholder="Add a name"
                        type="text"
                        id="text-input-0"
                        className="ps-9"
                        disabled={isEditable}
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text-input-5"
            render={({ field }) => (
              <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Template ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Select
                      isDisabled={isEditable}
                      options={templateOptions}
                      value={templateOptions.find(
                        (opt) => opt.value === field.value
                      )}
                      onChange={(option) => field.onChange(option ? option.value : "")}
                      placeholder="Selecciona un Template"
                      isClearable
                      className="w-full"
                      classNamePrefix="react-select"
                      menuPlacement="auto"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text-input-1"
            render={({ field }) => (
              <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">S/N</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-1"
                        placeholder="Please enter the serial number"
                        type="text"
                        id="text-input-1"
                        className=" ps-9"
                        disabled={isEditable}
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Hash className="size-4" strokeWidth={0.75} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text-input-2"
            render={({ field }) => (
              <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">P/N</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-2"
                        placeholder="The part number is selected by the template"
                        type="text"
                        id="text-input-2"
                        className=" ps-9"
                        disabled={true}
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Hash className="size-4" strokeWidth={0.75} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="switch-0"
            disabled={isEditable}
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="hidden shrink-0">
                  Main Equipment
                </FormLabel>

                <div className="w-full">
                  <FormControl>
                    <FormLabel
                      key="switch-0"
                      className="border-0 p-0 w-full flex justify-between items-center has-[[data-state=checked]]:border-primary"
                      htmlFor="switch-0"
                    >
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel>Main Equipment</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          In case is a higher class equipment distinguished by
                          direct operation use
                        </p>
                      </div>
                      <Switch
                        id="switch-0"
                        {...field}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormLabel>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

