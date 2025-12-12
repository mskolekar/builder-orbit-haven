import { useState } from "react";
import { SubmissionSidebar } from "@/components/ui/submission-sidebar";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

function SubmissionHeader() {
  const submissionInfo = {
    id: "OrgName_97828",
    dates: "11-24-2025 - 11-24-2026",
    state: "AK",
    code: "XPE-016135 : 01",
    status: "InProgress",
    type: "New Submission",
  };

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-[#0054A6] to-[#003d7a] text-white px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold">Submission:</span>
          <span>{submissionInfo.id}</span>
          <span className="text-white/70">|</span>
          <span>{submissionInfo.dates}</span>
          <span className="text-white/70">|</span>
          <span>{submissionInfo.state}</span>
          <span className="text-white/70">|</span>
          <span>{submissionInfo.code}</span>
          <span className="text-white/70">|</span>
          <span>
            Status:{" "}
            <span className="font-semibold">{submissionInfo.status}</span> -{" "}
            {submissionInfo.type}
          </span>
        </div>
      </div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-8">
      {/* Insured & Submission Overview */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Insured & Submission Overview
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="insured" className="text-gray-700 font-medium">
              Insured *
            </Label>
            <Input
              id="insured"
              placeholder="Enter Insured name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="doa" className="text-gray-700 font-medium">
              DOA *
            </Label>
            <Input id="doa" placeholder="Enter DOA" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="project-identifier" className="text-gray-700 font-medium">
              Project Identifier
            </Label>
            <Input
              id="project-identifier"
              placeholder="Enter project identifier"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="submission-number" className="text-gray-700 font-medium">
              Submission Number *
            </Label>
            <Input
              id="submission-number"
              placeholder="Enter submission number"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="submission-suffix" className="text-gray-700 font-medium">
              Submission Suffix
            </Label>
            <Input
              id="submission-suffix"
              placeholder="Enter suffix"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="named-insured" className="text-gray-700 font-medium">
              Named Insured
            </Label>
            <Input
              id="named-insured"
              placeholder="Enter named insured"
              className="mt-1"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="direct-link" className="text-gray-700 font-medium">
              Direct Link / Policy Number
            </Label>
            <Input
              id="direct-link"
              placeholder="Enter policy number or link"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Product & Coverage Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Product & Coverage Details
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="product" className="text-gray-700 font-medium">
              Product *
            </Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product1">Product 1</SelectItem>
                <SelectItem value="product2">Product 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="coverage" className="text-gray-700 font-medium">
              Coverage *
            </Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select coverage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coverage1">Coverage 1</SelectItem>
                <SelectItem value="coverage2">Coverage 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sub-class" className="text-gray-700 font-medium">
              Sub Class
            </Label>
            <Input
              id="sub-class"
              placeholder="Enter sub class"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="main-iso-code" className="text-gray-700 font-medium">
              Main ISO Code
            </Label>
            <Input
              id="main-iso-code"
              placeholder="Enter main ISO code"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="secondary-iso-code" className="text-gray-700 font-medium">
              Secondary ISO Code
            </Label>
            <Input
              id="secondary-iso-code"
              placeholder="Enter secondary ISO code"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="risk-state" className="text-gray-700 font-medium">
              Risk State *
            </Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ak">AK</SelectItem>
                <SelectItem value="al">AL</SelectItem>
                <SelectItem value="ar">AR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dates</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="proposed-effective-date" className="text-gray-700 font-medium">
              Proposed Effective Date *
            </Label>
            <Input
              id="proposed-effective-date"
              placeholder="MM/DD/YYYY"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="proposed-expiration-date" className="text-gray-700 font-medium">
              Proposed Expiration Date *
            </Label>
            <Input
              id="proposed-expiration-date"
              placeholder="MM/DD/YYYY"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="received-date" className="text-gray-700 font-medium">
              Received Date
            </Label>
            <Input
              id="received-date"
              placeholder="MM/DD/YYYY"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="requested-by-date" className="text-gray-700 font-medium">
              Requested By Date
            </Label>
            <Input
              id="requested-by-date"
              placeholder="MM/DD/YYYY"
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function UWQuestionsSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">UW Questions</h3>
      <p className="text-gray-600">UW Questions content goes here</p>
    </div>
  );
}

function AdditionalInterestsSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Additional Interests
      </h3>
      <p className="text-gray-600">Additional Interests content goes here</p>
    </div>
  );
}

function ExposuresSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Exposures</h3>
      <p className="text-gray-600">Exposures content goes here</p>
    </div>
  );
}

function ManualMultiRatingSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Manual Multi Rating
      </h3>
      <p className="text-gray-600">Manual Multi Rating content goes here</p>
    </div>
  );
}

function InclusionsExclusionsSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Inclusions/Exclusions
      </h3>
      <p className="text-gray-600">Inclusions/Exclusions content goes here</p>
    </div>
  );
}

function QuotationsSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Quotations</h3>
      <p className="text-gray-600">Quotations content goes here</p>
    </div>
  );
}

function PartiesSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Parties</h3>
      <p className="text-gray-600">Parties content goes here</p>
    </div>
  );
}

function JournalSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Journal</h3>
      <p className="text-gray-600">Journal content goes here</p>
    </div>
  );
}

export default function Submissions() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewSection />;
      case "uw-questions":
        return <UWQuestionsSection />;
      case "additional-interests":
        return <AdditionalInterestsSection />;
      case "exposures":
        return <ExposuresSection />;
      case "manual-multi-rating":
        return <ManualMultiRatingSection />;
      case "inclusions-exclusions":
        return <InclusionsExclusionsSection />;
      case "quotations":
        return <QuotationsSection />;
      case "parties":
        return <PartiesSection />;
      case "journal":
        return <JournalSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <SubmissionHeader />
      <div className="flex flex-1 overflow-hidden">
        <SubmissionSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <div className="flex-1 flex flex-col overflow-auto">
          <div className="flex-1 overflow-auto">
            <div className="max-w-6xl mx-auto p-6">
              {renderContent()}
              {/* Action Buttons */}
              <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
                <Button variant="outline">Previous</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Save</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
