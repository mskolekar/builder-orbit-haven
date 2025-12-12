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
import { HorizontalFormField } from "@/components/ui/horizontal-form-field";

export default function AddNew() {
  const [isInternal, setIsInternal] = useState(false);
  const [needsOMS, setNeedsOMS] = useState(false);
  const [needsB2C, setNeedsB2C] = useState(false);
  const [defineContacts, setDefineContacts] = useState(false);
  const navigate = useNavigate();

  const saveToOlivia = () => {
    navigate("/overview/olivia?tab=summary");
  };

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-sm bg-white border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-gray-700">Add New</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="person" className="w-full">
              <TabsList>
                <TabsTrigger value="person">Add Person</TabsTrigger>
                <TabsTrigger value="organization">Add Organization</TabsTrigger>
              </TabsList>

              <TabsContent value="person" className="mt-4">
                <div className="space-y-4">
                  <HorizontalFormField label="Name">
                    <Input id="p-name" placeholder="Full name" />
                  </HorizontalFormField>
                  <HorizontalFormField label="Email">
                    <Input type="email" placeholder="email@example.com" />
                  </HorizontalFormField>
                  <HorizontalFormField label="Phone">
                    <Input placeholder="(000) 000-0000" />
                  </HorizontalFormField>
                  <HorizontalFormField label="Address">
                    <Input placeholder="Street, City, State, ZIP" />
                  </HorizontalFormField>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-700">
                        Internal (Employee)
                      </div>
                      <div className="text-xs text-gray-500">
                        Toggle for internal employees
                      </div>
                    </div>
                    <Switch
                      checked={isInternal}
                      onCheckedChange={setIsInternal}
                    />
                  </div>

                  {isInternal ? (
                    <div className="space-y-4">
                      <HorizontalFormField label="Security Profile">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select profile" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employee">Employee</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </HorizontalFormField>
                      <HorizontalFormField label="Login ID">
                        <Input placeholder="user@company" />
                      </HorizontalFormField>
                      <div className="text-xs text-gray-500 pl-44">
                        Relationship will be added as Employee with appropriate
                        role.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <HorizontalFormField label="Related to Organization?">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </HorizontalFormField>
                      <HorizontalFormField label="Organization Name">
                        <Input placeholder="Search or add & link" />
                      </HorizontalFormField>
                      <HorizontalFormField label="Relationship Type">
                        <Select>
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
                            <SelectItem value="claim">Claim Party</SelectItem>
                          </SelectContent>
                        </Select>
                      </HorizontalFormField>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between pl-44">
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-700">
                              Login access to OMS?
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
                        <div className="flex items-center justify-between pl-44">
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-700">
                              Login access to B2C?
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
                        {needsOMS && (
                          <HorizontalFormField label="Security Profile">
                            <Select>
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
                          </HorizontalFormField>
                        )}
                        {needsB2C && (
                          <HorizontalFormField label="Login ID">
                            <Input placeholder="user@example.com" />
                          </HorizontalFormField>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <Button
                      className="bg-[#0054A6] hover:bg-[#003d7a]"
                      onClick={saveToOlivia}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="organization" className="mt-4">
                <div className="space-y-4">
                  <HorizontalFormField label="Name">
                    <Input id="o-name" placeholder="Organization name" />
                  </HorizontalFormField>
                  <HorizontalFormField label="Email">
                    <Input type="email" placeholder="email@org.com" />
                  </HorizontalFormField>
                  <HorizontalFormField label="Phone">
                    <Input placeholder="(000) 000-0000" />
                  </HorizontalFormField>
                  <HorizontalFormField label="Address">
                    <Input placeholder="Street, City, State, ZIP" />
                  </HorizontalFormField>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-700">
                      Define employees/contacts?
                    </div>
                    <div className="text-xs text-gray-500">
                      You can link people after creating the organization
                    </div>
                  </div>
                  <Switch
                    checked={defineContacts}
                    onCheckedChange={setDefineContacts}
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    className="bg-[#0054A6] hover:bg-[#003d7a]"
                    onClick={saveToOlivia}
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
