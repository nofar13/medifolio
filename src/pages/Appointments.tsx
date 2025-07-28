import { MainLayout } from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { appointments as initialAppointments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Appointment } from "@/types";
import AddAppointmentForm from "@/components/Appointments/AddAppointmentForm";
import EditAppointmentForm from "@/components/Appointments/EditAppointmentForm";
import { isBefore, parseISO, startOfDay } from "date-fns";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Appointments = () => {
  const [filter, setFilter] = useState<"all" | "scheduled" | "completed">("all");
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [columnFilter, setColumnFilter] = useState<string>("none");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const handleAppointmentAdded = (newAppointment: Appointment) => {
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
  };

  const handleAppointmentUpdated = (updatedAppointment: Appointment) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
      )
    );
    setEditingAppointment(null);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    const appointmentToDelete = appointments.find(app => app.id === appointmentId);
    setAppointments(prevAppointments =>
      prevAppointments.filter(appointment => appointment.id !== appointmentId)
    );
    
    toast({
      title: "הפגישה בוטלה בהצלחה",
      description: appointmentToDelete 
        ? `פגישה עם ${appointmentToDelete.patientName} בוטלה` 
        : "הפגישה בוטלה",
      duration: 2000
    });
  };
  
  const filteredAppointments = appointments.filter(appointment => {
    if (filter === "all") return true;
    return appointment.status === filter;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (columnFilter === "none") return 0;
    
    let valueA, valueB;
    
    switch (columnFilter) {
      case "patientName":
        valueA = a.patientName;
        valueB = b.patientName;
        break;
      case "date":
        valueA = a.date;
        valueB = b.date;
        break;
      case "time":
        valueA = a.time;
        valueB = b.time;
        break;
      default:
        return 0;
    }
    
    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  };

  return (
    <MainLayout>
      <div className="animate-fadeIn" dir="rtl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">ניהול פגישות</h1>
          <AddAppointmentForm onAppointmentAdded={handleAppointmentAdded} />
        </div>
        
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button 
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              הכל
            </Button>
            <Button 
              variant={filter === "scheduled" ? "default" : "outline"}
              onClick={() => setFilter("scheduled")}
              className={filter === "scheduled" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              מתוכננות
            </Button>
            <Button 
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              הושלמו
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="flex items-center">
              <span className="text-sm ml-2">מיון לפי:</span>
              <Select value={columnFilter} onValueChange={setColumnFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="בחר עמודה למיון" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">ללא מיון</SelectItem>
                  <SelectItem value="patientName">שם מטופל</SelectItem>
                  <SelectItem value="date">תאריך</SelectItem>
                  <SelectItem value="time">שעה</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {columnFilter !== "none" && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleSortDirection}
                className="flex items-center"
              >
                {sortDirection === "asc" ? "עולה ↑" : "יורד ↓"}
              </Button>
            )}
          </div>
        </div>
        
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-4">
            <CardTitle className="text-xl text-right text-white">לוח פגישות</CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">פעולות</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">הערות</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">סטטוס</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">שעה</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">תאריך</th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">שם מטופל</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedAppointments.length > 0 ? (
                    sortedAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setEditingAppointment(appointment)}
                              className="text-blue-600 hover:bg-blue-50"
                            >
                              <Pencil className="h-4 w-4 ml-1" />
                              ערוך
                            </Button>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4 ml-1" />
                                  בטל
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent dir="rtl">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    פעולה זו תבטל את הפגישה עם {appointment.patientName} ב-{appointment.date} בשעה {appointment.time}.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>ביטול</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteAppointment(appointment.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    בטל פגישה
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">{appointment.notes}</td>
                        <td className="py-4 px-4 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {appointment.status === 'completed' ? 'הושלם' : 'מתוכנן'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">{appointment.time}</td>
                        <td className="py-4 px-4 text-right">{appointment.date}</td>
                        <td className="py-4 px-4 text-right font-medium">{appointment.patientName}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        אין פגישות להצגה עם הסינון הנוכחי
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {editingAppointment && (
          <EditAppointmentForm
            appointment={editingAppointment}
            open={!!editingAppointment}
            onOpenChange={(open) => !open && setEditingAppointment(null)}
            onAppointmentUpdated={handleAppointmentUpdated}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Appointments;
