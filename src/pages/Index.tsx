
import { useEffect } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Users, Calendar, Activity } from "lucide-react";
import RecentPatients from "@/components/Dashboard/RecentPatients";
import UpcomingAppointments from "@/components/Dashboard/UpcomingAppointments";

const Index = () => {
  useEffect(() => {
    // Simulate loading with a subtle animation
    const timer = setTimeout(() => {
      const mainContent = document.querySelector(".main-content");
      if (mainContent) {
        mainContent.classList.add("animate-fadeIn");
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      <div className="main-content opacity-0">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="p-3 bg-blue-400/10 rounded-lg mr-4 shadow-md">
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-blue-800 tracking-tight">מרפאת יונינה - ניהול מרפאת עיניים</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300">
            <div className="h-2 bg-blue-400 w-full"></div>
            <CardContent className="p-6 flex items-center">
              <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mr-4 shadow-md border border-blue-100">
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">תורים להיום</h3>
                <p className="text-muted-foreground font-medium">הושלמו 2, ממתין 1</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300">
            <div className="h-2 bg-blue-400 w-full"></div>
            <CardContent className="p-6 flex items-center">
              <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mr-4 shadow-md border border-blue-100">
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">תורים מחר</h3>
                <p className="text-muted-foreground font-medium">דחוף 1, רגילים 7</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300">
            <div className="h-2 bg-blue-400 w-full"></div>
            <CardContent className="p-6 flex items-center">
              <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mr-4 shadow-md border border-blue-100">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">מטופלים החודש</h3>
                <p className="text-muted-foreground font-medium">חדשים 32, חוזרים 154</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <RecentPatients />
          <UpcomingAppointments />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
