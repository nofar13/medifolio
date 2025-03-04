
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { patientFormSchema } from "../schemas/patientFormSchema";

type FormValues = z.infer<typeof patientFormSchema>;

interface PatientNotesFieldProps {
  form: UseFormReturn<FormValues>;
}

export const PatientNotesField = ({ form }: PatientNotesFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="additionalNotes"
      render={({ field }) => (
        <FormItem className="text-right md:col-span-2">
          <FormLabel>הערות נוספות:</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="הזן הערות נוספות"
              className="min-h-[120px]" 
              {...field}
              dir="rtl"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
