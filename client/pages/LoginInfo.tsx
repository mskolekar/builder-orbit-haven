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
  return (
    <div className={cn("flex gap-4 items-start", className)}>
      <label className="w-40 flex-shrink-0 font-medium text-gray-700 text-sm pt-2">
        {label}
        {isMandatory && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="flex-1">{children}</div>
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

interface LoginInfo {
  loginId: string;
  password: string;
  confirmPassword: string;
  securityProfileCode: string;
  manager: string;
  forceChangePassword: boolean;
}

export default function LoginInfo() {
  const [formState, setFormState] = useState<LoginInfo>({
    loginId: "",
    password: "",
    confirmPassword: "",
    securityProfileCode: "",
    manager: "",
    forceChangePassword: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    if (!formState.loginId) {
      return;
    }

    if (formState.password !== formState.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      alert("Login information saved successfully");
    }, 1000);
  };

  const handleReset = () => {
    setFormState({
      loginId: "",
      password: "",
      confirmPassword: "",
      securityProfileCode: "",
      manager: "",
      forceChangePassword: false,
    });
  };

  const securityProfileOptions = [
    { value: "standard", label: "Standard" },
    { value: "admin", label: "Administrator" },
    { value: "manager", label: "Manager" },
    { value: "user", label: "User" },
    { value: "viewer", label: "Viewer" },
  ];

  const managerOptions = [
    { value: "john-smith", label: "John Smith" },
    { value: "jane-doe", label: "Jane Doe" },
    { value: "michael-brown", label: "Michael Brown" },
    { value: "sarah-wilson", label: "Sarah Wilson" },
    { value: "david-johnson", label: "David Johnson" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <div className="w-full h-full p-8">
        <div className="space-y-8 max-w-6xl">
          {/* Login Info Form Section */}
          <div>
            <SectionHeader title="Login Information" />

            <FormRow>
              <FormField label="Login Id" isMandatory>
                <Input
                  placeholder="Enter login ID"
                  value={formState.loginId}
                  onChange={(e) =>
                    setFormState({ ...formState, loginId: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Security Profile Code" isMandatory>
                <Select
                  value={formState.securityProfileCode || ""}
                  onValueChange={(value) =>
                    setFormState({
                      ...formState,
                      securityProfileCode: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select security profile" />
                  </SelectTrigger>
                  <SelectContent>
                    {securityProfileOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>

            <FormRow>
              <FormField label="Password" isMandatory>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={formState.password}
                  onChange={(e) =>
                    setFormState({ ...formState, password: e.target.value })
                  }
                />
              </FormField>
              <FormField label="Manager (of People who can Login)" isMandatory>
                <Select
                  value={formState.manager || ""}
                  onValueChange={(value) =>
                    setFormState({ ...formState, manager: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {managerOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>

            <FormRow>
              <FormField label="Confirm Password" isMandatory>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={formState.confirmPassword}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </FormField>
              <div />
            </FormRow>

            <div className="flex gap-4 items-center mb-6">
              <label className="w-40 flex-shrink-0 font-medium text-gray-700 text-sm">
                Force User to change password at next login
              </label>
              <div className="flex-1">
                <Switch
                  checked={formState.forceChangePassword}
                  onCheckedChange={(checked) =>
                    setFormState({
                      ...formState,
                      forceChangePassword: checked,
                    })
                  }
                  id="force-change"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 pt-6 border-t border-gray-200 space-y-3">
            <div className="flex justify-end gap-3">
              <Button variant="cancel" onClick={handleReset}>
                Reset
              </Button>
              <Button
                onClick={handleSave}
                disabled={
                  isSaving ||
                  !formState.loginId ||
                  !formState.securityProfileCode ||
                  !formState.manager ||
                  !formState.password ||
                  !formState.confirmPassword
                }
                className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
