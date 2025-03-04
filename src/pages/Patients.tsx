
import { MainLayout } from "@/layouts/MainLayout";
import { patients } from "@/data/mockData";
import { PatientsList } from "@/components/Patients/PatientsList";
import { PageAnimation } from "@/components/UI/PageAnimation";

const Patients = () => {
  return (
    <MainLayout>
      <PageAnimation>
        <PatientsList initialPatients={patients} />
      </PageAnimation>
    </MainLayout>
  );
};

export default Patients;
