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

interface CheckRecord {
  id: string;
  payer: string;
  financialAmount: number;
  checkAmount: number;
  paymentMethod: string;
  paymentProcessedDate: string;
  extractFileDate: string;
  extractFileName: string;
  checkStatus: string;
  approvalStatus: string;
}

const mockCheckData: CheckRecord[] = [
  {
    id: "1",
    payer: "Weight Bodily Injury CLAIM ON ANAND",
    financialAmount: 4954,
    checkAmount: 150000.00,
    paymentMethod: "Check",
    paymentProcessedDate: "12-27-2025",
    extractFileDate: "12-27-2025",
    extractFileName: "PJ052025UJOI.txt",
    checkStatus: "Issued",
    approvalStatus: "Approved",
  },
  {
    id: "2",
    payer: "First Lawsuit_2025 CLAIM #1 $150 CLAIM #1 LARUEN ADVOCACY PROFESSIONAL CORPORATION",
    financialAmount: 4953,
    checkAmount: 150000.00,
    paymentMethod: "EFT",
    paymentProcessedDate: "12-27-2025",
    extractFileDate: "12-27-2025",
    extractFileName: "PJ052025UJOI.txt",
    checkStatus: "Issued SENT",
    approvalStatus: "Approved",
  },
  {
    id: "3",
    payer: "Second Lawsuit_2025 CLAIM #1 $180 CLAIM #1 LARUEN ADVOCACY PROFESSIONAL CORPORATION",
    financialAmount: 4947,
    checkAmount: 150000.00,
    paymentMethod: "EFT",
    paymentProcessedDate: "12-24-2025",
    extractFileDate: "12-24-2025",
    extractFileName: "PJ052025UJOI.txt",
    checkStatus: "Issued SENT",
    approvalStatus: "Approved",
  },
  {
    id: "4",
    payer: "Third Lawsuit_2025 CLAIM #1 $210 CLAIM #1 LARUEN ADVOCACY PROFESSIONAL CORPORATION",
    financialAmount: 4943,
    checkAmount: 150000.00,
    paymentMethod: "EFT",
    paymentProcessedDate: "12-24-2025",
    extractFileDate: "12-24-2025",
    extractFileName: "PJ052025UJOI.txt",
    checkStatus: "Issued SENT",
    approvalStatus: "Approved",
  },
  {
    id: "5",
    payer: "Fourth Lawsuit_2025 CLAIM #1 $240 CLAIM #1 LARUEN ADVOCACY PROFESSIONAL CORPORATION",
    financialAmount: 4941,
    checkAmount: 150000.00,
    paymentMethod: "EFT",
    paymentProcessedDate: "12-24-2025",
    extractFileDate: "12-24-2025",
    extractFileName: "PJ052025UJOI.txt",
    checkStatus: "Issued SENT",
    approvalStatus: "Approved",
  },
];

function ActionMenu() {
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
    <DropdownMenu>
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
        <DropdownMenuItem onClick={handleViewDetails} className="cursor-pointer">
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

  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === mockCheckData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(mockCheckData.map((r) => r.id)));
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Page Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Check Processing
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and process payment checks and electronic fund transfers
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button size="sm" className="bg-[#0054A6] hover:bg-[#003d7a]">
              New Check
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payer
            </label>
            <input
              type="text"
              placeholder="Search payer..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0054A6]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check Amount
            </label>
            <input
              type="text"
              placeholder="Search amount..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0054A6]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0054A6]">
              <option value="">All Methods</option>
              <option value="check">Check</option>
              <option value="eft">EFT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0054A6]">
              <option value="">All Status</option>
              <option value="issued">Issued</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto bg-white">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200">
              <TableHead className="w-12 px-4">
                <Checkbox
                  checked={selectedRows.size === mockCheckData.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="whitespace-nowrap">Payer</TableHead>
              <TableHead className="text-right whitespace-nowrap">
                Financial
              </TableHead>
              <TableHead className="text-right whitespace-nowrap">
                Check Amount
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Payment Method
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Payment Processed Date
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Extract File Date
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Extract File Name
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Check Status
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Approval Status
              </TableHead>
              <TableHead className="w-12 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCheckData.map((record) => (
              <TableRow
                key={record.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <TableCell className="px-4">
                  <Checkbox
                    checked={selectedRows.has(record.id)}
                    onCheckedChange={() => toggleRowSelection(record.id)}
                  />
                </TableCell>
                <TableCell className="text-sm text-gray-900 max-w-xs truncate">
                  {record.payer}
                </TableCell>
                <TableCell className="text-right text-sm text-gray-700">
                  {record.financialAmount}
                </TableCell>
                <TableCell className="text-right text-sm text-gray-700">
                  ${record.checkAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {record.paymentMethod}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {record.paymentProcessedDate}
                </TableCell>
                <TableCell className="text-sm text-gray-700">
                  {record.extractFileDate}
                </TableCell>
                <TableCell className="text-sm text-gray-700 text-blue-600">
                  {record.extractFileName}
                </TableCell>
                <TableCell className="text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    {record.checkStatus}
                  </span>
                </TableCell>
                <TableCell className="text-sm">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-medium">
                    {record.approvalStatus}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <ActionMenu />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer with pagination */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
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
  );
}
