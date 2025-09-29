import { Badge } from "./badge";
import { Button } from "./button";
import { Mail, Phone, MapPin, FileText, Edit3 } from "lucide-react";
import { Card, CardContent } from "./card";

export function OrganizationDetailsSection() {
  const org = {
    name: "ABC Ltd",
    status: "Active",
    website: "https://www.abcltd.com",
    phone: "(416) 555-0456",
    email: "info@abcltd.com",
    address: "200 King St W, Toronto, ON M5H 3T4",
    memberSince: "2017",
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-sm border">
          <CardContent className="p-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0054A6] to-[#003d7a] rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg">
                  {org.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900">
                      {org.name}
                    </h2>
                    <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                      {org.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 font-medium">Organization</p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="col-span-2 md:col-span-4 lg:col-span-3">
                  <div className="relative rounded-md bg-gray-50 p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 h-5 w-5 p-0 text-blue-600 hover:bg-blue-50"
                      onClick={() => (window.location.href = "/profile?section=additional-info")}
                      aria-label="Edit Website"
                      title="Edit Website"
                    >
                      <Edit3 size={12} />
                    </Button>
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Website</div>
                        <div className="text-sm font-medium truncate max-w-[220px] text-gray-800">
                          {org.website.replace(/^https?:\/\//, "")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-4 lg:col-span-3">
                  <div className="relative rounded-md bg-gray-50 p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 h-5 w-5 p-0 text-blue-600 hover:bg-blue-50"
                      onClick={() => (window.location.href = "/contact-delivery?tab=contact")}
                      aria-label="Edit Contact Info"
                      title="Edit Contact Info"
                    >
                      <Edit3 size={12} />
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-gray-400" />
                        <div>
                          <div className="text-xs text-gray-500">Phone</div>
                          <div className="text-sm font-medium">{org.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" />
                        <div>
                          <div className="text-xs text-gray-500">Email</div>
                          <div className="text-sm font-medium">{org.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <MapPin size={14} className="text-gray-400" />
              <span className="text-gray-500">Address:</span>
              <span className="font-medium">{org.address}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 text-blue-600 hover:bg-blue-50"
                onClick={() => (window.location.href = "/profile?section=addresses")}
                aria-label="Edit Address"
                title="Edit Address"
              >
                <Edit3 size={12} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
