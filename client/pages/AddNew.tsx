import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const stepLabels = ["Basic & Contact", "Role & Access"] as const;

function Stepper({
  current,
  labels,
}: {
  current: number;
  labels: readonly string[];
}) {
  const pct = (current / labels.length) * 100;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-gray-600">
        {labels.map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === current;
          const isDone = stepNum < current;
          return (
            <div key={label} className="flex-1 flex items-center">
              <div
                className={cn(
                  "flex items-center gap-2",
                  idx === 0 ? "" : "pl-2",
                )}
              >
                <div
                  className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center text-[10px] border",
                    isDone && "bg-[#0054A6] text-white border-[#0054A6]",
                    isActive && "bg-white text-[#0054A6] border-[#0054A6]",
                    !isActive &&
                      !isDone &&
                      "bg-gray-100 text-gray-500 border-gray-200",
                  )}
                >
                  {stepNum}
                </div>
                <span
                  className={cn(
                    "hidden sm:block",
                    isActive ? "text-[#0054A6] font-medium" : "text-gray-600",
                  )}
                >
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <Progress value={pct} />
    </div>
  );
}

export default function AddNew() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"person" | "organization">("person");

  // Person flow state
  const [step, setStep] = useState(1); // 1..2
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  // Internal
  const [internalProfile, setInternalProfile] = useState<string | undefined>();
  const [internalLoginId, setInternalLoginId] = useState("");

  // External
  const [relatedToOrg, setRelatedToOrg] = useState<boolean | undefined>();
  const [orgName, setOrgName] = useState("");
  const [relationshipType, setRelationshipType] = useState<
    string | undefined
  >();
  const [needsOMS, setNeedsOMS] = useState(false);
  const [omsProfile, setOmsProfile] = useState<string | undefined>();
  const [needsB2C, setNeedsB2C] = useState(false);
  const [b2cLoginId, setB2cLoginId] = useState("");

  const canContinueStep1 = fullName.trim().length > 0;

  const savePersonAndGo = () => {
    const payload = {
      name: fullName,
      email,
      phone,
      address,
      isInternal,
      internalProfile,
      internalLoginId,
      relatedToOrg: !!relatedToOrg,
      orgName,
      relationshipType,
      needsOMS,
      omsProfile,
      needsB2C,
      b2cLoginId,
    };
    try {
      localStorage.setItem("newPerson", JSON.stringify(payload));
    } catch {}
    navigate("/overview/new-person");
  };

  const gotoOverviewOrg = () => {
    navigate("/overview/abc-ltd");
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-sm bg-white border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-gray-700">Add New</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs
              value={tab}
              onValueChange={(v) => setTab(v as any)}
              className="w-full"
            >
              <TabsList>
                <TabsTrigger value="person">Add Person</TabsTrigger>
                <TabsTrigger value="organization">Add Organization</TabsTrigger>
              </TabsList>

              {/* Person flow with stepper */}
              <TabsContent value="person" className="mt-4 space-y-6">
                <Stepper
                  current={Math.min(step, stepLabels.length)}
                  labels={stepLabels}
                />

                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="p-name">Full Name</Label>
                        <Input
                          id="p-name"
                          placeholder="Full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          placeholder="(000) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Address</Label>
                        <Input
                          placeholder="Street, City, State, ZIP"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        disabled={!canContinueStep1}
                        className="bg-[#0054A6] hover:bg-[#003d7a]"
                        onClick={() => setStep(2)}
                      >
                        Save & Continue
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-700">
                          Is this an Internal Employee?
                        </div>
                        <div className="text-xs text-gray-500">
                          Toggle to capture employee details
                        </div>
                      </div>
                      <Switch
                        checked={isInternal}
                        onCheckedChange={setIsInternal}
                      />
                    </div>

                    {isInternal ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Security Profile</Label>
                          <Select
                            value={internalProfile}
                            onValueChange={setInternalProfile}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select profile" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="employee">Employee</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Login ID</Label>
                          <Input
                            placeholder="user@company"
                            value={internalLoginId}
                            onChange={(e) => setInternalLoginId(e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2 text-xs text-gray-500">
                          Relationship will be auto-added as Employee with
                          selected role.
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>Related to Organization?</Label>
                            <Select
                              value={
                                relatedToOrg === undefined
                                  ? undefined
                                  : relatedToOrg
                                    ? "yes"
                                    : "no"
                              }
                              onValueChange={(v) =>
                                setRelatedToOrg(v === "yes")
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {relatedToOrg && (
                            <div className="space-y-2">
                              <Label>Organization Name</Label>
                              <Input
                                placeholder="Search or add & link"
                                value={orgName}
                                onChange={(e) => setOrgName(e.target.value)}
                              />
                            </div>
                          )}
                          {relatedToOrg && (
                            <div className="space-y-2">
                              <Label>Relationship Type</Label>
                              <Select
                                value={relationshipType}
                                onValueChange={setRelationshipType}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="broker">
                                    Broker Contact
                                  </SelectItem>
                                  <SelectItem value="insured">
                                    Insured Contact
                                  </SelectItem>
                                  <SelectItem value="claim">
                                    Claim Party
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-700">
                                Need OMS Login?
                              </div>
                              <div className="text-xs text-gray-500">
                                Provide OMS portal access
                              </div>
                            </div>
                            <Switch
                              checked={needsOMS}
                              onCheckedChange={setNeedsOMS}
                            />
                          </div>
                          {needsOMS && (
                            <div className="space-y-2">
                              <Label>Security Profile</Label>
                              <Select
                                value={omsProfile}
                                onValueChange={setOmsProfile}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select profile" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="basic">Basic</SelectItem>
                                  <SelectItem value="power">
                                    Power User
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-700">
                                Need B2C Login?
                              </div>
                              <div className="text-xs text-gray-500">
                                Enable customer portal login
                              </div>
                            </div>
                            <Switch
                              checked={needsB2C}
                              onCheckedChange={setNeedsB2C}
                            />
                          </div>
                          {needsB2C && (
                            <div className="space-y-2">
                              <Label>Login ID</Label>
                              <Input
                                placeholder="user@example.com"
                                value={b2cLoginId}
                                onChange={(e) => setB2cLoginId(e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button
                        className="bg-[#0054A6] hover:bg-[#003d7a]"
                        onClick={savePersonAndGo}
                      >
                        Save & Finish
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Organization (kept simple) */}
              <TabsContent value="organization" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="o-name">Name</Label>
                    <Input id="o-name" placeholder="Organization name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@org.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="(000) 000-0000" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Address</Label>
                    <Input placeholder="Street, City, State, ZIP" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    className="bg-[#0054A6] hover:bg-[#003d7a]"
                    onClick={gotoOverviewOrg}
                  >
                    Save
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
