
import { Patient, MedicalHistory } from "@/types";
import { PatientManager } from "./PatientManager";

interface PatientsListProps {
  initialPatients: Patient[];
  medicalHistories: MedicalHistory[];
}

export const PatientsList = ({ initialPatients, medicalHistories }: PatientsListProps) => {
  return (
    <PatientManager 
      initialPatients={initialPatients} 
      medicalHistories={medicalHistories} 
    />
  );
};
