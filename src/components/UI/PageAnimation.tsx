
import { useEffect, useState } from "react";

interface PageAnimationProps {
  children: React.ReactNode;
}

export const PageAnimation = ({ children }: PageAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate loading with a subtle animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`main-content ${isVisible ? 'animate-fadeIn opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};
