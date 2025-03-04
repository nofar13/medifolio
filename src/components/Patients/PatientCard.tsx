
import { Patient } from "@/types";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PatientCardProps {
  patient: Patient;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string) => void;
}

export const PatientCard = ({ patient, onView, onEdit, onDelete }: PatientCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onView(patient)}
              className="text-blue-500"
            >
              <Eye size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onEdit(patient)}
              className="text-amber-500"
            >
              <Edit size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDelete(patient.id)}
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
  );
};
