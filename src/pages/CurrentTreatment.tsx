
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const CurrentTreatment = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save the data to your backend
    // For now, we'll just show a success message
    
    const treatmentData = {
      patientId,
      date: new Date().toISOString(),
      visionData,
      lensesData,
      treatmentNotes,
      followupNotes,
      prescriptionNotes
    };
    
    console.log('Saving treatment data:', treatmentData);
    
    toast({
      title: "נשמר בהצלחה",
      description: "נתוני הטיפול נשמרו בהצלחה",
    });
    
    // Navigate back to patient page
    navigate(`/patients/${patientId}/treatment`);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">טיפול חדש</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Vision and Refraction Data Table */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-center mb-4">נתוני ראייה ורפרקציה</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 border text-right">שמאל</th>
                      <th className="py-2 px-4 border text-right">ימין</th>
                      <th className="py-2 px-4 border text-right">בדיקה</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border">
                        <Input
                          name="leftVision"
                          value={visionData.leftVision}
                          onChange={handleVisionDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <Input
                          name="rightVision"
                          value={visionData.rightVision}
                          onChange={handleVisionDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border font-medium text-amber-600">חדות ראייה</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">
                        <Input
                          name="leftCylindricalRefraction"
                          value={visionData.leftCylindricalRefraction}
                          onChange={handleVisionDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <Input
                          name="rightCylindricalRefraction"
                          value={visionData.rightCylindricalRefraction}
                          onChange={handleVisionDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border font-medium text-amber-600">רפרקציה צילינדרית</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">
                        <Input
                          name="leftSphericalRefraction"
                          value={visionData.leftSphericalRefraction}
                          onChange={handleVisionDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <Input
                          name="rightSphericalRefraction"
                          value={visionData.rightSphericalRefraction}
                          onChange={handleVisionDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border font-medium text-amber-600">רפרקציה ספיריקלית</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Glasses and Strabismus Data Table */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-center mb-4">נתוני משקפיים ופזילה</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 border text-right">שמאל</th>
                      <th className="py-2 px-4 border text-right">ימין</th>
                      <th className="py-2 px-4 border text-right">בדיקה</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border">
                        <Input
                          name="leftGlasses"
                          value={lensesData.leftGlasses}
                          onChange={handleLensesDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <Input
                          name="rightGlasses"
                          value={lensesData.rightGlasses}
                          onChange={handleLensesDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border font-medium text-amber-600">משקפיים</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">
                        <Input
                          name="pupilDistance"
                          value={lensesData.pupilDistance}
                          onChange={handleLensesDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <Input
                          name="pupilDistance"
                          value={lensesData.pupilDistance}
                          onChange={handleLensesDataChange}
                          disabled
                        />
                      </td>
                      <td className="py-2 px-4 border font-medium text-amber-600">זווית פזילה</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">
                        <Input
                          name="angleOfView"
                          value={lensesData.angleOfView}
                          onChange={handleLensesDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <Input
                          name="angleOfView"
                          value={lensesData.angleOfView}
                          onChange={handleLensesDataChange}
                          disabled
                        />
                      </td>
                      <td className="py-2 px-4 border font-medium text-amber-600">תנועות עיניים</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">
                        <Input
                          name="nearPointOfConvergence"
                          value={lensesData.nearPointOfConvergence}
                          onChange={handleLensesDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <Input
                          name="nearPointOfConvergence"
                          value={lensesData.nearPointOfConvergence}
                          onChange={handleLensesDataChange}
                          disabled
                        />
                      </td>
                      <td className="py-2 px-4 border font-medium text-amber-600">ראיית עומק</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">
                        <Input
                          name="depthPerception"
                          value={lensesData.depthPerception}
                          onChange={handleLensesDataChange}
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <Input
                          name="depthPerception"
                          value={lensesData.depthPerception}
                          onChange={handleLensesDataChange}
                          disabled
                        />
                      </td>
                      <td className="py-2 px-4 border font-medium text-amber-600">Near Point of Convergence</td>
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
                <h3 className="text-lg font-medium mb-2">סיכום טיפול:</h3>
                <Textarea
                  value={treatmentNotes}
                  onChange={(e) => setTreatmentNotes(e.target.value)}
                  placeholder="הכנס כאן את סיכום הטיפול"
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">המלצות לטיפול:</h3>
                <Textarea
                  value={followupNotes}
                  onChange={(e) => setFollowupNotes(e.target.value)}
                  placeholder="הכנס כאן את ההמלצות לטיפול"
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">המלצות לביקורת:</h3>
                <Textarea
                  value={prescriptionNotes}
                  onChange={(e) => setPrescriptionNotes(e.target.value)}
                  placeholder="הכנס כאן את ההמלצות לביקורת"
                  className="min-h-[100px]"
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
