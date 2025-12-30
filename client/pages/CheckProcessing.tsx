import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, X, MessageSquare, Upload } from "lucide-react";
import {
  CheckProcessingSearchPanel,
  type CheckProcessingFilters,
} from "@/components/ui/check-processing-search-panel";

interface CheckRecord {
  id: string;
  payee: string;
  financialAccountCode: string;
  batch: string;
  checkNumber: string;
  amount: string;
  paymentProcessedDate: string;
  paymentMethod: string;
  status: string;
  extractStatus: string;
  extractDate: string;
  extractFileName: string;
  checkOutput: string;
  approvers: string;
}

const mockCheckData: CheckRecord[] = [
  {
    id: "1",
    payee: "Wright, Bobby | 16 Charles St ALMONTE ON K0A1A0",
    financialAccountCode: "BMO",
    batch: "4954",
    checkNumber: "8345",
    amount: "20000.00",
    paymentProcessedDate: "12-27-2025",
    paymentMethod: "Check",
    status: "Issued",
    extractStatus: "",
    extractDate: "",
    extractFileName: "",
    checkOutput: "No File Exists",
    approvers: "View",
  },
  {
    id: "2",
    payee: "First_LawFirm_79725 | 21 Main street, Accord NY ULSTER 12404",
    financialAccountCode: "BMO",
    batch: "4953",
    checkNumber: "8351",
    amount: "2000.00",
    paymentProcessedDate: "12-27-2025",
    paymentMethod: "Check",
    status: "Issued",
    extractStatus: "",
    extractDate: "",
    extractFileName: "",
    checkOutput: "No File Exists",
    approvers: "View",
  },
  {
    id: "3",
    payee:
      "LAWLER ADVOCACY PROFESSIONAL CORPORATION | 5700 - 100 KING STREET WEST TORONTO ON M5X 1C7",
    financialAccountCode: "BMO",
    batch: "4947",
    checkNumber: "",
    amount: "18588.00",
    paymentProcessedDate: "12-26-2025",
    paymentMethod: "EFT",
    status: "Issued",
    extractStatus: "SENT",
    extractDate: "12-26-2025",
    extractFileName: "PL037120251226.txt",
    checkOutput: "No File Exists",
    approvers: "View",
  },
  {
    id: "4",
    payee:
      "Lawpro_l_name_86700, Lawpro_Fname_68678 | 21 Ave, Toronto KS WOODSON 66777",
    financialAccountCode: "BMO",
    batch: "4937",
    checkNumber: "8336",
    amount: "1000.00",
    paymentProcessedDate: "12-25-2025",
    paymentMethod: "Check",
    status: "Issued",
    extractStatus: "",
    extractDate: "",
    extractFileName: "",
    checkOutput: "No File Exists",
    approvers: "View",
  },
  {
    id: "5",
    payee:
      "LAWLER ADVOCACY PROFESSIONAL CORPORATION | 5700 - 100 KING STREET WEST TORONTO ON M5X 1C7",
    financialAccountCode: "BMO",
    batch: "4933",
    checkNumber: "",
    amount: "18588.00",
    paymentProcessedDate: "12-24-2025",
    paymentMethod: "EFT",
    status: "Issued",
    extractStatus: "SENT",
    extractDate: "12-26-2025",
    extractFileName: "PL037120251226.txt",
    checkOutput: "No File Exists",
    approvers: "View",
  },
  {
    id: "6",
    payee:
      "LAWLER ADVOCACY PROFESSIONAL CORPORATION | 5700 - 100 KING STREET WEST TORONTO ON M5X 1C7",
    financialAccountCode: "BMO",
    batch: "4925",
    checkNumber: "",
    amount: "18588.00",
    paymentProcessedDate: "12-23-2025",
    paymentMethod: "EFT",
    status: "Issued",
    extractStatus: "SENT",
    extractDate: "12-24-2025",
    extractFileName: "PL037020251224.txt",
    checkOutput: "No File Exists",
    approvers: "View",
  },
  {
    id: "7",
    payee:
      "LAWLER ADVOCACY PROFESSIONAL CORPORATION | 5700 - 100 KING STREET WEST TORONTO ON M5X 1C7",
    financialAccountCode: "BMO",
    batch: "4918",
    checkNumber: "",
    amount: "18588.00",
    paymentProcessedDate: "12-23-2025",
    paymentMethod: "EFT",
    status: "Issued",
    extractStatus: "SENT",
    extractDate: "12-23-2025",
    extractFileName: "PL036920251223.txt",
    checkOutput: "No File Exists",
    approvers: "View",
  },
  {
    id: "8",
    payee:
      "LAWLER ADVOCACY PROFESSIONAL CORPORATION | 5700 - 100 KING STREET WEST TORONTO ON M5X 1C7",
    financialAccountCode: "BMO",
    batch: "4911",
    checkNumber: "",
    amount: "18588.00",
    paymentProcessedDate: "12-22-2025",
    paymentMethod: "EFT",
    status: "Issued",
    extractStatus: "SENT",
    extractDate: "12-23-2025",
    extractFileName: "PL036920251223.txt",
    checkOutput: "No File Exists",
    approvers: "View",
  },
  {
    id: "9",
    payee:
      "LAWLER ADVOCACY PROFESSIONAL CORPORATION | 5700 - 100 KING STREET WEST TORONTO ON M5X 1C7",
    financialAccountCode: "BMO",
    batch: "4904",
    checkNumber: "",
    amount: "18588.00",
    paymentProcessedDate: "12-21-2025",
    paymentMethod: "EFT",
    status: "Issued",
    extractStatus: "SENT",
    extractDate: "12-22-2025",
    extractFileName: "PL036820251222.txt",
    checkOutput: "No File Exists",
    approvers: "View",
  },
];

interface ActionMenuProps {
  recordId: string;
  onOpenChange: (isOpen: boolean, recordId: string) => void;
}

function ActionMenu({ recordId, onOpenChange }: ActionMenuProps) {
  const handleViewDetails = () => {
    console.log("View Details clicked");
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  const handleComment = () => {
    console.log("Comment clicked");
  };

  const handleUpload = () => {
    console.log("Upload clicked");
  };

  return (
    <DropdownMenu onOpenChange={(isOpen) => onOpenChange(isOpen, recordId)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-100"
          title="More options"
        >
          <MoreVertical size={16} className="text-gray-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={handleViewDetails}
          className="cursor-pointer"
        >
          <Eye size={16} className="mr-2" />
          <span>View Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleComment} className="cursor-pointer">
          <MessageSquare size={16} className="mr-2" />
          <span>Comment</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleUpload} className="cursor-pointer">
          <Upload size={16} className="mr-2" />
          <span>Upload</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleCancel}
          className="cursor-pointer text-red-600"
        >
          <X size={16} className="mr-2" />
          <span>Cancel</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function CheckProcessing() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] =
    useState<CheckProcessingFilters | null>(null);
  const [highlightedRowId, setHighlightedRowId] = useState<string | null>(null);

  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleActionMenuOpenChange = (isOpen: boolean, recordId: string) => {
    if (isOpen) {
      setHighlightedRowId(recordId);
    } else {
      setHighlightedRowId(null);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === mockCheckData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(mockCheckData.map((r) => r.id)));
    }
  };

  const handleSearch = (filters: CheckProcessingFilters) => {
    setSearchFilters(filters);
    console.log("Running search with filters:", filters);
    // Here you would typically make an API call with the filters
  };

  const handleReset = () => {
    setSearchFilters(null);
    setSelectedRows(new Set());
    console.log("Search filters reset");
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Search Panel */}
      <div className="px-4 py-4 bg-gray-50">
        <CheckProcessingSearchPanel
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </div>

      {/* Table */}
      <div className="flex-1 bg-gray-50 overflow-y-auto px-4 py-4">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table className="text-xs [&_td]:p-2 [&_th]:p-2">
            <TableHeader className="bg-gray-50 sticky top-0">
              <TableRow className="border-b border-gray-200">
                <TableHead className="w-12 px-2 py-2 h-auto">
                  <Checkbox
                    checked={selectedRows.size === mockCheckData.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="font-semibold w-40">Payee</TableHead>
                <TableHead className="whitespace-nowrap font-semibold">
                  Financial Account Code
                </TableHead>
                <TableHead className="whitespace-nowrap text-sm font-semibold">
                  Batch#
                </TableHead>
                <TableHead className="whitespace-nowrap text-sm font-semibold">
                  Check#
                </TableHead>
                <TableHead className="text-right whitespace-nowrap text-sm font-semibold">
                  Amount
                </TableHead>
                <TableHead className="whitespace-nowrap text-sm font-semibold">
                  Payment Processed Date
                </TableHead>
                <TableHead className="whitespace-nowrap text-sm font-semibold">
                  Payment Method
                </TableHead>
                <TableHead className="whitespace-nowrap text-sm font-semibold">
                  Status
                </TableHead>
                <TableHead className="whitespace-nowrap text-sm font-semibold">
                  Extract Status
                </TableHead>
                <TableHead className="whitespace-nowrap text-sm font-semibold">
                  Extract Date
                </TableHead>
                <TableHead className="whitespace-nowrap text-sm font-semibold">
                  Extract File Name
                </TableHead>
                <TableHead className="whitespace-nowrap text-sm font-semibold">
                  Check Output
                </TableHead>
                <TableHead className="whitespace-nowrap text-sm font-semibold">
                  Approver(s)
                </TableHead>
                <TableHead className="w-12 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCheckData.map((record) => (
                <TableRow
                  key={record.id}
                  className={`border-b border-gray-200 transition-colors ${
                    highlightedRowId === record.id
                      ? "bg-gray-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <TableCell className="px-4">
                    <Checkbox
                      checked={selectedRows.has(record.id)}
                      onCheckedChange={() => toggleRowSelection(record.id)}
                    />
                  </TableCell>
                  <TableCell className="text-gray-900 w-40 break-words whitespace-normal">
                    {record.payee}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {record.financialAccountCode}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {record.batch}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {record.checkNumber}
                  </TableCell>
                  <TableCell className="text-right text-gray-700">
                    {record.amount}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {record.paymentProcessedDate}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {record.paymentMethod}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {record.status}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {record.extractStatus}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {record.extractDate}
                  </TableCell>
                  <TableCell className="text-blue-600">
                    {record.extractFileName}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {record.checkOutput}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {record.approvers}
                  </TableCell>
                  <TableCell className="text-center">
                    <ActionMenu
                      recordId={record.id}
                      onOpenChange={handleActionMenuOpenChange}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer with pagination and actions */}
      <div className="bg-gray-50 px-4 pt-0 pb-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {mockCheckData.length} of {mockCheckData.length} records
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Action buttons at bottom right */}
      <div className="bg-gray-50 px-4 py-4 flex justify-end gap-3">
        <Button
          size="sm"
          className="bg-[#0054A6] hover:bg-[#003d7a]"
          onClick={() => console.log("Create Output clicked")}
        >
          Create Output
        </Button>
        <Button
          size="sm"
          className="bg-[#0054A6] hover:bg-[#003d7a]"
          onClick={() => console.log("Mark as Printed clicked")}
        >
          Mark as Printed
        </Button>
        <Button
          size="sm"
          className="bg-[#0054A6] hover:bg-[#003d7a]"
          onClick={() => console.log("Download clicked")}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
