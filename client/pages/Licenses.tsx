import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-12 mb-6">{children}</div>;
}

function FormField({
  label,
  isMandatory,
  children,
  className,
}: {
  label: string;
  isMandatory?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-4 items-start", className)}>
      <label className="w-40 flex-shrink-0 font-medium text-gray-700 text-sm pt-2">
        {label}
        {isMandatory && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="flex-1">{children}</div>
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

interface License {
  id: string;
  state: string;
  licenseNumber: string;
  expirationDate: string;
  category: string;
  linesOfAuthority: string[];
}

export default function Licenses() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formState, setFormState] = useState<Partial<License>>({
    state: "",
    licenseNumber: "",
    category: "",
    expirationDate: "",
    linesOfAuthority: [],
  });

  const handleAddNew = () => {
    setSelectedLicense(null);
    setFormState({
      state: "",
      licenseNumber: "",
      category: "",
      expirationDate: "",
      linesOfAuthority: [],
    });
  };

  const handleSelectLicense = (license: License) => {
    setSelectedLicense(license);
    setFormState(license);
  };

  const handleSave = () => {
    if (!formState.state || !formState.licenseNumber || !formState.expirationDate) {
      return;
    }

    setIsSaving(true);

    if (selectedLicense) {
      // Update existing license
      setLicenses(
        licenses.map((l) =>
          l.id === selectedLicense.id
            ? { ...formState as License }
            : l,
        ),
      );
    } else {
      // Add new license
      const newLicense: License = {
        id: Date.now().toString(),
        state: formState.state || "",
        licenseNumber: formState.licenseNumber || "",
        category: formState.category || "",
        expirationDate: formState.expirationDate || "",
        linesOfAuthority: formState.linesOfAuthority || [],
      };
      setLicenses([...licenses, newLicense]);
    }

    setTimeout(() => {
      setIsSaving(false);
      setSelectedLicense(null);
      setFormState({
        state: "",
        licenseNumber: "",
        category: "",
        expirationDate: "",
        linesOfAuthority: [],
      });
    }, 1000);
  };

  const handleCancel = () => {
    setSelectedLicense(null);
    setFormState({
      state: "",
      licenseNumber: "",
      category: "",
      expirationDate: "",
      linesOfAuthority: [],
    });
  };

  const handleDeleteLicense = (id: string) => {
    setLicenses(licenses.filter((l) => l.id !== id));
    if (selectedLicense?.id === id) {
      handleCancel();
    }
  };

  const handleLinesOfAuthorityChange = (value: string) => {
    const current = formState.linesOfAuthority || [];
    if (current.includes(value)) {
      setFormState({
        ...formState,
        linesOfAuthority: current.filter((v) => v !== value),
      });
    } else {
      setFormState({
        ...formState,
        linesOfAuthority: [...current, value],
      });
    }
  };

  const stateOptions = [
    { value: "ca", label: "California" },
    { value: "ny", label: "New York" },
    { value: "tx", label: "Texas" },
    { value: "fl", label: "Florida" },
    { value: "wa", label: "Washington" },
  ];

  const categoryOptions = [
    { value: "producer", label: "Producer" },
    { value: "agent", label: "Agent" },
    { value: "broker", label: "Broker" },
    { value: "adjuster", label: "Adjuster" },
  ];

  const linesOfAuthorityOptions = [
    { value: "casualty", label: "Casualty" },
    { value: "health", label: "Health" },
    { value: "life", label: "Life" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-8 max-w-6xl">
          {/* License List Table Section */}
          <div>
            <SectionHeader title="License List" />

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      License State
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      License Number
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Expiration Date
                    </th>
                    <th className="text-center text-sm font-semibold text-gray-900 px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {licenses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-gray-500 text-sm"
                      >
                        No licenses added
                      </td>
                    </tr>
                  ) : (
                    licenses.map((license) => (
                      <tr
                        key={license.id}
                        className={cn(
                          "border-b border-gray-200 hover:bg-gray-50 cursor-pointer",
                          selectedLicense?.id === license.id && "bg-blue-50",
                        )}
                        onClick={() => handleSelectLicense(license)}
                      >
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {stateOptions.find((s) => s.value === license.state)?.label || license.state}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {license.licenseNumber}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {license.expirationDate}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteLicense(license.id);
                            }}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* License Detail/Add-Edit Form Section */}
          <div>
            <SectionHeader title="License Detail" />

            {/* Identification Section */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-800 mb-4">
                Identification
              </h4>
              <FormRow>
                <FormField label="License State" isMandatory>
                  <Select
                    value={formState.state || ""}
                    onValueChange={(value) =>
                      setFormState({ ...formState, state: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stateOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="License Number" isMandatory>
                  <Input
                    placeholder="Enter license number"
                    value={formState.licenseNumber || ""}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        licenseNumber: e.target.value,
                      })
                    }
                  />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField label="License Category" isMandatory>
                  <Select
                    value={formState.category || ""}
                    onValueChange={(value) =>
                      setFormState({ ...formState, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <div />
              </FormRow>
            </div>

            {/* Authority & Validity Section */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-4">
                Authority & Validity
              </h4>
              <FormRow>
                <FormField label="Lines of Authority">
                  <div className="space-y-2">
                    {linesOfAuthorityOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          id={option.value}
                          checked={(formState.linesOfAuthority || []).includes(
                            option.value,
                          )}
                          onCheckedChange={() =>
                            handleLinesOfAuthorityChange(option.value)
                          }
                        />
                        <label
                          htmlFor={option.value}
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </FormField>
                <FormField label="Expiration Date" isMandatory>
                  <Input
                    type="date"
                    value={formState.expirationDate || ""}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        expirationDate: e.target.value,
                      })
                    }
                  />
                </FormField>
              </FormRow>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 pt-6 border-t border-gray-200 space-y-3">
            <div className="flex justify-end gap-3">
              <Button variant="cancel" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || !formState.state || !formState.licenseNumber || !formState.expirationDate}
                className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={handleAddNew}
                className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
              >
                Add New
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
