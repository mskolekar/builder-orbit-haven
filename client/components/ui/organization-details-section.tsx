import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { Mail, Phone, MapPin, Briefcase, FileText } from "lucide-react";

export function OrganizationDetailsSection() {
  const org = {
    name: "ABC Ltd",
    status: "Active",
    industry: "Professional Services",
    phone: "(416) 555-0456",
    email: "info@abcltd.com",
    website: "www.abcltd.com",
    taxIdMasked: "•••-••-1234",
    address: "200 King St W, Toronto, ON M5H 3T4",
    memberSince: "2017",
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-sm border">
          <CardContent className="p-4 min-h-[140px]">
            <div className="flex items-center gap-6">
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
                <div className="hidden">
                  <div className="flex items-center gap-1">
                    <Briefcase size={14} className="text-gray-400" />{" "}
                    {org.industry}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Industry</div>
                  <div className="text-sm font-medium">{org.industry}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Website</div>
                  <div className="text-sm font-medium">{org.website}</div>
                </div>
              </div>
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
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Tax ID</div>
                  <div className="text-sm font-medium">{org.taxIdMasked}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <MapPin size={14} className="text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">Address</div>
                  <div className="text-sm font-medium">{org.address}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
