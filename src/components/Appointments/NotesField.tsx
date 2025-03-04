
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./appointmentFormSchema";

interface NotesFieldProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const NotesField = ({ form }: NotesFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>הערות לפגישה</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="תיאור הסיבה לביקור, בקשות מיוחדות..." 
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
