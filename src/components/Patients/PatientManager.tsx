
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
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface PatientManagerProps {
  initialPatients: Patient[];
  medicalHistories: MedicalHistory[];
}

export const PatientManager = ({ initialPatients, medicalHistories }: PatientManagerProps) => {
  const [searchParams] = useSearchParams();
  const viewPatientId = searchParams.get('view');
  
  const {
    filteredPatients,
    selectedPatient,
    isEditing,
    isAddingPatient,
    searchTerm,
    activeTab,
    handleAddPatient,
    handleUpdatePatient,
    handleViewPatientHistory,
    handleEditPatient,
    setSearchTerm,
    setActiveTab,
    toggleAddPatient,
    getPatientHistory,
    setIsEditing
  } = usePatients(initialPatients, medicalHistories);

  // Auto-open patient history if view parameter is present
  useEffect(() => {
    if (viewPatientId) {
      const patient = initialPatients.find(p => p.id === viewPatientId);
      if (patient) {
        handleViewPatientHistory(patient);
        setActiveTab('history');
      }
    }
  }, [viewPatientId, initialPatients, handleViewPatientHistory, setActiveTab]);

  // Force refresh of medical histories when component mounts
  useEffect(() => {
    // This will trigger a re-render with fresh data from localStorage
  }, []);

  const renderPatientHistory = () => {
    if (!selectedPatient) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">בחר מטופל כדי לצפות בהיסטוריה הרפואית</p>
        </div>
      );
    }

    const patientHistory = getPatientHistory(selectedPatient.id);

    return (
      <PatientHistory 
        history={patientHistory} 
        patientName={selectedPatient.name}
      />
    );
  };

  // Dummy function for delete - no longer used but needed for component interface
  const handleDeletePatient = (patientId: string) => {
    // This function is intentionally empty as delete functionality is removed
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
          open={isEditing}
          onOpenChange={setIsEditing}
        />
      )}
    </>
  );
};
