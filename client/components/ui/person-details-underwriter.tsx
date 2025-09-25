import { Button } from "./button";
import { Button } from "./button";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { Calendar, Users, FileText, Phone, Mail, Edit3 } from "lucide-react";
import SensitiveText from "@/components/ui/sensitive-text";

const customerData = {
  name: "John Wills",
  role: "Underwriter",
  status: "Active",
  dateOfBirth: "••••••••",
  gender: "Male",
  empId: "000000",
  phone: "(416) 555-0123",
  email: "johnw@insurer.com",
};

export function PersonDetailsUnderwriter() {
  const navigateToProfile = () => {
    window.location.href = "/profile?section=personal-info";
  };

  const navigateToCustomerDetails = () => {
    window.location.href = "/customer-details";
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-sm border">
          <CardContent className="p-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0054A6] to-[#003d7a] rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg">
                    JW
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2
                      className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors"
                      onClick={navigateToCustomerDetails}
                      title="View customer details"
                    >
                      {customerData.name}
                    </h2>
                    <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                      {customerData.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 font-medium">
                    {customerData.role}
                  </p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 relative">
                <div className="absolute top-0 right-0 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 text-blue-600 hover:bg-blue-50"
                    onClick={() => (window.location.href = "/profile?section=personal-info")}
                    aria-label="Edit Basic Details"
                    title="Edit Basic Details"
                  >
                    <Edit3 size={12} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 text-blue-600 hover:bg-blue-50"
                    onClick={() => (window.location.href = "/contact-delivery?tab=contact")}
                    aria-label="Edit Contact Info"
                    title="Edit Contact Info"
                  >
                    <Edit3 size={12} />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <div>
                    <span className="text-xs text-gray-500">DOB</span>
                    <p className="text-sm font-medium">
                      <SensitiveText value="1990" />
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-gray-400" />
                  <div>
                    <span className="text-xs text-gray-500">Gender</span>
                    <p className="text-sm font-medium">{customerData.gender}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-gray-400" />
                  <div>
                    <span className="text-xs text-gray-500">Emp ID#</span>
                    <p className="text-sm font-medium">{customerData.empId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-400" />
                  <div className="min-w-0">
                    <span className="text-xs text-gray-500">Phone</span>
                    <p className="text-sm font-medium whitespace-nowrap">
                      {customerData.phone}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Mail size={14} className="text-gray-400" />
                  <div>
                    <span className="text-xs text-gray-500">Email</span>
                    <p className="text-sm font-medium">{customerData.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
