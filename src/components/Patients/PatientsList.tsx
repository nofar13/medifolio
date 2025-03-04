
import { useState } from "react";
import { Patient, MedicalHistory } from "@/types";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { PatientHistory } from "@/components/Patients/PatientHistory";
import AddPatientForm from "@/components/Patients/AddPatientForm";
import { toast } from "@/hooks/use-toast";
import { PatientCard } from "./PatientCard";
import { PatientSearch } from "./PatientSearch";
import { PatientTabs } from "./PatientTabs";

interface PatientsListProps {
  initialPatients: Patient[];
  medicalHistories: MedicalHistory[];
}

export const PatientsList = ({ initialPatients, medicalHistories }: PatientsListProps) => {
  const [allPatients, setAllPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("list");

  // Combine patients with their medical history
  const patientsWithHistory = allPatients.map(patient => {
    const patientHistory = medicalHistories.filter(history => 
      history.patientId === patient.id
    );
    return {...patient, medicalHistory: patientHistory};
  });

  const filteredPatients = patientsWithHistory.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.idNumber.includes(searchTerm)
  );

  const handleAddPatient = (newPatient: Patient) => {
    setAllPatients((prevPatients) => [...prevPatients, newPatient]);
    toast({
      title: "מטופל חדש נוסף בהצלחה",
      description: `מטופל ${newPatient.name} נוסף למערכת`,
    });
    setIsAddingPatient(false);
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    setAllPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
    setSelectedPatient(null);
    setIsEditing(false);
    toast({
      title: "פרטי המטופל עודכנו בהצלחה",
      description: `פרטי המטופל ${updatedPatient.name} עודכנו במערכת`,
    });
  };

  const handleDeletePatient = (patientId: string) => {
    setAllPatients((prevPatients) => 
      prevPatients.filter((patient) => patient.id !== patientId)
    );
    toast({
      title: "המטופל הוסר בהצלחה",
      description: "המטופל הוסר ממאגר הנתונים",
    });
  };

  const handleViewPatientHistory = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveTab("view");
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditing(true);
  };

  const renderPatientsList = () => {
    if (filteredPatients.length === 0) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">לא נמצאו מטופלים</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onView={handleViewPatientHistory}
            onEdit={handleEditPatient}
            onDelete={handleDeletePatient}
          />
        ))}
      </div>
    );
  };

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
        <Button onClick={() => setIsAddingPatient(true)}>
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
        listContent={renderPatientsList()}
        historyContent={renderPatientHistory()}
        selectedPatientName={selectedPatient?.name}
      />

      {isAddingPatient && (
        <AddPatientForm
          onPatientAdded={handleAddPatient}
        />
      )}

      {isEditing && selectedPatient && (
        <AddPatientForm
          patient={selectedPatient}
          onPatientAdded={handleUpdatePatient}
          isEditing={true}
        />
      )}
    </>
  );
};
