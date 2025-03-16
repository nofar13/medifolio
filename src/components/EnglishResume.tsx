
import { MainLayout } from "@/layouts/MainLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, Calendar, MapPin, User } from "lucide-react";

const EnglishResume = () => {
  return (
    <MainLayout>
      <div className="main-content animate-fadeIn p-6">
        <Card className="border-0 shadow-md rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {/* Left Section - Main Content */}
            <div className="col-span-3 p-8">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h1 className="text-3xl font-bold text-primary">Nofer Alhiani</h1>
                  <h2 className="text-xl text-gray-600 mt-1">Pharmacist</h2>
                </div>
              </div>

              {/* About Me Section */}
              <div className="mb-10">
                <p className="text-gray-700">
                  Experienced in the clinical and regulatory fields. Completed internship in 
                  community and hospital pharmacies, with expertise in regulatory affairs, quality control, 
                  and technological systems. Advanced computer skills with an emphasis on healthcare applications.
                  Strong background in administration, inspection, and pharmacy 
                  operations in both hospital and community settings.
                </p>
              </div>

              {/* Education Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-primary mb-4">Education</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">First Degree in Pharmacy and Health Sciences</h3>
                      <h4 className="text-gray-600">Ben Gurion University</h4>
                    </div>
                    <span className="text-gray-500">2021 - Present</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">Practical Pharmacist Training</h3>
                      <h4 className="text-gray-600">Clalit Health Services</h4>
                    </div>
                    <span className="text-gray-500">2014 - 2017</span>
                  </div>
                </div>
              </div>

              {/* Experience Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-primary mb-4">Experience</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium text-gray-800">Clinical Research at Clalit Health ADC</h3>
                      <span className="text-gray-500">2019 - Present</span>
                    </div>
                    <ul className="list-disc ml-5 text-gray-700 space-y-1">
                      <li>Participation in quality assessment and operational processes of the research center</li>
                      <li>Work with regulatory documents and administrative procedures</li>
                      <li>Monitoring and supervision of critical resources within established research protocols</li>
                      <li>Clinical data collection and management of medical information</li>
                      <li>Following up on research protocols and implementing quality control procedures</li>
                      <li>Utilizing technological systems for patient management and clinical trial documentation</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium text-gray-800">Licensed Pharmacist at Clalit Health Services</h3>
                      <span className="text-gray-500">2014 - 2017</span>
                    </div>
                    <ul className="list-disc ml-5 text-gray-700 space-y-1">
                      <li>Implementation of quality control procedures and pharmacy regulations</li>
                      <li>Management of 20+ staff members in multiple pharmacy locations</li>
                      <li>Oversight of pharmaceutical inventory management systems</li>
                      <li>Quality control of medication dispensing and patient consultations</li>
                      <li>Development of technological and administrative systems for pharmacy management</li>
                      <li>Patient guidance and medication counseling</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Volunteering Section */}
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-4">Volunteer Activities</h2>
                <ul className="list-disc ml-5 text-gray-700">
                  <li>Instructor at the "Zvi Yekutieli" community center</li>
                  <li>First aid provider, volunteer at "Yad Ezer" organization</li>
                </ul>
              </div>
            </div>

            {/* Right Section - Personal Info & Skills */}
            <div className="bg-gradient-to-b from-teal-500 to-teal-600 text-white p-8">
              <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
              <div className="space-y-3 mb-10">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3" />
                  <span>Nofer Alhiani</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>nofer123@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>054-6169289</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3" />
                  <span>Born 1992</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>Haifa</span>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="space-y-4 mb-10">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>R</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>SQL</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Python</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Solidworks</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>HTML</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Power BI</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Microsoft Office</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                      <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">Languages</h2>
              <div className="space-y-4">
                <div className="flex justify-between mb-1">
                  <span>Hebrew</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                    <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                    <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                    <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                    <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                  </div>
                </div>
                <div className="flex justify-between mb-1">
                  <span>English</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                    <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                    <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                    <div className="w-3 h-3 rounded-full bg-white opacity-100"></div>
                    <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EnglishResume;
