
import { MainLayout } from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

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
        <h1 className="text-3xl font-bold mb-8">הגדרות המערכת</h1>
        
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader className="bg-gray-50 py-4">
              <CardTitle className="text-xl text-right">פרטי המרפאה</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-right">
                    <label htmlFor="clinicName" className="font-medium">שם המרפאה:</label>
                    <Input 
                      id="clinicName"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="space-y-2 text-right">
                    <label htmlFor="email" className="font-medium">אימייל:</label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="space-y-2 text-right">
                    <label htmlFor="phone" className="font-medium">טלפון:</label>
                    <Input 
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                  
                  <div className="space-y-2 text-right">
                    <label htmlFor="address" className="font-medium">כתובת:</label>
                    <Input 
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button type="submit" className="w-full md:w-auto">
                    שמור הגדרות
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-gray-50 py-4">
              <CardTitle className="text-xl text-right">הגדרות מערכת</CardTitle>
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
