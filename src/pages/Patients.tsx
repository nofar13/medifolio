
import { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { PatientForm } from "@/components/Patients/PatientForm";
import { Patient, PatientFormData } from "@/types";
import { patients } from "@/data/mockData";
import { Filter, UserPlus, Eye, Pencil } from "lucide-react";
import { toast } from "sonner";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingNewPatient, setIsAddingNewPatient] = useState(false);
  const [patientsList, setPatientsList] = useState<Patient[]>(patients);
  
  // Filter patients based on search term
  const filteredPatients = patientsList.filter(patient => 
    patient.name.includes(searchTerm) || 
    patient.idNumber.includes(searchTerm) ||
    patient.phone.includes(searchTerm) ||
    patient.email.includes(searchTerm)
  );
  
  const handleAddPatient = (data: PatientFormData) => {
    const newPatient: Patient = {
      ...data,
      id: String(patientsList.length + 1),
      medicalHistory: []
    };
    
    setPatientsList([...patientsList, newPatient]);
    setIsAddingNewPatient(false);
    toast.success("מטופל נוסף בהצלחה");
  };

  return (
    <MainLayout>
      <div className="animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">מטופלים</h1>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse w-full md:w-auto mt-4 md:mt-0">
            <div className="relative flex-1 md:flex-auto">
              <Input
                placeholder="חיפוש מטופל..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
                dir="rtl"
              />
              <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            <Dialog open={isAddingNewPatient} onOpenChange={setIsAddingNewPatient}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">
                  <UserPlus className="h-4 w-4 mr-2" />
                  הוסף מטופל חדש
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle className="text-right">הוספת מטופל חדש</DialogTitle>
                </DialogHeader>
                <PatientForm onSubmit={handleAddPatient} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Card className="overflow-hidden animate-fadeIn">
          <CardHeader className="bg-gray-50 py-4">
            <CardTitle className="text-xl text-right">רשימת מטופלים</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">פעולות</TableHead>
                  <TableHead className="text-right">גיל</TableHead>
                  <TableHead className="text-right">מגדר</TableHead>
                  <TableHead className="text-right">אימייל</TableHead>
                  <TableHead className="text-right">מספר טלפון</TableHead>
                  <TableHead className="text-right">שם</TableHead>
                  <TableHead className="text-right">ת.ז.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-gray-500 font-medium">לא נמצאו מטופלים תואמים</p>
                      <p className="text-gray-400 text-sm mt-1">נסה לחפש שוב או להוסיף מטופל חדש</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <Link to={`/patients/${patient.id}/edit`}>
                              <Pencil className="h-4 w-4 text-gray-500" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <Link to={`/patients/${patient.id}`}>
                              <Eye className="h-4 w-4 text-primary" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.idNumber}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Patients;
