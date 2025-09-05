import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { Phone, Mail, MapPin } from "lucide-react";

export interface BasicDetailsProps {
  name: string;
  role: string;
  status?: string;
  memberSince?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export function BasicDetailsSection({
  name,
  role,
  status = "Active",
  memberSince = "2020",
  phone,
  email,
  address,
}: BasicDetailsProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-sm border">
          <CardContent className="p-4">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0054A6] to-[#003d7a] rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                  <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                    {status}
                  </Badge>
                </div>
                <p className="text-gray-600 font-medium">{role}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    Customer since {memberSince}
                  </div>
                </div>
              </div>
            </div>

            {(phone || email || address) && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="text-sm font-medium">{phone}</div>
                    </div>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-sm font-medium">{email}</div>
                    </div>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-2 md:col-span-2 lg:col-span-1">
                    <MapPin size={14} className="text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Address</div>
                      <div className="text-sm font-medium">{address}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
