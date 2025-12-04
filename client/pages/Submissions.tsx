import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Save, Plus } from 'lucide-react';

export default function Submissions() {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="w-full">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Submissions</h1>
          <p className="text-gray-600">Create and manage insurance submissions</p>
        </div>

        {/* Form Container - Full width, minimal styling */}
        <form className="bg-white p-8 space-y-6">
          
          {/* Section 1: Submission Information */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">Submission</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Label htmlFor="insured" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Insured
                </Label>
                <Input 
                  id="insured" 
                  placeholder="DMAround_21421" 
                  className="bg-yellow-50 border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="issued" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Issued
                </Label>
                <Input 
                  id="issued" 
                  placeholder="QAA" 
                  className="bg-yellow-50 border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="project-identifier" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Project Identifier
                </Label>
                <Input 
                  id="project-identifier" 
                  placeholder="QAA" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="product" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Product
                </Label>
                <Select>
                  <SelectTrigger id="product" className="bg-white border-gray-300 flex-1">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general-liability">General Liability</SelectItem>
                    <SelectItem value="property">Property</SelectItem>
                    <SelectItem value="workers-comp">Workers Compensation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="proposed-eff-date" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Proposed Eff Date
                </Label>
                <Input 
                  id="proposed-eff-date" 
                  type="date" 
                  className="bg-yellow-50 border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="underwriter" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Underwriter
                </Label>
                <Select>
                  <SelectTrigger id="underwriter" className="bg-white border-gray-300 flex-1">
                    <SelectValue placeholder="Select underwriter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uw1">Underwriter 1</SelectItem>
                    <SelectItem value="uw2">Underwriter 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="renewal-underwriter" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Renewal Underwriter
                </Label>
                <Select>
                  <SelectTrigger id="renewal-underwriter" className="bg-white border-gray-300 flex-1">
                    <SelectValue placeholder="Select renewal underwriter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uw1">Underwriter 1</SelectItem>
                    <SelectItem value="uw2">Underwriter 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="broker" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Broker
                </Label>
                <Input 
                  id="broker" 
                  placeholder="Adamson E. Brokerage of Washington, Seattle, WA, 98101" 
                  className="bg-yellow-50 border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="broker-contact" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Broker Contact
                </Label>
                <Input 
                  id="broker-contact" 
                  placeholder="Christian, Emily" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="broker-contact-lookup" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Broker Contact Lookup
                </Label>
                <Input 
                  id="broker-contact-lookup" 
                  placeholder="Search contact" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="coverage" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Coverage
                </Label>
                <Select>
                  <SelectTrigger id="coverage" className="bg-yellow-50 border-gray-300 flex-1">
                    <SelectValue placeholder="Select coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="proposed-cup-date" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Proposed Cup Date
                </Label>
                <Input 
                  id="proposed-cup-date" 
                  type="date" 
                  className="bg-yellow-50 border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="underwriter-assistant" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Underwriter Assistant
                </Label>
                <Input 
                  id="underwriter-assistant" 
                  placeholder="Enter assistant name" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Submission Details */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">Submission Number</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Label htmlFor="submission-number" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Submission Number
                </Label>
                <Input 
                  id="submission-number" 
                  placeholder="SUB-123456" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="type" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Type
                </Label>
                <Input 
                  id="type" 
                  placeholder="Manual Entry" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="manual-entry-note" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Manual Entry
                </Label>
                <Input 
                  id="manual-entry-note" 
                  placeholder="Note" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="main-iso-code" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Main ISO Code
                </Label>
                <Input 
                  id="main-iso-code" 
                  placeholder="Type name" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex gap-4">
                <Label htmlFor="special-instructions" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0 pt-2">
                  Special Instructions
                </Label>
                <textarea
                  id="special-instructions"
                  placeholder=""
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  rows={2}
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="qaa" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  QAA
                </Label>
                <Input 
                  id="qaa" 
                  placeholder="Enter QAA" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="prior-policy-number" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Prior Policy Number
                </Label>
                <Input 
                  id="prior-policy-number" 
                  placeholder="Enter prior policy number" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="has-treaty-exceptions" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Has Treaty Exceptions
                </Label>
                <Select>
                  <SelectTrigger id="has-treaty-exceptions" className="bg-white border-gray-300 flex-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="has-facultative-reinsurance" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Has Facultative Reinsurance
                </Label>
                <Select>
                  <SelectTrigger id="has-facultative-reinsurance" className="bg-white border-gray-300 flex-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Section 3: Internal Status */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">Internal Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Label htmlFor="internal-status" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Internal Status
                </Label>
                <Select>
                  <SelectTrigger id="internal-status" className="bg-yellow-50 border-gray-300 flex-1">
                    <SelectValue placeholder="New Submission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Submission</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="new-renewal-flag" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  New/Renewal Flag
                </Label>
                <Input 
                  id="new-renewal-flag" 
                  placeholder="New" 
                  className="bg-yellow-50 border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="prior-policy-number-status" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Prior Policy Number
                </Label>
                <Input 
                  id="prior-policy-number-status" 
                  placeholder="Enter policy number" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="has-treaty-exceptions-flag" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Has Treaty Exceptions
                </Label>
                <Input 
                  id="has-treaty-exceptions-flag" 
                  placeholder="Yes" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="has-facultative-reinsurance-flag" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Has Facultative Reinsurance
                </Label>
                <Input 
                  id="has-facultative-reinsurance-flag" 
                  placeholder="Yes" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="carrier" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Carrier
                </Label>
                <Select>
                  <SelectTrigger id="carrier" className="bg-white border-gray-300 flex-1">
                    <SelectValue placeholder="United Specialty Insurance Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usic">United Specialty Insurance Company</SelectItem>
                    <SelectItem value="carrier2">Carrier 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="net-limit" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Net Limit
                </Label>
                <Input 
                  id="net-limit" 
                  placeholder="0" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="net-premium" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Net Premium
                </Label>
                <Input 
                  id="net-premium" 
                  placeholder="0.000" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Risk Information */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">Risk State</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Label htmlFor="risk-state" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Risk State
                </Label>
                <Select>
                  <SelectTrigger id="risk-state" className="bg-yellow-50 border-gray-300 flex-1">
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

              <div className="flex items-center gap-4">
                <Label htmlFor="secondary-iso-code" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
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

          {/* Section 5: Status & Alerts */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Status
                </Label>
                <Select>
                  <SelectTrigger id="status" className="bg-white border-gray-300 flex-1">
                    <SelectValue placeholder="In Progress" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="treaty-applies" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Treaty Applies
                </Label>
                <Select>
                  <SelectTrigger id="treaty-applies" className="bg-white border-gray-300 flex-1">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="treaty-number" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Treaty Number
                </Label>
                <Input 
                  id="treaty-number" 
                  placeholder="12~45/2025 Casualty..." 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="treaty-exceptions" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Treaty Exceptions
                </Label>
                <Input 
                  id="treaty-exceptions" 
                  placeholder="Enter exceptions" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="treaty-exception-reason" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Treaty Exception Reason
                </Label>
                <Input 
                  id="treaty-exception-reason" 
                  placeholder="Type here..." 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="servicing-company" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Servicing Company
                </Label>
                <Input 
                  id="servicing-company" 
                  placeholder="Data" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Direct Links & Named Insured */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wide">Direct Links</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Label htmlFor="policy-number" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Policy Number
                </Label>
                <Input 
                  id="policy-number" 
                  placeholder="not on file" 
                  className="bg-white border-gray-300 flex-1"
                />
              </div>

              <div className="flex items-center gap-4">
                <Label htmlFor="named-insured" className="text-sm font-medium text-gray-700 w-40 flex-shrink-0">
                  Named Insured
                </Label>
                <div className="flex gap-2 flex-1">
                  <Input 
                    id="named-insured" 
                    placeholder="OrgName_97926" 
                    className="flex-1 bg-white border-gray-300"
                  />
                  <Button variant="outline" className="whitespace-nowrap">Go To Customer Center for Insured</Button>
                </div>
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
            <Button variant="destructive">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
