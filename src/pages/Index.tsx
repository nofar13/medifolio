
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
            {/* Logo */}
            <div className="flex items-center">
              <div className="p-2 bg-subtle-blue rounded-lg mr-3 shadow-sm">
                <img 
                  src="/lovable-uploads/1d5ca128-257d-4f8a-8e16-2d2a77167024.png"
                  alt="Yunina Logo" 
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    // Fallback in case the logo image is not available
                    e.currentTarget.style.display = 'none'; 
                    const fallbackIcon = document.getElementById('fallback-icon');
                    if (fallbackIcon) fallbackIcon.style.display = 'block';
                  }}
                />
                <Eye id="fallback-icon" className="h-8 w-8 text-subtle-blue hidden" />
              </div>
              <h1 className="text-3xl font-bold text-gray-700 tracking-tight">מרפאת יונינה - ניהול מרפאת עיניים</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-md overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="h-2 bg-subtle-blue w-full"></div>
            <CardContent className="p-6 flex items-center">
              <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mr-4 shadow-sm border border-gray-100">
                <Calendar className="h-8 w-8 text-subtle-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-1">תורים להיום</h3>
                <p className="text-muted-foreground font-medium">הושלמו 2, ממתין 1</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="h-2 bg-subtle-blue w-full"></div>
            <CardContent className="p-6 flex items-center">
              <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mr-4 shadow-sm border border-gray-100">
                <Calendar className="h-8 w-8 text-subtle-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-1">תורים למחר</h3>
                <p className="text-muted-foreground font-medium">דחוף 1, רגילים 7</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300">
            <div className="h-2 bg-subtle-blue w-full"></div>
            <CardContent className="p-6 flex items-center">
              <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mr-4 shadow-sm border border-gray-100">
                <Users className="h-8 w-8 text-subtle-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-700 mb-1">מטופלים החודש</h3>
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
