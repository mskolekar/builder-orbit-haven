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
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

interface OtherName {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  nameType: string;
  effectiveDate: string;
  endDate: string;
}

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
  const processedChildren = isMandatory
    ? React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        // Handle Select components
        if (
          child.type?.displayName === "SelectRoot" ||
          child.type?.name === "Select"
        ) {
          return React.cloneElement(child, {
            children: React.Children.map(
              child.props.children,
              (selectChild) => {
                if (!React.isValidElement(selectChild)) return selectChild;
                if (selectChild.type?.displayName === "SelectTrigger") {
                  return React.cloneElement(selectChild, {
                    className: cn(selectChild.props.className, "bg-blue-50"),
                  });
                }
                return selectChild;
              },
            ),
          });
        }

        // Handle Input components
        return React.cloneElement(child, {
          className: cn(child.props.className, "bg-blue-50"),
        });
      })
    : children;

  return (
    <div className={`flex gap-4 items-start ${className || ""}`}>
      <label className="w-40 flex-shrink-0 font-medium text-gray-700 text-sm pt-2">
        {label}
        {isMandatory && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="flex-1">{processedChildren}</div>
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

export default function OtherNames() {
  const [isSaving, setIsSaving] = useState(false);
  const [otherNames, setOtherNames] = useState<OtherName[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      middleName: "Michael",
      nameType: "Maiden Name",
      effectiveDate: "2020-01-15",
      endDate: "2022-12-31",
    },
  ]);
  const [newName, setNewName] = useState<Partial<OtherName>>({
    firstName: "",
    lastName: "",
    middleName: "",
    nameType: "",
    effectiveDate: "",
    endDate: "",
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleAddName = () => {
    if (newName.firstName && newName.lastName) {
      setOtherNames([
        ...otherNames,
        {
          id: Date.now().toString(),
          firstName: newName.firstName || "",
          lastName: newName.lastName || "",
          middleName: newName.middleName || "",
          nameType: newName.nameType || "",
          effectiveDate: newName.effectiveDate || "",
          endDate: newName.endDate || "",
        },
      ]);
      setNewName({
        firstName: "",
        lastName: "",
        middleName: "",
        nameType: "",
        effectiveDate: "",
        endDate: "",
      });
    }
  };

  const handleDeleteName = (id: string) => {
    setOtherNames(otherNames.filter((name) => name.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-8 max-w-6xl">
          {/* Add New Name Section */}
          <div>
            <SectionHeader title="Add Other Name" />
            <FormRow>
              <FormField label="First Name" isMandatory>
                <Input
                  placeholder="Enter first name"
                  value={newName.firstName || ""}
                  onChange={(e) =>
                    setNewName({ ...newName, firstName: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Last Name" isMandatory>
                <Input
                  placeholder="Enter last name"
                  value={newName.lastName || ""}
                  onChange={(e) =>
                    setNewName({ ...newName, lastName: e.target.value })
                  }
                />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Middle Name">
                <Input
                  placeholder="Enter middle name"
                  value={newName.middleName || ""}
                  onChange={(e) =>
                    setNewName({ ...newName, middleName: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Name Type">
                <Select
                  value={newName.nameType || ""}
                  onValueChange={(value) =>
                    setNewName({ ...newName, nameType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select name type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maiden">Maiden Name</SelectItem>
                    <SelectItem value="alias">Alias</SelectItem>
                    <SelectItem value="former">Former Name</SelectItem>
                    <SelectItem value="business">Business Name</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Effective Date">
                <Input
                  type="date"
                  value={newName.effectiveDate || ""}
                  onChange={(e) =>
                    setNewName({ ...newName, effectiveDate: e.target.value })
                  }
                />
              </FormField>
              <FormField label="End Date">
                <Input
                  type="date"
                  value={newName.endDate || ""}
                  onChange={(e) =>
                    setNewName({ ...newName, endDate: e.target.value })
                  }
                />
              </FormField>
            </FormRow>
            <div className="flex justify-end gap-3 mb-6">
              <Button onClick={handleAddName}>Add Name</Button>
            </div>
          </div>

          {/* Other Names List */}
          <div>
            <SectionHeader title="Existing Other Names" />
            {otherNames.length > 0 ? (
              <div className="space-y-4">
                {otherNames.map((name) => (
                  <div
                    key={name.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">
                        {name.firstName} {name.middleName} {name.lastName}
                      </h4>
                      <button
                        onClick={() => handleDeleteName(name.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                        title="Delete name"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Name Type:</span>
                        <p className="font-medium">{name.nameType}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Effective Date:</span>
                        <p className="font-medium">{name.effectiveDate}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-600">End Date:</span>
                        <p className="font-medium">{name.endDate || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No other names added yet.</p>
            )}
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
