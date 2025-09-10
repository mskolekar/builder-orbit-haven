import { Button } from "./button";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { Phone, Mail, MapPin, Edit3 } from "lucide-react";

const customerData = {
  name: "Josh Fernandes",
  role: "Prospect",
  status: "New",
  phone: "(416) 555-0199",
  email: "josh.fernandes@example.com",
  address: "250 King St W, Toronto, ON M5H 1J9",
};

export function PersonDetailsProspect() {
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
                <div className="w-16 h-16 bg-gradient-to-br from-[#0054A6] to-[#003d7a] rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg">
                  {customerData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 text-blue-600 hover:bg-blue-50"
                  onClick={navigateToProfile}
                  title="Edit Personal Details"
                >
                  <Edit3 size={12} />
                </Button>
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
                  <div className="min-w-0">
                    <span className="text-xs text-gray-500">Email</span>
                    <p className="text-sm font-medium truncate">
                      {customerData.email}
                    </p>
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
