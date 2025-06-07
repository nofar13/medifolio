import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { medicalHistories, patients } from "@/data/mockData";
import { MedicalHistory, Patient } from "@/types";
import { FilePlus } from "lucide-react";
import { TreatmentForm } from "@/components/Patients/TreatmentForm";
import { usePatients } from "@/hooks/usePatients";

const PatientTreatment = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | undefined>();
  
  const {
    allMedicalHistories,
    handleAddMedicalHistory,
    getPatientById,
    getPatientHistory
  } = usePatients(patients, medicalHistories);

  useEffect(() => {
    if (patientId) {
      const foundPatient = getPatientById(patientId);
      if (foundPatient) {
        setPatient(foundPatient);
      } else {
        toast({
          title: "שגיאה",
          description: "המטופל לא נמצא",
          variant: "destructive",
        });
        navigate("/patients");
      }
    }
    
    const timer = setTimeout(() => {
      const mainContent = document.querySelector(".main-content");
      if (mainContent) {
        mainContent.classList.add("animate-fadeIn");
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [patientId, navigate, getPatientById]);

  const navigateToCurrentTreatment = () => {
    if (patientId) {
      navigate(`/patients/${patientId}/current-treatment`);
    }
  };

  const handleTreatmentSaved = (newHistory: MedicalHistory) => {
    handleAddMedicalHistory(newHistory);
  };

  if (!patient) {
    return <MainLayout>
      <div className="flex justify-center items-center h-full">
        <p>טוען...</p>
      </div>
    </MainLayout>;
  }

  const patientHistory = getPatientHistory(patient.id);

  return (
    <MainLayout>
      <div className="main-content opacity-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">טיפול חדש</h1>
          <div className="flex gap-2">
            <Button 
              onClick={navigateToCurrentTreatment} 
              className="mr-2"
              variant="default"
            >
              <FilePlus className="ml-2 h-4 w-4" />
              טיפול נוכחי
            </Button>
            <Button variant="outline" onClick={() => navigate("/patients")}>
              חזרה לרשימת המטופלים
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>פרטי מטופל: {patient.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">תעודת זהות</p>
                  <p>{patient.idNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">גיל</p>
                  <p>{patient.age}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">מגדר</p>
                  <p>{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">טלפון</p>
                  <p>{patient.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">דוא"ל</p>
                  <p>{patient.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">הערות</p>
                  <p>{patient.additionalNotes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="new-treatment">
          <TabsList className="mb-4">
            <TabsTrigger value="new-treatment">טיפול חדש</TabsTrigger>
            <TabsTrigger value="history">היסטוריית טיפולים</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-treatment">
            <TreatmentForm 
              patient={patient}
              onTreatmentSaved={handleTreatmentSaved}
            />
          </TabsContent>
          
          <TabsContent value="history">
            {patientHistory.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p>אין היסטוריית טיפולים למטופל זה</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {histories.map((history, index) => (
                  <Card key={history.id}>
                    <CardHeader>
                      <CardTitle>טיפול מתאריך {history.date}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">נתוני ראייה</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">חדות ראייה</p>
                              <p>ימין: {history.visionData.rightVision}</p>
                              <p>שמאל: {history.visionData.leftVision}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">שבירה צילינדרית</p>
                              <p>ימין: {history.visionData.rightCylindricalRefraction}</p>
                              <p>שמאל: {history.visionData.leftCylindricalRefraction}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">שבירה ספרית</p>
                              <p>ימין: {history.visionData.rightSphericalRefraction}</p>
                              <p>שמאל: {history.visionData.leftSphericalRefraction}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">נתוני עדשות</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">משקפיים</p>
                              <p>ימין: {history.lensesData.rightGlasses}</p>
                              <p>שמאל: {history.lensesData.leftGlasses}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">פרמטרים נוספים</p>
                              <p>מרחק אישונים: {history.lensesData.pupilDistance}</p>
                              <p>זווית מבט: {history.lensesData.angleOfView}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">מדדים נוספים</p>
                              <p>נק' התכנסות: {history.lensesData.nearPointOfConvergence}</p>
                              <p>תפיסת עומק: {history.lensesData.depthPerception}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">הערות</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">הערות טיפול</p>
                              <p>{history.treatmentNotes}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">הערות למעקב</p>
                              <p>{history.followupNotes}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">מרשם</p>
                              <p>{history.prescriptionNotes}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PatientTreatment;
