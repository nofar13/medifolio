
import Presentation from "@/components/Presentation/Presentation";
import { MainLayout } from "@/layouts/MainLayout";

const PresentationPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <Presentation />
      </div>
    </MainLayout>
  );
};

export default PresentationPage;
