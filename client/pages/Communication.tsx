import { TabbedLayout } from '@/components/ui/tabbed-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Phone, MessageCircle, Plus, Send } from 'lucide-react';

const DeliveryPreferencesTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Communication Preferences</CardTitle>
        <p className="text-medium-gray text-sm">Manage how the customer prefers to receive communications.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Preferred Contact Method</Label>
            <Select defaultValue="email">
              <SelectTrigger className="mt-1">
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
            <Label className="text-sm font-medium">Language Preference</Label>
            <Select defaultValue="english">
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Communication Types</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-brand-blue" />
                <div>
                  <p className="text-sm font-medium">Policy Documents</p>
                  <p className="text-xs text-medium-gray">Receive policy documents and updates</p>
                </div>
              </div>
              <Badge className="bg-brand-green text-white text-xs">Email</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-brand-blue" />
                <div>
                  <p className="text-sm font-medium">Payment Reminders</p>
                  <p className="text-xs text-medium-gray">Notifications about upcoming payments</p>
                </div>
              </div>
              <Badge className="bg-brand-orange text-white text-xs">SMS</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
              <div className="flex items-center gap-3">
                <MessageCircle size={16} className="text-brand-blue" />
                <div>
                  <p className="text-sm font-medium">Claims Updates</p>
                  <p className="text-xs text-medium-gray">Status updates on active claims</p>
                </div>
              </div>
              <Badge className="bg-brand-blue text-white text-xs">Phone</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contact History</CardTitle>
        <p className="text-medium-gray text-sm">Recent communication history with the customer.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="flex items-start gap-3">
              <Mail size={14} className="text-brand-blue mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">Policy Renewal Email Sent</span>
                  <Badge variant="outline" className="text-xs">Delivered</Badge>
                </div>
                <p className="text-xs text-medium-gray">Jan 15, 2024 - 09:30 AM</p>
                <p className="text-sm mt-1">Auto policy renewal notice sent to primary email address.</p>
              </div>
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="flex items-start gap-3">
              <Phone size={14} className="text-brand-green mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">Outbound Call - Claim Follow-up</span>
                  <Badge variant="outline" className="text-xs">Completed</Badge>
                </div>
                <p className="text-xs text-medium-gray">Jan 12, 2024 - 02:15 PM</p>
                <p className="text-sm mt-1">Spoke with customer about claim C1122 status update.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const AddressTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Address Management</CardTitle>
          <p className="text-medium-gray text-sm">Manage customer addresses and mailing preferences.</p>
        </div>
        <Button variant="outline" size="sm">
          <Plus size={14} className="mr-2" />
          Add Address
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Primary Address</h3>
          <div className="p-4 border rounded-lg bg-brand-blue/5 border-brand-blue/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium">Residential Address</p>
                <p className="text-sm text-medium-gray mt-1">1508 - 141 Lyon Court</p>
                <p className="text-sm text-medium-gray">Toronto, ON M5B 3H2</p>
                <p className="text-sm text-medium-gray">Canada</p>
                <Badge className="bg-brand-blue text-white text-xs mt-2">Primary</Badge>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Additional Addresses</h3>
          <div className="space-y-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Business Address</p>
                  <p className="text-sm text-medium-gray mt-1">456 King Street West, Suite 200</p>
                  <p className="text-sm text-medium-gray">Toronto, ON M5V 1L7</p>
                  <p className="text-sm text-medium-gray">Canada</p>
                  <Badge variant="outline" className="text-xs mt-2">Business</Badge>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Mailing Address</p>
                  <p className="text-sm text-medium-gray mt-1">PO Box 123</p>
                  <p className="text-sm text-medium-gray">Toronto, ON M4W 3E2</p>
                  <p className="text-sm text-medium-gray">Canada</p>
                  <Badge variant="outline" className="text-xs mt-2">Mailing</Badge>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Address Verification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-medium-gray">Last Verified</Label>
              <Input value="January 10, 2024" readOnly className="mt-1" />
            </div>
            <div>
              <Label className="text-xs text-medium-gray">Verification Method</Label>
              <Input value="Document Upload" readOnly className="mt-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Send Communication</CardTitle>
        <p className="text-medium-gray text-sm">Send a message or document to the customer.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Communication Type</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="letter">Physical Letter</SelectItem>
                <SelectItem value="document">Document Package</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm font-medium">Delivery Address</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select address" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary Address</SelectItem>
                <SelectItem value="business">Business Address</SelectItem>
                <SelectItem value="mailing">Mailing Address</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium">Subject</Label>
          <Input placeholder="Enter subject" className="mt-1" />
        </div>
        <div>
          <Label className="text-sm font-medium">Message</Label>
          <Textarea placeholder="Enter your message..." className="mt-1" rows={4} />
        </div>
        <Button className="bg-brand-blue hover:bg-brand-blue/90">
          <Send size={14} className="mr-2" />
          Send Communication
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default function Communication() {
  const tabs = [
    {
      id: 'delivery-preferences',
      label: 'Delivery Preferences',
      content: <DeliveryPreferencesTab />
    },
    {
      id: 'address',
      label: 'Address',
      content: <AddressTab />
    }
  ];

  return (
    <TabbedLayout
      title="Communication"
      description="Manage customer communication preferences and address information."
      tabs={tabs}
      defaultTab="delivery-preferences"
    />
  );
}
