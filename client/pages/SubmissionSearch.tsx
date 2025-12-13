import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw, Search } from "lucide-react";

export default function SubmissionSearch() {
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

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
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
  };

  const handleAddSubmission = () => {
    navigate("/submissions");
  };

  const handleRunSearch = () => {
    console.log("Running search with filters:", filters);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6">
      {/* Search Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Search</h2>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        {/* First Row of Filters */}
        <div className="flex gap-8 mb-6 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
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
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
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
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              placeholder="Email Address"
              type="email"
              className="w-full text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Organization Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Type</option>
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
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
        </div>

        {/* Second Row of Filters */}
        <div className="flex gap-8 mb-6 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              First Name
            </label>
            <Input
              placeholder="First Name"
              value={filters.firstName}
              onChange={(e) => handleFilterChange("firstName", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              placeholder="Phone Number"
              value={filters.phone}
              onChange={(e) => handleFilterChange("phone", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Contact Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Type</option>
              <option value="broker">Broker</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Tax ID (PEN/EIN)
            </label>
            <Input
              placeholder="Tax ID (PEN/EIN)"
              value={filters.taxId}
              onChange={(e) => handleFilterChange("taxId", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Third Row of Filters */}
        <div className="flex gap-8 mb-6 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Address
            </label>
            <Input
              placeholder="Address"
              value={filters.address}
              onChange={(e) => handleFilterChange("address", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              City
            </label>
            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Record Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Type</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              DOT/NPI Number
            </label>
            <Input
              placeholder="DOT/NPI Number"
              value={filters.dotNumber}
              onChange={(e) => handleFilterChange("dotNumber", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
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

        {/* Fourth Row of Filters */}
        <div className="flex gap-8 mb-6 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              State
            </label>
            <Input
              placeholder="State"
              value={filters.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Soc Sec
            </label>
            <Input
              placeholder="Soc Sec"
              value={filters.socialSec}
              onChange={(e) => handleFilterChange("socialSec", e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <div className="flex-1"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <Button onClick={handleAddSubmission}>
            <Plus size={16} />
            Add Submission
          </Button>
        </div>

        {/* Search and Clear Buttons */}
        <div className="flex gap-3 justify-end">
          <Button onClick={handleRunSearch}>
            <Search size={16} />
            Run Search
          </Button>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear
          </Button>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto opacity-50" />
          </div>
          <p className="text-gray-500 text-sm">
            Use the search filters above to find submissions
          </p>
        </div>
      </div>
    </div>
  );
}
