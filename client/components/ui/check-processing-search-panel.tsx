import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

export interface CheckProcessingFilters {
  payee: string;
  checkAmountGte: string;
  batchNumber: string;
  transactionType: string;
  status: string;
  paymentProcessedDateLte: string;
  extractFileDateLte: string;
  checkAmountLte: string;
  checkNumber: string;
  paymentMethod: string;
  paymentProcessedDateGte: string;
  extractFileDateGte: string;
}

interface CheckProcessingSearchPanelProps {
  onSearch: (filters: CheckProcessingFilters) => void;
  onReset: () => void;
}

export function CheckProcessingSearchPanel({
  onSearch,
  onReset,
}: CheckProcessingSearchPanelProps) {
  const [filters, setFilters] = useState<CheckProcessingFilters>({
    payee: "",
    checkAmountGte: "",
    batchNumber: "",
    transactionType: "",
    status: "",
    paymentProcessedDateLte: "",
    extractFileDateLte: "",
    checkAmountLte: "",
    checkNumber: "",
    paymentMethod: "",
    paymentProcessedDateGte: "",
    extractFileDateGte: "",
  });

  const handleInputChange = (field: keyof CheckProcessingFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (field: keyof CheckProcessingFilters, date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "MM/dd/yyyy");
      handleInputChange(field, formattedDate);
    } else {
      handleInputChange(field, "");
    }
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({
      payee: "",
      checkAmountGte: "",
      batchNumber: "",
      transactionType: "",
      status: "",
      paymentProcessedDateLte: "",
      extractFileDateLte: "",
      checkAmountLte: "",
      checkNumber: "",
      paymentMethod: "",
      paymentProcessedDateGte: "",
      extractFileDateGte: "",
    });
    onReset();
  };

  const DatePickerField = ({
    label,
    value,
    onChange,
    placeholder = "MM/DD/YYYY",
  }: {
    label: string;
    value: string;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
  }) => {
    const parsedDate = value ? new Date(value) : undefined;

    return (
      <div className="flex flex-col">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center justify-between h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-50">
              <span className={value ? "text-foreground" : "text-muted-foreground"}>
                {value || placeholder}
              </span>
              <Calendar size={16} className="text-gray-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={parsedDate}
              onSelect={onChange}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      {/* 4-Column Grid Layout */}
      <div className="grid grid-cols-4 gap-4">
        {/* Column 1 */}
        <div className="space-y-4">
          {/* Payee */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payee
            </label>
            <Input
              type="text"
              value={filters.payee}
              onChange={(e) => handleInputChange("payee", e.target.value)}
              className="text-sm"
            />
          </div>

          {/* Check Amount >= */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check Amount ≥
            </label>
            <Input
              type="number"
              value={filters.checkAmountGte}
              onChange={(e) => handleInputChange("checkAmountGte", e.target.value)}
              className="text-sm"
            />
          </div>

          {/* Batch# */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch#
            </label>
            <Input
              type="number"
              value={filters.batchNumber}
              onChange={(e) => handleInputChange("batchNumber", e.target.value)}
              className="text-sm"
            />
          </div>

          {/* Transaction Type */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <select
              value={filters.transactionType}
              onChange={(e) => handleInputChange("transactionType", e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">All</option>
              <option value="check">Check</option>
              <option value="eft">EFT</option>
              <option value="wire">Wire</option>
            </select>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          {/* Status */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">All</option>
              <option value="issued">Issued</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="processing">Processing</option>
            </select>
          </div>

          {/* Payment Processed Date <= */}
          <DatePickerField
            label="Payment Processed Date ≤"
            value={filters.paymentProcessedDateLte}
            onChange={(date) => handleDateChange("paymentProcessedDateLte", date)}
          />

          {/* Extract File Date <= */}
          <DatePickerField
            label="Extract File Date ≤"
            value={filters.extractFileDateLte}
            onChange={(date) => handleDateChange("extractFileDateLte", date)}
          />
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          {/* Check Amount <= */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check Amount ≤
            </label>
            <Input
              type="number"
              value={filters.checkAmountLte}
              onChange={(e) => handleInputChange("checkAmountLte", e.target.value)}
              className="text-sm"
            />
          </div>

          {/* Check# */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check#
            </label>
            <Input
              type="number"
              value={filters.checkNumber}
              onChange={(e) => handleInputChange("checkNumber", e.target.value)}
              className="text-sm"
            />
          </div>

          {/* Payment Method */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={filters.paymentMethod}
              onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">All</option>
              <option value="check">Check</option>
              <option value="eft">EFT</option>
              <option value="wire">Wire</option>
            </select>
          </div>
        </div>

        {/* Column 4 */}
        <div className="space-y-4">
          {/* Payment Processed Date >= */}
          <DatePickerField
            label="Payment Processed Date ≥"
            value={filters.paymentProcessedDateGte}
            onChange={(date) => handleDateChange("paymentProcessedDateGte", date)}
          />

          {/* Extract File Date >= */}
          <DatePickerField
            label="Extract File Date ≥"
            value={filters.extractFileDateGte}
            onChange={(date) => handleDateChange("extractFileDateGte", date)}
          />
        </div>
      </div>

      {/* Action Buttons at Bottom Right */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          size="sm"
          className="bg-[#0054A6] hover:bg-[#003d7a]"
          onClick={handleSearch}
        >
          Run Search
        </Button>
      </div>
    </div>
  );
}
