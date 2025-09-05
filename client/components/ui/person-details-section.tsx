import { useState } from "react";
import { Button } from "./button";
import { Badge } from "./badge";
import { Card, CardContent, CardHeader } from "./card";
import {
  CheckCircle,
  Calendar,
  Users,
  FileText,
  Phone,
  Mail,
  MapPin,
  Edit3,
} from "lucide-react";

const customerData = {
  name: "Olivia R",
  role: "Insured",
  status: "Active",
  dateOfBirth: "••••••••",
  gender: "Female",
  lsc: "000000",
  phone: "(416) 555-0123",
  email: "olivia.reynolds@example.com",
  address: "1508 - 141 Lyon Court, Toronto, ON M5B 3H2",
  memberSince: "2019",
  satisfactionScore: 4.8,
};

export function PersonDetailsSection() {
  const navigateToProfile = () => {
    // Navigate to profile
    window.location.href = "/profile?section=personal-info";
  };

  const navigateToCustomerDetails = () => {
    // Navigate to customer details page
    window.location.href = "/customer-details";
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-sm border">
          <CardHeader
            className="p-4 pb-0 cursor-pointer select-none"
            onClick={() => setIsCollapsed((v) => !v)}
          >
            <div className="flex items-center justify-end w-full"></div>
          </CardHeader>
          <CardContent className={`p-4 ${isCollapsed ? "hidden" : ""}`}>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0054A6] to-[#003d7a] rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg">
                    OR
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
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={12} />
                      Customer since {customerData.memberSince}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 text-blue-600 hover:bg-blue-50"
                  onClick={navigateToProfile}
                >
                  <Edit3 size={12} />
                </Button>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <div>
                    <span className="text-xs text-gray-500">DOB</span>
                    <p className="text-sm font-medium">
                      {customerData.dateOfBirth}
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
                    <span className="text-xs text-gray-500">SSN#</span>
                    <p className="text-sm font-medium">{customerData.lsc}</p>
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

            <div className="mt-3 flex items-center gap-2 text-sm">
              <MapPin size={14} className="text-gray-400" />
              <span className="text-gray-500">Address:</span>
              <span className="font-medium">{customerData.address}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
