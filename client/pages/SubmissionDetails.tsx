import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { MoreVertical, ArrowUpDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LongAnswerQuestion {
  id: string;
  question: string;
  answer: string;
  required: boolean;
}

interface GridItem {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TableRow {
  id: string;
  name: string;
  status: string;
  effectiveDate: string;
  expirationDate: string;
  premium: string;
}

function SubmissionHeader() {
  const submissionInfo = {
    id: "OrgName_97828",
    dates: "12-31-2025 - 12-31-2026",
    state: "ID",
    code: "XSL-003741",
    status: "InProgress",
    type: "New Submission",
  };

  return (
    <div className="bg-gradient-to-r from-[#0054A6] to-[#003d7a] text-white px-6 py-4 shadow-lg">
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
          <Check className="mr-2 h-4 w-4" />
          Complete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Invalidate")}>
          <X className="mr-2 h-4 w-4" />
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
        <DropdownMenuItem
          onClick={() => console.log("Delete")}
          className="text-destructive"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function SubmissionDetails() {
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

  const [gridItems] = useState<GridItem[]>([
    {
      id: "1",
      title: "Coverage Analysis",
      description: "Review coverage limits and exclusions",
      status: "Pending",
    },
    {
      id: "2",
      title: "Risk Assessment",
      description: "Evaluate underwriting risk factors",
      status: "In Progress",
    },
    {
      id: "3",
      title: "Documentation Review",
      description: "Review required documentation",
      status: "Completed",
    },
  ]);

  const [tableData] = useState<TableRow[]>([
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
    <div className="flex-1 flex flex-col">
      <SubmissionHeader />
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 space-y-8">
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
                        onChange={(e) =>
                          handleAnswerChange(item.id, e.target.value)
                        }
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

            {/* Grid with Action Buttons Section */}
            <Card>
              <CardHeader>
                <CardTitle>Submission Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {gridItems.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <Badge
                          className={cn(
                            "text-xs",
                            item.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : item.status === "In Progress"
                                ? "bg-blue-100 text-blue-700 border-blue-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
                          )}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {item.description}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="default"
                          className="text-xs"
                        >
                          Action
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
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
                            <ArrowUpDown
                              size={12}
                              className="text-gray-400"
                            />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Status
                            <ArrowUpDown
                              size={12}
                              className="text-gray-400"
                            />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Effective Date
                            <ArrowUpDown
                              size={12}
                              className="text-gray-400"
                            />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Expiration Date
                            <ArrowUpDown
                              size={12}
                              className="text-gray-400"
                            />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Premium
                            <ArrowUpDown
                              size={12}
                              className="text-gray-400"
                            />
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
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
