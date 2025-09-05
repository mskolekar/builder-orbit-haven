import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="p-name">Name</Label>
                    <Input id="p-name" placeholder="Full name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@example.com" />
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

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-700">Internal (Employee)</div>
                      <div className="text-xs text-gray-500">Toggle for internal employees</div>
                    </div>
                    <Switch checked={isInternal} onCheckedChange={setIsInternal} />
                  </div>

                  {isInternal ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Security Profile</Label>
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
                      </div>
                      <div className="space-y-2">
                        <Label>Login ID</Label>
                        <Input placeholder="user@company" />
                      </div>
                      <div className="md:col-span-2 text-xs text-gray-500">
                        Relationship will be added as Employee with appropriate role.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Related to Organization?</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Organization Name</Label>
                          <Input placeholder="Search or add & link" />
                        </div>
                        <div className="space-y-2">
                          <Label>Relationship Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="broker">Broker Contact</SelectItem>
                              <SelectItem value="insured">Insured Contact</SelectItem>
                              <SelectItem value="claim">Claim Party</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-700">Login access to OMS?</div>
                            <div className="text-xs text-gray-500">Provide OMS portal access</div>
                          </div>
                          <Switch checked={needsOMS} onCheckedChange={setNeedsOMS} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-700">Login access to B2C?</div>
                            <div className="text-xs text-gray-500">Enable customer portal login</div>
                          </div>
                          <Switch checked={needsB2C} onCheckedChange={setNeedsB2C} />
                        </div>
                        {needsOMS && (
                          <div className="space-y-2">
                            <Label>Security Profile</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select profile" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="basic">Basic</SelectItem>
                                <SelectItem value="power">Power User</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {needsB2C && (
                          <div className="space-y-2">
                            <Label>Login ID</Label>
                            <Input placeholder="user@example.com" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <Button className="bg-[#0054A6] hover:bg-[#003d7a]" onClick={saveToOlivia}>Save</Button>
                  </div>
                </TabsContent>

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

                <div className="mt-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-700">Define employees/contacts?</div>
                    <div className="text-xs text-gray-500">You can link people after creating the organization</div>
                  </div>
                  <Switch checked={defineContacts} onCheckedChange={setDefineContacts} />
                </div>

                <div className="mt-6 flex justify-end">
                  <Button className="bg-[#0054A6] hover:bg-[#003d7a]" onClick={saveToOlivia}>Save</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}