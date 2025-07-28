
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PatientFormData, Patient } from "@/types";
import { toast } from "@/hooks/use-toast";
import { Edit } from "lucide-react";
import { PatientForm } from "./PatientForm";

interface EditPatientFormProps {
  patient: Patient;
  onPatientUpdated?: (patient: Patient) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EditPatientForm = ({ patient, onPatientUpdated, open = false, onOpenChange }: EditPatientFormProps) => {

  const handleSubmit = (data: PatientFormData) => {
    const updatedPatient: Patient = {
      ...patient,
      ...data,
    };

    console.log("Updating patient:", updatedPatient);
    
    toast({
      title: "פרטי המטופל עודכנו בהצלחה",
      description: `פרטי המטופל ${data.name} עודכנו במערכת`,
      duration: 2000
    });

    if (onPatientUpdated) {
      onPatientUpdated(updatedPatient);
    }

    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <PatientForm 
          initialValues={patient}
          onSubmit={handleSubmit}
          submitLabel="עדכן מטופל"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditPatientForm;
