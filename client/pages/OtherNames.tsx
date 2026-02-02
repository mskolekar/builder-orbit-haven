import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Check, X } from "lucide-react";

interface OtherName {
  id: string;
  type: string;
  lastName: string;
  firstName: string;
  middleInitial: string;
  effectiveDate: string;
  expirationDate: string;
}

interface EditingRow {
  id: string;
  type: string;
  lastName: string;
  firstName: string;
  middleInitial: string;
  effectiveDate: string;
  expirationDate: string;
}

const typeOptions = [
  "Maiden Name",
  "Alias",
  "Legal Name",
  "Former Name",
  "Other",
];

export default function OtherNames() {
  const [otherNames, setOtherNames] = useState<OtherName[]>([
    {
      id: "1",
      type: "Maiden Name",
      lastName: "Smith",
      firstName: "Rose",
      middleInitial: "M",
      effectiveDate: "2019-01-01",
      expirationDate: "2024-01-01",
    },
  ]);
  const [editingRow, setEditingRow] = useState<EditingRow | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddName = () => {
    const newId = "new-" + Date.now();
    setEditingRow({
      id: newId,
      type: "",
      lastName: "",
      firstName: "",
      middleInitial: "",
      effectiveDate: "",
      expirationDate: "",
    });
  };

  const handleSave = () => {
    if (
      !editingRow ||
      !editingRow.type ||
      !editingRow.lastName ||
      !editingRow.firstName
    ) {
      return;
    }

    setIsSaving(true);

    const isNewRow = editingRow.id.startsWith("new-");
    if (isNewRow) {
      const newName: OtherName = {
        id: Date.now().toString(),
        type: editingRow.type,
        lastName: editingRow.lastName,
        firstName: editingRow.firstName,
        middleInitial: editingRow.middleInitial,
        effectiveDate: editingRow.effectiveDate,
        expirationDate: editingRow.expirationDate,
      };
      setOtherNames([...otherNames, newName]);
    } else {
      setOtherNames(
        otherNames.map((n) =>
          n.id === editingRow.id
            ? {
                id: n.id,
                type: editingRow.type,
                lastName: editingRow.lastName,
                firstName: editingRow.firstName,
                middleInitial: editingRow.middleInitial,
                effectiveDate: editingRow.effectiveDate,
                expirationDate: editingRow.expirationDate,
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
                    Type <span className="text-red-600">*</span>
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    Last Name <span className="text-red-600">*</span>
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    First Name <span className="text-red-600">*</span>
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    Middle Initial
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                    Effective Date
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

                {/* Existing names */}
                {otherNames.map((name) => (
                  <tr
                    key={name.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {name.type}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {name.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {name.firstName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {name.middleInitial}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {name.effectiveDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {name.expirationDate}
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
                      <select
                        value={editingRow.type}
                        onChange={(e) =>
                          handleEditChange("type", e.target.value)
                        }
                        className="w-full h-9 px-2 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select type</option>
                        {typeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        placeholder="Last Name"
                        value={editingRow.lastName}
                        onChange={(e) =>
                          handleEditChange("lastName", e.target.value)
                        }
                        className="h-9"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        placeholder="First Name"
                        value={editingRow.firstName}
                        onChange={(e) =>
                          handleEditChange("firstName", e.target.value)
                        }
                        className="h-9"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        placeholder="Middle Initial"
                        value={editingRow.middleInitial}
                        onChange={(e) =>
                          handleEditChange("middleInitial", e.target.value)
                        }
                        className="h-9"
                        maxLength={1}
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
                        value={editingRow.expirationDate}
                        onChange={(e) =>
                          handleEditChange("expirationDate", e.target.value)
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
                            !editingRow.lastName ||
                            !editingRow.firstName
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

          {/* Add Button */}
          {!editingRow && (
            <div className="flex justify-end">
              <Button
                onClick={handleAddName}
                className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
              >
                Add
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
