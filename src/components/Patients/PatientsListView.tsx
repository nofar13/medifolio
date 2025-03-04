
import { Patient } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash, FilePlus } from "lucide-react";

interface PatientsListViewProps {
  patients: Patient[];
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string) => void;
}

export const PatientsListView = ({ 
  patients, 
  onView,
  onEdit,
  onDelete 
}: PatientsListViewProps) => {
  const navigate = useNavigate();

  const handleNavigateToTreatment = (patientId: string) => {
    navigate(`/patients/${patientId}/treatment`);
  };

  const handleNavigateToCurrentTreatment = (patientId: string) => {
    navigate(`/patients/${patientId}/current-treatment`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">שם</TableHead>
            <TableHead className="text-right">תעודת זהות</TableHead>
            <TableHead className="text-right">גיל</TableHead>
            <TableHead className="text-right">מגדר</TableHead>
            <TableHead className="text-right">טלפון</TableHead>
            <TableHead className="text-right">דוא"ל</TableHead>
            <TableHead className="text-center">פעולות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                לא נמצאו מטופלים
              </TableCell>
            </TableRow>
          ) : (
            patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.idNumber}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleNavigateToCurrentTreatment(patient.id)}
                    >
                      <FilePlus className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleNavigateToTreatment(patient.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => onEdit(patient)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => onDelete(patient.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
