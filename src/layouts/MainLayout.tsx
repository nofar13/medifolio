
import { SidebarNav } from "@/components/SidebarNav";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  useEffect(() => {
    setIsPageTransitioning(true);
    const timer = setTimeout(() => {
      setIsPageTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50/30">
      <SidebarNav 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="container py-8 px-6">
          {isPageTransitioning ? (
            <div className="opacity-0">{children}</div>
          ) : (
            <div className="animate-fadeIn">{children}</div>
          )}
        </div>
      </main>
    </div>
  );
}
