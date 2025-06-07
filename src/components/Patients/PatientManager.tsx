
import { Patient, MedicalHistory } from "@/types";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { PatientHistory } from "@/components/Patients/PatientHistory";
import AddPatientForm from "@/components/Patients/AddPatientForm";
import EditPatientForm from "@/components/Patients/EditPatientForm";
import { PatientSearch } from "./PatientSearch";
import { PatientTabs } from "./PatientTabs";
import { PatientsListView } from "./PatientsListView";
import { usePatients } from "@/hooks/usePatients";

interface PatientManagerProps {
  initialPatients: Patient[];
  medicalHistories: MedicalHistory[];
}

export const PatientManager = ({ initialPatients, medicalHistories }: PatientManagerProps) => {
  const {
    filteredPatients,
    selectedPatient,
    isEditing,
    isAddingPatient,
    searchTerm,
    activeTab,
    handleAddPatient,
    handleUpdatePatient,
    handleDeletePatient,
    handleViewPatientHistory,
    handleEditPatient,
    setSearchTerm,
    setActiveTab,
    toggleAddPatient
  } = usePatients(initialPatients, medicalHistories);

  const renderPatientHistory = () => {
    if (!selectedPatient) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">בחר מטופל כדי לצפות בהיסטוריה הרפואית</p>
        </div>
      );
    }

    return (
      <PatientHistory 
        history={selectedPatient.medicalHistory || []} 
        patientName={selectedPatient.name}
      />
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">ניהול מטופלים</h1>
        <Button onClick={toggleAddPatient}>
          <UserPlus className="ml-2 h-4 w-4" />
          הוסף מטופל חדש
        </Button>
      </div>

      <PatientSearch 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

      <PatientTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        listContent={
          <PatientsListView 
            patients={filteredPatients} 
            onView={handleViewPatientHistory}
            onEdit={handleEditPatient}
            onDelete={handleDeletePatient}
          />
        }
        historyContent={renderPatientHistory()}
        selectedPatientName={selectedPatient?.name}
      />

      {isAddingPatient && (
        <AddPatientForm
          onPatientAdded={handleAddPatient}
        />
      )}

      {isEditing && selectedPatient && (
        <EditPatientForm
          patient={selectedPatient}
          onPatientUpdated={handleUpdatePatient}
        />
      )}
    </>
  );
};
