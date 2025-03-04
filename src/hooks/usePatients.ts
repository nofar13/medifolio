
import { useState } from "react";
import { Patient, MedicalHistory } from "@/types";
import { toast } from "@/hooks/use-toast";

export function usePatients(initialPatients: Patient[], medicalHistories: MedicalHistory[]) {
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

  const toggleAddPatient = () => setIsAddingPatient(!isAddingPatient);

  return {
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
  };
}
