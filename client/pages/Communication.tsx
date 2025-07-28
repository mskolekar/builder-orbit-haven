import { useState } from 'react';
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
import { Mail, Phone, MessageCircle, Plus, Send, ChevronDown, ChevronRight } from 'lucide-react';

const CollapsibleSection = ({ 
  title, 
  children, 
  defaultExpanded = false,
  className = ""
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultExpanded?: boolean;
  className?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors pb-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default function Communication() {
  return (
    <div className="flex-1 bg-white p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Tab Name */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Communication</h1>
          <p className="text-medium-gray text-sm mt-1">Manage customer communication preferences and address information.</p>
        </div>

        <div className="space-y-4">
          {/* Delivery Preferences Section */}
          <CollapsibleSection title="Delivery Preferences" defaultExpanded={true}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Preferred Contact Method</Label>
                  <Select defaultValue="email">
                    <SelectTrigger className="mt-1 h-8">
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
                    <SelectTrigger className="mt-1 h-8">
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
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Policy Documents</p>
                        <p className="text-xs text-medium-gray">Receive policy documents and updates</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">Email</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Payment Reminders</p>
                        <p className="text-xs text-medium-gray">Notifications about upcoming payments</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">SMS</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageCircle size={16} className="text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Claims Updates</p>
                        <p className="text-xs text-medium-gray">Status updates on active claims</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">Phone</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Address Management Section */}
          <CollapsibleSection title="Address Management" defaultExpanded={false}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Customer Addresses</h3>
                  <p className="text-xs text-medium-gray">Manage customer addresses and mailing preferences</p>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <Plus size={14} className="mr-2" />
                  Add Address
                </Button>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Primary Address</h4>
                <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">Residential Address</p>
                      <p className="text-sm text-medium-gray mt-1">1508 - 141 Lyon Court</p>
                      <p className="text-sm text-medium-gray">Toronto, ON M5B 3H2</p>
                      <p className="text-sm text-medium-gray">Canada</p>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs mt-2">Primary</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="h-7">Edit</Button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Additional Addresses</h4>
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
                      <Button variant="outline" size="sm" className="h-7">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Contact History Section */}
          <CollapsibleSection title="Contact History" defaultExpanded={false}>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Mail size={14} className="text-blue-600 mt-0.5" />
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
                  <Phone size={14} className="text-blue-600 mt-0.5" />
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
          </CollapsibleSection>

          {/* Send Communication Section */}
          <CollapsibleSection title="Send Communication" defaultExpanded={false}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Communication Type</Label>
                  <Select>
                    <SelectTrigger className="mt-1 h-8">
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
                    <SelectTrigger className="mt-1 h-8">
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
                <Input placeholder="Enter subject" className="mt-1 h-8" />
              </div>
              <div>
                <Label className="text-sm font-medium">Message</Label>
                <Textarea placeholder="Enter your message..." className="mt-1" rows={4} />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send size={14} className="mr-2" />
                Send Communication
              </Button>
            </div>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
}
