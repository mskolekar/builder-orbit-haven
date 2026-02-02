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
import { ChevronLeft, ChevronRight, Plus, Trash2, Edit2 } from "lucide-react";

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
    <div className={cn("flex gap-4 items-start", className)}>
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

interface PriorPolicy {
  id: string;
  lineBusinessCode: string;
  carrier: string;
  policy: string;
  policyType: string;
  inceptionDate: string;
  expirationDate: string;
  premium: string;
  limitPerClaim: string;
  limitPerAggregate: string;
  deductible: string;
}

export default function PriorPolicy() {
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [policies, setPolicies] = useState<PriorPolicy[]>([]);
  const [formData, setFormData] = useState<PriorPolicy>({
    id: "",
    lineBusinessCode: "",
    carrier: "",
    policy: "",
    policyType: "",
    inceptionDate: "",
    expirationDate: "",
    premium: "",
    limitPerClaim: "",
    limitPerAggregate: "",
    deductible: "",
  });

  const handleSave = () => {
    if (!formData.lineBusinessCode) {
      alert("Please select a Line Business Code");
      return;
    }

    setIsSaving(true);

    if (editingId) {
      // Update existing policy
      setPolicies(
        policies.map((p) =>
          p.id === editingId
            ? {
                ...p,
                lineBusinessCode: formData.lineBusinessCode,
                carrier: formData.carrier,
                policy: formData.policy,
                policyType: formData.policyType,
                inceptionDate: formData.inceptionDate,
                expirationDate: formData.expirationDate,
                premium: formData.premium,
                limitPerClaim: formData.limitPerClaim,
                limitPerAggregate: formData.limitPerAggregate,
                deductible: formData.deductible,
              }
            : p,
        ),
      );
    } else {
      // Add new policy
      const newPolicy: PriorPolicy = {
        ...formData,
        id: Date.now().toString(),
      };

      setPolicies([...policies, newPolicy]);
    }

    setTimeout(() => {
      setIsSaving(false);
      resetForm();
    }, 500);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      lineBusinessCode: "",
      carrier: "",
      policy: "",
      policyType: "",
      inceptionDate: "",
      expirationDate: "",
      premium: "",
      limitPerClaim: "",
      limitPerAggregate: "",
      deductible: "",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleCancelAdd = () => {
    resetForm();
  };

  const handleEditPolicy = (policy: PriorPolicy) => {
    setFormData(policy);
    setEditingId(policy.id);
    setShowForm(true);
  };

  const handleRemovePolicy = (id: string) => {
    setPolicies(policies.filter((p) => p.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-8 max-w-6xl">
          {/* Prior Policies Grid Section */}
          <div>
            <SectionHeader title="Prior Policies" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Line Business Code
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Carrier
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Policy
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Policy Type
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Inception Date
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Expiration Date
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Premium
                    </th>
                    <th className="text-center text-sm font-semibold text-gray-900 px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {policies.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-6 text-center text-gray-500 text-sm"
                      >
                        No prior policies added yet
                      </td>
                    </tr>
                  ) : (
                    policies.map((policy) => (
                      <tr
                        key={policy.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 text-sm">{policy.lineBusinessCode}</td>
                        <td className="px-4 py-3 text-sm">{policy.carrier}</td>
                        <td className="px-4 py-3 text-sm">{policy.policy}</td>
                        <td className="px-4 py-3 text-sm">{policy.policyType}</td>
                        <td className="px-4 py-3 text-sm">{policy.inceptionDate}</td>
                        <td className="px-4 py-3 text-sm">{policy.expirationDate}</td>
                        <td className="px-4 py-3 text-sm">{policy.premium}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPolicy(policy)}
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemovePolicy(policy.id)}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Add Button */}
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => {
                  setShowForm(true);
                  setEditingId(null);
                  setFormData({
                    id: "",
                    lineBusinessCode: "",
                    carrier: "",
                    policy: "",
                    policyType: "",
                    inceptionDate: "",
                    expirationDate: "",
                    premium: "",
                    limitPerClaim: "",
                    limitPerAggregate: "",
                    deductible: "",
                  });
                }}
                className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Policy
              </Button>
            </div>
          </div>

          {/* Add New Policy Form Section - Conditional */}
          {showForm && (
            <div>
              <SectionHeader
                title={editingId ? "Edit Prior Policy" : "Add New Prior Policy"}
              />
              <FormRow>
                <FormField label="Line Business Code" isMandatory>
                  <Select
                    value={formData.lineBusinessCode}
                    onValueChange={(value) =>
                      setFormData({ ...formData, lineBusinessCode: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial-general">
                        Commercial General Liability
                      </SelectItem>
                      <SelectItem value="professional-liability">
                        Professional Liability
                      </SelectItem>
                      <SelectItem value="property">Property</SelectItem>
                      <SelectItem value="workers-comp">
                        Workers Compensation
                      </SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="umbrella">Umbrella/Excess</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Carrier">
                  <Input
                    placeholder="Enter carrier name"
                    value={formData.carrier}
                    onChange={(e) =>
                      setFormData({ ...formData, carrier: e.target.value })
                    }
                  />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField label="Policy">
                  <Input
                    placeholder="Enter policy number"
                    value={formData.policy}
                    onChange={(e) =>
                      setFormData({ ...formData, policy: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Policy Type">
                  <Input
                    placeholder="Enter policy type"
                    value={formData.policyType}
                    onChange={(e) =>
                      setFormData({ ...formData, policyType: e.target.value })
                    }
                  />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField label="Inception Date">
                  <Input
                    type="date"
                    value={formData.inceptionDate}
                    onChange={(e) =>
                      setFormData({ ...formData, inceptionDate: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Expiration Date">
                  <Input
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expirationDate: e.target.value })
                    }
                  />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField label="Premium">
                  <Input
                    placeholder="Enter premium amount"
                    value={formData.premium}
                    onChange={(e) =>
                      setFormData({ ...formData, premium: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Limit Per Claim">
                  <Input
                    placeholder="Enter limit per claim"
                    value={formData.limitPerClaim}
                    onChange={(e) =>
                      setFormData({ ...formData, limitPerClaim: e.target.value })
                    }
                  />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField label="Limit Per Aggregate">
                  <Input
                    placeholder="Enter limit per aggregate"
                    value={formData.limitPerAggregate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        limitPerAggregate: e.target.value,
                      })
                    }
                  />
                </FormField>
                <FormField label="Deductible">
                  <Input
                    placeholder="Enter deductible"
                    value={formData.deductible}
                    onChange={(e) =>
                      setFormData({ ...formData, deductible: e.target.value })
                    }
                  />
                </FormField>
              </FormRow>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-12 pt-6 border-t border-gray-200 space-y-3">
            {/* Row 1: Business Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="cancel" onClick={handleCancelAdd}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
              >
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
