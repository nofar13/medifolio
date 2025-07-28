import { Link, useLocation } from "react-router-dom";
import { 
  Home, Users, Calendar, BarChart, Settings, 
  Menu, ChevronRight, Eye 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarNav({ isOpen, onToggle }: SidebarNavProps) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { name: "דף הבית", path: "/", icon: Home },
    { name: "מטופלים", path: "/patients", icon: Users },
    { name: "פגישות", path: "/appointments", icon: Calendar },
    { name: "סטטיסטיקות", path: "/stats", icon: BarChart },
    { name: "הגדרות", path: "/settings", icon: Settings },
  ];

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-[#f8fafc] border-r border-gray-200 shadow-sm z-50 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        {isOpen ? (
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-1.5 bg-primary/10 rounded-md">
              <img 
                src="/lovable-uploads/1d5ca128-257d-4f8a-8e16-2d2a77167024.png" 
                alt="Yunina Logo" 
                className="h-6 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallbackElement = e.currentTarget.parentElement;
                  if (fallbackElement) {
                    const icon = document.createElement('div');
                    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
                    fallbackElement.appendChild(icon);
                  }
                }}
              />
            </div>
            <span className="font-semibold text-gray-900">מרפאת יונינה</span>
          </Link>
        ) : (
          <Link to="/" className="w-full flex justify-center">
            <div className="p-1.5 bg-primary/10 rounded-md">
              <img 
                src="/lovable-uploads/1d5ca128-257d-4f8a-8e16-2d2a77167024.png" 
                alt="Yunina Logo" 
                className="h-6 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallbackElement = e.currentTarget.parentElement;
                  if (fallbackElement) {
                    const eyeIcon = document.createElement('div');
                    eyeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-primary"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
                    fallbackElement.appendChild(eyeIcon);
                  }
                }}
              />
            </div>
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} className="ml-auto text-gray-500">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="py-6">
        <ul className="space-y-1.5 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                            (item.path === "/patients" && location.pathname.includes("/patients/")) ||
                            (item.path === "/presentation" && location.pathname.includes("/presentation"));
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center py-2.5 px-4 rounded-md transition-all duration-200",
                    isActive 
                      ? "bg-primary text-white shadow-sm" 
                      : "text-gray-700 hover:bg-gray-100",
                    !isOpen && "justify-center"
                  )}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <item.icon className={cn("h-5 w-5", isOpen && "ml-2")} />
                  {isOpen && <span className="font-medium">{item.name}</span>}
                  
                  {!isOpen && hoveredItem === item.path && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-white rounded-md shadow-formal text-sm font-medium text-gray-900 whitespace-nowrap z-10">
                      {item.name}
                      <ChevronRight className="absolute left-0 h-3 w-3 text-white -translate-x-1/2 translate-y-1/2" />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
}
