
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
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<MedicalHistory | null>(null);

  const toggleVisibility = (id: string) => {
    if (visibleItems.includes(id)) {
      setVisibleItems(visibleItems.filter((item) => item !== id));
    } else {
      setVisibleItems([...visibleItems, id]);
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-medium">אין היסטוריה רפואית {patientName ? `ל${patientName}` : "למטופל זה"}</p>
        <p className="text-gray-400 text-sm mt-1">הוסף בדיקה חדשה כדי להתחיל</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-right">
        היסטוריית מטופל {patientName && `- ${patientName}`}
      </h2>
      
      {history.map((record) => (
        <Card key={record.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div 
            onClick={() => toggleVisibility(record.id)}
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary ml-2" 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRecord(record);
                }}
              >
                <Eye size={16} />
              </Button>
              {visibleItems.includes(record.id) ? 
                <ChevronUp size={16} /> : 
                <ChevronDown size={16} />
              }
            </div>
            <div className="text-right">
              <h3 className="font-semibold">{format(new Date(record.date), "dd/MM/yyyy")}</h3>
              <p className="text-sm text-gray-500">בדיקת עיניים תקופתית</p>
            </div>
          </div>
          
          {visibleItems.includes(record.id) && (
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-md font-semibold mb-4 text-right">נתוני ראייה</h4>
                  <table className="w-full text-right">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-sm font-semibold">חדות ראייה ימין:</td>
                        <td className="py-2">{record.visionData.rightVision}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm font-semibold">חדות ראייה שמאל:</td>
                        <td className="py-2">{record.visionData.leftVision}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm font-semibold">רפרקציה צילינדרית ימין:</td>
                        <td className="py-2">{record.visionData.rightCylindricalRefraction}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm font-semibold">רפרקציה צילינדרית שמאל:</td>
                        <td className="py-2">{record.visionData.leftCylindricalRefraction}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm font-semibold">רפרקציה ספיריקאלית ימין:</td>
                        <td className="py-2">{record.visionData.rightSphericalRefraction}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm font-semibold">רפרקציה ספיריקאלית שמאל:</td>
                        <td className="py-2">{record.visionData.leftSphericalRefraction}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h4 className="text-md font-semibold mb-4 text-right">נתוני משקפיים ופזילה</h4>
                  <table className="w-full text-right">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-sm font-semibold">משקפיים ימין:</td>
                        <td className="py-2">{record.lensesData.rightGlasses}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm font-semibold">משקפיים שמאל:</td>
                        <td className="py-2">{record.lensesData.leftGlasses}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm font-semibold">זווית פזילה:</td>
                        <td className="py-2">{record.lensesData.angleOfView}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm font-semibold">תנועות עיניים:</td>
                        <td className="py-2">{record.lensesData.pupilDistance}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm font-semibold">ראיית עומק:</td>
                        <td className="py-2">{record.lensesData.depthPerception}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-sm font-semibold">Near Point of Convergence:</td>
                        <td className="py-2">{record.lensesData.nearPointOfConvergence}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {(record.treatmentNotes || record.followupNotes || record.prescriptionNotes) && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-4 text-right">הערות והמלצות</h4>
                  
                  {record.treatmentNotes && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-right">סיכום טיפול:</p>
                      <p className="text-right text-gray-700 bg-gray-50 p-3 rounded-md mt-1">{record.treatmentNotes}</p>
                    </div>
                  )}
                  
                  {record.followupNotes && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-right">המלצות למטופל:</p>
                      <p className="text-right text-gray-700 bg-gray-50 p-3 rounded-md mt-1">{record.followupNotes}</p>
                    </div>
                  )}
                  
                  {record.prescriptionNotes && (
                    <div>
                      <p className="text-sm font-semibold text-right">המלצות למרשמים:</p>
                      <p className="text-right text-gray-700 bg-gray-50 p-3 rounded-md mt-1">{record.prescriptionNotes}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      ))}

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
