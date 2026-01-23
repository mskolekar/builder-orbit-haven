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
import { Trash2, Check, X } from "lucide-react";

interface Workgroup {
  id: string;
  workgroupCode: string;
  active: string;
  comments: string;
}

interface EditingRow {
  id: string;
  workgroupCode: string;
  active: string;
  comments: string;
}

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

export default function Workgroup() {
  const [workgroups, setWorkgroups] = useState<Workgroup[]>([]);
  const [editingRow, setEditingRow] = useState<EditingRow | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddWorkgroup = () => {
    const newId = "new-" + Date.now();
    setEditingRow({
      id: newId,
      workgroupCode: "",
      active: "",
      comments: "",
    });
  };

  const handleSave = () => {
    if (!editingRow || !editingRow.workgroupCode || !editingRow.active) {
      return;
    }

    setIsSaving(true);

    const isNewRow = editingRow.id.startsWith("new-");
    if (isNewRow) {
      const newWorkgroup: Workgroup = {
        id: Date.now().toString(),
        workgroupCode: editingRow.workgroupCode,
        active: editingRow.active,
        comments: editingRow.comments,
      };
      setWorkgroups([...workgroups, newWorkgroup]);
    } else {
      setWorkgroups(
        workgroups.map((w) =>
          w.id === editingRow.id
            ? {
                id: w.id,
                workgroupCode: editingRow.workgroupCode,
                active: editingRow.active,
                comments: editingRow.comments,
              }
            : w,
        ),
      );
    }

    setTimeout(() => {
      setIsSaving(false);
      setEditingRow(null);
    }, 500);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleDeleteWorkgroup = (id: string) => {
    setWorkgroups(workgroups.filter((w) => w.id !== id));
  };

  const handleEditChange = (field: keyof EditingRow, value: string) => {
    if (editingRow) {
      setEditingRow({ ...editingRow, [field]: value });
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-6 max-w-6xl">
          {/* Table Section */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    Workgroup Code <span className="text-red-600">*</span>
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    Active? <span className="text-red-600">*</span>
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
                {workgroups.length === 0 && !editingRow && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-gray-500 text-sm"
                    >
                      No workgroups added
                    </td>
                  </tr>
                )}

                {/* Existing workgroups */}
                {workgroups.map((workgroup) => (
                  <tr
                    key={workgroup.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {workgroup.workgroupCode}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
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
                        onClick={() => handleDeleteWorkgroup(workgroup.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}

                {/* Editing/New row */}
                {editingRow && (
                  <tr className="border-b border-gray-200 bg-blue-50">
                    <td className="px-4 py-3">
                      <Select
                        value={editingRow.workgroupCode}
                        onValueChange={(value) =>
                          handleEditChange("workgroupCode", value)
                        }
                      >
                        <SelectTrigger className="w-full h-9">
                          <SelectValue placeholder="Select code" />
                        </SelectTrigger>
                        <SelectContent>
                          {workgroupCodeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        value={editingRow.active}
                        onValueChange={(value) =>
                          handleEditChange("active", value)
                        }
                      >
                        <SelectTrigger className="w-full h-9">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {activeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        placeholder="Add comments (optional)"
                        value={editingRow.comments}
                        onChange={(e) =>
                          handleEditChange("comments", e.target.value)
                        }
                        className="h-9"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          onClick={handleSave}
                          disabled={
                            isSaving ||
                            !editingRow.workgroupCode ||
                            !editingRow.active
                          }
                          className="bg-green-600 hover:bg-green-700 text-white h-8 px-3"
                          title="Save"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancel}
                          disabled={isSaving}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-3"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Add Workgroup Button */}
          {!editingRow && (
            <div className="flex justify-end">
              <Button
                onClick={handleAddWorkgroup}
                className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
              >
                Add Workgroup
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
