import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Plus } from "lucide-react";

export default function Submissions() {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="w-full">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Submissions</h1>
          <p className="text-gray-600">
            Create and manage insurance submissions
          </p>
        </div>

        {/* Form Container - Full width, minimal styling */}
        <form className="bg-white p-8 space-y-6">
          {/* Section 1: Insured & Submission Overview */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Insured & Submission Overview
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Label
                  htmlFor="insured"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Insured
                </Label>
                <Input
                  id="insured"
                  placeholder="DMAround_21421"
                  className="bg-yellow-50 border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="named-insured"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Named Insured
                </Label>
                <Input
                  id="named-insured"
                  placeholder="OrgName_97926"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="dba"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  DBA
                </Label>
                <Input
                  id="dba"
                  placeholder="Enter DBA"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="policy-number"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Policy Number
                </Label>
                <Input
                  id="policy-number"
                  placeholder="not on file"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="project-identifier"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Project Identifier
                </Label>
                <Input
                  id="project-identifier"
                  placeholder="QAA"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div />

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="submission-number"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Submission Number
                </Label>
                <Input
                  id="submission-number"
                  placeholder="SUB-123456"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div />

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="submission-suffix"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Submission Suffix
                </Label>
                <Input
                  id="submission-suffix"
                  placeholder="Enter suffix"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Product & Coverage Details */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Product & Coverage Details
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Label
                  htmlFor="product"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Product
                </Label>
                <Select>
                  <SelectTrigger
                    id="product"
                    className="bg-white border-gray-300 flex-1"
                  >
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general-liability">
                      General Liability
                    </SelectItem>
                    <SelectItem value="property">Property</SelectItem>
                    <SelectItem value="workers-comp">
                      Workers Compensation
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="coverage"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Coverage
                </Label>
                <Select>
                  <SelectTrigger
                    id="coverage"
                    className="bg-yellow-50 border-gray-300 flex-1"
                  >
                    <SelectValue placeholder="Select coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="sub-class"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Sub Class
                </Label>
                <Input
                  id="sub-class"
                  placeholder="Enter sub class"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="risk-state"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Risk State
                </Label>
                <Select>
                  <SelectTrigger
                    id="risk-state"
                    className="bg-yellow-50 border-gray-300 flex-1"
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="al">Alabama</SelectItem>
                    <SelectItem value="ak">Alaska</SelectItem>
                    <SelectItem value="az">Arizona</SelectItem>
                    <SelectItem value="wa">Washington</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="main-iso-code"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Main ISO Code
                </Label>
                <Input
                  id="main-iso-code"
                  placeholder="Type name"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="secondary-iso-code"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Secondary ISO Code
                </Label>
                <Input
                  id="secondary-iso-code"
                  placeholder="Enter ISO code"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Dates */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Dates
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Label
                  htmlFor="proposed-effective-date"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Proposed Effective Date
                </Label>
                <Input
                  id="proposed-effective-date"
                  type="date"
                  className="bg-yellow-50 border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="received-date"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Received Date
                </Label>
                <Input
                  id="received-date"
                  type="date"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="proposed-expiration-date"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Proposed Expiration Date
                </Label>
                <Input
                  id="proposed-expiration-date"
                  type="date"
                  className="bg-yellow-50 border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="requested-by-date"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Requested By Date
                </Label>
                <Input
                  id="requested-by-date"
                  type="date"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Underwriting & Broker Details */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Underwriting & Broker Details
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Label
                  htmlFor="underwriter"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Underwriter
                </Label>
                <Select>
                  <SelectTrigger
                    id="underwriter"
                    className="bg-white border-gray-300 flex-1"
                  >
                    <SelectValue placeholder="Select underwriter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uw1">Underwriter 1</SelectItem>
                    <SelectItem value="uw2">Underwriter 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="broker"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Broker
                </Label>
                <Input
                  id="broker"
                  placeholder="Adamson E. Brokerage of Washington, Seattle, WA, 98101"
                  className="bg-yellow-50 border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="renewal-underwriter"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Renewal Underwriter
                </Label>
                <Select>
                  <SelectTrigger
                    id="renewal-underwriter"
                    className="bg-white border-gray-300 flex-1"
                  >
                    <SelectValue placeholder="Select renewal underwriter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uw1">Underwriter 1</SelectItem>
                    <SelectItem value="uw2">Underwriter 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="broker-contact"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Broker Contact
                </Label>
                <Input
                  id="broker-contact"
                  placeholder="Christian, Emily"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="underwriter-assistant"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Underwriter Assistant
                </Label>
                <Input
                  id="underwriter-assistant"
                  placeholder="Enter assistant name"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="broker-contact-lookup"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Broker Contact Lookup
                </Label>
                <Input
                  id="broker-contact-lookup"
                  placeholder="Search contact"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Additional Details & Financials */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Additional Details & Financials
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Label
                  htmlFor="internal-status"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Internal Status
                </Label>
                <Select>
                  <SelectTrigger
                    id="internal-status"
                    className="bg-yellow-50 border-gray-300 flex-1"
                  >
                    <SelectValue placeholder="New Submission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Submission</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="carrier"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Carrier
                </Label>
                <Select>
                  <SelectTrigger
                    id="carrier"
                    className="bg-white border-gray-300 flex-1"
                  >
                    <SelectValue placeholder="United Specialty Insurance Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usic">
                      United Specialty Insurance Company
                    </SelectItem>
                    <SelectItem value="carrier2">Carrier 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="new-renewal"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  New/Renewal
                </Label>
                <Input
                  id="new-renewal"
                  placeholder="New"
                  className="bg-yellow-50 border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="net-limit"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Net Limit
                </Label>
                <Input
                  id="net-limit"
                  placeholder="0"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="prior-policy-number"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Prior Policy Number
                </Label>
                <Input
                  id="prior-policy-number"
                  placeholder="Enter prior policy number"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="net-premium"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Net Premium
                </Label>
                <Input
                  id="net-premium"
                  placeholder="0.000"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="has-treaty-exceptions"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Has Treaty Exceptions
                </Label>
                <Select>
                  <SelectTrigger
                    id="has-treaty-exceptions"
                    className="bg-white border-gray-300 flex-1"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="treaty-applies"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Treaty Applies
                </Label>
                <Select>
                  <SelectTrigger
                    id="treaty-applies"
                    className="bg-white border-gray-300 flex-1"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="treaty-number"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Treaty Number
                </Label>
                <Input
                  id="treaty-number"
                  placeholder="12~45/2025 Casualty..."
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="has-facultative-reinsurance"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Has Facultative Reinsurance
                </Label>
                <Select>
                  <SelectTrigger
                    id="has-facultative-reinsurance"
                    className="bg-white border-gray-300 flex-1"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="treaty-exceptions"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Treaty Exceptions
                </Label>
                <Input
                  id="treaty-exceptions"
                  placeholder="Enter exceptions"
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Label
                  htmlFor="treaty-exception-reason"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0"
                >
                  Treaty Exception Reason
                </Label>
                <Input
                  id="treaty-exception-reason"
                  placeholder="Type here..."
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="col-span-2 flex gap-3">
                <Label
                  htmlFor="special-instructions"
                  className="text-sm font-medium text-gray-700 w-32 flex-shrink-0 pt-2"
                >
                  Special Instructions
                </Label>
                <textarea
                  id="special-instructions"
                  placeholder=""
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4 mt-6 border-t border-gray-200">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add List / Fields
            </Button>
            <Button className="bg-[#0054A6] hover:bg-[#003d7a]">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="destructive">Reset</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
