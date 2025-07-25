import { useSearchParams } from 'react-router-dom';
import { TabbedLayout } from '@/components/ui/tabbed-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Edit3, Plus } from 'lucide-react';

const PersonalDetailsTab = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Personal Information</CardTitle>
        <Button variant="outline" size="sm" className="h-8">
          <Edit3 size={14} className="mr-2" />
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-6 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-blue rounded-full flex items-center justify-center text-white text-lg font-semibold">
            RK
          </div>
          <div>
            <h2 className="text-lg font-semibold">Rose K</h2>
            <p className="text-sm text-medium-gray">Lawyer</p>
            <Badge className="bg-brand-green text-white text-xs mt-1">Active</Badge>
          </div>
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
      </CardContent>
    </Card>
  </div>
);

const AddInfoTab = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Additional Information</CardTitle>
        <Button variant="outline" size="sm" className="h-8">
          <Plus size={14} className="mr-2" />
          Add Field
        </Button>
      </CardHeader>
      <CardContent>
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
        </div>
        
        <div className="mt-4 pt-3 border-t">
          <h3 className="text-sm font-medium mb-2">Custom Fields</h3>
          <p className="text-xs text-medium-gray">No custom fields added yet. Click "Add Field" to create custom information fields.</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default function Profile() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'personal-details';

  const tabs = [
    {
      id: 'personal-details',
      label: 'Personal Details',
      content: <PersonalDetailsTab />
    },
    {
      id: 'add-info',
      label: 'Add Info',
      content: <AddInfoTab />
    }
  ];

  return (
    <TabbedLayout
      title="Profile"
      description="Manage customer profile information and additional details."
      tabs={tabs}
      defaultTab={activeTab}
    />
  );
}
