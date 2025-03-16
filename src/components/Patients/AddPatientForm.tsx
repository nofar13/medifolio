
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PatientFormData, Patient } from "@/types";
import { toast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import AddPatientFormContent from "./AddPatientFormContent";
import EditPatientFormContent from "./EditPatientFormContent";

const formSchema = z.object({
  idNumber: z.string().min(5, { message: "חובה להזין ת.ז תקינה" }),
  name: z.string().min(2, { message: "חובה להזין שם מלא" }),
  phone: z.string().min(9, { message: "חובה להזין מספר טלפון תקין" }),
  email: z.string().email({ message: "יש להזין אימייל תקין" }),
  age: z.coerce.number().min(1, { message: "חובה להזין גיל תקין" }),
  gender: z.enum(["זכר", "נקבה", "אחר"], { required_error: "יש לבחור מגדר" }),
  additionalNotes: z.string().optional(),
});

interface AddPatientFormProps {
  onPatientAdded?: (patient: Patient) => void;
  patient?: Patient;
  isEditing?: boolean;
}

const AddPatientForm = ({ onPatientAdded, patient, isEditing = false }: AddPatientFormProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<PatientFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idNumber: "",
      name: "",
      phone: "",
      email: "",
      age: undefined,
      gender: undefined,
      additionalNotes: "",
    },
  });

  useEffect(() => {
    if (patient && isEditing) {
      form.reset({
        idNumber: patient.idNumber,
        name: patient.name,
        phone: patient.phone,
        email: patient.email,
        age: patient.age,
        gender: patient.gender as "זכר" | "נקבה" | "אחר",
        additionalNotes: patient.additionalNotes || "",
      });
    }
  }, [patient, form, isEditing]);

  function onSubmit(data: PatientFormData) {
    if (isEditing && patient) {
      const updatedPatient: Patient = {
        ...patient,
        ...data,
      };
      
      console.log("Updating patient:", updatedPatient);
      
      if (onPatientAdded) {
        onPatientAdded(updatedPatient);
      }
    } else {
      const newPatient: Patient = {
        id: Date.now().toString(), // Generate a temporary ID
        ...data,
        medicalHistory: [],
      };
  
      console.log("Adding new patient:", newPatient);
      
      toast({
        title: "מטופל חדש נוסף בהצלחה",
        description: `המטופל ${data.name} נוסף למערכת`,
      });
  
      if (onPatientAdded) {
        onPatientAdded(newPatient);
      }
  
      setOpen(false);
      form.reset();
    }
  }

  if (isEditing) {
    return <EditPatientFormContent form={form} onSubmit={onSubmit} isEditing={true} />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="ml-2 h-4 w-4" />
          הוסף מטופל חדש
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]" dir="rtl">
        <AddPatientFormContent form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientForm;
