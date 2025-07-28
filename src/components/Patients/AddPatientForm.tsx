
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PatientFormData, Patient } from "@/types";
import { toast } from "@/hooks/use-toast";
import { patientFormSchema, PatientFormValues } from "./schemas/patientFormSchema";
import { PatientForm } from "./PatientForm";

interface AddPatientFormProps {
  onPatientAdded?: (patient: Patient) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPatientForm = ({ onPatientAdded, open, onOpenChange }: AddPatientFormProps) => {

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
      duration: 2000
    });

    if (onPatientAdded) {
      onPatientAdded(newPatient);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle>הוסף מטופל חדש</DialogTitle>
        </DialogHeader>
        <PatientForm 
          onSubmit={handleSubmit}
          submitLabel="שמור מטופל"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientForm;
