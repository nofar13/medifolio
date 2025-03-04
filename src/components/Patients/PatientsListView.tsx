
import { Patient } from "@/types";
import { PatientCard } from "./PatientCard";

interface PatientsListViewProps {
  patients: Patient[];
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string) => void;
}

export const PatientsListView = ({ patients, onView, onEdit, onDelete }: PatientsListViewProps) => {
  if (patients.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-gray-500">לא נמצאו מטופלים</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
