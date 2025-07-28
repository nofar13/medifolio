
import { useState, useEffect } from "react";
import { Patient, MedicalHistory } from "@/types";
import { toast } from "@/hooks/use-toast";

export function usePatients(initialPatients: Patient[], medicalHistories: MedicalHistory[]) {
  // Load patients from localStorage or use initial data
  const [allPatients, setAllPatients] = useState<Patient[]>(() => {
    const savedPatients = localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : initialPatients;
  });
  
  // Load medical histories from localStorage or use initial data
  const [allMedicalHistories, setAllMedicalHistories] = useState<MedicalHistory[]>(() => {
    const savedHistories = localStorage.getItem('medicalHistories');
    return savedHistories ? JSON.parse(savedHistories) : medicalHistories;
  });
  
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("list");

  // Combine patients with their medical history
  const patientsWithHistory = allPatients.map(patient => {
    const patientHistory = allMedicalHistories.filter(history => 
      history.patientId === patient.id
    );
    return {...patient, medicalHistory: patientHistory};
  });

  const filteredPatients = patientsWithHistory.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.idNumber.includes(searchTerm)
  );

  const handleAddPatient = (newPatient: Patient) => {
    setAllPatients((prevPatients) => {
      const updatedPatients = [...prevPatients, newPatient];
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      return updatedPatients;
    });
    toast({
      title: "מטופל חדש נוסף בהצלחה",
      description: `מטופל ${newPatient.name} נוסף למערכת`,
    });
    setIsAddingPatient(false);
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    setAllPatients((prevPatients) => {
      const updatedPatients = prevPatients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      );
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      return updatedPatients;
    });
    setSelectedPatient(null);
    setIsEditing(false);
    toast({
      title: "פרטי המטופל עודכנו בהצלחה",
      description: `פרטי המטופל ${updatedPatient.name} עודכנו במערכת`,
    });
  };

  const handleAddMedicalHistory = (newHistory: MedicalHistory) => {
    setAllMedicalHistories((prevHistories) => {
      const updatedHistories = [newHistory, ...prevHistories];
      // Save to localStorage for persistence
      localStorage.setItem('medicalHistories', JSON.stringify(updatedHistories));
      return updatedHistories;
    });
  };

  const handleViewPatientHistory = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveTab("history");
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditing(true);
  };

  const handleDeletePatient = (patientId: string) => {
    setAllPatients((prevPatients) => {
      const updatedPatients = prevPatients.filter(patient => patient.id !== patientId);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      return updatedPatients;
    });
    
    // Also remove all medical history for this patient
    setAllMedicalHistories((prevHistories) => {
      const updatedHistories = prevHistories.filter(history => history.patientId !== patientId);
      localStorage.setItem('medicalHistories', JSON.stringify(updatedHistories));
      return updatedHistories;
    });

    // If the deleted patient was selected, clear selection
    if (selectedPatient?.id === patientId) {
      setSelectedPatient(null);
      setActiveTab("list");
    }

    const deletedPatient = allPatients.find(p => p.id === patientId);
    toast({
      title: "המטופל הוסר בהצלחה",
      description: deletedPatient ? `המטופל ${deletedPatient.name} הוסר מהמערכת` : "המטופל הוסר מהמערכת",
    });
  };

  const toggleAddPatient = () => setIsAddingPatient(!isAddingPatient);

  const getPatientById = (patientId: string): Patient | undefined => {
    return patientsWithHistory.find(patient => patient.id === patientId);
  };

  const getPatientHistory = (patientId: string): MedicalHistory[] => {
    return allMedicalHistories.filter(history => history.patientId === patientId);
  };

  return {
    filteredPatients,
    selectedPatient,
    isEditing,
    isAddingPatient,
    searchTerm,
    activeTab,
    allMedicalHistories,
    handleAddPatient,
    handleUpdatePatient,
    handleAddMedicalHistory,
    handleViewPatientHistory,
    handleEditPatient,
    setSearchTerm,
    setActiveTab,
    toggleAddPatient,
    getPatientById,
    getPatientHistory,
    setIsEditing,
    handleDeletePatient
  };
}
