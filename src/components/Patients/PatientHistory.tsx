
import { useState } from "react";
import { format } from "date-fns";
import { MedicalHistory } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PatientHistoryProps {
  history: MedicalHistory[];
  patientName?: string;
}

export function PatientHistory({ history, patientName }: PatientHistoryProps) {
  const [selectedRecord, setSelectedRecord] = useState<MedicalHistory | null>(null);

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-medium">אין היסטוריה רפואית {patientName ? `ל${patientName}` : "למטופל זה"}</p>
        <p className="text-gray-400 text-sm mt-1">הוסף בדיקה חדשה כדי להתחיל</p>
      </div>
    );
  }

  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-right mb-6">
        היסטוריית מטופלים {patientName && `- ${patientName}`}
      </h2>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-center text-green-600 mb-8">היסטוריית מטופלים</h3>
          
          <div className="mb-8">
            <h4 className="text-xl font-bold text-right mb-4">נתוני ראייה ורפרקציה</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-center">תאריך</th>
                    <th className="border p-2 text-center">חדות ראייה ימין</th>
                    <th className="border p-2 text-center">חדות ראייה שמאל</th>
                    <th className="border p-2 text-center">רפרקציה צילינדרית ימין</th>
                    <th className="border p-2 text-center">רפרקציה צילינדרית שמאל</th>
                    <th className="border p-2 text-center">רפרקציה ספריקטיבית ימין</th>
                    <th className="border p-2 text-center">רפרקציה ספריקטיבית שמאל</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedHistory.map((record) => (
                    <tr key={`vision-${record.id}`} className="hover:bg-gray-50">
                      <td className="border p-2 text-center">{record.date}</td>
                      <td className="border p-2 text-center">{record.visionData.rightVision}</td>
                      <td className="border p-2 text-center">{record.visionData.leftVision}</td>
                      <td className="border p-2 text-center">{record.visionData.rightCylindricalRefraction}</td>
                      <td className="border p-2 text-center">{record.visionData.leftCylindricalRefraction}</td>
                      <td className="border p-2 text-center">{record.visionData.rightSphericalRefraction}</td>
                      <td className="border p-2 text-center">{record.visionData.leftSphericalRefraction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-bold text-right mb-4">נתוני משקפיים ופזילה</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-center">תאריך</th>
                    <th className="border p-2 text-center">משקפיים ימין</th>
                    <th className="border p-2 text-center">משקפיים שמאל</th>
                    <th className="border p-2 text-center">זווית פזילה</th>
                    <th className="border p-2 text-center">תנועות עיניים</th>
                    <th className="border p-2 text-center">ראיית עומק</th>
                    <th className="border p-2 text-center">Near Point of Convergence</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedHistory.map((record) => (
                    <tr key={`lenses-${record.id}`} className="hover:bg-gray-50">
                      <td className="border p-2 text-center">{record.date}</td>
                      <td className="border p-2 text-center">{record.lensesData.rightGlasses}</td>
                      <td className="border p-2 text-center">{record.lensesData.leftGlasses}</td>
                      <td className="border p-2 text-center">{record.lensesData.angleOfView}</td>
                      <td className="border p-2 text-center">{record.lensesData.pupilDistance}</td>
                      <td className="border p-2 text-center">{record.lensesData.depthPerception}</td>
                      <td className="border p-2 text-center">{record.lensesData.nearPointOfConvergence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button className="bg-green-500 hover:bg-green-600">חזור</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedRecord} onOpenChange={(open) => !open && setSelectedRecord(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-right">
              פרטי ביקור - {selectedRecord && format(new Date(selectedRecord.date), "dd/MM/yyyy")}
            </DialogTitle>
          </DialogHeader>
          
          {selectedRecord && (
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-lg font-semibold mb-4 text-right">נתוני ראייה</h4>
                    <table className="w-full text-right">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 text-sm font-semibold">חדות ראייה ימין:</td>
                          <td className="py-2">{selectedRecord.visionData.rightVision}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-sm font-semibold">חדות ראייה שמאל:</td>
                          <td className="py-2">{selectedRecord.visionData.leftVision}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-sm font-semibold">רפרקציה צילינדרית ימין:</td>
                          <td className="py-2">{selectedRecord.visionData.rightCylindricalRefraction}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-sm font-semibold">רפרקציה צילינדרית שמאל:</td>
                          <td className="py-2">{selectedRecord.visionData.leftCylindricalRefraction}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-sm font-semibold">רפרקציה ספיריקאלית ימין:</td>
                          <td className="py-2">{selectedRecord.visionData.rightSphericalRefraction}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-sm font-semibold">רפרקציה ספיריקאלית שמאל:</td>
                          <td className="py-2">{selectedRecord.visionData.leftSphericalRefraction}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="text-lg font-semibold mb-4 text-right">נתוני משקפיים ופזילה</h4>
                    <table className="w-full text-right">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 text-sm font-semibold">משקפיים ימין:</td>
                          <td className="py-2">{selectedRecord.lensesData.rightGlasses}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-sm font-semibold">משקפיים שמאל:</td>
                          <td className="py-2">{selectedRecord.lensesData.leftGlasses}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-sm font-semibold">זווית פזילה:</td>
                          <td className="py-2">{selectedRecord.lensesData.angleOfView}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-sm font-semibold">תנועות עיניים:</td>
                          <td className="py-2">{selectedRecord.lensesData.pupilDistance}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-sm font-semibold">ראיית עומק:</td>
                          <td className="py-2">{selectedRecord.lensesData.depthPerception}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-sm font-semibold">Near Point of Convergence:</td>
                          <td className="py-2">{selectedRecord.lensesData.nearPointOfConvergence}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
              
              {(selectedRecord.treatmentNotes || selectedRecord.followupNotes || selectedRecord.prescriptionNotes) && (
                <Card className="mt-6">
                  <CardContent className="pt-6">
                    <h4 className="text-lg font-semibold mb-4 text-right">הערות והמלצות</h4>
                    
                    {selectedRecord.treatmentNotes && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-right">סיכום טיפול:</p>
                        <p className="text-right text-gray-700 bg-gray-50 p-3 rounded-md mt-1">{selectedRecord.treatmentNotes}</p>
                      </div>
                    )}
                    
                    {selectedRecord.followupNotes && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-right">המלצות למטופל:</p>
                        <p className="text-right text-gray-700 bg-gray-50 p-3 rounded-md mt-1">{selectedRecord.followupNotes}</p>
                      </div>
                    )}
                    
                    {selectedRecord.prescriptionNotes && (
                      <div>
                        <p className="text-sm font-semibold text-right">המלצות למרשמים:</p>
                        <p className="text-right text-gray-700 bg-gray-50 p-3 rounded-md mt-1">{selectedRecord.prescriptionNotes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
