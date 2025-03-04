
import { MainLayout } from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { patients as initialPatients, medicalHistories } from "@/data/mockData";
import { Patient, MedicalHistory } from "@/types";
import { ArrowRight } from "lucide-react";

const PatientTreatment = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  
  // Vision data
  const [rightVision, setRightVision] = useState("");
  const [leftVision, setLeftVision] = useState("");
  const [rightCylindrical, setRightCylindrical] = useState("");
  const [leftCylindrical, setLeftCylindrical] = useState("");
  const [rightSpherical, setRightSpherical] = useState("");
  const [leftSpherical, setLeftSpherical] = useState("");
  
  // Lenses data
  const [rightGlasses, setRightGlasses] = useState("");
  const [leftGlasses, setLeftGlasses] = useState("");
  const [pupilDistance, setPupilDistance] = useState("");
  const [angleOfView, setAngleOfView] = useState("");
  const [nearPointOfConvergence, setNearPointOfConvergence] = useState("");
  const [depthPerception, setDepthPerception] = useState("");
  
  // Notes
  const [treatmentNotes, setTreatmentNotes] = useState("");
  const [followupNotes, setFollowupNotes] = useState("");
  const [prescriptionNotes, setPrescriptionNotes] = useState("");

  useEffect(() => {
    if (!patientId) return;
    
    const foundPatient = initialPatients.find(p => p.id === patientId);
    if (foundPatient) {
      setPatient(foundPatient);
    } else {
      toast({
        title: "שגיאה",
        description: "לא נמצא מטופל עם המזהה שצוין",
        variant: "destructive"
      });
      navigate("/patients");
    }
  }, [patientId, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patient) return;
    
    // Create new medical history entry
    const newEntry: MedicalHistory = {
      id: (medicalHistories.length + 1).toString(),
      patientId: patient.id,
      date: new Date().toLocaleDateString('en-GB'),
      visionData: {
        rightVision,
        leftVision,
        rightCylindricalRefraction: rightCylindrical,
        leftCylindricalRefraction: leftCylindrical,
        rightSphericalRefraction: rightSpherical,
        leftSphericalRefraction: leftSpherical
      },
      lensesData: {
        rightGlasses,
        leftGlasses,
        pupilDistance,
        angleOfView,
        nearPointOfConvergence,
        depthPerception
      },
      treatmentNotes,
      followupNotes,
      prescriptionNotes
    };
    
    // In a real app, you would save this to a database
    console.log("New medical history entry:", newEntry);
    
    toast({
      title: "טיפול נשמר בהצלחה",
      description: `נתוני הטיפול של ${patient.name} נשמרו במערכת`
    });
    
    navigate("/patients");
  };

  if (!patient) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <p>טוען...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="animate-fadeIn">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate("/patients")}>
            <ArrowRight className="ml-2" />
            חזרה לרשימת מטופלים
          </Button>
          <h1 className="text-3xl font-bold">טיפול חדש</h1>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-primary">{patient.name}</h2>
          <p className="text-gray-500">ת.ז: {patient.idNumber} | גיל: {patient.age} | טלפון: {patient.phone}</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-8">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl text-center">נתוני ראייה ורפרקציה</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">שמאל</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">ימין</th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">בדיקה</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4">
                        <Input value={leftVision} onChange={(e) => setLeftVision(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4">
                        <Input value={rightVision} onChange={(e) => setRightVision(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4 text-right font-medium">חדות ראייה</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4">
                        <Input value={leftCylindrical} onChange={(e) => setLeftCylindrical(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4">
                        <Input value={rightCylindrical} onChange={(e) => setRightCylindrical(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4 text-right font-medium">רפרקציה צילינדרית</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4">
                        <Input value={leftSpherical} onChange={(e) => setLeftSpherical(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4">
                        <Input value={rightSpherical} onChange={(e) => setRightSpherical(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4 text-right font-medium">רפרקציה ספרית</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl text-center">נתוני משקפיים ופזילה</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">שמאל</th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">ימין</th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">בדיקה</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-4">
                        <Input value={leftGlasses} onChange={(e) => setLeftGlasses(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4">
                        <Input value={rightGlasses} onChange={(e) => setRightGlasses(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4 text-right font-medium">משקפיים</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td colSpan={2} className="py-4 px-4">
                        <Input value={pupilDistance} onChange={(e) => setPupilDistance(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4 text-right font-medium">זווית פזילה</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td colSpan={2} className="py-4 px-4">
                        <Input value={angleOfView} onChange={(e) => setAngleOfView(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4 text-right font-medium">תנועות עיניים</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td colSpan={2} className="py-4 px-4">
                        <Input value={depthPerception} onChange={(e) => setDepthPerception(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4 text-right font-medium">ראיית עומק</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td colSpan={2} className="py-4 px-4">
                        <Input value={nearPointOfConvergence} onChange={(e) => setNearPointOfConvergence(e.target.value)} dir="rtl" />
                      </td>
                      <td className="py-4 px-4 text-right font-medium">Near Point of Convergence</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl text-center">סיכום טיפול</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <Label className="block mb-2 text-right">סיכום טיפול:</Label>
                  <Textarea 
                    placeholder="הכנס את סיכום הטיפול כאן..." 
                    value={treatmentNotes} 
                    onChange={(e) => setTreatmentNotes(e.target.value)}
                    className="h-24"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <Label className="block mb-2 text-right">המלצות לטיפול:</Label>
                  <Textarea 
                    placeholder="הכנס את המלצות לטיפול כאן..." 
                    value={followupNotes} 
                    onChange={(e) => setFollowupNotes(e.target.value)}
                    className="h-24"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <Label className="block mb-2 text-right">המלצות למרשם:</Label>
                  <Textarea 
                    placeholder="הכנס את המלצות למרשם כאן..." 
                    value={prescriptionNotes} 
                    onChange={(e) => setPrescriptionNotes(e.target.value)}
                    className="h-24"
                    dir="rtl"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 flex justify-center p-4">
              <Button type="submit" className="w-32">שמור</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </MainLayout>
  );
};

export default PatientTreatment;
