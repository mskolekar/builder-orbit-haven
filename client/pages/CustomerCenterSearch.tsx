import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface CustomerRecord {
  id: string;
  name: string;
  role: string;
  status: string;
  email: string;
  phone: string;
  organization: string;
  profileKey: string;
}

const customerRecords: CustomerRecord[] = [
  {
    id: "1",
    name: "Olivia R",
    role: "Insured",
    status: "Active",
    email: "olivia@example.com",
    phone: "(416) 555-0100",
    organization: "Individual",
    profileKey: "olivia",
  },
  {
    id: "2",
    name: "John Wills",
    role: "Underwriter",
    status: "Active",
    email: "john.wills@example.com",
    phone: "(416) 555-0101",
    organization: "OneShield",
    profileKey: "john-wills",
  },
  {
    id: "3",
    name: "Shawn Elkins",
    role: "Claimant",
    status: "Active",
    email: "shawn.elkins@example.com",
    phone: "(416) 555-0102",
    organization: "Individual",
    profileKey: "shawn-elkins",
  },
  {
    id: "4",
    name: "ABC Ltd",
    role: "Organization",
    status: "Active",
    email: "contact@abcltd.com",
    phone: "(416) 555-0103",
    organization: "ABC Ltd",
    profileKey: "abc-ltd",
  },
  {
    id: "5",
    name: "Josh Fernandes",
    role: "Prospect",
    status: "New",
    email: "josh.fernandes@example.com",
    phone: "(416) 555-0104",
    organization: "Individual",
    profileKey: "josh-fernandes",
  },
];

export default function CustomerCenterSearch() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
  });

  const filteredRecords = useMemo(() => {
    return customerRecords.filter((record) => {
      return (
        (filters.name === "" ||
          record.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.email === "" ||
          record.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (filters.phone === "" || record.phone.includes(filters.phone)) &&
        (filters.organization === "" ||
          record.organization
            .toLowerCase()
            .includes(filters.organization.toLowerCase())) &&
        (filters.role === "" ||
          record.role.toLowerCase().includes(filters.role.toLowerCase()))
      );
    });
  }, [filters]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      email: "",
      phone: "",
      organization: "",
      role: "",
    });
  };

  const handleRowClick = (record: CustomerRecord) => {
    navigate(`/overview/${record.profileKey}`);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Search Customers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              placeholder="First Name"
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              placeholder="Email Address"
              type="email"
              value={filters.email}
              onChange={(e) => handleFilterChange("email", e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <Input
              placeholder="Phone Number"
              value={filters.phone}
              onChange={(e) => handleFilterChange("phone", e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization
            </label>
            <Input
              placeholder="Organization"
              value={filters.organization}
              onChange={(e) =>
                handleFilterChange("organization", e.target.value)
              }
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <Input
              placeholder="Role"
              value={filters.role}
              onChange={(e) => handleFilterChange("role", e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleClearFilters}
            variant="outline"
            className="border-gray-300"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-900">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Role
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Phone
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Organization
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow
                    key={record.id}
                    onClick={() => handleRowClick(record)}
                    className="cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900">
                      {record.name}
                    </TableCell>
                    <TableCell className="text-gray-700">{record.role}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-xs font-medium",
                          record.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-700",
                        )}
                      >
                        {record.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-700">{record.email}</TableCell>
                    <TableCell className="text-gray-700">{record.phone}</TableCell>
                    <TableCell className="text-gray-700">
                      {record.organization}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    No customers found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
