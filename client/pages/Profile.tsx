import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit3, Plus, ChevronDown, ChevronRight, Expand, Minimize, Trash2, Edit } from 'lucide-react';

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
    <Card className={`shadow-sm border-gray-200 ${className}`}>
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors pb-3"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-gray-900">{title}</CardTitle>
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
  const [searchParams] = useSearchParams();
  const currentSection = searchParams.get('section') || 'personal-info';

  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    professionalInfo: false,
    riskCompliance: false,
    otherDetails: false
  });

  const [otherNames, setOtherNames] = useState([
    { id: 1, type: 'Maiden Name', firstName: 'Rose', middleInitial: 'M', lastName: 'Smith', effectiveDate: '2019-01-01', expiryDate: '2024-01-01' }
  ]);

  const [workHistory, setWorkHistory] = useState([
    { 
      id: 1, 
      effectiveDate: '2019-01-01', 
      expirationDate: '2024-01-01', 
      firmName: 'Smith & Associates', 
      plLimit: '$1,000,000', 
      deductible: '$5,000', 
      innocentPartySublimit: '$250,000', 
      roIrop: 'IROP', 
      exemptionType: 'None' 
    }
  ]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      personalInfo: true,
      professionalInfo: true,
      riskCompliance: true,
      otherDetails: true
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      personalInfo: false,
      professionalInfo: false,
      riskCompliance: false,
      otherDetails: false
    });
  };

  const addOtherName = () => {
    const newId = Math.max(...otherNames.map(n => n.id)) + 1;
    setOtherNames([...otherNames, { 
      id: newId, 
      type: '', 
      firstName: '', 
      middleInitial: '', 
      lastName: '', 
      effectiveDate: '', 
      expiryDate: '' 
    }]);
  };

  const deleteOtherName = (id: number) => {
    setOtherNames(otherNames.filter(n => n.id !== id));
  };

  const addWorkHistory = () => {
    const newId = Math.max(...workHistory.map(w => w.id)) + 1;
    setWorkHistory([...workHistory, { 
      id: newId, 
      effectiveDate: '', 
      expirationDate: '', 
      firmName: '', 
      plLimit: '', 
      deductible: '', 
      innocentPartySublimit: '', 
      roIrop: '', 
      exemptionType: '' 
    }]);
  };

  const deleteWorkHistory = (id: number) => {
    setWorkHistory(workHistory.filter(w => w.id !== id));
  };

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'personal-info':
        return (
          <div className="space-y-4">
            {/* Personal Info Section */}
            <CollapsibleSection
              title="Personal Info"
              isExpanded={expandedSections.personalInfo}
              onToggle={() => toggleSection('personalInfo')}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                      RK
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Rose K</h2>
                      <p className="text-sm text-gray-600">Lawyer</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Checkbox id="active-status" defaultChecked />
                        <Label htmlFor="active-status" className="text-sm">Active Status</Label>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50">
                    <Edit3 size={14} className="mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs text-gray-600">First Name</Label>
                    <Input value="Rose" className="mt-1 h-8 border-gray-300" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Last Name</Label>
                    <Input value="K" className="mt-1 h-8 border-gray-300" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Gender</Label>
                    <Select defaultValue="female">
                      <SelectTrigger className="mt-1 h-8 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Date of Birth</Label>
                    <Input type="date" className="mt-1 h-8 border-gray-300" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Occupation</Label>
                    <Select defaultValue="lawyer">
                      <SelectTrigger className="mt-1 h-8 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lawyer">Lawyer</SelectItem>
                        <SelectItem value="paralegal">Paralegal</SelectItem>
                        <SelectItem value="legal-assistant">Legal Assistant</SelectItem>
                        <SelectItem value="notary">Notary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">LSO# / LSC#</Label>
                    <Input value="000000" className="mt-1 h-8 border-gray-300" />
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* Professional and Legal Info Section */}
            <CollapsibleSection 
              title="Professional and Legal Info" 
              isExpanded={expandedSections.professionalInfo}
              onToggle={() => toggleSection('professionalInfo')}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Legal Practice Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Lawyer Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="barrister">Barrister</SelectItem>
                          <SelectItem value="solicitor">Solicitor</SelectItem>
                          <SelectItem value="barrister-solicitor">Barrister & Solicitor</SelectItem>
                          <SelectItem value="notary">Notary Public</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Province / Jurisdiction</Label>
                      <Select defaultValue="ontario">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ontario">Ontario</SelectItem>
                          <SelectItem value="british-columbia">British Columbia</SelectItem>
                          <SelectItem value="alberta">Alberta</SelectItem>
                          <SelectItem value="quebec">Quebec</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Bar Admission Number</Label>
                      <Input placeholder="Enter admission number" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Admission Route</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="law-school">Law School Graduate</SelectItem>
                          <SelectItem value="transfer">Transfer from Another Jurisdiction</SelectItem>
                          <SelectItem value="foreign-trained">Foreign Trained Lawyer</SelectItem>
                          <SelectItem value="articling">Articling Route</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Education</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Law School</Label>
                      <Input placeholder="Enter law school name" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Degree</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jd">Juris Doctor (JD)</SelectItem>
                          <SelectItem value="llb">Bachelor of Laws (LLB)</SelectItem>
                          <SelectItem value="llm">Master of Laws (LLM)</SelectItem>
                          <SelectItem value="phd">Doctor of Philosophy (PhD)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Graduation Year</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Date of Call</Label>
                      <Input type="date" className="mt-1 h-8 border-gray-300" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Employment Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Department</Label>
                      <Input placeholder="Enter department" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Job Title</Label>
                      <Input placeholder="Enter job title" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">IMIS ID</Label>
                      <Input placeholder="Enter IMIS ID" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Account Group</Label>
                      <Input placeholder="Enter account group" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Supervisor or Manager</Label>
                      <Input placeholder="Search for supervisor" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Record Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="firm">Law Firm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* Risk and Compliance Section */}
            <CollapsibleSection 
              title="Risk and Compliance" 
              isExpanded={expandedSections.riskCompliance}
              onToggle={() => toggleSection('riskCompliance')}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Risk Assessment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Risk Profile</Label>
                      <Select defaultValue="low">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Risk</SelectItem>
                          <SelectItem value="medium">Medium Risk</SelectItem>
                          <SelectItem value="high">High Risk</SelectItem>
                          <SelectItem value="very-high">Very High Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-xs text-gray-600">Risk Reason</Label>
                      <Input placeholder="Enter risk reasons or tags" className="mt-1 h-8 border-gray-300" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Compliance Checks</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="canadian-sanctions" />
                      <Label htmlFor="canadian-sanctions" className="text-sm">Associated with Canadian Sanctions?</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="claim-history" />
                      <Label htmlFor="claim-history" className="text-sm">Claim History</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="underwriting-reasons" />
                      <Label htmlFor="underwriting-reasons" className="text-sm">Underwriting Reasons</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Subscription Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">TP Subscriber Status</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">TP Subscriber Sub Status</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select sub status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Coverage</SelectItem>
                          <SelectItem value="partial">Partial Coverage</SelectItem>
                          <SelectItem value="trial">Trial Period</SelectItem>
                          <SelectItem value="renewal">Renewal Required</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Program Eligibility</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Include in Campaign</Label>
                      <Select defaultValue="yes">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Send IROP Reminder</Label>
                      <Select defaultValue="yes">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">CPATA Eligible</Label>
                      <Select defaultValue="yes">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Status Indian Certificate</Label>
                      <Select defaultValue="no">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* Other Details Section */}
            <CollapsibleSection 
              title="Other Details" 
              isExpanded={expandedSections.otherDetails}
              onToggle={() => toggleSection('otherDetails')}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Effective Date</Label>
                      <Input type="date" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                     
                      <Select defaultValue="2019">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => 2024 - i).map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Last Contact Date</Label>
                      <Input type="date" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Years of Experience</Label>
                      <Input type="number" placeholder="Enter years" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Risk Category</Label>
                      <Select defaultValue="low">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Account Manager</Label>
                      <Input value="UW John" className="mt-1 h-8 border-gray-300" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-medium text-gray-900">Other Names</h3>
                    <Button variant="outline" size="sm" onClick={addOtherName} className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50">
                      <Plus size={14} className="mr-2" />
                      Add Name
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Type</TableHead>
                        <TableHead className="text-xs">First Name</TableHead>
                        <TableHead className="text-xs">Middle Initial</TableHead>
                        <TableHead className="text-xs">Last Name</TableHead>
                        <TableHead className="text-xs">Effective Date</TableHead>
                        <TableHead className="text-xs">Expiry Date</TableHead>
                        <TableHead className="text-xs">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {otherNames.map((name) => (
                        <TableRow key={name.id}>
                          <TableCell>
                            <Input value={name.type} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <Input value={name.firstName} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <Input value={name.middleInitial} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <Input value={name.lastName} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <Input type="date" value={name.effectiveDate} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <Input type="date" value={name.expiryDate} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Edit size={12} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0 text-red-600"
                                onClick={() => deleteOtherName(name.id)}
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

      case 'professional-legal':
        return (
          <div className="space-y-4">
            {/* Professional and Legal Info Section */}
            <CollapsibleSection
              title="Professional and Legal Info"
              isExpanded={expandedSections.professionalInfo}
              onToggle={() => toggleSection('professionalInfo')}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Legal Practice Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Lawyer Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="barrister">Barrister</SelectItem>
                          <SelectItem value="solicitor">Solicitor</SelectItem>
                          <SelectItem value="barrister-solicitor">Barrister & Solicitor</SelectItem>
                          <SelectItem value="notary">Notary Public</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Province / Jurisdiction</Label>
                      <Select defaultValue="ontario">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ontario">Ontario</SelectItem>
                          <SelectItem value="british-columbia">British Columbia</SelectItem>
                          <SelectItem value="alberta">Alberta</SelectItem>
                          <SelectItem value="quebec">Quebec</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Bar Admission Number</Label>
                      <Input placeholder="Enter admission number" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Admission Route</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="law-school">Law School Graduate</SelectItem>
                          <SelectItem value="transfer">Transfer from Another Jurisdiction</SelectItem>
                          <SelectItem value="foreign-trained">Foreign Trained Lawyer</SelectItem>
                          <SelectItem value="articling">Articling Route</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Education</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Law School</Label>
                      <Input placeholder="Enter law school name" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Degree</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jd">Juris Doctor (JD)</SelectItem>
                          <SelectItem value="llb">Bachelor of Laws (LLB)</SelectItem>
                          <SelectItem value="llm">Master of Laws (LLM)</SelectItem>
                          <SelectItem value="phd">Doctor of Philosophy (PhD)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Graduation Year</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Date of Call</Label>
                      <Input type="date" className="mt-1 h-8 border-gray-300" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Employment Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Department</Label>
                      <Input placeholder="Enter department" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Job Title</Label>
                      <Input placeholder="Enter job title" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">IMIS ID</Label>
                      <Input placeholder="Enter IMIS ID" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Account Group</Label>
                      <Input placeholder="Enter account group" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Supervisor or Manager</Label>
                      <Input placeholder="Search for supervisor" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Record Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="firm">Law Firm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          </div>
        );

      case 'risk-compliance':
        return (
          <div className="space-y-4">
            {/* Risk and Compliance Section */}
            <CollapsibleSection
              title="Risk and Compliance"
              isExpanded={expandedSections.riskCompliance}
              onToggle={() => toggleSection('riskCompliance')}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Risk Assessment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Risk Profile</Label>
                      <Select defaultValue="low">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Risk</SelectItem>
                          <SelectItem value="medium">Medium Risk</SelectItem>
                          <SelectItem value="high">High Risk</SelectItem>
                          <SelectItem value="very-high">Very High Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-xs text-gray-600">Risk Reason</Label>
                      <Input placeholder="Enter risk reasons or tags" className="mt-1 h-8 border-gray-300" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Compliance Checks</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="canadian-sanctions" />
                      <Label htmlFor="canadian-sanctions" className="text-sm">Associated with Canadian Sanctions?</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="claim-history" />
                      <Label htmlFor="claim-history" className="text-sm">Claim History</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="underwriting-reasons" />
                      <Label htmlFor="underwriting-reasons" className="text-sm">Underwriting Reasons</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Subscription Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">TP Subscriber Status</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">TP Subscriber Sub Status</Label>
                      <Select>
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue placeholder="Select sub status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Coverage</SelectItem>
                          <SelectItem value="partial">Partial Coverage</SelectItem>
                          <SelectItem value="trial">Trial Period</SelectItem>
                          <SelectItem value="renewal">Renewal Required</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Program Eligibility</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Include in Campaign</Label>
                      <Select defaultValue="yes">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Send IROP Reminder</Label>
                      <Select defaultValue="yes">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">CPATA Eligible</Label>
                      <Select defaultValue="yes">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Status Indian Certificate</Label>
                      <Select defaultValue="no">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          </div>
        );

      case 'other-details':
        return (
          <div className="space-y-4">
            {/* Other Details Section */}
            <CollapsibleSection
              title="Other Details"
              isExpanded={expandedSections.otherDetails}
              onToggle={() => toggleSection('otherDetails')}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs text-gray-600">Effective Date</Label>
                      <Input type="date" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Customer Since</Label>
                      <Select defaultValue="2019">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => 2024 - i).map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Last Contact Date</Label>
                      <Input type="date" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Years of Experience</Label>
                      <Input type="number" placeholder="Enter years" className="mt-1 h-8 border-gray-300" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Risk Category</Label>
                      <Select defaultValue="low">
                        <SelectTrigger className="mt-1 h-8 border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Account Manager</Label>
                      <Input value="UW John" className="mt-1 h-8 border-gray-300" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-medium text-gray-900">Other Names</h3>
                    <Button variant="outline" size="sm" onClick={addOtherName} className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50">
                      <Plus size={14} className="mr-2" />
                      Add Name
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Type</TableHead>
                        <TableHead className="text-xs">First Name</TableHead>
                        <TableHead className="text-xs">Middle Initial</TableHead>
                        <TableHead className="text-xs">Last Name</TableHead>
                        <TableHead className="text-xs">Effective Date</TableHead>
                        <TableHead className="text-xs">Expiry Date</TableHead>
                        <TableHead className="text-xs">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {otherNames.map((name) => (
                        <TableRow key={name.id}>
                          <TableCell>
                            <Input value={name.type} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <Input value={name.firstName} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <Input value={name.middleInitial} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <Input value={name.lastName} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <Input type="date" value={name.effectiveDate} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <Input type="date" value={name.expiryDate} className="h-7 text-xs border-gray-300" />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Edit size={12} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-600"
                                onClick={() => deleteOtherName(name.id)}
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

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Content for {currentSection} will be implemented here.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-white p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={expandAll} className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50">
                <Expand size={14} className="mr-2" />
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll} className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50">
                <Minimize size={14} className="mr-2" />
                Collapse All
              </Button>
            </div>
          </div>
        </div>

        {renderSectionContent()}
      </div>
    </div>
  );
}
