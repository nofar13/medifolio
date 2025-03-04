
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { patients } from "@/data/mockData";
import { ChevronLeft, Eye, Search, UserPlus } from "lucide-react";
import AddPatientForm from "@/components/Patients/AddPatientForm";
import { Patient } from "@/types";
import { toast } from "@/hooks/use-toast";

const RecentPatients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [localPatients, setLocalPatients] = useState(patients);
  
  const filteredPatients = localPatients.filter(patient => 
    patient.name.includes(searchTerm) || 
    patient.idNumber.includes(searchTerm) ||
    patient.phone.includes(searchTerm)
  );

  const handleAddPatient = (newPatient: Patient) => {
    setLocalPatients((prevPatients) => [newPatient, ...prevPatients]);
    toast({
      title: "מטופל חדש נוסף בהצלחה",
      description: `מטופל ${newPatient.name} נוסף למערכת`,
    });
  };

  return (
    <Card className="border border-gray-200 shadow-formal transition-shadow duration-300 hover:shadow-formal-hover">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-3 pt-5 px-6 border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-gray-800 flex justify-between items-center">
          <div className="relative w-[250px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="חיפוש מטופל..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/90 border-gray-200"
              dir="rtl"
            />
          </div>
          <span>מטופלים אחרונים</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">פעולות</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">טלפון</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">ת.ז.</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">שם מטופל</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 hover:text-primary hover:bg-blue-100/50"
                      asChild
                    >
                      <Link to={`/patients/${patient.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-600">{patient.phone}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{patient.idNumber}</td>
                  <td className="py-4 px-4 text-right font-medium text-gray-800">{patient.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between border-t border-gray-100">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs text-gray-600 hover:bg-gray-100"
          asChild
        >
          <Link to="/patients">
            צפה בכל המטופלים
            <ChevronLeft className="ml-1 h-3 w-3" />
          </Link>
        </Button>
        <AddPatientForm onPatientAdded={handleAddPatient} />
      </CardFooter>
    </Card>
  );
};

export default RecentPatients;
