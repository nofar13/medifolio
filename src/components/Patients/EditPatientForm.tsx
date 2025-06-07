
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
}

const EditPatientForm = ({ patient, onPatientUpdated }: EditPatientFormProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: PatientFormData) => {
    const updatedPatient: Patient = {
      ...patient,
      ...data,
    };

    console.log("Updating patient:", updatedPatient);
    
    toast({
      title: "פרטי המטופל עודכנו בהצלחה",
      description: `פרטי המטופל ${data.name} עודכנו במערכת`,
    });

    if (onPatientUpdated) {
      onPatientUpdated(updatedPatient);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="ml-2 h-4 w-4" />
          ערוך
        </Button>
      </DialogTrigger>
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
