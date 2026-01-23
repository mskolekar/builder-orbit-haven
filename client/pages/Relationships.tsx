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

interface Relationship {
  id: string;
  relationTo: string;
  relationType: string;
  effectiveDate: string;
  expirationDate: string;
}

interface Role {
  id: string;
  role: string;
  effectiveDate: string;
  expirationDate: string;
}

interface EditingRow {
  id: string;
  [key: string]: string;
}

const relationTypeOptions = [
  { value: "spouse", label: "Spouse" },
  { value: "child", label: "Child" },
  { value: "parent", label: "Parent" },
  { value: "sibling", label: "Sibling" },
  { value: "other", label: "Other" },
];

const roleOptions = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "admin", label: "Admin" },
  { value: "viewer", label: "Viewer" },
];

export default function Relationships() {
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingRelationshipRow, setEditingRelationshipRow] =
    useState<EditingRow | null>(null);
  const [editingRoleRow, setEditingRoleRow] = useState<EditingRow | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Relationship handlers
  const handleAddRelationship = () => {
    const newId = "new-" + Date.now();
    setEditingRelationshipRow({
      id: newId,
      relationTo: "",
      relationType: "",
      effectiveDate: "",
      expirationDate: "",
    });
  };

  const handleSaveRelationship = () => {
    if (
      !editingRelationshipRow ||
      !editingRelationshipRow.relationTo ||
      !editingRelationshipRow.relationType
    ) {
      return;
    }

    setIsSaving(true);

    const isNewRow = editingRelationshipRow.id.startsWith("new-");
    if (isNewRow) {
      const newRelationship: Relationship = {
        id: Date.now().toString(),
        relationTo: editingRelationshipRow.relationTo,
        relationType: editingRelationshipRow.relationType,
        effectiveDate: editingRelationshipRow.effectiveDate,
        expirationDate: editingRelationshipRow.expirationDate,
      };
      setRelationships([...relationships, newRelationship]);
    } else {
      setRelationships(
        relationships.map((r) =>
          r.id === editingRelationshipRow.id
            ? {
                id: r.id,
                relationTo: editingRelationshipRow.relationTo,
                relationType: editingRelationshipRow.relationType,
                effectiveDate: editingRelationshipRow.effectiveDate,
                expirationDate: editingRelationshipRow.expirationDate,
              }
            : r,
        ),
      );
    }

    setTimeout(() => {
      setIsSaving(false);
      setEditingRelationshipRow(null);
    }, 500);
  };

  const handleCancelRelationship = () => {
    setEditingRelationshipRow(null);
  };

  const handleDeleteRelationship = (id: string) => {
    setRelationships(relationships.filter((r) => r.id !== id));
  };

  const handleEditRelationshipChange = (field: string, value: string) => {
    if (editingRelationshipRow) {
      setEditingRelationshipRow({ ...editingRelationshipRow, [field]: value });
    }
  };

  // Role handlers
  const handleAddRole = () => {
    const newId = "new-" + Date.now();
    setEditingRoleRow({
      id: newId,
      role: "",
      effectiveDate: "",
      expirationDate: "",
    });
  };

  const handleSaveRole = () => {
    if (!editingRoleRow || !editingRoleRow.role) {
      return;
    }

    setIsSaving(true);

    const isNewRow = editingRoleRow.id.startsWith("new-");
    if (isNewRow) {
      const newRole: Role = {
        id: Date.now().toString(),
        role: editingRoleRow.role,
        effectiveDate: editingRoleRow.effectiveDate,
        expirationDate: editingRoleRow.expirationDate,
      };
      setRoles([...roles, newRole]);
    } else {
      setRoles(
        roles.map((r) =>
          r.id === editingRoleRow.id
            ? {
                id: r.id,
                role: editingRoleRow.role,
                effectiveDate: editingRoleRow.effectiveDate,
                expirationDate: editingRoleRow.expirationDate,
              }
            : r,
        ),
      );
    }

    setTimeout(() => {
      setIsSaving(false);
      setEditingRoleRow(null);
    }, 500);
  };

  const handleCancelRole = () => {
    setEditingRoleRow(null);
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((r) => r.id !== id));
  };

  const handleEditRoleChange = (field: string, value: string) => {
    if (editingRoleRow) {
      setEditingRoleRow({ ...editingRoleRow, [field]: value });
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-12 max-w-6xl">
          {/* Relationships Table Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 pb-3 border-b border-gray-300">
                Relationships
              </h3>
            </div>
            <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Relation To <span className="text-red-600">*</span>
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Relation Type <span className="text-red-600">*</span>
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
                  {relationships.length === 0 && !editingRelationshipRow && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-gray-500 text-sm"
                      >
                        No relationships added
                      </td>
                    </tr>
                  )}

                  {relationships.map((relationship) => (
                    <tr
                      key={relationship.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {relationship.relationTo}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {relationTypeOptions.find(
                          (a) => a.value === relationship.relationType,
                        )?.label || relationship.relationType}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {relationship.effectiveDate}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {relationship.expirationDate}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDeleteRelationship(relationship.id)
                          }
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {editingRelationshipRow && (
                    <tr className="border-b border-gray-200 bg-blue-50">
                      <td className="px-4 py-3">
                        <Input
                          placeholder="Enter name"
                          value={editingRelationshipRow.relationTo}
                          onChange={(e) =>
                            handleEditRelationshipChange(
                              "relationTo",
                              e.target.value,
                            )
                          }
                          className="h-9"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Select
                          value={editingRelationshipRow.relationType}
                          onValueChange={(value) =>
                            handleEditRelationshipChange("relationType", value)
                          }
                        >
                          <SelectTrigger className="w-full h-9">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {relationTypeOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="date"
                          value={editingRelationshipRow.effectiveDate}
                          onChange={(e) =>
                            handleEditRelationshipChange(
                              "effectiveDate",
                              e.target.value,
                            )
                          }
                          className="h-9"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="date"
                          value={editingRelationshipRow.expirationDate}
                          onChange={(e) =>
                            handleEditRelationshipChange(
                              "expirationDate",
                              e.target.value,
                            )
                          }
                          className="h-9"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            onClick={handleSaveRelationship}
                            disabled={
                              isSaving ||
                              !editingRelationshipRow.relationTo ||
                              !editingRelationshipRow.relationType
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
                            onClick={handleCancelRelationship}
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

            {!editingRelationshipRow && (
              <div className="flex justify-end">
                <Button
                  onClick={handleAddRelationship}
                  className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
                >
                  Add Relationship
                </Button>
              </div>
            )}
          </div>

          {/* Roles Table Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 pb-3 border-b border-gray-300">
                Roles
              </h3>
            </div>
            <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Role <span className="text-red-600">*</span>
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
                  {roles.length === 0 && !editingRoleRow && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-gray-500 text-sm"
                      >
                        No roles added
                      </td>
                    </tr>
                  )}

                  {roles.map((role) => (
                    <tr
                      key={role.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {roleOptions.find((a) => a.value === role.role)
                          ?.label || role.role}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {role.effectiveDate}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {role.expirationDate}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRole(role.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {editingRoleRow && (
                    <tr className="border-b border-gray-200 bg-blue-50">
                      <td className="px-4 py-3">
                        <Select
                          value={editingRoleRow.role}
                          onValueChange={(value) =>
                            handleEditRoleChange("role", value)
                          }
                        >
                          <SelectTrigger className="w-full h-9">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roleOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="date"
                          value={editingRoleRow.effectiveDate}
                          onChange={(e) =>
                            handleEditRoleChange(
                              "effectiveDate",
                              e.target.value,
                            )
                          }
                          className="h-9"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Input
                          type="date"
                          value={editingRoleRow.expirationDate}
                          onChange={(e) =>
                            handleEditRoleChange(
                              "expirationDate",
                              e.target.value,
                            )
                          }
                          className="h-9"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            onClick={handleSaveRole}
                            disabled={isSaving || !editingRoleRow.role}
                            variant="ghost"
                            className="h-8 px-3"
                            title="Save"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelRole}
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

            {!editingRoleRow && (
              <div className="flex justify-end">
                <Button
                  onClick={handleAddRole}
                  className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
                >
                  Add Role
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
