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

export default function AdditionalInfo() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-8 max-w-6xl">
          {/* 1. Identification & Record Details Section */}
          <div>
            <SectionHeader title="Identification & Record Details" />
            <FormRow>
              <FormField label="Type">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Record Type">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Employee ID Number">
                <Input placeholder="Enter employee ID number" />
              </FormField>
              <FormField label="Accounting ID">
                <Input placeholder="Enter accounting ID" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Alien ID Number">
                <Input placeholder="Enter alien ID number" />
              </FormField>
              <FormField label="Passport ID">
                <Input placeholder="Enter passport ID" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Visa ID">
                <Input placeholder="Enter visa ID" />
              </FormField>
              <div />
            </FormRow>
          </div>

          {/* 2. Name & Personal Titles Section */}
          <div>
            <SectionHeader title="Name & Personal Titles" />
            <FormRow>
              <FormField label="Last Name" isMandatory>
                <Input placeholder="Enter last name" />
              </FormField>
              <FormField label="First Name" isMandatory>
                <Input placeholder="Enter first name" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Middle Initial">
                <Input placeholder="Enter middle initial" maxLength={1} />
              </FormField>
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
            </FormRow>
            <FormRow>
              <FormField label="Honorary Suffix">
                <Input placeholder="Enter honorary suffix" />
              </FormField>
              <FormField label="Academic Suffix">
                <Input placeholder="Enter academic suffix" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Professional Suffix">
                <Input placeholder="Enter professional suffix" />
              </FormField>
              <FormField label="Pronunciation">
                <Input placeholder="Enter pronunciation guide" />
              </FormField>
            </FormRow>
          </div>

          {/* 3. Employment & Organizational Details Section */}
          <div>
            <SectionHeader title="Employment & Organizational Details" />
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
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Education Level">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="associates">Associates</SelectItem>
                    <SelectItem value="bachelors">Bachelors</SelectItem>
                    <SelectItem value="masters">Masters</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Status">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
          </div>

          {/* 4. Legal, Compliance & Risk Disclosures Section */}
          <div>
            <SectionHeader title="Legal, Compliance & Risk Disclosures" />
            <FormRow>
              <FormField label="W9 on File">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Validated Tax ID">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Release Tax ID">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Release Medical Info">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Death Date">
                <Input type="date" />
              </FormField>
              <div />
            </FormRow>

            {/* Hazardous Pursuits Card */}
            <div className="mt-6 border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-white transition-colors">
              <h4 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                Hazardous Pursuits
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox id="hang-gliding" className="mt-0" />
                  <label htmlFor="hang-gliding" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Hang Gliding
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="stock-car" className="mt-0" />
                  <label htmlFor="stock-car" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Stock Car Dr
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Communication & Preference Settings Section */}
          <div>
            <SectionHeader title="Communication & Preference Settings" />
            <FormRow>
              <FormField label="Preferred Method">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="fax">Fax</SelectItem>
                    <SelectItem value="mail">Mail</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Market via Fax">
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
            </FormRow>
            <FormRow>
              <FormField label="Market via E-Mail">
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
              <div />
            </FormRow>
          </div>

          {/* 6. Language & Nationality Section */}
          <div>
            <SectionHeader title="Language & Nationality" />
            <FormRow>
              <FormField label="Nationality">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Primary Language">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Secondary Language">
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <div />
            </FormRow>
          </div>

          {/* 7. Marketing & Interest Information Section */}
          <div>
            <SectionHeader title="Marketing & Interest Information" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Marketing Source Card */}
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-white transition-colors">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  Marketing Source
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox id="ri-2008" className="mt-0" />
                    <label htmlFor="ri-2008" className="text-sm font-medium text-gray-700 cursor-pointer">
                      RI May 2008
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="target-conf" className="mt-0" />
                    <label htmlFor="target-conf" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Target Conf
                    </label>
                  </div>
                </div>
              </div>

              {/* Program Interests Card */}
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-white transition-colors">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  Program Interests
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox id="banking" className="mt-0" />
                    <label htmlFor="banking" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Banking
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="prof-liab" className="mt-0" />
                    <label htmlFor="prof-liab" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Prof Liab
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="technology" className="mt-0" />
                    <label htmlFor="technology" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Technology
                    </label>
                  </div>
                </div>
              </div>
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
