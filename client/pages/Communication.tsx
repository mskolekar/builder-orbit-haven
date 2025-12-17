import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Edit, Trash2, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-12 mb-6">{children}</div>;
}

function FormField({
  label,
  isMandatory,
  children,
}: {
  label: string;
  isMandatory?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 items-start">
      <label className="w-40 flex-shrink-0 font-medium text-gray-700 text-sm pt-2">
        {label}
        {isMandatory && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="flex-1">
        {isMandatory
          ? React.cloneElement(children as React.ReactElement, {
              className: cn(
                (children as React.ReactElement).props.className,
                "bg-yellow-100",
              ),
            })
          : children}
      </div>
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

export default function Communication() {
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

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: "address" | "document";
    id: number;
  } | null>(null);

  const addOtherAddress = () => {
    const newId = Math.max(...otherAddresses.map((a) => a.id), 0) + 1;
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
    setDeleteConfirmation(null);
  };

  const addDocumentPref = () => {
    const newId = Math.max(...documentDeliveryPrefs.map((d) => d.id), 0) + 1;
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
    setDeleteConfirmation(null);
  };

  return (
    <div className="space-y-8 p-8 bg-white">
      {/* Contact Information Section */}
      <div>
        <SectionHeader title="Contact Information" />

        {/* Email Addresses */}
        <div className="mb-6">
          <div className="font-medium text-gray-900 mb-4">Email Addresses</div>
          <FormRow>
            <FormField label="Work Email">
              <Input value="rose.k@lawfirm.com" readOnly />
            </FormField>
            <FormField label="Personal Email" isMandatory>
              <Input value="rose.greenthumb@example.com" readOnly />
            </FormField>
          </FormRow>
        </div>

        {/* Phone Numbers */}
        <div className="mb-6">
          <div className="font-medium text-gray-900 mb-4">Phone Numbers</div>
          <FormRow>
            <FormField label="Business Phone">
              <Input value="(416) 555-0123" readOnly />
            </FormField>
            <FormField label="Mobile Phone">
              <Input placeholder="Enter mobile number" />
            </FormField>
          </FormRow>
          <FormRow>
            <FormField label="Home Phone">
              <Input placeholder="Enter home number" />
            </FormField>
            <FormField label="Alternate Phone">
              <Input placeholder="Enter alternate number" />
            </FormField>
          </FormRow>
          <div className="grid grid-cols-2 gap-12">
            <FormField label="Fax">
              <Input placeholder="Enter fax number" />
            </FormField>
            <div />
          </div>
        </div>

        {/* Primary Address */}
        <div className="mb-6">
          <div className="font-medium text-gray-900 mb-4">Primary Address</div>
          <FormRow>
            <FormField label="Street Address">
              <Input value="1508 - 141 Lyon Court" readOnly />
            </FormField>
            <FormField label="City">
              <Input value="Toronto" readOnly />
            </FormField>
          </FormRow>
          <FormRow>
            <FormField label="Province">
              <Select defaultValue="ontario">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ontario">Ontario</SelectItem>
                  <SelectItem value="british-columbia">
                    British Columbia
                  </SelectItem>
                  <SelectItem value="alberta">Alberta</SelectItem>
                  <SelectItem value="manitoba">Manitoba</SelectItem>
                  <SelectItem value="saskatchewan">Saskatchewan</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Postal Code" isMandatory>
              <Input value="M5B 3H2" readOnly />
            </FormField>
          </FormRow>
          <div className="grid grid-cols-2 gap-12">
            <FormField label="Country">
              <Select defaultValue="canada">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <div />
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="mb-6">
          <div className="font-medium text-gray-900 mb-4">
            Communication Preferences
          </div>
          <FormRow>
            <FormField label="Preferred Contact Method">
              <Select defaultValue="email">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="mail">Physical Mail</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Language">
              <Select defaultValue="english">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </FormRow>
          <div className="flex gap-4 items-start mb-6">
            <div className="w-40 flex-shrink-0" />
            <div className="flex-1 flex items-center space-x-2">
              <Checkbox id="newsletter" defaultChecked />
              <Label htmlFor="newsletter" className="text-sm font-medium">
                Newsletter Subscription
              </Label>
            </div>
          </div>
        </div>

        {/* Other Addresses Table */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium text-gray-900">Other Addresses</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={addOtherAddress}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Plus size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add Address</TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                              : a,
                          ),
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
                              : a,
                          ),
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
                              : a,
                          ),
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
                              : a,
                          ),
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
                              : a,
                          ),
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
                              : a,
                          ),
                        )
                      }
                      className="h-7 text-xs border-gray-300"
                    />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <MoreVertical size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() =>
                            setDeleteConfirmation({
                              type: "address",
                              id: address.id,
                            })
                          }
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Document Delivery Section */}
      <div>
        <SectionHeader title="Document Delivery Preferences" />

        {/* Document Delivery Settings Table */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium text-gray-900">
              Document Delivery Settings
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={addDocumentPref}
                    className="text-brand-blue hover:bg-blue-50"
                  >
                    <Plus size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add Preference</TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                              : d,
                          ),
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
                            d.id === pref.id ? { ...d, preference: value } : d,
                          ),
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
                        <SelectItem value="No Delivery">No Delivery</SelectItem>
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
                              : d,
                          ),
                        )
                      }
                      className="h-7 text-xs border-gray-300"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={pref.status}
                      onValueChange={(value) =>
                        setDocumentDeliveryPrefs(
                          documentDeliveryPrefs.map((d) =>
                            d.id === pref.id ? { ...d, status: value } : d,
                          ),
                        )
                      }
                    >
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
                              : d,
                          ),
                        )
                      }
                      className="h-7 text-xs border-gray-300"
                    />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <MoreVertical size={14} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() =>
                            setDeleteConfirmation({
                              type: "document",
                              id: pref.id,
                            })
                          }
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Communication Preferences */}
        <div>
          <div className="font-medium text-gray-900 mb-4">
            Communication Preferences
          </div>
          <FormRow>
            <FormField label="Preferred Contact Method">
              <Select defaultValue="email">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="mail">Physical Mail</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Language">
              <Select defaultValue="english">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </FormRow>
          <div className="flex gap-4 items-start">
            <div className="w-40 flex-shrink-0" />
            <div className="flex-1 flex items-center space-x-2">
              <Checkbox id="newsletter-delivery" defaultChecked />
              <Label
                htmlFor="newsletter-delivery"
                className="text-sm font-medium"
              >
                Newsletter Subscription
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 pt-6 border-t border-gray-200 space-y-3">
        {/* Row 1: Business Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button variant="default">Save</Button>
        </div>
        {/* Row 2: Navigation */}
        <div className="flex justify-between">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
}
