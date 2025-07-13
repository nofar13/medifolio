
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { TreatmentChecklist, ChecklistItem } from '@/components/Patients/TreatmentChecklist';
import { usePatients } from '@/hooks/usePatients';
import { patients, medicalHistories } from '@/data/mockData';

const CurrentTreatment = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  
  const { getPatientById, getPatientHistory, handleAddMedicalHistory } = usePatients(patients, medicalHistories);
  const patient = patientId ? getPatientById(patientId) : null;
  const patientHistory = patientId ? getPatientHistory(patientId) : [];
  const isReturningPatient = patientHistory.length > 0;
  
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  
  // State for vision and refraction data
  const [visionData, setVisionData] = useState({
    rightVision: '',
    leftVision: '',
    rightCylindricalRefraction: '',
    leftCylindricalRefraction: '',
    rightSphericalRefraction: '',
    leftSphericalRefraction: '',
  });
  
  // State for glasses and strabismus data
  const [lensesData, setLensesData] = useState({
    rightGlasses: '',
    leftGlasses: '',
    pupilDistance: '',
    angleOfView: '',
    nearPointOfConvergence: '',
    depthPerception: '',
  });
  
  // State for notes
  const [treatmentNotes, setTreatmentNotes] = useState('');
  const [followupNotes, setFollowupNotes] = useState('');
  const [prescriptionNotes, setPrescriptionNotes] = useState('');
  
  const handleVisionDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVisionData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLensesDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLensesData(prev => ({ ...prev, [name]: value }));
  };

  const handleChecklistChange = (items: ChecklistItem[]) => {
    setChecklist(items);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patient) {
      toast({
        title: "שגיאה",
        description: "לא נמצא מטופל",
        variant: "destructive",
      });
      return;
    }

    const checklistSummary = checklist.map(item => {
      const itemText = item.itemId;
      const status = item.status === "done" 
        ? "בוצע" 
        : item.status === "not-done" 
          ? "לא בוצע" 
          : "לא רלוונטי";
      return `${itemText}: ${status}`;
    }).join(", ");
    
    const date = new Date().toLocaleDateString();
    const newHistory = {
      id: (Date.now()).toString(),
      patientId: patient.id,
      date,
      visionData,
      lensesData,
      treatmentNotes: `${treatmentNotes} ${checklistSummary ? `(רשימת בדיקות: ${checklistSummary})` : ''}`,
      followupNotes,
      prescriptionNotes
    };
    
    handleAddMedicalHistory(newHistory);
    
    toast({
      title: "נשמר בהצלחה",
      description: "נתוני הטיפול נשמרו בהצלחה",
    });
    
    navigate(`/patients/${patientId}/treatment`);
  };
  
  if (!patient) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-full">
          <p>מטופל לא נמצא</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">טיפול חדש</h1>
          <div className="text-right">
            <p className="text-lg font-semibold">{patient.name}</p>
            <p className="text-sm text-gray-600">ת.ז: {patient.idNumber}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {isReturningPatient && (
            <TreatmentChecklist onChange={handleChecklistChange} />
          )}
          
          {/* Vision and Refraction Data Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">נתוני ראייה ורפרקציה</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 border border-gray-300 text-right font-medium">בדיקה</th>
                      <th className="py-3 px-4 border border-gray-300 text-center font-medium">ימין</th>
                      <th className="py-3 px-4 border border-gray-300 text-center font-medium">שמאל</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border border-gray-300 font-medium text-orange-600">חדות ראייה</td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="rightVision"
                          value={visionData.rightVision}
                          onChange={handleVisionDataChange}
                          className="text-center"
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="leftVision"
                          value={visionData.leftVision}
                          onChange={handleVisionDataChange}
                          className="text-center"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border border-gray-300 font-medium text-orange-600">רפרקציה צילינדרית</td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="rightCylindricalRefraction"
                          value={visionData.rightCylindricalRefraction}
                          onChange={handleVisionDataChange}
                          className="text-center"
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="leftCylindricalRefraction"
                          value={visionData.leftCylindricalRefraction}
                          onChange={handleVisionDataChange}
                          className="text-center"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border border-gray-300 font-medium text-orange-600">רפרקציה ספיריקלית</td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="rightSphericalRefraction"
                          value={visionData.rightSphericalRefraction}
                          onChange={handleVisionDataChange}
                          className="text-center"
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="leftSphericalRefraction"
                          value={visionData.leftSphericalRefraction}
                          onChange={handleVisionDataChange}
                          className="text-center"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Glasses and Strabismus Data Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">נתוני משקפיים ופזילה</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 border border-gray-300 text-right font-medium">בדיקה</th>
                      <th className="py-3 px-4 border border-gray-300 text-center font-medium">ימין</th>
                      <th className="py-3 px-4 border border-gray-300 text-center font-medium">שמאל</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border border-gray-300 font-medium text-orange-600">משקפיים</td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="rightGlasses"
                          value={lensesData.rightGlasses}
                          onChange={handleLensesDataChange}
                          className="text-center"
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="leftGlasses"
                          value={lensesData.leftGlasses}
                          onChange={handleLensesDataChange}
                          className="text-center"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border border-gray-300 font-medium text-orange-600">זווית פזילה</td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="pupilDistance"
                          value={lensesData.pupilDistance}
                          onChange={handleLensesDataChange}
                          className="text-center"
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-300 bg-gray-50">
                        <Input
                          disabled
                          className="text-center bg-gray-50"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border border-gray-300 font-medium text-orange-600">תנועות עיניים</td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="angleOfView"
                          value={lensesData.angleOfView}
                          onChange={handleLensesDataChange}
                          className="text-center"
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-300 bg-gray-50">
                        <Input
                          disabled
                          className="text-center bg-gray-50"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border border-gray-300 font-medium text-orange-600">ראיית עומק</td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="depthPerception"
                          value={lensesData.depthPerception}
                          onChange={handleLensesDataChange}
                          className="text-center"
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-300 bg-gray-50">
                        <Input
                          disabled
                          className="text-center bg-gray-50"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border border-gray-300 font-medium text-orange-600">Near Point of Convergence</td>
                      <td className="py-2 px-4 border border-gray-300">
                        <Input
                          name="nearPointOfConvergence"
                          value={lensesData.nearPointOfConvergence}
                          onChange={handleLensesDataChange}
                          className="text-center"
                        />
                      </td>
                      <td className="py-2 px-4 border border-gray-300 bg-gray-50">
                        <Input
                          disabled
                          className="text-center bg-gray-50"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Notes Section */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2 text-right">סיכום טיפול:</h3>
                <Textarea
                  value={treatmentNotes}
                  onChange={(e) => setTreatmentNotes(e.target.value)}
                  placeholder="הכנס כאן את סיכום הטיפול"
                  className="min-h-[100px] text-right"
                  dir="rtl"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2 text-right">המלצות לטיפול:</h3>
                <Textarea
                  value={followupNotes}
                  onChange={(e) => setFollowupNotes(e.target.value)}
                  placeholder="הכנס כאן את ההמלצות לטיפול"
                  className="min-h-[100px] text-right"
                  dir="rtl"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2 text-right">המלצות לביקורת:</h3>
                <Textarea
                  value={prescriptionNotes}
                  onChange={(e) => setPrescriptionNotes(e.target.value)}
                  placeholder="הכנס כאן את ההמלצות לביקורת"
                  className="min-h-[100px] text-right"
                  dir="rtl"
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button type="submit" className="w-32">
              <Save className="ml-2 h-4 w-4" />
              שמור
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default CurrentTreatment;
