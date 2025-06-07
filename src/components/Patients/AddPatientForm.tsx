
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PatientFormData, Patient } from "@/types";
import { toast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { patientFormSchema, PatientFormValues } from "./schemas/patientFormSchema";
import { PatientForm } from "./PatientForm";

interface AddPatientFormProps {
  onPatientAdded?: (patient: Patient) => void;
}

const AddPatientForm = ({ onPatientAdded }: AddPatientFormProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: PatientFormData) => {
    const newPatient: Patient = {
      id: Date.now().toString(),
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
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="ml-2 h-4 w-4" />
          הוסף מטופל חדש
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <PatientForm 
          onSubmit={handleSubmit}
          submitLabel="שמור מטופל"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientForm;
