
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { patientFormSchema } from "../schemas/patientFormSchema";

type FormValues = z.infer<typeof patientFormSchema>;

interface PatientDemographicFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const PatientDemographicFields = ({ form }: PatientDemographicFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem className="text-right">
            <FormLabel>גיל:</FormLabel>
            <FormControl>
              <Input type="number" placeholder="הזן גיל" {...field} dir="rtl" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem className="text-right">
            <FormLabel>מין:</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="בחר מין" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="זכר">זכר</SelectItem>
                <SelectItem value="נקבה">נקבה</SelectItem>
                <SelectItem value="אחר">אחר</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
