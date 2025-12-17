import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Phone,
  MessageCircle,
  Plus,
  ChevronDown,
  ChevronRight,
  Expand,
  Minimize,
  Edit,
  Trash2,
} from "lucide-react";

const CollapsibleSection = ({
  title,
  children,
  isExpanded,
  onToggle,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
}) => {
  return (
    <Card className={`shadow-sm border-gray-200 ${className}`}>
      <CardHeader
        className="cursor-pointer hover:bg-gray-50 transition-colors pb-3"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-gray-900">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      {isExpanded && <CardContent className="pt-0">{children}</CardContent>}
    </Card>
  );
};

export default function Communication() {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "contact-details";

  const [expandedSections, setExpandedSections] = useState({
    contactInfo: true,
    communicationPrefs: false,
    documentDelivery: true,
    communicationPrefsDelivery: false,
  });

  const [otherAddresses, setOtherAddresses] = useState([
    {
      id: 1,
      type: "Previous Address",
      fullAddress: "123 Main St",
      city: "Toronto",
      state: "ON",
      postal: "M1A 1A1",
      country: "Canada",
    },
  ]);

  const [documentDeliveryPrefs, setDocumentDeliveryPrefs] = useState([
    {
      id: 1,
      documentType: "Policy Documents",
      preference: "Email",
      emailOrAddress: "rose.k@lawfirm.com",
      status: "Active",
      effectiveDate: "2024-01-01",
    },
    {
      id: 2,
      documentType: "Claims Correspondence",
      preference: "Physical Mail",
      emailOrAddress: "1508 - 141 Lyon Court, Toronto, ON",
      status: "Active",
      effectiveDate: "2024-01-01",
    },
  ]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      contactInfo: true,
      communicationPrefs: true,
      documentDelivery: true,
      communicationPrefsDelivery: true,
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      contactInfo: false,
      communicationPrefs: false,
      documentDelivery: false,
      communicationPrefsDelivery: false,
    });
  };

  const addOtherAddress = () => {
    const newId = Math.max(...otherAddresses.map((a) => a.id)) + 1;
    setOtherAddresses([
      ...otherAddresses,
      {
        id: newId,
        type: "",
        fullAddress: "",
        city: "",
        state: "",
        postal: "",
        country: "",
      },
    ]);
  };

  const deleteOtherAddress = (id: number) => {
    setOtherAddresses(otherAddresses.filter((a) => a.id !== id));
  };

  const addDocumentPref = () => {
    const newId = Math.max(...documentDeliveryPrefs.map((d) => d.id)) + 1;
    setDocumentDeliveryPrefs([
      ...documentDeliveryPrefs,
      {
        id: newId,
        documentType: "",
        preference: "",
        emailOrAddress: "",
        status: "Active",
        effectiveDate: "",
      },
    ]);
  };

  const deleteDocumentPref = (id: number) => {
    setDocumentDeliveryPrefs(documentDeliveryPrefs.filter((d) => d.id !== id));
  };

  const renderContactDetailsTab = () => {
    return (
      <div className="space-y-4">
        {/* Contact Information Section */}
        <CollapsibleSection
          title="Contact Information"
          isExpanded={expandedSections.contactInfo}
          onToggle={() => toggleSection("contactInfo")}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium mb-3 text-gray-900">
                Email Addresses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-600">Work Email</Label>
                  <Input
                    value="rose.k@lawfirm.com"
                    readOnly
                    className="mt-1 h-8 border-gray-300"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">
                    Personal Email
                  </Label>
                  <Input
                    value="rose.greenthumb@example.com"
                    readOnly
                    className="mt-1 h-8 border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium mb-3 text-gray-900">
                Phone Numbers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-gray-600">
                    Business Phone
                  </Label>
                  <Input
                    value="(416) 555-0123"
                    readOnly
                    className="mt-1 h-8 border-gray-300"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Mobile Phone</Label>
                  <Input
                    placeholder="Enter mobile number"
                    className="mt-1 h-8 border-gray-300"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Home Phone</Label>
                  <Input
                    placeholder="Enter home number"
                    className="mt-1 h-8 border-gray-300"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">
                    Alternate Phone
                  </Label>
                  <Input
                    placeholder="Enter alternate number"
                    className="mt-1 h-8 border-gray-300"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Fax</Label>
                  <Input
                    placeholder="Enter fax number"
                    className="mt-1 h-8 border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium mb-3 text-gray-900">
                Address
              </h3>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-3 text-gray-900">
                  Primary Address
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="md:col-span-2 lg:col-span-3">
                    <Label className="text-xs text-gray-600">
                      Street Address
                    </Label>
                    <Input
                      value="1508 - 141 Lyon Court"
                      readOnly
                      className="mt-1 h-8 border-gray-300"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">City</Label>
                    <Input
                      value="Toronto"
                      readOnly
                      className="mt-1 h-8 border-gray-300"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Province</Label>
                    <Select defaultValue="ontario">
                      <SelectTrigger className="mt-1 h-8 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ontario">Ontario</SelectItem>
                        <SelectItem value="british-columbia">
                          British Columbia
                        </SelectItem>
                        <SelectItem value="alberta">Alberta</SelectItem>
                        <SelectItem value="manitoba">Manitoba</SelectItem>
                        <SelectItem value="saskatchewan">
                          Saskatchewan
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Postal Code</Label>
                    <Input
                      value="M5B 3H2"
                      readOnly
                      className="mt-1 h-8 border-gray-300"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Country</Label>
                    <Select defaultValue="canada">
                      <SelectTrigger className="mt-1 h-8 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium mb-3 text-gray-900">
                Communication Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-gray-600">
                    Preferred Contact Method
                  </Label>
                  <Select defaultValue="email">
                    <SelectTrigger className="mt-1 h-8 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="mail">Physical Mail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">Language</Label>
                  <Select defaultValue="english">
                    <SelectTrigger className="mt-1 h-8 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox id="newsletter" defaultChecked />
                  <Label htmlFor="newsletter" className="text-sm">
                    Newsletter Subscription
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-medium text-gray-900">
                  Other Addresses
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addOtherAddress}
                  className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <Plus size={14} className="mr-2" />
                  Add Address
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Full Address</TableHead>
                    <TableHead className="text-xs">City</TableHead>
                    <TableHead className="text-xs">State</TableHead>
                    <TableHead className="text-xs">Postal</TableHead>
                    <TableHead className="text-xs">Country</TableHead>
                    <TableHead className="text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {otherAddresses.map((address) => (
                    <TableRow key={address.id}>
                      <TableCell>
                        <Input
                          value={address.type}
                          onChange={(e) =>
                            setOtherAddresses(
                              otherAddresses.map((a) =>
                                a.id === address.id
                                  ? { ...a, type: e.target.value }
                                  : a
                              )
                            )
                          }
                          className="h-7 text-xs border-gray-300"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={address.fullAddress}
                          onChange={(e) =>
                            setOtherAddresses(
                              otherAddresses.map((a) =>
                                a.id === address.id
                                  ? { ...a, fullAddress: e.target.value }
                                  : a
                              )
                            )
                          }
                          className="h-7 text-xs border-gray-300"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={address.city}
                          onChange={(e) =>
                            setOtherAddresses(
                              otherAddresses.map((a) =>
                                a.id === address.id
                                  ? { ...a, city: e.target.value }
                                  : a
                              )
                            )
                          }
                          className="h-7 text-xs border-gray-300"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={address.state}
                          onChange={(e) =>
                            setOtherAddresses(
                              otherAddresses.map((a) =>
                                a.id === address.id
                                  ? { ...a, state: e.target.value }
                                  : a
                              )
                            )
                          }
                          className="h-7 text-xs border-gray-300"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={address.postal}
                          onChange={(e) =>
                            setOtherAddresses(
                              otherAddresses.map((a) =>
                                a.id === address.id
                                  ? { ...a, postal: e.target.value }
                                  : a
                              )
                            )
                          }
                          className="h-7 text-xs border-gray-300"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={address.country}
                          onChange={(e) =>
                            setOtherAddresses(
                              otherAddresses.map((a) =>
                                a.id === address.id
                                  ? { ...a, country: e.target.value }
                                  : a
                              )
                            )
                          }
                          className="h-7 text-xs border-gray-300"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Edit size={12} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-600"
                            onClick={() => deleteOtherAddress(address.id)}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    );
  };

  const renderDeliveryPreferencesTab = () => {
    return (
      <div className="space-y-4">
        {/* Document Delivery Preferences Section */}
        <CollapsibleSection
          title="Document Delivery Preferences"
          isExpanded={expandedSections.documentDelivery}
          onToggle={() => toggleSection("documentDelivery")}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-medium text-gray-900">
                Document Delivery Settings
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={addDocumentPref}
                className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Plus size={14} className="mr-2" />
                Add Preference
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Document Type</TableHead>
                  <TableHead className="text-xs">Preference</TableHead>
                  <TableHead className="text-xs">Email or Address</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Effective Date</TableHead>
                  <TableHead className="text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentDeliveryPrefs.map((pref) => (
                  <TableRow key={pref.id}>
                    <TableCell>
                      <Select
                        value={pref.documentType}
                        onValueChange={(value) =>
                          setDocumentDeliveryPrefs(
                            documentDeliveryPrefs.map((d) =>
                              d.id === pref.id
                                ? { ...d, documentType: value }
                                : d
                            )
                          )
                        }
                      >
                        <SelectTrigger className="h-7 text-xs border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Policy Documents">
                            Policy Documents
                          </SelectItem>
                          <SelectItem value="Claims Correspondence">
                            Claims Correspondence
                          </SelectItem>
                          <SelectItem value="Payment Statements">
                            Payment Statements
                          </SelectItem>
                          <SelectItem value="Legal Notices">
                            Legal Notices
                          </SelectItem>
                          <SelectItem value="Marketing Materials">
                            Marketing Materials
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={pref.preference}
                        onValueChange={(value) =>
                          setDocumentDeliveryPrefs(
                            documentDeliveryPrefs.map((d) =>
                              d.id === pref.id
                                ? { ...d, preference: value }
                                : d
                            )
                          )
                        }
                      >
                        <SelectTrigger className="h-7 text-xs border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="Physical Mail">
                            Physical Mail
                          </SelectItem>
                          <SelectItem value="Secure Portal">
                            Secure Portal
                          </SelectItem>
                          <SelectItem value="No Delivery">
                            No Delivery
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={pref.emailOrAddress}
                        onChange={(e) =>
                          setDocumentDeliveryPrefs(
                            documentDeliveryPrefs.map((d) =>
                              d.id === pref.id
                                ? { ...d, emailOrAddress: e.target.value }
                                : d
                            )
                          )
                        }
                        className="h-7 text-xs border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      <Select value={pref.status}>
                        <SelectTrigger className="h-7 text-xs border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={pref.effectiveDate}
                        onChange={(e) =>
                          setDocumentDeliveryPrefs(
                            documentDeliveryPrefs.map((d) =>
                              d.id === pref.id
                                ? { ...d, effectiveDate: e.target.value }
                                : d
                            )
                          )
                        }
                        className="h-7 text-xs border-gray-300"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <Edit size={12} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-600"
                          onClick={() => deleteDocumentPref(pref.id)}
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CollapsibleSection>

        {/* Communication Preferences Section */}
        <CollapsibleSection
          title="Communication Preferences"
          isExpanded={expandedSections.communicationPrefsDelivery}
          onToggle={() => toggleSection("communicationPrefsDelivery")}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs text-gray-600">
                  Preferred Contact Method
                </Label>
                <Select defaultValue="email">
                  <SelectTrigger className="mt-1 h-8 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="mail">Physical Mail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-gray-600">Language</Label>
                <Select defaultValue="english">
                  <SelectTrigger className="mt-1 h-8 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <Checkbox id="newsletter-delivery" defaultChecked />
                <Label htmlFor="newsletter-delivery" className="text-sm">
                  Newsletter Subscription
                </Label>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-900">
                Notification Preferences
              </Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Policy Updates</p>
                      <p className="text-xs text-gray-600">
                        Receive notifications about policy changes
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                    Email
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Payment Reminders</p>
                      <p className="text-xs text-gray-600">
                        Notifications about upcoming payments
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                    SMS
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={16} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Claims Updates</p>
                      <p className="text-xs text-gray-600">
                        Status updates on active claims
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                    Phone
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-white p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Communication
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Manage customer communication preferences and contact
                information
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={expandAll}
                className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Expand size={14} className="mr-2" />
                Expand All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={collapseAll}
                className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                <Minimize size={14} className="mr-2" />
                Collapse All
              </Button>
            </div>
          </div>
        </div>

        {currentTab === "contact-details"
          ? renderContactDetailsTab()
          : renderDeliveryPreferencesTab()}
      </div>
    </div>
  );
}
