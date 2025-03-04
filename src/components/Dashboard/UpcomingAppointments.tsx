
import { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { appointments } from "@/data/mockData";
import { Calendar, ChevronLeft, Clock, UserX } from "lucide-react";

const UpcomingAppointments = () => {
  const [view, setView] = useState<"today" | "all">("today");
  
  const todayAppointments = appointments.filter(
    appointment => appointment.status === "scheduled" && 
    new Date(appointment.date).toDateString() === new Date().toDateString()
  );
  
  const displayedAppointments = view === "today" ? todayAppointments : appointments;

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">מתוכנן</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none">הושלם</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-none">בוטל</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="border-0 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 pb-3 pt-5 px-6">
        <CardTitle className="text-lg font-bold text-white flex justify-between items-center">
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button 
              variant={view === "today" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setView("today")}
              className={view === "today" ? "bg-white text-blue-700 hover:bg-white/90" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}
            >
              היום
            </Button>
            <Button 
              variant={view === "all" ? "default" : "outline"} 
              size="sm" 
              onClick={() => setView("all")}
              className={view === "all" ? "bg-white text-blue-700 hover:bg-white/90" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}
            >
              הכל
            </Button>
          </div>
          <span>תורים קרובים</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {displayedAppointments.length === 0 ? (
          <div className="py-8 text-center">
            <UserX className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">אין תורים מתוכננים להיום</p>
            <p className="text-gray-400 text-sm mt-1">כל התורים המתוכננים יופיעו כאן</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedAppointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 bg-white">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </Button>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{appointment.patientName}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4 rtl:space-x-reverse">
                      <span>{format(new Date(appointment.date), "dd/MM/yyyy")}</span>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-gray-400" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {getStatusBadge(appointment.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-3 border-t border-gray-100">
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-auto text-xs text-gray-600 hover:bg-gray-100 border-gray-200"
          asChild
        >
          <Link to="/appointments">
            נהל תורים
            <ChevronLeft className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingAppointments;
