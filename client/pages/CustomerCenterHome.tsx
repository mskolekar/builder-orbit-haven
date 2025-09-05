import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const profiles = [
  { id: "olivia", name: "Olivia R", role: "Insured" },
  { id: "john-wills", name: "John Wills", role: "Underwriter" },
  { id: "shawn-elkins", name: "Shawn Elkins", role: "Claimant" },
  { id: "abc-ltd", name: "ABC Ltd", role: "Organization" },
];

export default function CustomerCenterHome() {
  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Customer Center</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profiles.map((p) => (
            <Link key={p.id} to={`/overview/${p.id}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0054A6] to-[#003d7a] text-white flex items-center justify-center font-semibold">
                      {p.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium">{p.name}</div>
                      <div className="text-gray-500 text-sm">{p.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
