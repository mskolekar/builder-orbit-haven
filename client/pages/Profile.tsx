import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Edit3, Plus, ChevronDown, ChevronRight, Expand, Minimize } from 'lucide-react';

const CollapsibleSection = ({ 
  title, 
  children, 
  isExpanded,
  onToggle,
  className = ""
}: { 
  title: string; 
  children: React.ReactNode; 
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
}) => {
  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors pb-3"
        onClick={onToggle}
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

export default function Profile() {
  const [expandedSections, setExpandedSections] = useState({
    personalDetails: true,
    additionalInfo: false,
    contactPreferences: false,
    notesComments: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      personalDetails: true,
      additionalInfo: true,
      contactPreferences: true,
      notesComments: true
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      personalDetails: false,
      additionalInfo: false,
      contactPreferences: false,
      notesComments: false
    });
  };

  return (
    <div className="flex-1 bg-white p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
              <p className="text-medium-gray text-sm mt-1">Manage customer profile information and additional details.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={expandAll} className="h-8">
                <Expand size={14} className="mr-2" />
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll} className="h-8">
                <Minimize size={14} className="mr-2" />
                Collapse All
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Personal Details Section */}
          <CollapsibleSection 
            title="Personal Details" 
            isExpanded={expandedSections.personalDetails}
            onToggle={() => toggleSection('personalDetails')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                    RK
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Rose K</h2>
                    <p className="text-sm text-medium-gray">Lawyer</p>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs mt-1">Active</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <Edit3 size={14} className="mr-2" />
                  Edit
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs text-medium-gray">First Name</Label>
                  <Input value="Rose" readOnly className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Last Name</Label>
                  <Input value="K" readOnly className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Date of Birth</Label>
                  <Input value="••••••••" readOnly className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Gender</Label>
                  <Input value="Female" readOnly className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">LSC#</Label>
                  <Input value="000000" readOnly className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Phone</Label>
                  <Input value="(416) 555-0123" readOnly className="mt-1 h-8" />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-xs text-medium-gray">Email</Label>
                  <Input value="rose.greenthumb@example.com" readOnly className="mt-1 h-8" />
                </div>
                <div className="md:col-span-3">
                  <Label className="text-xs text-medium-gray">Address</Label>
                  <Input value="1508 - 141 Lyon Court, Toronto, ON M5B 3H2" readOnly className="mt-1 h-8" />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Additional Information Section */}
          <CollapsibleSection 
            title="Additional Information" 
            isExpanded={expandedSections.additionalInfo}
            onToggle={() => toggleSection('additionalInfo')}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-medium">Extended Profile Details</h3>
                  <p className="text-xs text-medium-gray">Additional customer information and custom fields</p>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <Plus size={14} className="mr-2" />
                  Add Field
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs text-medium-gray">Occupation</Label>
                  <Input value="Lawyer" className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Company</Label>
                  <Input placeholder="Enter company name" className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Years of Experience</Label>
                  <Input placeholder="Enter years" className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Marital Status</Label>
                  <Input placeholder="Enter status" className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Emergency Contact</Label>
                  <Input placeholder="Enter contact" className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Preferred Language</Label>
                  <Input value="English" className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Customer Since</Label>
                  <Input value="2019" readOnly className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Risk Category</Label>
                  <Input value="Low Risk" readOnly className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Account Manager</Label>
                  <Input value="UW John" readOnly className="mt-1 h-8" />
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t">
                <h4 className="text-sm font-medium mb-2">Custom Fields</h4>
                <p className="text-xs text-medium-gray">No custom fields added yet. Click "Add Field" to create custom information fields.</p>
              </div>
            </div>
          </CollapsibleSection>

          {/* Contact Preferences Section */}
          <CollapsibleSection 
            title="Contact Preferences" 
            isExpanded={expandedSections.contactPreferences}
            onToggle={() => toggleSection('contactPreferences')}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-medium-gray">Preferred Contact Method</Label>
                  <Input value="Email" className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Best Time to Contact</Label>
                  <Input placeholder="Enter preferred time" className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Communication Language</Label>
                  <Input value="English" className="mt-1 h-8" />
                </div>
                <div>
                  <Label className="text-xs text-medium-gray">Newsletter Subscription</Label>
                  <Input value="Subscribed" readOnly className="mt-1 h-8" />
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t">
                <h4 className="text-sm font-medium mb-2">Communication History</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="text-xs">Last Contact</span>
                    <span className="text-xs font-medium">Jan 15, 2024</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="text-xs">Contact Frequency</span>
                    <span className="text-xs font-medium">Monthly</span>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Notes & Comments Section */}
          <CollapsibleSection 
            title="Notes & Comments" 
            isExpanded={expandedSections.notesComments}
            onToggle={() => toggleSection('notesComments')}
          >
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-medium-gray">Internal Notes</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  placeholder="Add internal notes about this customer..."
                />
              </div>
              
              <div className="mt-4 pt-3 border-t">
                <h4 className="text-sm font-medium mb-2">Recent Notes</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium">Customer expressed interest in life insurance upgrade</p>
                        <p className="text-xs text-medium-gray mt-1">Added by UW John on Jan 10, 2024</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Edit3 size={10} />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-medium">Preferred communication method updated to email</p>
                        <p className="text-xs text-medium-gray mt-1">Added by System on Dec 15, 2023</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Edit3 size={10} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
}
