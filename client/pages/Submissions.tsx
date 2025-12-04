import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Save, Plus } from 'lucide-react';

export default function Submissions() {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Submissions</h1>
          <p className="text-gray-600">Create and manage insurance submissions</p>
        </div>

        {/* Form Container */}
        <form className="space-y-6">
          {/* Section 1: Submission Information */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg">Submission Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="submission-number" className="text-sm font-medium">
                      Submission Number
                    </Label>
                    <Input id="submission-number" placeholder="SUB-001234" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-sm font-medium">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger id="type" className="mt-1">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Business</SelectItem>
                        <SelectItem value="renewal">Renewal</SelectItem>
                        <SelectItem value="endorsement">Endorsement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="product" className="text-sm font-medium">
                      Product
                    </Label>
                    <Select>
                      <SelectTrigger id="product" className="mt-1">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general-liability">General Liability</SelectItem>
                        <SelectItem value="property">Property</SelectItem>
                        <SelectItem value="workers-comp">Workers Compensation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="proposed-eff-date" className="text-sm font-medium">
                      Proposed Effective Date
                    </Label>
                    <Input id="proposed-eff-date" type="date" className="mt-1" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="manual-entry" />
                    <Label htmlFor="manual-entry" className="font-normal cursor-pointer">
                      Manual Entry
                    </Label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="project-identifier" className="text-sm font-medium">
                      Project Identifier
                    </Label>
                    <Input id="project-identifier" placeholder="Enter project ID" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="qaa" className="text-sm font-medium">
                      QAA
                    </Label>
                    <Input id="qaa" placeholder="Enter QAA" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="main-iso-code" className="text-sm font-medium">
                      Main ISO Code
                    </Label>
                    <Input id="main-iso-code" placeholder="Enter ISO code" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="special-instructions" className="text-sm font-medium">
                      Special Instructions
                    </Label>
                    <textarea
                      id="special-instructions"
                      placeholder="Enter any special instructions"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Insured & Underwriter Information */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg">Insured & Underwriter Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="insured" className="text-sm font-medium">
                      Insured
                    </Label>
                    <Input id="insured" placeholder="Enter insured name" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="underwriter" className="text-sm font-medium">
                      Underwriter
                    </Label>
                    <Select>
                      <SelectTrigger id="underwriter" className="mt-1">
                        <SelectValue placeholder="Select underwriter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uw1">Underwriter 1</SelectItem>
                        <SelectItem value="uw2">Underwriter 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="renewal-underwriter" className="text-sm font-medium">
                      Renewal Underwriter
                    </Label>
                    <Select>
                      <SelectTrigger id="renewal-underwriter" className="mt-1">
                        <SelectValue placeholder="Select renewal underwriter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uw1">Underwriter 1</SelectItem>
                        <SelectItem value="uw2">Underwriter 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="prior-policy-number" className="text-sm font-medium">
                      Prior Policy Number
                    </Label>
                    <Input id="prior-policy-number" placeholder="Enter prior policy number" className="mt-1" />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="underwriter-assistant" className="text-sm font-medium">
                      Underwriter Assistant
                    </Label>
                    <Input id="underwriter-assistant" placeholder="Enter assistant name" className="mt-1" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="new-renewal" />
                    <Label htmlFor="new-renewal" className="font-normal cursor-pointer">
                      New/Renewal
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="has-treaty-exceptions" />
                    <Label htmlFor="has-treaty-exceptions" className="font-normal cursor-pointer">
                      Has Treaty Exceptions
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="has-facultative-reinsurance" />
                    <Label htmlFor="has-facultative-reinsurance" className="font-normal cursor-pointer">
                      Has Facultative Reinsurance
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Broker Information */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg">Broker Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="broker" className="text-sm font-medium">
                      Broker
                    </Label>
                    <Input id="broker" placeholder="Enter broker name" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="broker-contact" className="text-sm font-medium">
                      Broker Contact
                    </Label>
                    <Input id="broker-contact" placeholder="Enter contact name" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="broker-contact-lookup" className="text-sm font-medium">
                      Broker Contact Lookup
                    </Label>
                    <Input id="broker-contact-lookup" placeholder="Search contact" className="mt-1" />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="submission-suffix" className="text-sm font-medium">
                      Submission Suffix
                    </Label>
                    <Input id="submission-suffix" placeholder="Enter suffix" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="received-date" className="text-sm font-medium">
                      Received Date
                    </Label>
                    <Input id="received-date" type="date" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="requested-by-date" className="text-sm font-medium">
                      Requested By Date
                    </Label>
                    <Input id="requested-by-date" type="date" className="mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Coverage & Risk Information */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg">Coverage & Risk Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="coverage" className="text-sm font-medium">
                      Coverage
                    </Label>
                    <Select>
                      <SelectTrigger id="coverage" className="mt-1">
                        <SelectValue placeholder="Select coverage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="net-limit" className="text-sm font-medium">
                      Net Limit
                    </Label>
                    <Input id="net-limit" placeholder="Enter net limit" type="number" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="net-premium" className="text-sm font-medium">
                      Net Premium
                    </Label>
                    <Input id="net-premium" placeholder="Enter net premium" type="number" className="mt-1" />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="risk-state" className="text-sm font-medium">
                      Risk State
                    </Label>
                    <Select>
                      <SelectTrigger id="risk-state" className="mt-1">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="al">Alabama</SelectItem>
                        <SelectItem value="ak">Alaska</SelectItem>
                        <SelectItem value="az">Arizona</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="secondary-iso-code" className="text-sm font-medium">
                      Secondary ISO Code
                    </Label>
                    <Input id="secondary-iso-code" placeholder="Enter ISO code" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="carrier" className="text-sm font-medium">
                      Carrier
                    </Label>
                    <Select>
                      <SelectTrigger id="carrier" className="mt-1">
                        <SelectValue placeholder="Select carrier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carrier1">Carrier 1</SelectItem>
                        <SelectItem value="carrier2">Carrier 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Treaty Information */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg">Treaty Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="treaty-applies" />
                    <Label htmlFor="treaty-applies" className="font-normal cursor-pointer">
                      Treaty Applies
                    </Label>
                  </div>

                  <div>
                    <Label htmlFor="treaty-number" className="text-sm font-medium">
                      Treaty Number
                    </Label>
                    <Input id="treaty-number" placeholder="Enter treaty number" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="treaty-exceptions" className="text-sm font-medium">
                      Treaty Exceptions
                    </Label>
                    <Input id="treaty-exceptions" placeholder="Enter exceptions" className="mt-1" />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="treaty-exception-reason" className="text-sm font-medium">
                      Treaty Exception Reason
                    </Label>
                    <Select>
                      <SelectTrigger id="treaty-exception-reason" className="mt-1">
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reason1">Reason 1</SelectItem>
                        <SelectItem value="reason2">Reason 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="servicing-company" className="text-sm font-medium">
                      Servicing Company
                    </Label>
                    <Select>
                      <SelectTrigger id="servicing-company" className="mt-1">
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company1">Company 1</SelectItem>
                        <SelectItem value="company2">Company 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="named-insured" className="text-sm font-medium">
                      Named Insured
                    </Label>
                    <Input id="named-insured" placeholder="Enter named insured" className="mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Status & Alerts */}
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg">Status & Alerts</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="internal-status" className="text-sm font-medium">
                      Internal Status
                    </Label>
                    <Select>
                      <SelectTrigger id="internal-status" className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Submission</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="insured-alert" />
                    <Label htmlFor="insured-alert" className="font-normal cursor-pointer">
                      Insured Alert
                    </Label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status" className="text-sm font-medium">
                      Status
                    </Label>
                    <Select>
                      <SelectTrigger id="status" className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="pending">Pending Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="policy-number" className="text-sm font-medium">
                      Policy Number
                    </Label>
                    <Input id="policy-number" placeholder="Enter policy number" className="mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
            <Button className="bg-[#0054A6] hover:bg-[#003d7a]">
              <Save className="w-4 h-4 mr-2" />
              Save Submission
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
