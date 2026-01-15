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

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8">
            <div className="space-y-8">
              {/* 1. Identity Section */}
              <div>
                <SectionHeader title="1️⃣ Identity" />
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
                  <FormField label="Active">
                    <div className="flex items-center gap-2">
                      <Checkbox id="active" />
                      <label htmlFor="active" className="text-sm font-medium">
                        Active
                      </label>
                    </div>
                  </FormField>
                  <FormField label="Job Title">
                    <Input placeholder="Enter job title" />
                  </FormField>
                </FormRow>
                <FormRow>
                  <FormField label="Department">
                    <Input placeholder="Enter department" />
                  </FormField>
                  <div />
                </FormRow>
              </div>

              {/* 2. Personal Details Section */}
              <div>
                <SectionHeader title="2️⃣ Personal Details" />
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
                        <SelectItem value="prefer-not">Prefer Not to Say</SelectItem>
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

              {/* 3. Contact Information Section */}
              <div>
                <SectionHeader title="3️⃣ Contact Information" />
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
                        <SelectItem value="afternoon">Afternoon (12pm-5pm)</SelectItem>
                        <SelectItem value="evening">Evening (5pm-8pm)</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </FormRow>
              </div>

              {/* 4. Address Information Section */}
              <div>
                <SectionHeader title="4️⃣ Address Information" />
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

              {/* 5. Identification, Risk & Compliance Section */}
              <div>
                <SectionHeader title="5️⃣ Identification, Risk & Compliance" />
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
                        <SelectItem value="terrorism">Associated with Terrorism</SelectItem>
                        <SelectItem value="claims">Claim History</SelectItem>
                        <SelectItem value="underwriting">Underwriting Reasons</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                </FormRow>
              </div>

              {/* 6. Account, Society & Legal Status Section */}
              <div>
                <SectionHeader title="6️⃣ Account, Society & Legal Status" />
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
                    <Input placeholder="Enter authorized representative details" />
                  </FormField>
                  <div />
                </FormRow>
              </div>

              {/* 8. Alternate / Historical Records Section */}
              <div>
                <SectionHeader title="8️⃣ Alternate / Historical Records" />
                
                {/* Other Names Subsection */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-800 mb-4 pl-40">
                    Other Names
                  </h4>
                  <FormRow>
                    <FormField label="Type">
                      <Select>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maiden">Maiden Name</SelectItem>
                          <SelectItem value="alias">Alias</SelectItem>
                          <SelectItem value="previous">Previous Name</SelectItem>
                          <SelectItem value="legal">Legal Name</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Last Name">
                      <Input placeholder="Enter last name" />
                    </FormField>
                  </FormRow>
                  <FormRow>
                    <FormField label="First Name">
                      <Input placeholder="Enter first name" />
                    </FormField>
                    <FormField label="Middle Initial">
                      <Input placeholder="Enter middle initial" maxLength={1} />
                    </FormField>
                  </FormRow>
                  <FormRow>
                    <FormField label="Effective Date">
                      <Input type="date" />
                    </FormField>
                    <FormField label="Expiration Date">
                      <Input type="date" />
                    </FormField>
                  </FormRow>
                </div>

                {/* Other Addresses Subsection */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-4 pl-40">
                    Other Addresses
                  </h4>
                  <FormRow>
                    <FormField label="Type">
                      <Select>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="previous">Previous Address</SelectItem>
                          <SelectItem value="business">Business Address</SelectItem>
                          <SelectItem value="seasonal">Seasonal Address</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Address Name">
                      <Input placeholder="Enter address name/label" />
                    </FormField>
                  </FormRow>
                  <FormRow>
                    <FormField label="Address">
                      <Input placeholder="Enter address" />
                    </FormField>
                    <FormField label="City">
                      <Input placeholder="Enter city" />
                    </FormField>
                  </FormRow>
                  <FormRow>
                    <FormField label="State">
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
                    <FormField label="Postal Code">
                      <Input placeholder="Enter postal code" />
                    </FormField>
                  </FormRow>
                  <FormRow>
                    <FormField label="County">
                      <Input placeholder="Enter county" />
                    </FormField>
                    <div />
                  </FormRow>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSaving ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="outline"
                  className="text-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  className="text-gray-700"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
