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
import { Search } from "lucide-react";

interface CustomerRecord {
  id: string;
  name: string;
  role: string;
  status: string;
  email: string;
  phone: string;
  organization: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
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
    address: "123 Main St",
    city: "Toronto",
    state: "ON",
    postalCode: "M1A 2B3",
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
    address: "456 Oak Ave",
    city: "Toronto",
    state: "ON",
    postalCode: "M2A 3B4",
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
    address: "789 Elm St",
    city: "Toronto",
    state: "ON",
    postalCode: "M3A 4B5",
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
    address: "321 Business Blvd",
    city: "Toronto",
    state: "ON",
    postalCode: "M4A 5B6",
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
    address: "654 Pine Rd",
    city: "Toronto",
    state: "ON",
    postalCode: "M5A 6B7",
    profileKey: "josh-fernandes",
  },
];

export default function CustomerCenterSearch() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    organizationOrLastName: "",
    email: "",
    firstName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    recordType: "",
    taxId: "",
    contactType: "",
    status: "",
    socialSec: "",
    dotNumber: "",
    policyNumber: "",
    postalCode: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRecords = useMemo(() => {
    return customerRecords.filter((record) => {
      return (
        (filters.organizationOrLastName === "" ||
          record.name
            .toLowerCase()
            .includes(filters.organizationOrLastName.toLowerCase()) ||
          record.organization
            .toLowerCase()
            .includes(filters.organizationOrLastName.toLowerCase())) &&
        (filters.email === "" ||
          record.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (filters.firstName === "" ||
          record.name
            .toLowerCase()
            .includes(filters.firstName.toLowerCase())) &&
        (filters.phone === "" || record.phone.includes(filters.phone)) &&
        (filters.address === "" ||
          (record.address || "")
            .toLowerCase()
            .includes(filters.address.toLowerCase())) &&
        (filters.city === "" ||
          (record.city || "")
            .toLowerCase()
            .includes(filters.city.toLowerCase())) &&
        (filters.state === "" ||
          (record.state || "")
            .toLowerCase()
            .includes(filters.state.toLowerCase())) &&
        (filters.postalCode === "" ||
          (record.postalCode || "")
            .toLowerCase()
            .includes(filters.postalCode.toLowerCase()))
      );
    });
  }, [filters]);

  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      organizationOrLastName: "",
      email: "",
      firstName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      recordType: "",
      taxId: "",
      contactType: "",
      status: "",
      socialSec: "",
      dotNumber: "",
      policyNumber: "",
      postalCode: "",
    });
    setCurrentPage(1);
  };

  const handleRowClick = (record: CustomerRecord) => {
    navigate(`/overview/${record.profileKey}`);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6">
      {/* Search Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Search</h2>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Organization or Last Name
            </label>
            <Input
              placeholder="Organization or Last Name"
              value={filters.organizationOrLastName}
              onChange={(e) =>
                handleFilterChange("organizationOrLastName", e.target.value)
              }
              className="w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              placeholder="Email Address"
              type="email"
              value={filters.email}
              onChange={(e) => handleFilterChange("email", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              placeholder="Email Address"
              type="email"
              className="w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Organization Type
            </label>
            <Select>
              <option value="">Select Type</option>
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Policy#
            </label>
            <Input
              placeholder="Policy#"
              value={filters.policyNumber}
              onChange={(e) =>
                handleFilterChange("policyNumber", e.target.value)
              }
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              First Name
            </label>
            <Input
              placeholder="First Name"
              value={filters.firstName}
              onChange={(e) => handleFilterChange("firstName", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              placeholder="Phone Number"
              value={filters.phone}
              onChange={(e) => handleFilterChange("phone", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Contact Type
            </label>
            <Select>
              <option value="">Select Type</option>
              <option value="broker">Broker</option>
              <option value="agent">Agent</option>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tax ID (PEN/EIN)
            </label>
            <Input
              placeholder="Tax ID (PEN/EIN)"
              value={filters.taxId}
              onChange={(e) => handleFilterChange("taxId", e.target.value)}
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Address
            </label>
            <Input
              placeholder="Address"
              value={filters.address}
              onChange={(e) => handleFilterChange("address", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              City
            </label>
            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Status
            </label>
            <Select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Soc Sec
            </label>
            <Input
              placeholder="Soc Sec"
              value={filters.socialSec}
              onChange={(e) => handleFilterChange("socialSec", e.target.value)}
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              State
            </label>
            <Input
              placeholder="State"
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Record Type
            </label>
            <Select>
              <option value="">Select Type</option>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              DOT/NPI Number
            </label>
            <Input
              placeholder="DOT/NPI Number"
              value={filters.dotNumber}
              onChange={(e) => handleFilterChange("dotNumber", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <Input
              placeholder="Postal Code"
              value={filters.postalCode}
              onChange={(e) => handleFilterChange("postalCode", e.target.value)}
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <Button variant="primary" className="bg-blue-600 text-white">
            Add Person
          </Button>
          <Button variant="primary" className="bg-blue-600 text-white">
            Add Location
          </Button>
          <Button variant="primary" className="bg-blue-600 text-white">
            Add Organization
          </Button>
        </div>

        {/* Search and Clear Buttons */}
        <div className="flex gap-2 justify-end">
          <Button className="bg-blue-600 text-white flex items-center gap-2">
            <Search size={16} />
            Run Search
          </Button>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear
          </Button>
        </div>
      </div>

      {/* Records Search Input */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex-1 text-sm text-gray-600">
          Search in records...
        </div>
      </div>

      {/* Results Table */}
      <div className="flex-1 overflow-auto bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-900 text-xs">
                Type
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                Name
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                City
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                State
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                Orga Postal
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                Tax ID (FEIN)
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                Act ID
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                County
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                Last Name
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                First Name
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                Contact Type
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                Email
              </TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">
                Bus Phone
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRecords.length > 0 ? (
              paginatedRecords.map((record) => (
                <TableRow
                  key={record.id}
                  onClick={() => handleRowClick(record)}
                  className="cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <TableCell className="text-xs text-gray-700">
                    {record.role === "Organization" ? "Organization" : "Person"}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700 font-medium">
                    {record.name}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {record.city || "-"}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {record.state || "-"}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {record.postalCode || "-"}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">-</TableCell>
                  <TableCell className="text-xs text-gray-700">-</TableCell>
                  <TableCell className="text-xs text-gray-700">-</TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {record.name.split(" ").pop() || "-"}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {record.name.split(" ")[0] || "-"}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {record.role}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {record.email}
                  </TableCell>
                  <TableCell className="text-xs text-gray-700">
                    {record.phone}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={13}
                  className="text-center py-8 text-gray-500"
                >
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-700">
        <div>
          Rows per page:
          <select className="ml-2 px-2 py-1 border border-gray-300 rounded text-xs">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="ml-4">
            {(currentPage - 1) * itemsPerPage + 1} of{" "}
            {filteredRecords.length}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="px-2 py-1">{currentPage}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
