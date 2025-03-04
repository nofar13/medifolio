
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Patient } from "@/types";
import { formSchema } from "./appointmentFormSchema";

interface PatientSelectorProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  patients: Patient[];
}

export const PatientSelector = ({ form, patients }: PatientSelectorProps) => {
  return (
    <FormField
      control={form.control}
      name="patientId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>מטופל</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="בחר מטופל" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name} - {patient.idNumber}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
