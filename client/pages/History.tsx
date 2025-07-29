import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Eye, Download, ChevronDown, ChevronRight, Expand, Minimize, Plus, Edit, Trash2 } from 'lucide-react';

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

const priorLosses = [
  {
    claim: "C1122",
    date: "2019-05-15",
    type: "Property Damage",
    amount: "$5,500",
    status: "Closed"
  },
  {
    claim: "C0987", 
    date: "2018-09-20",
    type: "Personal Injury",
    amount: "$12,000",
    status: "Closed"
  }
];

const priorPolicies = [
  {
    policy: "A9875",
    period: "2019-2020",
    type: "Auto",
    premium: "$1,200",
    status: "Expired"
  },
  {
    policy: "H5432",
    period: "2018-2019", 
    type: "Home",
    premium: "$800",
    status: "Expired"
  }
];

const auditLogs = [
  {
    action: "Policy Created",
    user: "UW John",
    timestamp: "2024-01-15 09:30:00",
    details: "New auto policy A9876 created for customer Rose K"
  },
  {
    action: "Claim Filed",
    user: "Agent Johnson", 
    timestamp: "2024-01-10 14:22:00",
    details: "Claim C1122 filed for policy A9876 - Minor fender bender"
  },
  {
    action: "Profile Updated",
    user: "Agent Smith",
    timestamp: "2024-01-05 11:15:00",
    details: "Customer communication preferences updated - Email preferred"
  }
];

export default function History() {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'history';

  const [expandedSections, setExpandedSections] = useState({
    priorLoss: true,
    priorPolicy: false,
    auditLogs: false,
    documentHistory: false,
    workHistory: true
  });

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

  const expandAll = () => {
    setExpandedSections({
      priorLoss: true,
      priorPolicy: true,
      auditLogs: true,
      documentHistory: true,
      workHistory: true
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      priorLoss: false,
      priorPolicy: false,
      auditLogs: false,
      documentHistory: false,
      workHistory: false
    });
  };

  return (
    <div className="flex-1 bg-white p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">History</h1>
              <p className="text-gray-600 text-sm mt-1">
                {currentTab === 'work-history' ? 'Employment history and work records' : 'Claims history, policy records, audit logs, and document history'}
              </p>
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

        {currentTab === 'work-history' ? (
          // Work History Tab
          <div className="space-y-4">
            <CollapsibleSection 
              title="Work History" 
              isExpanded={expandedSections.workHistory}
              onToggle={() => toggleSection('workHistory')}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium text-gray-900">Employment History</h3>
                  <Button variant="outline" size="sm" onClick={addWorkHistory} className="h-8 border-blue-300 text-blue-600 hover:bg-blue-50">
                    <Plus size={14} className="mr-2" />
                    Add Record
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Effective Date</TableHead>
                      <TableHead className="text-xs">Expiration Date</TableHead>
                      <TableHead className="text-xs">Firm Name</TableHead>
                      <TableHead className="text-xs">PL Limit</TableHead>
                      <TableHead className="text-xs">Deductible</TableHead>
                      <TableHead className="text-xs">Innocent Party Sublimit</TableHead>
                      <TableHead className="text-xs">RO/IROP</TableHead>
                      <TableHead className="text-xs">Exemption Type</TableHead>
                      <TableHead className="text-xs">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <Input type="date" value={record.effectiveDate} className="h-7 text-xs border-gray-300" />
                        </TableCell>
                        <TableCell>
                          <Input type="date" value={record.expirationDate} className="h-7 text-xs border-gray-300" />
                        </TableCell>
                        <TableCell>
                          <Input value={record.firmName} className="h-7 text-xs border-gray-300" />
                        </TableCell>
                        <TableCell>
                          <Input value={record.plLimit} className="h-7 text-xs border-gray-300" />
                        </TableCell>
                        <TableCell>
                          <Input value={record.deductible} className="h-7 text-xs border-gray-300" />
                        </TableCell>
                        <TableCell>
                          <Input value={record.innocentPartySublimit} className="h-7 text-xs border-gray-300" />
                        </TableCell>
                        <TableCell>
                          <Input value={record.roIrop} className="h-7 text-xs border-gray-300" />
                        </TableCell>
                        <TableCell>
                          <Input value={record.exemptionType} className="h-7 text-xs border-gray-300" />
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
                              onClick={() => deleteWorkHistory(record.id)}
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
          </div>
        ) : (
          // History Tab
          <div className="space-y-4">
            {/* Prior Loss Section */}
            <CollapsibleSection 
              title="Prior Loss" 
              isExpanded={expandedSections.priorLoss}
              onToggle={() => toggleSection('priorLoss')}
            >
              <div className="space-y-4">
                <p className="text-xs text-gray-600">Previous claims and loss history</p>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Claim Number</TableHead>
                        <TableHead className="text-xs">Date</TableHead>
                        <TableHead className="text-xs">Type</TableHead>
                        <TableHead className="text-xs">Amount</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                        <TableHead className="text-xs">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {priorLosses.map((loss, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-sm font-medium">{loss.claim}</TableCell>
                          <TableCell className="text-sm">{loss.date}</TableCell>
                          <TableCell className="text-sm">{loss.type}</TableCell>
                          <TableCell className="text-sm">{loss.amount}</TableCell>
                          <TableCell>
                            <Badge className="bg-gray-100 text-gray-800 border-gray-200 text-xs">{loss.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Eye size={12} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CollapsibleSection>

            {/* Prior Policy Section */}
            <CollapsibleSection 
              title="Prior Policy" 
              isExpanded={expandedSections.priorPolicy}
              onToggle={() => toggleSection('priorPolicy')}
            >
              <div className="space-y-4">
                <p className="text-xs text-gray-600">Historical policy information and coverage details</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Policy Number</TableHead>
                      <TableHead className="text-xs">Period</TableHead>
                      <TableHead className="text-xs">Type</TableHead>
                      <TableHead className="text-xs">Premium</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {priorPolicies.map((policy, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-sm font-medium">{policy.policy}</TableCell>
                        <TableCell className="text-sm">{policy.period}</TableCell>
                        <TableCell className="text-sm">{policy.type}</TableCell>
                        <TableCell className="text-sm">{policy.premium}</TableCell>
                        <TableCell>
                          <Badge className="bg-gray-100 text-gray-800 border-gray-200 text-xs">{policy.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Download size={12} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CollapsibleSection>

            {/* Audit Logs Section */}
            <CollapsibleSection 
              title="Audit Logs" 
              isExpanded={expandedSections.auditLogs}
              onToggle={() => toggleSection('auditLogs')}
            >
              <div className="space-y-4">
                <p className="text-xs text-gray-600">Complete audit trail of all system activities and changes</p>
                <div className="space-y-3">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <FileText size={14} className="text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{log.action}</span>
                            <Badge variant="outline" className="text-xs border-gray-300">{log.user}</Badge>
                          </div>
                          <p className="text-xs text-gray-600">{log.timestamp}</p>
                          <p className="text-sm mt-1">{log.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

            {/* Document History Section */}
            <CollapsibleSection 
              title="Document History" 
              isExpanded={expandedSections.documentHistory}
              onToggle={() => toggleSection('documentHistory')}
            >
              <div className="space-y-4">
                <p className="text-xs text-gray-600">History of all documents generated and sent</p>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <FileText size={14} className="text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Policy Certificate - Auto A9876</p>
                          <p className="text-xs text-gray-600">Generated: Jan 15, 2024</p>
                          <p className="text-xs text-gray-600">Sent via: Email</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Download size={12} />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <FileText size={14} className="text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Claim Report - C1122</p>
                          <p className="text-xs text-gray-600">Generated: Dec 20, 2023</p>
                          <p className="text-xs text-gray-600">Sent via: Portal</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Download size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>
          </div>
        )}
      </div>
    </div>
  );
}
