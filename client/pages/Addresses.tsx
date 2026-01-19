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
import { Checkbox } from "@/components/ui/checkbox";
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
                    className: cn(selectChild.props.className, "bg-gray-100"),
                  });
                }
                return selectChild;
              },
            ),
          });
        }

        // Handle Input components
        return React.cloneElement(child, {
          className: cn(child.props.className, "bg-gray-100"),
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

interface Address {
  id: string;
  type: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  state: string;
  county: string;
  validated: boolean;
  preferred: boolean;
}

export default function Addresses() {
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [formData, setFormData] = useState<Address>({
    id: "",
    type: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
    county: "",
    validated: false,
    preferred: false,
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleAddAddress = () => {
    if (!formData.type || !formData.addressLine1 || !formData.city || !formData.state) {
      alert("Please fill in all required fields");
      return;
    }

    const newAddress: Address = {
      ...formData,
      id: Date.now().toString(),
    };

    // If this address is marked as preferred, unmark all others
    let updatedAddresses = addresses;
    if (newAddress.preferred) {
      updatedAddresses = addresses.map((addr) => ({
        ...addr,
        preferred: false,
      }));
    }

    setAddresses([...updatedAddresses, newAddress]);
    setFormData({
      id: "",
      type: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      state: "",
      county: "",
      validated: false,
      preferred: false,
    });
    setShowForm(false);
  };

  const handleCancelAdd = () => {
    setFormData({
      id: "",
      type: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      state: "",
      county: "",
      validated: false,
      preferred: false,
    });
    setShowForm(false);
  };

  const handleRemoveAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handlePreferredChange = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        preferred: addr.id === id ? true : false,
      }))
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-8 max-w-6xl">
          {/* Address Form Section */}
          <div>
            <SectionHeader title="Add New Address" />
            <FormRow>
              <FormField label="Type" isMandatory>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Address Line 1" isMandatory>
                <Input
                  placeholder="Enter address line 1"
                  value={formData.addressLine1}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine1: e.target.value })
                  }
                />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Address Line 2">
                <Input
                  placeholder="Enter address line 2"
                  value={formData.addressLine2}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine2: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Address Line 3">
                <Input
                  placeholder="Enter address line 3"
                  value={formData.addressLine3}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine3: e.target.value })
                  }
                />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="City" isMandatory>
                <Select
                  value={formData.city}
                  onValueChange={(value) =>
                    setFormData({ ...formData, city: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="los-angeles">Los Angeles</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="houston">Houston</SelectItem>
                    <SelectItem value="phoenix">Phoenix</SelectItem>
                    <SelectItem value="philadelphia">Philadelphia</SelectItem>
                    <SelectItem value="san-antonio">San Antonio</SelectItem>
                    <SelectItem value="san-diego">San Diego</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Province/State/Postal" isMandatory>
                <Select
                  value={formData.state}
                  onValueChange={(value) =>
                    setFormData({ ...formData, state: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                    <SelectItem value="il">Illinois</SelectItem>
                    <SelectItem value="pa">Pennsylvania</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="County">
                <Input
                  placeholder="Enter county"
                  value={formData.county}
                  onChange={(e) =>
                    setFormData({ ...formData, county: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Validated">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="validated"
                    checked={formData.validated}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        validated: checked as boolean,
                      })
                    }
                  />
                  <label htmlFor="validated" className="text-sm font-medium">
                    Address is validated
                  </label>
                </div>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Preferred Address">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="preferred"
                    checked={formData.preferred}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        preferred: checked as boolean,
                      })
                    }
                  />
                  <label htmlFor="preferred" className="text-sm font-medium">
                    Set as preferred address
                  </label>
                </div>
              </FormField>
              <div className="flex justify-end">
                <Button
                  onClick={handleAddAddress}
                  className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </div>
            </FormRow>
          </div>

          {/* Addresses Grid Section */}
          <div>
            <SectionHeader title="Address List" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Type
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Address
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      City
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      State
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      County
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Validated
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Preferred?
                    </th>
                    <th className="text-center text-sm font-semibold text-gray-900 px-4 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {addresses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-6 text-center text-gray-500 text-sm"
                      >
                        No addresses added yet
                      </td>
                    </tr>
                  ) : (
                    addresses.map((address) => (
                      <tr
                        key={address.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 text-sm capitalize">
                          {address.type}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div>{address.addressLine1}</div>
                          {address.addressLine2 && (
                            <div className="text-gray-600 text-xs">
                              {address.addressLine2}
                            </div>
                          )}
                          {address.addressLine3 && (
                            <div className="text-gray-600 text-xs">
                              {address.addressLine3}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">{address.city}</td>
                        <td className="px-4 py-3 text-sm">{address.state}</td>
                        <td className="px-4 py-3 text-sm">{address.county}</td>
                        <td className="px-4 py-3 text-sm">
                          {address.validated ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Checkbox
                            checked={address.preferred}
                            onCheckedChange={() =>
                              handlePreferredChange(address.id)
                            }
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAddress(address.id)}
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
