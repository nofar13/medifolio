
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
    <Card className="hover-lift">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
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
          <h3 className="text-xl font-semibold">מטופלים אחרונים</h3>
        </div>

        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-3 px-2 text-right text-sm font-medium text-gray-500">פעולות</th>
                <th className="py-3 px-2 text-right text-sm font-medium text-gray-500">טלפון</th>
                <th className="py-3 px-2 text-right text-sm font-medium text-gray-500">ת.ז.</th>
                <th className="py-3 px-2 text-right text-sm font-medium text-gray-500">שם מטופל</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="py-4 px-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 hover:text-primary"
                      asChild
                    >
                      <Link to={`/patients/${patient.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </td>
                  <td className="py-4 px-2 text-right">{patient.phone}</td>
                  <td className="py-4 px-2 text-right">{patient.idNumber}</td>
                  <td className="py-4 px-2 text-right font-medium">{patient.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
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
