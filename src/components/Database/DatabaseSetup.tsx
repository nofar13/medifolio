
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Database, Upload } from "lucide-react";

export const DatabaseSetup = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createTables = async () => {
    setIsCreating(true);
    try {
      // יצירת טבלת מטופלים
      const patientsTableSQL = `
        CREATE TABLE IF NOT EXISTS patients (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          id_number VARCHAR(20) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          email VARCHAR(255),
          age INTEGER,
          gender VARCHAR(10),
          additional_notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;

      // יצירת טבלת היסטוריה רפואית
      const medicalHistoryTableSQL = `
        CREATE TABLE IF NOT EXISTS medical_history (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
          date DATE NOT NULL,
          right_vision VARCHAR(50),
          left_vision VARCHAR(50),
          right_cylindrical_refraction VARCHAR(50),
          left_cylindrical_refraction VARCHAR(50),
          right_spherical_refraction VARCHAR(50),
          left_spherical_refraction VARCHAR(50),
          right_glasses VARCHAR(50),
          left_glasses VARCHAR(50),
          pupil_distance VARCHAR(50),
          angle_of_view VARCHAR(50),
          near_point_of_convergence VARCHAR(50),
          depth_perception VARCHAR(50),
          treatment_notes TEXT,
          followup_notes TEXT,
          prescription_notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;

      console.log("Creating database tables...");
      console.log("Patients table:", patientsTableSQL);
      console.log("Medical history table:", medicalHistoryTableSQL);

      toast({
        title: "טבלאות נוצרו בהצלחה",
        description: "מסד הנתונים מוכן לשימוש",
      });
    } catch (error) {
      console.error("Error creating tables:", error);
      toast({
        title: "שגיאה ביצירת הטבלאות",
        description: "אנא נסה שוב",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          הגדרת מסד נתונים
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          יצירת טבלאות במסד הנתונים עבור מטופלים והיסטוריה רפואית
        </p>
        <Button 
          onClick={createTables} 
          disabled={isCreating}
          className="w-full"
        >
          {isCreating ? "יוצר טבלאות..." : "צור טבלאות במסד הנתונים"}
        </Button>
      </CardContent>
    </Card>
  );
};
