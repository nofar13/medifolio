
import { MainLayout } from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  const [clinicName, setClinicName] = useState("מרפאת יונינה");
  const [email, setEmail] = useState("contact@eyeclinic.com");
  const [phone, setPhone] = useState("03-1234567");
  const [address, setAddress] = useState("רחוב הרצל 100, תל אביב");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("ההגדרות נשמרו בהצלחה", {
      duration: 2000
    });
  };

  return (
    <MainLayout>
      <div className="animate-fadeIn">
        <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <SettingsIcon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">הגדרות המערכת</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <Card className="formal-card">
            <CardHeader className="bg-gray-50 py-4 border-b border-gray-100">
              <CardTitle className="text-lg text-right text-gray-800">פרטי המרפאה</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-right">
                    <label htmlFor="clinicName" className="font-medium text-gray-700">שם המרפאה:</label>
                    <Input 
                      id="clinicName"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      className="text-right border-gray-300"
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="space-y-2 text-right">
                    <label htmlFor="email" className="font-medium text-gray-700">אימייל:</label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-right border-gray-300"
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="space-y-2 text-right">
                    <label htmlFor="phone" className="font-medium text-gray-700">טלפון:</label>
                    <Input 
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-right border-gray-300"
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="space-y-2 text-right">
                    <label htmlFor="address" className="font-medium text-gray-700">כתובת:</label>
                    <Input 
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="text-right border-gray-300"
                      dir="rtl"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button type="submit" className="w-full md:w-auto shadow-sm">
                    שמור הגדרות
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card className="formal-card">
            <CardHeader className="bg-gray-50 py-4 border-b border-gray-100">
              <CardTitle className="text-lg text-right text-gray-800">מידע נוסף על המרפאה</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">שעות פעילות:</h3>
                    <p className="text-gray-600">א'-ה': 08:00-17:00</p>
                    <p className="text-gray-600">ו': 08:00-13:00</p>
                    <p className="text-gray-600">שבת: סגור</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">שירותים:</h3>
                    <p className="text-gray-600">בדיקות ראייה מקיפות</p>
                    <p className="text-gray-600">התאמת משקפיים</p>
                    <p className="text-gray-600">טיפול בפזילות</p>
                    <p className="text-gray-600">בדיקות עיניים לילדים</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">צוות רפואי:</h3>
                    <p className="text-gray-600">ד"ר יונינה כהן - אופטומטריסטית מוסמכת</p>
                    <p className="text-gray-600">15 שנות ניסיון בתחום</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">ציוד מתקדם:</h3>
                    <p className="text-gray-600">אוטו-רפרקטומטר</p>
                    <p className="text-gray-600">מכשיר למדידת לחץ עין</p>
                    <p className="text-gray-600">מערכת בדיקת שדה ראייה</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="formal-card">
            <CardHeader className="bg-gray-50 py-4 border-b border-gray-100">
              <CardTitle className="text-lg text-right text-gray-800">הגדרות מערכת</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6 text-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">גיבוי נתונים:</h3>
                    <p className="text-gray-600 mb-2">גיבוי אוטומטי יומי</p>
                    <Button variant="outline" size="sm">גבה עכשיו</Button>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">עדכוני מערכת:</h3>
                    <p className="text-gray-600 mb-2">גרסה נוכחית: 2.1.0</p>
                    <Button variant="outline" size="sm">בדוק עדכונים</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
