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

interface Workgroup {
  id: string;
  workgroupCode: string;
  active: string;
  comments: string;
  outputDevice?: string;
}

export default function Workgroup() {
  const [workgroups, setWorkgroups] = useState<Workgroup[]>([]);
  const [selectedWorkgroup, setSelectedWorkgroup] = useState<Workgroup | null>(
    null,
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formState, setFormState] = useState<Partial<Workgroup>>({
    workgroupCode: "",
    active: "",
    comments: "",
    outputDevice: "",
  });

  const handleSelectWorkgroup = (workgroup: Workgroup) => {
    setSelectedWorkgroup(workgroup);
    setFormState(workgroup);
  };

  const handleSave = () => {
    if (!formState.workgroupCode || !formState.active) {
      return;
    }

    setIsSaving(true);

    if (selectedWorkgroup) {
      // Update existing workgroup
      setWorkgroups(
        workgroups.map((w) =>
          w.id === selectedWorkgroup.id ? { ...(formState as Workgroup) } : w,
        ),
      );
    } else {
      // Add new workgroup
      const newWorkgroup: Workgroup = {
        id: Date.now().toString(),
        workgroupCode: formState.workgroupCode || "",
        active: formState.active || "",
        comments: formState.comments || "",
        outputDevice: formState.outputDevice || "",
      };
      setWorkgroups([...workgroups, newWorkgroup]);
    }

    setTimeout(() => {
      setIsSaving(false);
      setSelectedWorkgroup(null);
      setFormState({
        workgroupCode: "",
        active: "",
        comments: "",
        outputDevice: "",
      });
    }, 1000);
  };

  const handleCancel = () => {
    setSelectedWorkgroup(null);
    setFormState({
      workgroupCode: "",
      active: "",
      comments: "",
      outputDevice: "",
    });
  };

  const handleDeleteWorkgroup = (id: string) => {
    setWorkgroups(workgroups.filter((w) => w.id !== id));
    if (selectedWorkgroup?.id === id) {
      handleCancel();
    }
  };

  const workgroupCodeOptions = [
    { value: "wg-001", label: "WG-001" },
    { value: "wg-002", label: "WG-002" },
    { value: "wg-003", label: "WG-003" },
    { value: "wg-004", label: "WG-004" },
    { value: "wg-005", label: "WG-005" },
  ];

  const activeOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const handleAddNew = () => {
    setSelectedWorkgroup(null);
    setFormState({
      workgroupCode: "",
      active: "",
      comments: "",
      outputDevice: "",
    });
  };

  const isFormVisible =
    selectedWorkgroup || Object.values(formState).some((v) => v);

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-8 max-w-6xl">
          {/* Add New Button */}
          {!isFormVisible && (
            <div className="flex justify-end mb-4">
              <Button
                onClick={handleAddNew}
                className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
              >
                Add New Workgroup
              </Button>
            </div>
          )}

          {/* Workgroup List Table Section */}
          <div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Workgroup Code
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Active?
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Comments
                    </th>
                    <th className="text-center text-sm font-semibold text-gray-900 px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workgroups.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-gray-500 text-sm"
                      >
                        No workgroups added
                      </td>
                    </tr>
                  ) : (
                    workgroups.map((workgroup) => (
                      <tr
                        key={workgroup.id}
                        className={cn(
                          "border-b border-gray-200 hover:bg-gray-50 cursor-pointer",
                          selectedWorkgroup?.id === workgroup.id &&
                            "bg-blue-50",
                        )}
                        onClick={() => handleSelectWorkgroup(workgroup)}
                      >
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {workgroup.workgroupCode}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {activeOptions.find((a) => a.value === workgroup.active)
                            ?.label || workgroup.active}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {workgroup.comments}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteWorkgroup(workgroup.id);
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

          {/* Workgroup Detail/Add-Edit Form Section */}
          {isFormVisible && (
            <div>
              <SectionHeader title="Workgroup Detail" />

              <FormRow>
                <FormField label="Workgroup Code" isMandatory>
                  <Select
                    value={formState.workgroupCode || ""}
                    onValueChange={(value) =>
                      setFormState({ ...formState, workgroupCode: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select workgroup code" />
                    </SelectTrigger>
                    <SelectContent>
                      {workgroupCodeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Active?" isMandatory>
                  <Select
                    value={formState.active || ""}
                    onValueChange={(value) =>
                      setFormState({ ...formState, active: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select active status" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              </FormRow>
              <FormRow>
                <FormField label="Comments">
                  <Input
                    placeholder="Enter comments"
                    value={formState.comments || ""}
                    onChange={(e) =>
                      setFormState({ ...formState, comments: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Output Device – Future" className="opacity-50">
                  <Input
                    placeholder="Not available yet"
                    disabled
                    value={formState.outputDevice || ""}
                    readOnly
                  />
                </FormField>
              </FormRow>
            </div>
          )}

          {/* Action Buttons */}
          {isFormVisible && (
            <div className="mt-12 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex justify-end gap-3">
                <Button variant="cancel" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={
                    isSaving ||
                    !formState.workgroupCode ||
                    !formState.active
                  }
                  className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
                >
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
