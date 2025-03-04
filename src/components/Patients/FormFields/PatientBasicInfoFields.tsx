
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { patientFormSchema } from "../schemas/patientFormSchema";

type FormValues = z.infer<typeof patientFormSchema>;

interface PatientBasicInfoFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const PatientBasicInfoFields = ({ form }: PatientBasicInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="idNumber"
        render={({ field }) => (
          <FormItem className="text-right">
            <FormLabel>תעודת זהות:</FormLabel>
            <FormControl>
              <Input placeholder="הזן תעודת זהות" {...field} dir="rtl" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="text-right">
            <FormLabel>שם:</FormLabel>
            <FormControl>
              <Input placeholder="הזן שם מלא" {...field} dir="rtl" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="text-right">
            <FormLabel>מספר טלפון:</FormLabel>
            <FormControl>
              <Input placeholder="הזן מספר טלפון" {...field} dir="rtl" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="text-right">
            <FormLabel>אימייל:</FormLabel>
            <FormControl>
              <Input placeholder="הזן כתובת מייל" {...field} dir="rtl" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
