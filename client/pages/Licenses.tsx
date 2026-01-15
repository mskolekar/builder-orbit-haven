import React, { useState } from "react";
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
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

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
  licenseType: string;
  issueDate: string;
  status: string;
}

export default function Licenses() {
  const [isSaving, setIsSaving] = useState(false);
  const [licenses, setLicenses] = useState<License[]>([]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const addLicense = () => {
    setLicenses([
      ...licenses,
      {
        id: Date.now().toString(),
        state: "",
        licenseNumber: "",
        expirationDate: "",
        licenseType: "",
        issueDate: "",
        status: "",
      },
    ]);
  };

  const removeLicense = (id: string) => {
    setLicenses(licenses.filter((license) => license.id !== id));
  };

  const updateLicense = (id: string, field: string, value: string) => {
    setLicenses(
      licenses.map((license) =>
        license.id === id ? { ...license, [field]: value } : license,
      ),
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-8 max-w-6xl">
          {/* License Information Section */}
          <div>
            <SectionHeader title="License Information" />
            <FormRow>
              <FormField label="License State" isMandatory>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                    <SelectItem value="wa">Washington</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="License Type" isMandatory>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="property-casualty">Property & Casualty</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="life">Life</SelectItem>
                    <SelectItem value="disability">Disability</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="License Number" isMandatory>
                <Input placeholder="Enter license number" />
              </FormField>
              <FormField label="Status">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Issue Date">
                <Input type="date" />
              </FormField>
              <FormField label="Expiration Date">
                <Input type="date" />
              </FormField>
            </FormRow>
          </div>

          {/* Licenses Table Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 pb-3 border-b border-gray-300">
                License Records
              </h3>
            </div>

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
                      License Type
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Issue Date
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Expiration Date
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Status
                    </th>
                    <th className="text-center text-sm font-semibold text-gray-900 px-4 py-3">
                      <Button
                        size="icon"
                        onClick={addLicense}
                        className="h-6 w-6 bg-[#0054A6] hover:bg-[#003d7a] text-white p-0"
                        title="Add License"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {licenses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-6 text-center text-gray-500 text-sm"
                      >
                        No records found
                      </td>
                    </tr>
                  ) : (
                    licenses.map((license) => (
                      <tr
                        key={license.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">
                          <Select
                            value={license.state}
                            onValueChange={(val) =>
                              updateLicense(license.id, "state", val)
                            }
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ca">California</SelectItem>
                              <SelectItem value="ny">New York</SelectItem>
                              <SelectItem value="tx">Texas</SelectItem>
                              <SelectItem value="fl">Florida</SelectItem>
                              <SelectItem value="wa">Washington</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            value={license.licenseNumber}
                            onChange={(e) =>
                              updateLicense(
                                license.id,
                                "licenseNumber",
                                e.target.value,
                              )
                            }
                            placeholder="License Number"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            value={license.licenseType}
                            onValueChange={(val) =>
                              updateLicense(license.id, "licenseType", val)
                            }
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="property-casualty">
                                Property & Casualty
                              </SelectItem>
                              <SelectItem value="health">Health</SelectItem>
                              <SelectItem value="life">Life</SelectItem>
                              <SelectItem value="disability">
                                Disability
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            type="date"
                            value={license.issueDate}
                            onChange={(e) =>
                              updateLicense(
                                license.id,
                                "issueDate",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            type="date"
                            value={license.expirationDate}
                            onChange={(e) =>
                              updateLicense(
                                license.id,
                                "expirationDate",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            value={license.status}
                            onValueChange={(val) =>
                              updateLicense(license.id, "status", val)
                            }
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="suspended">
                                Suspended
                              </SelectItem>
                              <SelectItem value="expired">Expired</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLicense(license.id)}
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

          {/* Action Buttons */}
          <div className="mt-12 pt-6 border-t border-gray-200 space-y-3">
            {/* Row 1: Business Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="cancel">Cancel</Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
            {/* Row 2: Navigation */}
            <div className="flex justify-between">
              <Button variant="outline" size="icon" title="Previous">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Next">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
