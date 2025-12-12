import { useState } from "react";
import { SubmissionSidebar } from "@/components/ui/submission-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

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

function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-8 mb-4">{children}</div>;
}

function FormField({
  label,
  isMandatory,
  children,
}: {
  label: string;
  isMandatory?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "p-3 rounded flex items-center gap-4",
        isMandatory ? "bg-yellow-100" : "bg-gray-50"
      )}
    >
      <label className="font-medium text-gray-700 whitespace-nowrap w-32 text-sm">
        {label}
        {isMandatory && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Insured & Submission Overview */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Insured & Submission Overview
        </h3>
        <FormRow>
          <FormField label="Insured" isMandatory>
            <Input placeholder="Enter Insured name" />
          </FormField>
          <FormField label="DOA" isMandatory>
            <Input placeholder="Enter DOA" />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Project Identifier">
            <Input placeholder="Enter project identifier" />
          </FormField>
          <FormField label="Submission Number" isMandatory>
            <Input placeholder="Enter submission number" />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Submission Suffix">
            <Input placeholder="Enter suffix" />
          </FormField>
          <FormField label="Named Insured">
            <Input placeholder="Enter named insured" />
          </FormField>
        </FormRow>
        <div className="mb-4">
          <FormField label="Direct Link / Policy Number">
            <Input placeholder="Enter policy number or link" />
          </FormField>
        </div>
      </div>

      {/* Product & Coverage Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Product & Coverage Details
        </h3>
        <FormRow>
          <FormField label="Product" isMandatory>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product1">Product 1</SelectItem>
                <SelectItem value="product2">Product 2</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Coverage" isMandatory>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select coverage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coverage1">Coverage 1</SelectItem>
                <SelectItem value="coverage2">Coverage 2</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Sub Class">
            <Input placeholder="Enter sub class" />
          </FormField>
          <FormField label="Main ISO Code">
            <Input placeholder="Enter main ISO code" />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Secondary ISO Code">
            <Input placeholder="Enter secondary ISO code" />
          </FormField>
          <FormField label="Risk State" isMandatory>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ak">AK</SelectItem>
                <SelectItem value="al">AL</SelectItem>
                <SelectItem value="ar">AR</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </FormRow>
      </div>

      {/* Dates */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dates</h3>
        <FormRow>
          <FormField label="Proposed Effective Date" isMandatory>
            <Input placeholder="MM/DD/YYYY" />
          </FormField>
          <FormField label="Proposed Expiration Date" isMandatory>
            <Input placeholder="MM/DD/YYYY" />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Received Date">
            <Input placeholder="MM/DD/YYYY" />
          </FormField>
          <FormField label="Requested By Date">
            <Input placeholder="MM/DD/YYYY" />
          </FormField>
        </FormRow>
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
