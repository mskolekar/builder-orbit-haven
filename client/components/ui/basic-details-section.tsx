import { Card, CardContent } from "./card";
import { Badge } from "./badge";

export interface BasicDetailsProps {
  name: string;
  role: string;
  status?: string;
  memberSince?: string;
}

export function BasicDetailsSection({
  name,
  role,
  status = "Active",
  memberSince = "2020",
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
                  <Badge className={`${status === "Active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-700 border-gray-200"}`}>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
