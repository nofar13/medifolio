import { MainLayout } from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Patient } from "@/types";
import { patients as initialPatients } from "@/data/mockData";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddPatientForm from "@/components/Patients/AddPatientForm";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  
  const handlePatientAdded = (newPatient: Patient) => {
    setPatients(prevPatients => [...prevPatients, newPatient]);
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
                          <Button variant="ghost" size="sm">צפה</Button>
                          <Button variant="ghost" size="sm">ערוך</Button>
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
    </MainLayout>
  );
};

export default Patients;
