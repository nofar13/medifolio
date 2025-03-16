
import Presentation from "@/components/Presentation/Presentation";
import { MainLayout } from "@/layouts/MainLayout";
import { useEffect } from "react";

const PresentationPage = () => {
  // Force scroll to top when presentation page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto">
        <Presentation />
      </div>
    </MainLayout>
  );
};

export default PresentationPage;
