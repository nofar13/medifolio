
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
    // Logic to save settings would go here
    toast.success("ההגדרות נשמרו בהצלחה");
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
              <CardTitle className="text-lg text-right text-gray-800">הגדרות מערכת</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6 text-right">
                <p className="text-gray-600">הגדרות נוספות יתווספו בעתיד</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
