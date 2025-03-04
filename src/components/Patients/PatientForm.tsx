
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { PatientFormData } from "@/types";
import { patientFormSchema, PatientFormValues } from "./schemas/patientFormSchema";
import { PatientBasicInfoFields } from "./FormFields/PatientBasicInfoFields";
import { PatientDemographicFields } from "./FormFields/PatientDemographicFields";
import { PatientNotesField } from "./FormFields/PatientNotesField";

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
  const form = useForm<PatientFormValues>({
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

  const handleSubmit = (data: PatientFormValues) => {
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
          <PatientBasicInfoFields form={form} />
          <PatientDemographicFields form={form} />
          <PatientNotesField form={form} />
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
