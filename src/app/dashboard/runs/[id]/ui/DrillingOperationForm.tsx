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
import { Pencil } from "lucide-react";

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
          <FormField
            control={form.control}
            name="sap_sales_order_job_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SAP Sales Order Job No</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job_coordinator_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Coordinator Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job_number_in_surface_system"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Number in Surface System</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="production_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Production Type</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="well_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Well Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wellbore_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wellbore Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="field_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="api_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Number</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <h2 className="text-xl font-bold mb-2">Equipment Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="rig_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rig Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rig_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rig Type</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <h2 className="text-xl font-bold mb-2">Operation Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="run_number_at_rig"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Run Number at Rig</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="run_number_in_surface_system"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Run Number in Surface System</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_of_run"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End of Run</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={!editing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hole_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hole Size</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_tool_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Tool Size</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_time_in"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Time In</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="datetime-local"
                    disabled={!editing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_time_out"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Time Out</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="datetime-local"
                    disabled={!editing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="depth_in_ft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Depth In (ft)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="depth_out_ft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Depth Out (ft)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="distance_drilled_ft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance Drilled (ft)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="circulating_time_hr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Circulating Time (hr)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="drilling_time_hr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drilling Time (hr)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bha_run_out_of_spec"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BHA Run Out of Spec</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={!editing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <h2 className="text-xl font-bold mb-2">Operational Parameters</h2>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="average_temp_degf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Average Temp (°F)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jarring"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jarring</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={!editing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_dls_rotated_deg_per_100ft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max DLS Rotated (deg/100ft)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_pressure_psi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Pressure (psi)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_temperature_degf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Temperature (°F)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_tvdgl_ft"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max TVDGL (ft)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mud_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mud Type</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avg_mud_weight_ppg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avg Mud Weight (ppg)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sand_content_percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sand Content (%)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="solid_content_percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solid Content (%)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <h2 className="text-xl font-bold mb-2">Mud Properties</h2>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="chlorides_ppm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chlorides (ppm)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_data_rate_bps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Data Rate (bps)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_data_rate_percent_decoding"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Data Rate Percent Decoding</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="min_inclination_deg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Inclination (deg)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mud_trade_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mud Trade Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passing_whipstock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passing Whipstock</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={!editing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ph_of_mud"
            render={({ field }) => (
              <FormItem>
                <FormLabel>pH of Mud</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salinity_content_ppm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salinity Content (ppm)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total_bpa_time_hr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total BPA Time (hr)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <h2 className="text-xl font-bold mb-2">Vibration Data (Summary)</h2>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="temperature_total_hr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature Total (hr)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stick_slip_total_hr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stick Slip Total (hr)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lateral_vibration_total_hr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lateral Vibration Total (hr)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="axial_vibration_total_hr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Axial Vibration Total (hr)</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!editing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
      </form>
    </Form>
  );
};

function normalizeData(data: any) {
  const safeData = data ?? {};
  return {
    job_status: safeData.job_status ?? "",
    sap_sales_order_job_no: safeData.sap_sales_order_job_no ?? "",
    location: safeData.location ?? "",
    job_coordinator_name: safeData.job_coordinator_name ?? "",
    customer: safeData.customer ?? "",
    job_number_in_surface_system: safeData.job_number_in_surface_system ?? "",
    production_type: safeData.production_type ?? "",
    well_name: safeData.well_name ?? "",
    wellbore_name: safeData.wellbore_name ?? "",
    field_name: safeData.field_name ?? "",
    latitude: safeData.latitude ?? "",
    longitude: safeData.longitude ?? "",
    api_number: safeData.api_number ?? "",
    rig_name: safeData.rig_name ?? "",
    rig_type: safeData.rig_type ?? "",
    run_number_at_rig: safeData.run_number_at_rig ?? "",
    run_number_in_surface_system: safeData.run_number_in_surface_system ?? "",
    end_of_run: !!safeData.end_of_run,
    hole_size: safeData.hole_size ?? "",
    max_tool_size: safeData.max_tool_size ?? "",
    date_time_in: safeData.date_time_in ?? "",
    date_time_out: safeData.date_time_out ?? "",
    depth_in_ft: safeData.depth_in_ft ?? "",
    depth_out_ft: safeData.depth_out_ft ?? "",
    distance_drilled_ft: safeData.distance_drilled_ft ?? "",
    circulating_time_hr: safeData.circulating_time_hr ?? "",
    drilling_time_hr: safeData.drilling_time_hr ?? "",
    bha_run_out_of_spec: !!safeData.bha_run_out_of_spec,
    average_temp_degf: safeData.average_temp_degf ?? "",
    jarring: !!safeData.jarring,
    max_dls_rotated_deg_per_100ft: safeData.max_dls_rotated_deg_per_100ft ?? "",
    max_pressure_psi: safeData.max_pressure_psi ?? "",
    max_temperature_degf: safeData.max_temperature_degf ?? "",
    max_tvdgl_ft: safeData.max_tvdgl_ft ?? "",
    mud_type: safeData.mud_type ?? "",
    avg_mud_weight_ppg: safeData.avg_mud_weight_ppg ?? "",
    sand_content_percent: safeData.sand_content_percent ?? "",
    solid_content_percent: safeData.solid_content_percent ?? "",
    chlorides_ppm: safeData.chlorides_ppm ?? "",
    max_data_rate_bps: safeData.max_data_rate_bps ?? "",
    max_data_rate_percent_decoding: safeData.max_data_rate_percent_decoding ?? "",
    min_inclination_deg: safeData.min_inclination_deg ?? "",
    mud_trade_name: safeData.mud_trade_name ?? "",
    passing_whipstock: !!safeData.passing_whipstock,
    ph_of_mud: safeData.ph_of_mud ?? "",
    salinity_content_ppm: safeData.salinity_content_ppm ?? "",
    total_bpa_time_hr: safeData.total_bpa_time_hr ?? "",
    temperature_total_hr: safeData.temperature_total_hr ?? "",
    stick_slip_total_hr: safeData.stick_slip_total_hr ?? "",
    lateral_vibration_total_hr: safeData.lateral_vibration_total_hr ?? "",
    axial_vibration_total_hr: safeData.axial_vibration_total_hr ?? "",
  };
}
