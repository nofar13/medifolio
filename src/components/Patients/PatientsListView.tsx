
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
import { Eye, Pencil, FilePlus } from "lucide-react";

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

  const handleNavigateToCurrentTreatment = (patientId: string) => {
    navigate(`/patients/${patientId}/current-treatment`);
  };

  const handleViewHistory = (patient: Patient) => {
    console.log('Viewing history for patient:', patient.name);
    onView(patient);
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
                      title="טיפול נוכחי"
                    >
                      <FilePlus className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleViewHistory(patient)}
                      title="צפה בהיסטוריה רפואית"
                      className="bg-blue-50 hover:bg-blue-100"
                    >
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => onEdit(patient)}
                      title="ערוך מטופל"
                    >
                      <Pencil className="h-4 w-4" />
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
