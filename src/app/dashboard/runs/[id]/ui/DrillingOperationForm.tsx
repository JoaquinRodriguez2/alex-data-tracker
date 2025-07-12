import React from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface DrillingOperationFormProps {
  data?: any;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
}

export const DrillingOperationForm: React.FC<DrillingOperationFormProps> = ({ data = {}, onSubmit, isLoading }) => {
  const [form, setForm] = React.useState({ ...data });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">General Info</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="job_status">Job Status</Label>
          <Input name="job_status" value={form.job_status || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="sap_sales_order_job_no">SAP Sales Order Job No</Label>
          <Input name="sap_sales_order_job_no" value={form.sap_sales_order_job_no || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input name="location" value={form.location || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="job_coordinator_name">Job Coordinator Name</Label>
          <Input name="job_coordinator_name" value={form.job_coordinator_name || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="customer">Customer</Label>
          <Input name="customer" value={form.customer || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="job_number_in_surface_system">Job Number in Surface System</Label>
          <Input name="job_number_in_surface_system" value={form.job_number_in_surface_system || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="production_type">Production Type</Label>
          <Input name="production_type" value={form.production_type || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="well_name">Well Name</Label>
          <Input name="well_name" value={form.well_name || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="wellbore_name">Wellbore Name</Label>
          <Input name="wellbore_name" value={form.wellbore_name || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="field_name">Field Name</Label>
          <Input name="field_name" value={form.field_name || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input name="latitude" value={form.latitude || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input name="longitude" value={form.longitude || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="api_number">API Number</Label>
          <Input name="api_number" value={form.api_number || ""} onChange={handleChange} />
        </div>
      </div>
      <Separator />
      <h2 className="text-xl font-bold mb-2">Equipment Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rig_name">Rig Name</Label>
          <Input name="rig_name" value={form.rig_name || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="rig_type">Rig Type</Label>
          <Input name="rig_type" value={form.rig_type || ""} onChange={handleChange} />
        </div>
      </div>
      <Separator />
      <h2 className="text-xl font-bold mb-2">Operation Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="run_number_at_rig">Run Number at Rig</Label>
          <Input name="run_number_at_rig" value={form.run_number_at_rig || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="run_number_in_surface_system">Run Number in Surface System</Label>
          <Input name="run_number_in_surface_system" value={form.run_number_in_surface_system || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="end_of_run">End of Run</Label>
          <Input name="end_of_run" type="checkbox" checked={!!form.end_of_run} onChange={e => setForm({ ...form, end_of_run: e.target.checked })} />
        </div>
        <div>
          <Label htmlFor="hole_size">Hole Size</Label>
          <Input name="hole_size" value={form.hole_size || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="max_tool_size">Max Tool Size</Label>
          <Input name="max_tool_size" value={form.max_tool_size || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="date_time_in">Date Time In</Label>
          <Input name="date_time_in" type="datetime-local" value={form.date_time_in || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="date_time_out">Date Time Out</Label>
          <Input name="date_time_out" type="datetime-local" value={form.date_time_out || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="depth_in_ft">Depth In (ft)</Label>
          <Input name="depth_in_ft" value={form.depth_in_ft || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="depth_out_ft">Depth Out (ft)</Label>
          <Input name="depth_out_ft" value={form.depth_out_ft || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="distance_drilled_ft">Distance Drilled (ft)</Label>
          <Input name="distance_drilled_ft" value={form.distance_drilled_ft || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="circulating_time_hr">Circulating Time (hr)</Label>
          <Input name="circulating_time_hr" value={form.circulating_time_hr || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="drilling_time_hr">Drilling Time (hr)</Label>
          <Input name="drilling_time_hr" value={form.drilling_time_hr || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="bha_run_out_of_spec">BHA Run Out of Spec</Label>
          <Input name="bha_run_out_of_spec" type="checkbox" checked={!!form.bha_run_out_of_spec} onChange={e => setForm({ ...form, bha_run_out_of_spec: e.target.checked })} />
        </div>
      </div>
      <Separator />
      <h2 className="text-xl font-bold mb-2">Operational Parameters</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="average_temp_degf">Average Temp (°F)</Label>
          <Input name="average_temp_degf" value={form.average_temp_degf || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="jarring">Jarring</Label>
          <Input name="jarring" type="checkbox" checked={!!form.jarring} onChange={e => setForm({ ...form, jarring: e.target.checked })} />
        </div>
        <div>
          <Label htmlFor="max_dls_rotated_deg_per_100ft">Max DLS Rotated (deg/100ft)</Label>
          <Input name="max_dls_rotated_deg_per_100ft" value={form.max_dls_rotated_deg_per_100ft || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="max_pressure_psi">Max Pressure (psi)</Label>
          <Input name="max_pressure_psi" value={form.max_pressure_psi || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="max_temperature_degf">Max Temperature (°F)</Label>
          <Input name="max_temperature_degf" value={form.max_temperature_degf || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="max_tvdgl_ft">Max TVDGL (ft)</Label>
          <Input name="max_tvdgl_ft" value={form.max_tvdgl_ft || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="mud_type">Mud Type</Label>
          <Input name="mud_type" value={form.mud_type || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="avg_mud_weight_ppg">Avg Mud Weight (ppg)</Label>
          <Input name="avg_mud_weight_ppg" value={form.avg_mud_weight_ppg || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="sand_content_percent">Sand Content (%)</Label>
          <Input name="sand_content_percent" value={form.sand_content_percent || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="solid_content_percent">Solid Content (%)</Label>
          <Input name="solid_content_percent" value={form.solid_content_percent || ""} onChange={handleChange} />
        </div>
      </div>
      <Separator />
      <h2 className="text-xl font-bold mb-2">Mud Properties</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="chlorides_ppm">Chlorides (ppm)</Label>
          <Input name="chlorides_ppm" value={form.chlorides_ppm || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="max_data_rate_bps">Max Data Rate (bps)</Label>
          <Input name="max_data_rate_bps" value={form.max_data_rate_bps || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="max_data_rate_percent_decoding">Max Data Rate Percent Decoding</Label>
          <Input name="max_data_rate_percent_decoding" value={form.max_data_rate_percent_decoding || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="min_inclination_deg">Min Inclination (deg)</Label>
          <Input name="min_inclination_deg" value={form.min_inclination_deg || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="mud_trade_name">Mud Trade Name</Label>
          <Input name="mud_trade_name" value={form.mud_trade_name || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="passing_whipstock">Passing Whipstock</Label>
          <Input name="passing_whipstock" type="checkbox" checked={!!form.passing_whipstock} onChange={e => setForm({ ...form, passing_whipstock: e.target.checked })} />
        </div>
        <div>
          <Label htmlFor="ph_of_mud">pH of Mud</Label>
          <Input name="ph_of_mud" value={form.ph_of_mud || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="salinity_content_ppm">Salinity Content (ppm)</Label>
          <Input name="salinity_content_ppm" value={form.salinity_content_ppm || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="total_bpa_time_hr">Total BPA Time (hr)</Label>
          <Input name="total_bpa_time_hr" value={form.total_bpa_time_hr || ""} onChange={handleChange} />
        </div>
      </div>
      <Separator />
      <h2 className="text-xl font-bold mb-2">Vibration Data (Summary)</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="temperature_total_hr">Temperature Total (hr)</Label>
          <Input name="temperature_total_hr" value={form.temperature_total_hr || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="stick_slip_total_hr">Stick Slip Total (hr)</Label>
          <Input name="stick_slip_total_hr" value={form.stick_slip_total_hr || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="lateral_vibration_total_hr">Lateral Vibration Total (hr)</Label>
          <Input name="lateral_vibration_total_hr" value={form.lateral_vibration_total_hr || ""} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="axial_vibration_total_hr">Axial Vibration Total (hr)</Label>
          <Input name="axial_vibration_total_hr" value={form.axial_vibration_total_hr || ""} onChange={handleChange} />
        </div>
      </div>
      <Separator />
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};
