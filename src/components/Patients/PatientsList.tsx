
import { useState } from "react";
import { Patient, MedicalHistory } from "@/types";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Eye, Edit, Trash2 } from "lucide-react";
import { PatientForm } from "@/components/Patients/PatientForm";
import { PatientHistory } from "@/components/Patients/PatientHistory";
import AddPatientForm from "@/components/Patients/AddPatientForm";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

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

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">ניהול מטופלים</h1>
        <Button onClick={() => setIsAddingPatient(true)}>
          <UserPlus className="ml-2 h-4 w-4" />
          הוסף מטופל חדש
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input
            placeholder="חיפוש לפי שם או מספר זהות..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-2 w-full"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">רשימת מטופלים</TabsTrigger>
          <TabsTrigger value="view">
            {selectedPatient ? `היסטוריה רפואית - ${selectedPatient.name}` : 'צפה בהיסטוריה'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleViewPatientHistory(patient)}
                          className="text-blue-500"
                        >
                          <Eye size={18} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditPatient(patient)}
                          className="text-amber-500"
                        >
                          <Edit size={18} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeletePatient(patient.id)}
                          className="text-red-500"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                      <div className="text-right">
                        <h3 className="font-semibold text-lg">{patient.name}</h3>
                        <p className="text-gray-500 text-sm">ת.ז.: {patient.idNumber}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm"><span className="font-medium">גיל:</span> {patient.age}</p>
                      <p className="text-sm"><span className="font-medium">מגדר:</span> {patient.gender}</p>
                      <p className="text-sm"><span className="font-medium">טלפון:</span> {patient.phone}</p>
                      <p className="text-sm truncate"><span className="font-medium">דוא"ל:</span> {patient.email}</p>
                      <p className="text-sm mt-2">
                        <span className="font-medium">היסטוריה רפואית:</span> {' '}
                        {patient.medicalHistory && patient.medicalHistory.length > 0
                          ? `${patient.medicalHistory.length} רשומות`
                          : 'אין רשומות'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">לא נמצאו מטופלים</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="view">
          {selectedPatient ? (
            <PatientHistory 
              history={selectedPatient.medicalHistory || []} 
              patientName={selectedPatient.name}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">בחר מטופל כדי לצפות בהיסטוריה הרפואית</p>
            </div>
          )}
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
