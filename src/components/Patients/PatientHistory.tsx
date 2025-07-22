
import { useState } from "react";
import { format } from "date-fns";
import { MedicalHistory } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PatientHistoryProps {
  history: MedicalHistory[];
  patientName?: string;
}

export function PatientHistory({ history, patientName }: PatientHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-medium">מטופל חדש - אין היסטוריה רפואית {patientName ? `ל${patientName}` : "למטופל זה"}</p>
        <p className="text-gray-400 text-sm mt-1">הוסף בדיקה חדשה כדי להתחיל לבנות את ההיסטוריה הרפואית</p>
      </div>
    );
  }

  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-right mb-6">
          היסטורית המטופל {patientName && `- ${patientName}`}
        </h2>
        <Button 
          className="bg-green-500 hover:bg-green-600"
          onClick={() => window.history.back()}
        >
          חזור
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-center text-green-600 mb-6">רשימת טיפולים</h3>
          
          <Accordion type="single" collapsible className="w-full">
            {sortedHistory.map((record, index) => (
              <AccordionItem key={record.id} value={`item-${index}`} className="border rounded-lg mb-3">
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 text-right w-full">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <div className="flex-1 text-right">
                      <div className="font-medium">טיפול מתאריך {record.date}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        חדות ראייה: ימין {record.visionData.rightVision || "לא נבדק"} | שמאל {record.visionData.leftVision || "לא נבדק"}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* נתוני ראייה */}
                    <Card className="border-l-4 border-l-blue-400">
                      <CardContent className="pt-4">
                        <h4 className="text-lg font-semibold mb-3 text-right text-blue-600">נתוני ראייה ורפרקציה</h4>
                        <div className="space-y-2 text-right">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-sm font-medium text-gray-600">חדות ראייה ימין:</span>
                              <p className="font-medium">{record.visionData.rightVision || "לא נבדק"}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-600">חדות ראייה שמאל:</span>
                              <p className="font-medium">{record.visionData.leftVision || "לא נבדק"}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-sm font-medium text-gray-600">רפרקציה צילינדרית ימין:</span>
                              <p className="font-medium">{record.visionData.rightCylindricalRefraction || "לא נבדק"}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-600">רפרקציה צילינדרית שמאל:</span>
                              <p className="font-medium">{record.visionData.leftCylindricalRefraction || "לא נבדק"}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-sm font-medium text-gray-600">רפרקציה ספרית ימין:</span>
                              <p className="font-medium">{record.visionData.rightSphericalRefraction || "לא נבדק"}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-600">רפרקציה ספרית שמאל:</span>
                              <p className="font-medium">{record.visionData.leftSphericalRefraction || "לא נבדק"}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* נתוני משקפיים ופזילה */}
                    <Card className="border-l-4 border-l-green-400">
                      <CardContent className="pt-4">
                        <h4 className="text-lg font-semibold mb-3 text-right text-green-600">נתוני משקפיים ופזילה</h4>
                        <div className="space-y-2 text-right">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-sm font-medium text-gray-600">משקפיים ימין:</span>
                              <p className="font-medium">{record.lensesData.rightGlasses || "לא נבדק"}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-600">משקפיים שמאל:</span>
                              <p className="font-medium">{record.lensesData.leftGlasses || "לא נבדק"}</p>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">זווית פזילה:</span>
                            <p className="font-medium">{record.lensesData.angleOfView || "לא נבדק"}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">תנועות עיניים:</span>
                            <p className="font-medium">{record.lensesData.pupilDistance || "לא נבדק"}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">ראיית עומק:</span>
                            <p className="font-medium">{record.lensesData.depthPerception || "לא נבדק"}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-600">Near Point of Convergence:</span>
                            <p className="font-medium">{record.lensesData.nearPointOfConvergence || "לא נבדק"}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* צ'קליסט בדיקות */}
                  {record.treatmentNotes && record.treatmentNotes.includes("(רשימת בדיקות:") && (
                    <Card className="mt-4 border-l-4 border-l-purple-400">
                      <CardContent className="pt-4">
                        <h4 className="text-lg font-semibold mb-3 text-right text-purple-600">רשימת בדיקות שבוצעו</h4>
                        <div className="bg-purple-50 p-3 rounded-md">
                          {(() => {
                            const checklistStart = record.treatmentNotes.indexOf("(רשימת בדיקות:");
                            
                            if (checklistStart === -1) return null;
                            
                            const checklistText = record.treatmentNotes.substring(checklistStart + "(רשימת בדיקות:".length).trim();
                            const cleanChecklistText = checklistText.replace(/\)$/, "");
                            const checklistItems = cleanChecklistText.split(", ").filter(item => item.trim());
                            
                            return (
                              <div className="space-y-2">
                                {checklistItems.map((item, index) => {
                                  const [itemName, status] = item.split(": ");
                                  const statusColor = status === "בוצע" ? "text-green-600" : 
                                                    status === "לא בוצע" ? "text-red-600" : "text-gray-500";
                                  return (
                                    <div key={index} className="flex justify-between items-center text-right">
                                      <span className={`font-medium ${statusColor}`}>{status}</span>
                                      <span className="text-gray-700">{itemName}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })()}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* הערות */}
                  {(record.treatmentNotes || record.followupNotes || record.prescriptionNotes) && (
                    <Card className="mt-4 border-l-4 border-l-orange-400">
                      <CardContent className="pt-4">
                        <h4 className="text-lg font-semibold mb-3 text-right text-orange-600">הערות והמלצות</h4>
                        
                        {record.treatmentNotes && (
                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-600 block text-right">סיכום טיפול:</span>
                            <div className="bg-gray-50 p-3 rounded-md mt-1">
                              <p className="text-right text-gray-700">
                                {(() => {
                                   const checklistStart = record.treatmentNotes.indexOf("(רשימת בדיקות:");
                                   if (checklistStart === -1) return record.treatmentNotes;
                                   return record.treatmentNotes.substring(0, checklistStart).trim();
                                })()}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {record.followupNotes && (
                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-600 block text-right">המלצות לטיפול:</span>
                            <div className="bg-gray-50 p-3 rounded-md mt-1">
                              <p className="text-right text-gray-700">{record.followupNotes}</p>
                            </div>
                          </div>
                        )}
                        
                        {record.prescriptionNotes && (
                          <div>
                            <span className="text-sm font-medium text-gray-600 block text-right">המלצות לביקורת:</span>
                            <div className="bg-gray-50 p-3 rounded-md mt-1">
                              <p className="text-right text-gray-700">{record.prescriptionNotes}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
