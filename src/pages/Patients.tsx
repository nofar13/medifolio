
import { MainLayout } from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Patient } from "@/types";
import { patients as initialPatients } from "@/data/mockData";
import { Search, Edit, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddPatientForm from "@/components/Patients/AddPatientForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import PatientHistory from "@/components/Patients/PatientHistory";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewHistoryDialogOpen, setIsViewHistoryDialogOpen] = useState(false);
  
  const handlePatientAdded = (newPatient: Patient) => {
    setPatients(prevPatients => [...prevPatients, newPatient]);
  };

  const handlePatientUpdated = (updatedPatient: Patient) => {
    setPatients(prevPatients => 
      prevPatients.map(patient => 
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
    setIsEditDialogOpen(false);
    toast({
      title: "מטופל עודכן בהצלחה",
      description: `הפרטים של ${updatedPatient.name} עודכנו במערכת`,
    });
  };

  const openEditDialog = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditDialogOpen(true);
  };

  const openViewHistoryDialog = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewHistoryDialogOpen(true);
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.includes(searchTerm) || 
    patient.idNumber.includes(searchTerm) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <MainLayout>
      <div className="animate-fadeIn">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ניהול מטופלים</h1>
          <AddPatientForm onPatientAdded={handlePatientAdded} />
        </div>
        
        <Card>
          <CardHeader className="bg-gray-50 py-4">
            <div className="flex justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="חיפוש מטופל..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-[250px]"
                  dir="rtl"
                />
              </div>
              <CardTitle className="text-xl">רשימת מטופלים</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">פעולות</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">טלפון</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">אימייל</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">גיל</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">מגדר</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">ת.ז.</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">שם מטופל</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button variant="ghost" size="sm" onClick={() => openViewHistoryDialog(patient)}>
                            <Eye className="h-4 w-4 mr-1" />
                            צפה
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(patient)}>
                            <Edit className="h-4 w-4 mr-1" />
                            ערוך
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary"
                            asChild
                          >
                            <Link to={`/patients/${patient.id}/treatment`}>
                              טיפול חדש
                            </Link>
                          </Button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">{patient.phone}</td>
                      <td className="py-4 px-4 text-right">{patient.email}</td>
                      <td className="py-4 px-4 text-right">{patient.age}</td>
                      <td className="py-4 px-4 text-right">{patient.gender}</td>
                      <td className="py-4 px-4 text-right">{patient.idNumber}</td>
                      <td className="py-4 px-4 text-right font-medium">{patient.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Patient Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]" dir="rtl">
          {selectedPatient && (
            <AddPatientForm 
              patient={selectedPatient} 
              onPatientAdded={handlePatientUpdated}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Patient History Dialog */}
      <Dialog open={isViewHistoryDialogOpen} onOpenChange={setIsViewHistoryDialogOpen}>
        <DialogContent className="sm:max-w-[900px]" dir="rtl">
          {selectedPatient && (
            <PatientHistory 
              patient={selectedPatient}
            />
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Patients;
