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
import { Trash2, Check, X } from "lucide-react";

interface OtherName {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  middleName: string;
  effectiveDate: string;
  endDate: string;
}

interface EditingRow {
  id: string;
  type: string;
  firstName: string;
  lastName: string;
  middleName: string;
  effectiveDate: string;
  endDate: string;
}

const nameTypeOptions = [
  { value: "maiden", label: "Maiden Name" },
  { value: "alias", label: "Alias" },
  { value: "former", label: "Former Name" },
  { value: "business", label: "Business Name" },
  { value: "other", label: "Other" },
];

export default function OtherNames() {
  const [otherNames, setOtherNames] = useState<OtherName[]>([]);
  const [editingRow, setEditingRow] = useState<EditingRow | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddName = () => {
    const newId = "new-" + Date.now();
    setEditingRow({
      id: newId,
      type: "",
      firstName: "",
      lastName: "",
      middleName: "",
      effectiveDate: "",
      endDate: "",
    });
  };

  const handleSave = () => {
    if (
      !editingRow ||
      !editingRow.type ||
      !editingRow.firstName ||
      !editingRow.lastName
    ) {
      return;
    }

    setIsSaving(true);

    const isNewRow = editingRow.id.startsWith("new-");
    if (isNewRow) {
      const newName: OtherName = {
        id: Date.now().toString(),
        type: editingRow.type,
        firstName: editingRow.firstName,
        lastName: editingRow.lastName,
        middleName: editingRow.middleName,
        effectiveDate: editingRow.effectiveDate,
        endDate: editingRow.endDate,
      };
      setOtherNames([...otherNames, newName]);
    } else {
      setOtherNames(
        otherNames.map((n) =>
          n.id === editingRow.id
            ? {
                id: n.id,
                type: editingRow.type,
                firstName: editingRow.firstName,
                lastName: editingRow.lastName,
                middleName: editingRow.middleName,
                effectiveDate: editingRow.effectiveDate,
                endDate: editingRow.endDate,
              }
            : n,
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

  const handleDeleteName = (id: string) => {
    setOtherNames(otherNames.filter((n) => n.id !== id));
  };

  const handleEditChange = (field: keyof EditingRow, value: string) => {
    if (editingRow) {
      setEditingRow({ ...editingRow, [field]: value });
    }
  };

  const getTypeLabel = (value: string) => {
    return nameTypeOptions.find((t) => t.value === value)?.label || value;
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-6 max-w-full">
          {/* Table Section */}
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    Type <span className="text-red-600">*</span>
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    First Name <span className="text-red-600">*</span>
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    Last Name <span className="text-red-600">*</span>
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    Middle Name
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    Effective Date
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    End Date
                  </th>
                  <th className="text-center text-sm font-semibold text-gray-900 px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {otherNames.length === 0 && !editingRow && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-500 text-sm"
                    >
                      No other names added
                    </td>
                  </tr>
                )}

                {/* Existing other names */}
                {otherNames.map((name) => (
                  <tr
                    key={name.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {getTypeLabel(name.type)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {name.firstName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {name.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {name.middleName || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {name.effectiveDate || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {name.endDate || "-"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteName(name.id)}
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
                        value={editingRow.type}
                        onValueChange={(value) =>
                          handleEditChange("type", value)
                        }
                      >
                        <SelectTrigger className="w-full h-9">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {nameTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        placeholder="First name"
                        value={editingRow.firstName}
                        onChange={(e) =>
                          handleEditChange("firstName", e.target.value)
                        }
                        className="h-9"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        placeholder="Last name"
                        value={editingRow.lastName}
                        onChange={(e) =>
                          handleEditChange("lastName", e.target.value)
                        }
                        className="h-9"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        placeholder="Middle name (optional)"
                        value={editingRow.middleName}
                        onChange={(e) =>
                          handleEditChange("middleName", e.target.value)
                        }
                        className="h-9"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        type="date"
                        value={editingRow.effectiveDate}
                        onChange={(e) =>
                          handleEditChange("effectiveDate", e.target.value)
                        }
                        className="h-9"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        type="date"
                        value={editingRow.endDate}
                        onChange={(e) =>
                          handleEditChange("endDate", e.target.value)
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
                            !editingRow.type ||
                            !editingRow.firstName ||
                            !editingRow.lastName
                          }
                          variant="ghost"
                          className="h-8 px-3"
                          title="Save"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancel}
                          disabled={isSaving}
                          className="h-8 px-3"
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

          {/* Add Name Button */}
          {!editingRow && (
            <div className="flex justify-end">
              <Button
                onClick={handleAddName}
                className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
              >
                Add Other Name
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
