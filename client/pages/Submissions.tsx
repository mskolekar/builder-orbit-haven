import React, { useState } from "react";
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
import { ChevronLeft, Menu } from "lucide-react";

function SubmissionHeader({
  isCollapsed,
  onToggleCollapse,
}: {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}) {
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
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="text-white hover:bg-white/10 p-1 h-8 w-8"
          title={isCollapsed ? "Expand Panel" : "Collapse Panel"}
        >
          {isCollapsed ? (
            <Menu size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </Button>
        <div className="flex items-center justify-between flex-1">
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
    </div>
  );
}

function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-12 mb-6">{children}</div>;
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
    <div className="flex gap-4 items-start">
      <label className="w-40 flex-shrink-0 font-medium text-gray-700 text-sm pt-2">
        {label}
        {isMandatory && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="flex-1">
        {isMandatory
          ? React.cloneElement(children as React.ReactElement, {
              className: cn(
                (children as React.ReactElement).props.className,
                "bg-yellow-100",
              ),
            })
          : children}
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-gray-900 pb-3 border-b border-gray-300">
        {title}
      </h3>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-8">
      {/* Insured & Submission Overview */}
      <div>
        <SectionHeader title="Insured & Submission Overview" />
        <FormRow>
          <FormField label="Insured" isMandatory>
            <Input />
          </FormField>
          <FormField label="DOA" isMandatory>
            <Input />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Project Identifier">
            <Input />
          </FormField>
          <FormField label="Submission Number" isMandatory>
            <Input />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Submission Suffix">
            <Input />
          </FormField>
          <FormField label="Named Insured">
            <Input />
          </FormField>
        </FormRow>
        <div className="grid grid-cols-2 gap-12">
          <FormField label="Direct Link / Policy Number">
            <Input />
          </FormField>
          <div />
        </div>
      </div>

      {/* Product & Coverage Details */}
      <div>
        <SectionHeader title="Product & Coverage Details" />
        <FormRow>
          <FormField label="Product" isMandatory>
            <Select>
              <SelectTrigger>
                <SelectValue />
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
                <SelectValue />
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
            <Input />
          </FormField>
          <FormField label="Main ISO Code">
            <Input />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Secondary ISO Code">
            <Input />
          </FormField>
          <FormField label="Risk State" isMandatory>
            <Select>
              <SelectTrigger>
                <SelectValue />
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
        <SectionHeader title="Dates" />
        <FormRow>
          <FormField label="Proposed Effective Date" isMandatory>
            <Input />
          </FormField>
          <FormField label="Proposed Expiration Date" isMandatory>
            <Input />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Received Date">
            <Input />
          </FormField>
          <FormField label="Requested By Date">
            <Input />
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

function PricingSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
      <p className="text-gray-600">Pricing content goes here</p>
    </div>
  );
}

function SubjectivitySection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Subjectivity</h3>
      <p className="text-gray-600">Subjectivity content goes here</p>
    </div>
  );
}

function ProposalSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Proposal</h3>
      <p className="text-gray-600">Proposal content goes here</p>
    </div>
  );
}

function FormsSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Forms</h3>
      <p className="text-gray-600">Forms content goes here</p>
    </div>
  );
}

function BindSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Bind</h3>
      <p className="text-gray-600">Bind content goes here</p>
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

const submissionTabs = [
  { label: "Overview", id: "overview" },
  { label: "UW Questions", id: "uw-questions" },
  { label: "Additional Interests", id: "additional-interests" },
  { label: "Exposures", id: "exposures" },
  { label: "Manual Multi Rating", id: "manual-multi-rating" },
  { label: "Inclusions/Exclusions", id: "inclusions-exclusions" },
  { label: "Quotations", id: "quotations" },
  { label: "Pricing", id: "quotations-pricing" },
  { label: "Subjectivity", id: "quotations-subjectivity" },
  { label: "Proposal", id: "quotations-proposal" },
  { label: "Forms", id: "quotations-forms" },
  { label: "Bind", id: "quotations-bind" },
  { label: "Parties", id: "parties" },
  { label: "Journal", id: "journal" },
];

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
      case "quotations-pricing":
        return <PricingSection />;
      case "quotations-subjectivity":
        return <SubjectivitySection />;
      case "quotations-proposal":
        return <ProposalSection />;
      case "quotations-forms":
        return <FormsSection />;
      case "quotations-bind":
        return <BindSection />;
      case "parties":
        return <PartiesSection />;
      case "journal":
        return <JournalSection />;
      default:
        return <OverviewSection />;
    }
  };

  const getActiveTabLabel = (): string => {
    const tab = submissionTabs.find((t) => t.id === activeTab);
    if (tab) return tab.label;
    return "Overview";
  };

  const getBreadcrumbPath = (): { label: string; level: number }[] => {
    const path: { label: string; level: number }[] = [
      { label: "Submissions", level: 0 },
    ];

    // Handle quotations submodules
    if (activeTab.startsWith("quotations-")) {
      if (activeTab !== "quotations") {
        path.push({ label: "Quotations", level: 1 });
        const subLabel = activeTab.replace("quotations-", "");
        const formatted =
          subLabel.charAt(0).toUpperCase() +
          subLabel.slice(1).replace("-", " ");
        path.push({ label: formatted, level: 2 });
      } else {
        path.push({ label: "Quotations", level: 1 });
      }
    }
    // Handle journal submodules
    else if (activeTab.startsWith("journal-")) {
      if (activeTab !== "journal") {
        path.push({ label: "Journal", level: 1 });
        const subLabel = activeTab.replace("journal-", "");
        const formatted =
          subLabel.charAt(0).toUpperCase() +
          subLabel.slice(1).replace("-", " ");
        path.push({ label: formatted, level: 2 });
      } else {
        path.push({ label: "Journal", level: 1 });
      }
    }
    // Handle regular tabs
    else {
      const tab = submissionTabs.find((t) => t.id === activeTab);
      if (tab && activeTab !== "overview") {
        path.push({ label: tab.label, level: 1 });
      } else if (activeTab === "overview") {
        path.push({ label: "Overview", level: 1 });
      }
    }

    return path;
  };

  const activeTabLabel = getActiveTabLabel();
  const breadcrumbPath = getBreadcrumbPath();

  return (
    <div className="flex-1 flex flex-col">
      <SubmissionHeader
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex flex-1 overflow-hidden">
        <SubmissionSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isCollapsed={isSidebarCollapsed}
        />
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Breadcrumb Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="text-sm text-gray-600 flex items-center gap-1">
              {breadcrumbPath.map((item, index) => (
                <React.Fragment key={index}>
                  <span
                    className={
                      index === breadcrumbPath.length - 1
                        ? "text-gray-900"
                        : ""
                    }
                  >
                    {item.label}
                  </span>
                  {index < breadcrumbPath.length - 1 && (
                    <span>&gt;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto bg-white">
            <div className="w-full h-full p-8">
              {renderContent()}
              {/* Action Buttons */}
              <div className="mt-12 pt-6 border-t border-gray-200 space-y-3">
                {/* Row 1: Business Actions */}
                <div className="flex justify-end gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save
                  </Button>
                </div>
                {/* Row 2: Navigation */}
                <div className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
