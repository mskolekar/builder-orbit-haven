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
import { Switch } from "@/components/ui/switch";
import { MultiSelectDropdown } from "@/components/ui/multiselect-dropdown";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function PersonInfo() {
  const [isSaving, setIsSaving] = useState(false);
  const [activeCheckbox, setActiveCheckbox] = useState(false);
  const [riskProfileReasons, setRiskProfileReasons] = useState<string[]>([]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-8 max-w-6xl">
          {/* Basic Details Section */}
          <div>
            <SectionHeader title="Basic Details" />
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
              <FormField label="Middle Name">
                <Input placeholder="Enter middle name" />
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
              <FormField label="Birth Date">
                <Input type="date" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Confirm Birth Date">
                <Input type="date" />
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
              <FormField label="Record Type">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Active">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={activeCheckbox}
                    onCheckedChange={setActiveCheckbox}
                  />
                </div>
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
          </div>

          {/* Compliance & Risk Details Section */}
          <div>
            <SectionHeader title="Compliance & Risk Details" />
            <FormRow>
              <FormField label="Social Security Number" isMandatory>
                <Input placeholder="XXX-XX-XXXX" type="password" />
              </FormField>
              <FormField label="Confirm Social Security Number" isMandatory>
                <Input placeholder="XXX-XX-XXXX" type="password" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Job Title">
                <Input placeholder="Enter job title" />
              </FormField>
              <FormField label="Department">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                  </SelectContent>
                </Select>
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
              <div>
                <MultiSelectDropdown
                  label="Risk Profile Reason"
                  options={[
                    { value: "terrorism", label: "Associated with Terrorism" },
                    { value: "claims", label: "Claim History" },
                    { value: "underwriting", label: "Underwriting Reasons" },
                    { value: "others", label: "Others" },
                  ]}
                  selectedValues={riskProfileReasons}
                  onChange={setRiskProfileReasons}
                  placeholder="Select reasons..."
                />
              </div>
            </FormRow>
            {riskProfileReasons.includes("others") && (
              <FormRow>
                <FormField label="Others (if selected others in above field)">
                  <Input placeholder="Specify other reasons" />
                </FormField>
                <div />
              </FormRow>
            )}
            <FormRow>
              <FormField label="Account Group">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group1">Group 1</SelectItem>
                    <SelectItem value="group2">Group 2</SelectItem>
                    <SelectItem value="group3">Group 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <div />
            </FormRow>
          </div>

          {/* Contact Details Section */}
          <div>
            <SectionHeader title="Contact Details" />
            <FormRow>
              <FormField label="E-mail Address">
                <Input type="email" placeholder="Enter email address" />
              </FormField>
              <FormField label="Fax">
                <Input placeholder="Enter fax number" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Business Phone">
                <Input placeholder="Enter business phone" />
              </FormField>
              <FormField label="Mobile Phone">
                <Input placeholder="Enter mobile phone" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Home Phone">
                <Input placeholder="Enter home phone" />
              </FormField>
              <FormField label="Alternate Phone">
                <Input placeholder="Enter alternate phone" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Best Time To Call">
                <Input placeholder="Enter best time to call" />
              </FormField>
              <FormField label="Date Of Call">
                <Input type="date" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Preferred Method">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="mail">Mail</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <div />
            </FormRow>
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
