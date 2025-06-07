
import { Patient, PatientFormData } from "@/types";
import { PatientForm } from "./PatientForm";

interface EditPatientFormContentProps {
  patient: Patient;
  onSubmit: (data: PatientFormData) => void;
}

const EditPatientFormContent = ({ patient, onSubmit }: EditPatientFormContentProps) => {
  return (
    <PatientForm 
      initialValues={patient}
      onSubmit={onSubmit}
      submitLabel="עדכן מטופל"
    />
  );
};

export default EditPatientFormContent;
