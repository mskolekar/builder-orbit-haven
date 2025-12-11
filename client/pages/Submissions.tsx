import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, MoreVertical, ArrowUpDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  // Insured & Submission Overview
  insured: string;
  dba: string;
  projectIdentifier: string;
  submissionNumber: string;
  submissionSuffix: string;
  namedInsured: string;
  directLinksPolicy: string;

  // Product & Coverage Details
  product: string;
  coverage: string;
  subClass: string;
  mainISOCode: string;
  secondaryISOCode: string;
  riskState: string;

  // Dates
  proposedEffectiveDate: string;
  proposedExpirationDate: string;
  receivedDate: string;
  requestedByDate: string;

  // Underwriting & Broker Details
  underwriter: string;
  renewalUnderwriter: string;
  underwriterAssistant: string;
  broker: string;
  brokerContact: string;
  brokerContactLookup: string;

  // Additional Details & Financials
  internalStatus: string;
  newRenewal: string;
  priorPolicyNumber: string;
  hasTreatyExceptions: boolean;
  treatyApplies: string;
  treatyNumber: string;
  treatyExceptions: string;
  treatyExceptionReason: string;
  hasFacultativeReinsurance: boolean;
  carrier: string;
  netLimit: string;
  netPremium: string;
  specialInstructions: string;
}

interface LongAnswerQuestion {
  id: string;
  question: string;
  answer: string;
  required: boolean;
}

interface TableRowData {
  id: string;
  name: string;
  status: string;
  effectiveDate: string;
  expirationDate: string;
  premium: string;
}

function DatePickerField({
  value,
  onChange,
  placeholder = "MM/DD/YYYY",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());
  const [inputValue, setInputValue] = useState(value);

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    // If already formatted as MM/DD/YYYY, return as is
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return dateStr;
    // Parse ISO or other formats
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const parseInputDate = (input: string): Date | null => {
    const match = input.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!match) return null;
    const [, month, day, year] = match;
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (isNaN(date.getTime())) return null;
    return date;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);

    // Try to parse and validate the date
    const parsed = parseInputDate(input);
    if (parsed && !isNaN(parsed.getTime())) {
      const month = String(parsed.getMonth() + 1).padStart(2, "0");
      const day = String(parsed.getDate()).padStart(2, "0");
      const year = parsed.getFullYear();
      onChange(`${month}/${day}/${year}`);
      setDisplayMonth(parsed);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      const formatted = `${month}/${day}/${year}`;
      setInputValue(formatted);
      onChange(formatted);
      setDisplayMonth(date);
      setIsOpen(false);
    }
  };

  const handleYearChange = (newYear: number) => {
    setDisplayMonth(new Date(newYear, displayMonth.getMonth(), 1));
  };

  const handleMonthChange = (offset: number) => {
    const newMonth = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth() + offset,
      1,
    );
    setDisplayMonth(newMonth);
  };

  // Update display month when value changes externally
  if (value && value !== inputValue) {
    const parsed = parseInputDate(value);
    if (parsed) {
      setDisplayMonth(parsed);
    }
    setInputValue(formatDateForDisplay(value));
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          )}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          {/* Year Selector */}
          <div className="flex items-center justify-between gap-2">
            <label className="text-sm font-medium">Year</label>
            <select
              value={displayMonth.getFullYear()}
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              className="rounded border border-input px-2 py-1 text-sm"
            >
              {Array.from(
                { length: 50 },
                (_, i) => new Date().getFullYear() - 25 + i,
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Month Navigation and Calendar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleMonthChange(-1)}
                className="rounded p-1 hover:bg-gray-100"
                aria-label="Previous month"
              >
                ←
              </button>
              <span className="text-sm font-medium">
                {displayMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                type="button"
                onClick={() => handleMonthChange(1)}
                className="rounded p-1 hover:bg-gray-100"
                aria-label="Next month"
              >
                →
              </button>
            </div>

            <Calendar
              mode="single"
              month={displayMonth}
              onMonthChange={setDisplayMonth}
              selected={value ? parseInputDate(value) || undefined : undefined}
              onSelect={handleDateSelect}
              disabled={(date) => date > new Date()}
              initialFocus
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function FormField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const processedChildren = required
    ? React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const existingClass = child.props.className || "";
        return React.cloneElement(child as React.ReactElement<any>, {
          className: cn(existingClass, "bg-yellow-50"),
        });
      })
    : children;

  return (
    <div className="flex items-center gap-6">
      <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="flex-1 min-w-0">{processedChildren}</div>
    </div>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-gray-900 pb-3 border-b border-gray-200">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">{children}</div>
    </div>
  );
}

function SubmissionHeader() {
  // Sample submission data - in real app, this would come from props or state
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

function ActionMenuCell() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => console.log("Complete")}>
          Complete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Invalidate")}>
          Invalidate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log("Edit")}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("View Details")}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log("Delete")}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SubmissionDetailsTab() {
  const [longAnswers, setLongAnswers] = useState<LongAnswerQuestion[]>([
    {
      id: "1",
      question:
        "Risk Description (Include key operations and exposures that are absent/excluded/insured elsewhere)",
      answer: "",
      required: true,
    },
    {
      id: "2",
      question:
        "Main exposure (Population, ADJ; # of Employees; # of Law Enforcement; Fleet summary)",
      answer: "",
      required: true,
    },
    {
      id: "3",
      question:
        "Financial (Latest CAFR; Operating Budget; AM Best/Moody's/S&P Rating)",
      answer: "",
      required: false,
    },
    {
      id: "4",
      question:
        "Controls to Mitigate Losses/Safety Management/ Claim and Litigation Management",
      answer: "",
      required: true,
    },
    {
      id: "5",
      question: "Legal Environment (Sit Caps; Sovereign Immunities; State Hazard Rating (LJHMI))",
      answer: "",
      required: false,
    },
  ]);

  const [tableData] = useState<TableRowData[]>([
    {
      id: "1",
      name: "American Strategic Insurance Corporation",
      status: "Active",
      effectiveDate: "12-31-2025",
      expirationDate: "12-31-2026",
      premium: "$250,000",
    },
    {
      id: "2",
      name: "Lloyd's Syndicate 1234",
      status: "Pending",
      effectiveDate: "01-01-2026",
      expirationDate: "01-01-2027",
      premium: "$150,000",
    },
    {
      id: "3",
      name: "XYZ Mutual Insurance Co",
      status: "Active",
      effectiveDate: "12-31-2025",
      expirationDate: "12-31-2026",
      premium: "$300,000",
    },
  ]);

  const handleAnswerChange = (id: string, value: string) => {
    setLongAnswers(
      longAnswers.map((item) =>
        item.id === id ? { ...item, answer: value } : item
      )
    );
  };

  const handleSave = () => {
    console.log("Saving form data:", longAnswers);
  };

  return (
    <div className="space-y-8 p-6 w-full">
      {/* Long Answer Questions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Long Answer Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {longAnswers.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 items-start pb-6 border-b last:border-b-0 last:pb-0"
            >
              <div className="flex-1 min-w-0">
                <label className="text-sm font-medium text-gray-700 flex items-start gap-1">
                  {item.question}
                  {item.required && <span className="text-red-500">*</span>}
                </label>
              </div>
              <div className="flex-1 min-w-0">
                <Textarea
                  value={item.answer}
                  onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                  placeholder="Enter your answer here..."
                  className="min-h-24 resize-vertical"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Characters Remaining: 4000
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Placement Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Carrier Name
                      <ArrowUpDown size={12} className="text-gray-400" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Status
                      <ArrowUpDown size={12} className="text-gray-400" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Effective Date
                      <ArrowUpDown size={12} className="text-gray-400" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Expiration Date
                      <ArrowUpDown size={12} className="text-gray-400" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Premium
                      <ArrowUpDown size={12} className="text-gray-400" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-sm font-medium text-gray-800">
                      {row.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "text-xs",
                          row.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                        )}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {row.effectiveDate}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {row.expirationDate}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 font-medium">
                      {row.premium}
                    </TableCell>
                    <TableCell className="text-right">
                      <ActionMenuCell />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4 pt-8 border-t border-gray-200">
        {/* Row 1: Cancel and Save */}
        <div className="flex justify-end gap-4">
          <Button className="bg-[#0054A6] hover:bg-[#003d7a] text-white">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
          >
            Save Changes
          </Button>
        </div>

        {/* Row 2: Previous and Next */}
        <div className="flex justify-between gap-4">
          <Button className="bg-[#0054A6] hover:bg-[#003d7a] text-white">
            Previous
          </Button>
          <Button className="bg-[#0054A6] hover:bg-[#003d7a] text-white">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Submissions() {
  const [formData, setFormData] = useState<FormData>({
    // Insured & Submission Overview
    insured: "",
    dba: "",
    projectIdentifier: "",
    submissionNumber: "",
    submissionSuffix: "",
    namedInsured: "",
    directLinksPolicy: "",

    // Product & Coverage Details
    product: "",
    coverage: "",
    subClass: "",
    mainISOCode: "",
    secondaryISOCode: "",
    riskState: "",

    // Dates
    proposedEffectiveDate: "",
    proposedExpirationDate: "",
    receivedDate: "",
    requestedByDate: "",

    // Underwriting & Broker Details
    underwriter: "",
    renewalUnderwriter: "",
    underwriterAssistant: "",
    broker: "",
    brokerContact: "",
    brokerContactLookup: "",

    // Additional Details & Financials
    internalStatus: "",
    newRenewal: "",
    priorPolicyNumber: "",
    hasTreatyExceptions: false,
    treatyApplies: "",
    treatyNumber: "",
    treatyExceptions: "",
    treatyExceptionReason: "",
    hasFacultativeReinsurance: false,
    carrier: "",
    netLimit: "",
    netPremium: "",
    specialInstructions: "",
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add submission logic here
  };

  return (
    <div className="flex-1 flex flex-col">
      <SubmissionHeader />
      <div className="flex-1 overflow-auto">
        <Card className="h-full rounded-none border-none bg-background">
          <CardContent className="h-full p-0">
            <Tabs defaultValue="form" className="w-full h-full flex flex-col">
              <TabsList className="rounded-none border-b border-gray-200 bg-white h-auto p-0 w-full justify-start px-6">
                <TabsTrigger
                  value="form"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0054A6] data-[state=active]:bg-transparent"
                >
                  New Submission
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0054A6] data-[state=active]:bg-transparent"
                >
                  Summary
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="flex-1 overflow-auto m-0">
                <form onSubmit={handleSubmit} className="space-y-8 p-6 w-full">
              {/* Section 1: Insured & Submission Overview */}
              <FormSection title="Insured & Submission Overview">
                <FormField label="Insured" required>
                  <Input
                    value={formData.insured}
                    onChange={(e) =>
                      handleInputChange("insured", e.target.value)
                    }
                    placeholder="Enter insured name"
                  />
                </FormField>
                <FormField label="DBA" required>
                  <Input
                    value={formData.dba}
                    onChange={(e) => handleInputChange("dba", e.target.value)}
                    placeholder="Enter DBA"
                  />
                </FormField>
                <FormField label="Project Identifier">
                  <Input
                    value={formData.projectIdentifier}
                    onChange={(e) =>
                      handleInputChange("projectIdentifier", e.target.value)
                    }
                    placeholder="Enter project identifier"
                  />
                </FormField>
                <FormField label="Submission Number" required>
                  <Input
                    value={formData.submissionNumber}
                    onChange={(e) =>
                      handleInputChange("submissionNumber", e.target.value)
                    }
                    placeholder="Enter submission number"
                  />
                </FormField>
                <FormField label="Submission Suffix">
                  <Input
                    value={formData.submissionSuffix}
                    onChange={(e) =>
                      handleInputChange("submissionSuffix", e.target.value)
                    }
                    placeholder="Enter suffix"
                  />
                </FormField>
                <FormField label="Named Insured">
                  <Input
                    value={formData.namedInsured}
                    onChange={(e) =>
                      handleInputChange("namedInsured", e.target.value)
                    }
                    placeholder="Enter named insured"
                  />
                </FormField>
                <FormField label="Direct Links / Policy Number">
                  <Input
                    value={formData.directLinksPolicy}
                    onChange={(e) =>
                      handleInputChange("directLinksPolicy", e.target.value)
                    }
                    placeholder="Enter policy number or link"
                  />
                </FormField>
              </FormSection>

              {/* Section 2: Product & Coverage Details */}
              <FormSection title="Product & Coverage Details">
                <FormField label="Product" required>
                  <Select
                    value={formData.product}
                    onValueChange={(value) =>
                      handleInputChange("product", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary-eo">Primary E&O</SelectItem>
                      <SelectItem value="mgmt-liability">
                        Management Liability
                      </SelectItem>
                      <SelectItem value="crime">Crime</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Coverage" required>
                  <Select
                    value={formData.coverage}
                    onValueChange={(value) =>
                      handleInputChange("coverage", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="specialized">Specialized</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Sub Class">
                  <Input
                    value={formData.subClass}
                    onChange={(e) =>
                      handleInputChange("subClass", e.target.value)
                    }
                    placeholder="Enter sub class"
                  />
                </FormField>
                <FormField label="Main ISO Code">
                  <Input
                    value={formData.mainISOCode}
                    onChange={(e) =>
                      handleInputChange("mainISOCode", e.target.value)
                    }
                    placeholder="Enter main ISO code"
                  />
                </FormField>
                <FormField label="Secondary ISO Code">
                  <Input
                    value={formData.secondaryISOCode}
                    onChange={(e) =>
                      handleInputChange("secondaryISOCode", e.target.value)
                    }
                    placeholder="Enter secondary ISO code"
                  />
                </FormField>
                <FormField label="Risk State" required>
                  <Select
                    value={formData.riskState}
                    onValueChange={(value) =>
                      handleInputChange("riskState", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </FormSection>

              {/* Section 3: Dates */}
              <FormSection title="Dates">
                <FormField label="Proposed Effective Date" required>
                  <DatePickerField
                    value={formData.proposedEffectiveDate}
                    onChange={(value) =>
                      handleInputChange("proposedEffectiveDate", value)
                    }
                  />
                </FormField>
                <FormField label="Proposed Expiration Date" required>
                  <DatePickerField
                    value={formData.proposedExpirationDate}
                    onChange={(value) =>
                      handleInputChange("proposedExpirationDate", value)
                    }
                  />
                </FormField>
                <FormField label="Received Date">
                  <DatePickerField
                    value={formData.receivedDate}
                    onChange={(value) =>
                      handleInputChange("receivedDate", value)
                    }
                  />
                </FormField>
                <FormField label="Requested By Date">
                  <DatePickerField
                    value={formData.requestedByDate}
                    onChange={(value) =>
                      handleInputChange("requestedByDate", value)
                    }
                  />
                </FormField>
              </FormSection>

              {/* Section 4: Underwriting & Broker Details */}
              <FormSection title="Underwriting & Broker Details">
                <FormField label="Underwriter" required>
                  <Input
                    value={formData.underwriter}
                    onChange={(e) =>
                      handleInputChange("underwriter", e.target.value)
                    }
                    placeholder="Enter underwriter name"
                  />
                </FormField>
                <FormField label="Renewal Underwriter">
                  <Input
                    value={formData.renewalUnderwriter}
                    onChange={(e) =>
                      handleInputChange("renewalUnderwriter", e.target.value)
                    }
                    placeholder="Enter renewal underwriter"
                  />
                </FormField>
                <FormField label="Underwriter Assistant">
                  <Input
                    value={formData.underwriterAssistant}
                    onChange={(e) =>
                      handleInputChange("underwriterAssistant", e.target.value)
                    }
                    placeholder="Enter assistant name"
                  />
                </FormField>
                <FormField label="Broker" required>
                  <Input
                    value={formData.broker}
                    onChange={(e) =>
                      handleInputChange("broker", e.target.value)
                    }
                    placeholder="Enter broker name"
                  />
                </FormField>
                <FormField label="Broker Contact">
                  <Input
                    value={formData.brokerContact}
                    onChange={(e) =>
                      handleInputChange("brokerContact", e.target.value)
                    }
                    placeholder="Enter broker contact"
                  />
                </FormField>
                <FormField label="Broker Contact Lookup">
                  <Input
                    value={formData.brokerContactLookup}
                    onChange={(e) =>
                      handleInputChange("brokerContactLookup", e.target.value)
                    }
                    placeholder="Enter lookup value"
                  />
                </FormField>
              </FormSection>

              {/* Section 5: Additional Details & Financials */}
              <FormSection title="Additional Details & Financials">
                <FormField label="Internal Status">
                  <Select
                    value={formData.internalStatus}
                    onValueChange={(value) =>
                      handleInputChange("internalStatus", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="New/Renewal">
                  <Select
                    value={formData.newRenewal}
                    onValueChange={(value) =>
                      handleInputChange("newRenewal", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="renewal">Renewal</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Prior Policy Number">
                  <Input
                    value={formData.priorPolicyNumber}
                    onChange={(e) =>
                      handleInputChange("priorPolicyNumber", e.target.value)
                    }
                    placeholder="Enter prior policy number"
                  />
                </FormField>
                <FormField label="Has Treaty Exceptions (Y/N)">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="treaty-exceptions"
                      checked={formData.hasTreatyExceptions}
                      onCheckedChange={(checked) =>
                        handleInputChange(
                          "hasTreatyExceptions",
                          checked === true,
                        )
                      }
                    />
                    <label htmlFor="treaty-exceptions" className="text-sm">
                      Yes
                    </label>
                  </div>
                </FormField>
                <FormField label="Treaty Applies">
                  <Input
                    value={formData.treatyApplies}
                    onChange={(e) =>
                      handleInputChange("treatyApplies", e.target.value)
                    }
                    placeholder="Enter treaty details"
                  />
                </FormField>
                <FormField label="Treaty Number">
                  <Input
                    value={formData.treatyNumber}
                    onChange={(e) =>
                      handleInputChange("treatyNumber", e.target.value)
                    }
                    placeholder="Enter treaty number"
                  />
                </FormField>
                <FormField label="Treaty Exceptions">
                  <Input
                    value={formData.treatyExceptions}
                    onChange={(e) =>
                      handleInputChange("treatyExceptions", e.target.value)
                    }
                    placeholder="Enter exceptions"
                  />
                </FormField>
                <FormField label="Treaty Exception Reason">
                  <Input
                    value={formData.treatyExceptionReason}
                    onChange={(e) =>
                      handleInputChange("treatyExceptionReason", e.target.value)
                    }
                    placeholder="Enter reason"
                  />
                </FormField>
                <FormField label="Has Facultative Reinsurance (Y/N)">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="facultative-reinsurance"
                      checked={formData.hasFacultativeReinsurance}
                      onCheckedChange={(checked) =>
                        handleInputChange(
                          "hasFacultativeReinsurance",
                          checked === true,
                        )
                      }
                    />
                    <label
                      htmlFor="facultative-reinsurance"
                      className="text-sm"
                    >
                      Yes
                    </label>
                  </div>
                </FormField>
                <FormField label="Carrier">
                  <Input
                    value={formData.carrier}
                    onChange={(e) =>
                      handleInputChange("carrier", e.target.value)
                    }
                    placeholder="Enter carrier name"
                  />
                </FormField>
                <FormField label="Net Limit">
                  <Input
                    value={formData.netLimit}
                    onChange={(e) =>
                      handleInputChange("netLimit", e.target.value)
                    }
                    placeholder="Enter net limit"
                  />
                </FormField>
                <FormField label="Net Premium">
                  <Input
                    value={formData.netPremium}
                    onChange={(e) =>
                      handleInputChange("netPremium", e.target.value)
                    }
                    placeholder="Enter net premium"
                  />
                </FormField>
                <FormField label="Special Instructions">
                  <Textarea
                    value={formData.specialInstructions}
                    onChange={(e) =>
                      handleInputChange("specialInstructions", e.target.value)
                    }
                    placeholder="Enter any special instructions or notes"
                    rows={4}
                  />
                </FormField>
              </FormSection>

              {/* Form Footer */}
              <div className="space-y-4 pt-8 border-t border-gray-200">
                {/* Row 1: Cancel and Save */}
                <div className="flex justify-end gap-4">
                  <Button className="bg-[#0054A6] hover:bg-[#003d7a] text-white">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
                  >
                    Save
                  </Button>
                </div>

                {/* Row 2: Previous and Next */}
                <div className="flex justify-between gap-4">
                  <Button className="bg-[#0054A6] hover:bg-[#003d7a] text-white">
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </form>
              </TabsContent>

              <TabsContent value="details" className="flex-1 overflow-auto m-0">
                <SubmissionDetailsTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
