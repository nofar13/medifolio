
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PatientFormData } from "@/types";

// Create a Zod schema that matches our PatientFormData type
const patientFormSchema = z.object({
  idNumber: z.string().min(5, "מספר תעודת זהות חייב להכיל לפחות 5 תווים"),
  name: z.string().min(2, "שם המטופל חייב להכיל לפחות 2 תווים"),
  phone: z.string().min(9, "מספר טלפון חייב להכיל לפחות 9 ספרות"),
  email: z.string().email("נא להזין כתובת אימייל תקינה"),
  age: z.coerce.number().min(0, "גיל לא יכול להיות שלילי"),
  gender: z.enum(["זכר", "נקבה", "אחר"]),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof patientFormSchema>;

interface PatientFormProps {
  initialValues?: Partial<PatientFormData>;
  onSubmit: (data: PatientFormData) => void;
  submitLabel?: string;
}

export function PatientForm({ 
  initialValues, 
  onSubmit, 
  submitLabel = "שמור" 
}: PatientFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      idNumber: initialValues?.idNumber || "",
      name: initialValues?.name || "",
      phone: initialValues?.phone || "",
      email: initialValues?.email || "",
      age: initialValues?.age || 0,
      gender: (initialValues?.gender as "זכר" | "נקבה" | "אחר") || "זכר",
      additionalNotes: initialValues?.additionalNotes || "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    try {
      // Convert FormValues to PatientFormData
      const patientData: PatientFormData = {
        idNumber: data.idNumber,
        name: data.name,
        phone: data.phone,
        email: data.email,
        age: data.age,
        gender: data.gender,
        additionalNotes: data.additionalNotes,
      };
      
      onSubmit(patientData);
      toast.success("פרטי המטופל נשמרו בהצלחה");
    } catch (error) {
      toast.error("שגיאה בשמירת פרטי המטופל");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        <div className="flex justify-end mt-6">
          <Button type="submit" className="w-full md:w-auto">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
