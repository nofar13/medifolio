
import { useState } from "react";
import { Patient } from "@/types";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { PatientForm } from "@/components/Patients/PatientForm";
import { PatientHistory } from "@/components/Patients/PatientHistory";
import AddPatientForm from "@/components/Patients/AddPatientForm";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PatientsListProps {
  initialPatients: Patient[];
}

export const PatientsList = ({ initialPatients }: PatientsListProps) => {
  const [allPatients, setAllPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingPatient, setIsAddingPatient] = useState(false);

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

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditing(true);
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

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">רשימת מטופלים</TabsTrigger>
          <TabsTrigger value="view">צפה בהיסטוריה</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <PatientForm 
            initialValues={{}}
            onSubmit={() => {}}
            submitLabel="שמור"
          />
        </TabsContent>
        
        <TabsContent value="view">
          <PatientHistory 
            history={allPatients.flatMap(patient => 
              patient.medicalHistory?.map(history => ({
                ...history,
                patientName: patient.name
              })) || []
            )} 
          />
        </TabsContent>
      </Tabs>

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
