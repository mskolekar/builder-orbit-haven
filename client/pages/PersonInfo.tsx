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
import { Switch } from "@/components/ui/switch";
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

interface OtherName {
  id: string;
  type: string;
  lastName: string;
  firstName: string;
  middleInitial: string;
  effectiveDate: string;
  expirationDate: string;
}

interface OtherAddress {
  id: string;
  type: string;
  addressName: string;
  address: string;
  city: string;
  state: string;
  postal: string;
  county: string;
}

export default function PersonInfo() {
  const [isSaving, setIsSaving] = useState(false);
  const [otherNames, setOtherNames] = useState<OtherName[]>([]);
  const [otherAddresses, setOtherAddresses] = useState<OtherAddress[]>([]);
  const [activeToggle, setActiveToggle] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const addOtherName = () => {
    setOtherNames([
      ...otherNames,
      {
        id: Date.now().toString(),
        type: "",
        lastName: "",
        firstName: "",
        middleInitial: "",
        effectiveDate: "",
        expirationDate: "",
      },
    ]);
  };

  const removeOtherName = (id: string) => {
    setOtherNames(otherNames.filter((name) => name.id !== id));
  };

  const updateOtherName = (id: string, field: string, value: string) => {
    setOtherNames(
      otherNames.map((name) =>
        name.id === id ? { ...name, [field]: value } : name,
      ),
    );
  };

  const addOtherAddress = () => {
    setOtherAddresses([
      ...otherAddresses,
      {
        id: Date.now().toString(),
        type: "",
        addressName: "",
        address: "",
        city: "",
        state: "",
        postal: "",
        county: "",
      },
    ]);
  };

  const removeOtherAddress = (id: string) => {
    setOtherAddresses(otherAddresses.filter((addr) => addr.id !== id));
  };

  const updateOtherAddress = (id: string, field: string, value: string) => {
    setOtherAddresses(
      otherAddresses.map((addr) =>
        addr.id === id ? { ...addr, [field]: value } : addr,
      ),
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-8 max-w-6xl">
          {/* Identity Section */}
          <div>
            <SectionHeader title="Identity" />
            <FormRow>
              <FormField label="Salutation">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">Mr.</SelectItem>
                    <SelectItem value="mrs">Mrs.</SelectItem>
                    <SelectItem value="ms">Ms.</SelectItem>
                    <SelectItem value="dr">Dr.</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Last Name" isMandatory>
                <Input placeholder="Enter last name" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="First Name" isMandatory>
                <Input placeholder="Enter first name" />
              </FormField>
              <FormField label="Middle Initial">
                <Input placeholder="Enter middle initial" maxLength={1} />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Suffix">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jr">Jr.</SelectItem>
                    <SelectItem value="sr">Sr.</SelectItem>
                    <SelectItem value="ii">II</SelectItem>
                    <SelectItem value="iii">III</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Person Type">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Job Title">
                <Input placeholder="Enter job title" />
              </FormField>
              <FormField label="Department">
                <Input placeholder="Enter department" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Active">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={activeToggle}
                    onCheckedChange={setActiveToggle}
                  />
                </div>
              </FormField>
              <div />
            </FormRow>
          </div>

          {/* Personal Details Section */}
          <div>
            <SectionHeader title="Personal Details" />
            <FormRow>
              <FormField label="Birth Date">
                <Input type="date" />
              </FormField>
              <FormField label="Confirm Birth Date">
                <Input type="date" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Gender">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not">
                      Prefer Not to Say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Marital Status">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Living Arrangement">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owns">Owns</SelectItem>
                    <SelectItem value="rents">Rents</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <div />
            </FormRow>
          </div>

          {/* Contact Information Section */}
          <div>
            <SectionHeader title="Contact Information" />
            <FormRow>
              <FormField label="E-mail Address">
                <Input type="email" placeholder="Enter email address" />
              </FormField>
              <FormField label="Business Phone">
                <Input placeholder="Enter business phone" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Mobile Phone">
                <Input placeholder="Enter mobile phone" />
              </FormField>
              <FormField label="Home Phone">
                <Input placeholder="Enter home phone" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Alternate Phone">
                <Input placeholder="Enter alternate phone" />
              </FormField>
              <FormField label="Best Time to Call">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8am-12pm)</SelectItem>
                    <SelectItem value="afternoon">
                      Afternoon (12pm-5pm)
                    </SelectItem>
                    <SelectItem value="evening">Evening (5pm-8pm)</SelectItem>
                    <SelectItem value="anytime">Anytime</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
          </div>

          {/* Address Information Section */}
          <div>
            <SectionHeader title="Address Information" />
            <FormRow>
              <FormField label="Primary Address (Address Line 1)" isMandatory>
                <Input placeholder="Enter address line 1" />
              </FormField>
              <FormField label="Address Line 2">
                <Input placeholder="Enter address line 2 (apt, suite, etc.)" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="City" isMandatory>
                <Input placeholder="Enter city" />
              </FormField>
              <FormField label="State / Postal" isMandatory>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ca">CA</SelectItem>
                    <SelectItem value="ny">NY</SelectItem>
                    <SelectItem value="tx">TX</SelectItem>
                    <SelectItem value="fl">FL</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="ZIP / Postal Code" isMandatory>
                <Input placeholder="Enter ZIP/Postal code" />
              </FormField>
              <FormField label="County">
                <Input placeholder="Enter county" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Address Validated">
                <div className="flex items-center gap-2">
                  <Checkbox id="validated" />
                  <label htmlFor="validated" className="text-sm font-medium">
                    Address is validated
                  </label>
                </div>
              </FormField>
              <div />
            </FormRow>
          </div>

          {/* Identification, Risk & Compliance Section */}
          <div>
            <SectionHeader title="Identification, Risk & Compliance" />
            <FormRow>
              <FormField label="Social Security Number" isMandatory>
                <Input placeholder="XXX-XX-XXXX" type="password" />
              </FormField>
              <FormField label="Confirm Social Security Number" isMandatory>
                <Input placeholder="XXX-XX-XXXX" type="password" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Risk Profile">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Risk Profile Reason">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terrorism">
                      Associated with Terrorism
                    </SelectItem>
                    <SelectItem value="claims">Claim History</SelectItem>
                    <SelectItem value="underwriting">
                      Underwriting Reasons
                    </SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
          </div>

          {/* Account, Society & Legal Status Section */}
          <div>
            <SectionHeader title="Account, Society & Legal Status" />
            <FormRow>
              <FormField label="Account Group">
                <Input placeholder="Enter account group" />
              </FormField>
              <FormField label="Society ID Number">
                <Input placeholder="Enter society ID number" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Lawyer Status">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Date of Call">
                <Input type="date" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Primary Contact / Authorized Representative Person Detail">
                <div className="text-gray-500 text-sm pt-2">No data found</div>
              </FormField>
              <div />
            </FormRow>
          </div>

          {/* Other Names Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 pb-3 border-b border-gray-300">
                Other Names
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Type
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Last Name
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      First Name
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
                      <Button
                        size="icon"
                        onClick={addOtherName}
                        className="h-6 w-6 bg-[#0054A6] hover:bg-[#003d7a] text-white p-0"
                        title="Add Other Name"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {otherNames.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-6 text-center text-gray-500 text-sm"
                      >
                        No other names added
                      </td>
                    </tr>
                  ) : (
                    otherNames.map((name) => (
                      <tr
                        key={name.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">
                          <Select
                            value={name.type}
                            onValueChange={(val) =>
                              updateOtherName(name.id, "type", val)
                            }
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="maiden">
                                Maiden Name
                              </SelectItem>
                              <SelectItem value="alias">Alias</SelectItem>
                              <SelectItem value="previous">
                                Previous Name
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            value={name.lastName}
                            onChange={(e) =>
                              updateOtherName(
                                name.id,
                                "lastName",
                                e.target.value,
                              )
                            }
                            placeholder="Last Name"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            value={name.firstName}
                            onChange={(e) =>
                              updateOtherName(
                                name.id,
                                "firstName",
                                e.target.value,
                              )
                            }
                            placeholder="First Name"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            maxLength={1}
                            value={name.middleInitial}
                            onChange={(e) =>
                              updateOtherName(
                                name.id,
                                "middleInitial",
                                e.target.value,
                              )
                            }
                            placeholder="MI"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            type="date"
                            value={name.effectiveDate}
                            onChange={(e) =>
                              updateOtherName(
                                name.id,
                                "effectiveDate",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            type="date"
                            value={name.expirationDate}
                            onChange={(e) =>
                              updateOtherName(
                                name.id,
                                "expirationDate",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOtherName(name.id)}
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

          {/* Other Addresses Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 pb-3 border-b border-gray-300">
                Other Addresses
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Type
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Address Name
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
                      Postal
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      County
                    </th>
                    <th className="text-center text-sm font-semibold text-gray-900 px-4 py-3">
                      <Button
                        size="icon"
                        onClick={addOtherAddress}
                        className="h-6 w-6 bg-[#0054A6] hover:bg-[#003d7a] text-white p-0"
                        title="Add Other Address"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {otherAddresses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-4 py-6 text-center text-gray-500 text-sm"
                      >
                        No other addresses added
                      </td>
                    </tr>
                  ) : (
                    otherAddresses.map((addr) => (
                      <tr
                        key={addr.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">
                          <Select
                            value={addr.type}
                            onValueChange={(val) =>
                              updateOtherAddress(addr.id, "type", val)
                            }
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="previous">
                                Previous Address
                              </SelectItem>
                              <SelectItem value="business">
                                Business Address
                              </SelectItem>
                              <SelectItem value="seasonal">
                                Seasonal Address
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            value={addr.addressName}
                            onChange={(e) =>
                              updateOtherAddress(
                                addr.id,
                                "addressName",
                                e.target.value,
                              )
                            }
                            placeholder="Address Name"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            value={addr.address}
                            onChange={(e) =>
                              updateOtherAddress(
                                addr.id,
                                "address",
                                e.target.value,
                              )
                            }
                            placeholder="Address"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            value={addr.city}
                            onChange={(e) =>
                              updateOtherAddress(
                                addr.id,
                                "city",
                                e.target.value,
                              )
                            }
                            placeholder="City"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Select
                            value={addr.state}
                            onValueChange={(val) =>
                              updateOtherAddress(addr.id, "state", val)
                            }
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ca">CA</SelectItem>
                              <SelectItem value="ny">NY</SelectItem>
                              <SelectItem value="tx">TX</SelectItem>
                              <SelectItem value="fl">FL</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            value={addr.postal}
                            onChange={(e) =>
                              updateOtherAddress(
                                addr.id,
                                "postal",
                                e.target.value,
                              )
                            }
                            placeholder="Postal"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            className="h-8"
                            value={addr.county}
                            onChange={(e) =>
                              updateOtherAddress(
                                addr.id,
                                "county",
                                e.target.value,
                              )
                            }
                            placeholder="County"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOtherAddress(addr.id)}
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
