
import { Link, useLocation } from "react-router-dom";
import { 
  Home, Users, Calendar, BarChart, Settings, 
  Menu, ChevronRight, LogOut, Eye 
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
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm z-50 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        {isOpen ? (
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Eye className="h-8 w-8 text-primary icon-glow" />
            <span className="font-semibold text-xl">מדיפוליו</span>
          </Link>
        ) : (
          <Link to="/" className="w-full flex justify-center">
            <Eye className="h-8 w-8 text-primary icon-glow" />
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} className="ml-auto">
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="py-6">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center py-3 px-4 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-primary text-white" 
                      : "text-gray-700 hover:bg-gray-100",
                    !isOpen && "justify-center"
                  )}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <item.icon className={cn("h-5 w-5", isOpen && "ml-2")} />
                  {isOpen && <span className="font-medium">{item.name}</span>}
                  
                  {!isOpen && hoveredItem === item.path && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-white rounded-md shadow-lg text-sm font-medium text-gray-900 whitespace-nowrap z-10">
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

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
        <button 
          className={cn(
            "flex items-center py-3 px-4 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-200 w-full",
            !isOpen && "justify-center"
          )}
        >
          <LogOut className={cn("h-5 w-5", isOpen && "ml-2")} />
          {isOpen && <span className="font-medium">התנתק</span>}
        </button>
      </div>
    </div>
  );
}
