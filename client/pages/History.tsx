import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Eye, Download, ChevronDown, ChevronRight } from 'lucide-react';

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

export default function History() {
  const priorLosses = [
    { date: "2022-03-15", type: "Auto Accident", amount: "$3,200", status: "Settled", claim: "C2045" },
    { date: "2021-08-22", type: "Home Water Damage", amount: "$1,800", status: "Closed", claim: "C1876" },
    { date: "2020-11-10", type: "Theft", amount: "$950", status: "Paid", claim: "C1654" },
  ];

  const priorPolicies = [
    { policy: "P2021-AUTO", period: "2021-2022", type: "Auto Insurance", premium: "$1,150", status: "Expired" },
    { policy: "P2020-HOME", period: "2020-2021", type: "Home Insurance", premium: "$750", status: "Expired" },
    { policy: "P2019-LIFE", period: "2019-2020", type: "Life Insurance", premium: "$320", status: "Expired" },
  ];

  const auditLogs = [
    { timestamp: "2024-01-15 09:32:15", user: "UW John", action: "Policy Updated", details: "Premium amount modified for policy A9876" },
    { timestamp: "2024-01-14 14:22:08", user: "Rose K", action: "Profile Updated", details: "Email address changed" },
    { timestamp: "2024-01-13 11:15:43", user: "Admin User", action: "Claim Created", details: "New claim C1122 submitted" },
    { timestamp: "2024-01-12 16:45:22", user: "Agent Johnson", action: "Communication Logged", details: "Phone call regarding policy renewal" },
    { timestamp: "2024-01-11 10:08:31", user: "System", action: "Payment Processed", details: "Premium payment of $150 processed" },
  ];

  return (
    <div className="flex-1 bg-white p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Tab Name */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">History</h1>
          <p className="text-medium-gray text-sm mt-1">View comprehensive historical data and audit trails.</p>
        </div>

        <div className="space-y-4">
          {/* Prior Loss Section */}
          <CollapsibleSection title="Prior Loss" defaultExpanded={true}>
            <div className="space-y-4">
              <p className="text-xs text-medium-gray">Complete history of previous claims and losses</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Claim #</TableHead>
                    <TableHead className="text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priorLosses.map((loss, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-sm">{loss.date}</TableCell>
                      <TableCell className="text-sm">{loss.type}</TableCell>
                      <TableCell className="text-sm font-medium">{loss.amount}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">{loss.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{loss.claim}</TableCell>
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
          </CollapsibleSection>

          {/* Prior Policy Section */}
          <CollapsibleSection title="Prior Policy" defaultExpanded={false}>
            <div className="space-y-4">
              <p className="text-xs text-medium-gray">Historical policy information and coverage details</p>
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
          <CollapsibleSection title="Audit Logs" defaultExpanded={false}>
            <div className="space-y-4">
              <p className="text-xs text-medium-gray">Complete audit trail of all system activities and changes</p>
              <div className="space-y-3">
                {auditLogs.map((log, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <FileText size={14} className="text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{log.action}</span>
                          <Badge variant="outline" className="text-xs">{log.user}</Badge>
                        </div>
                        <p className="text-xs text-medium-gray">{log.timestamp}</p>
                        <p className="text-sm mt-1">{log.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>

          {/* Document History Section */}
          <CollapsibleSection title="Document History" defaultExpanded={false}>
            <div className="space-y-4">
              <p className="text-xs text-medium-gray">History of all documents generated and sent</p>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <FileText size={14} className="text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Policy Certificate - Auto A9876</p>
                        <p className="text-xs text-medium-gray">Generated: Jan 15, 2024</p>
                        <p className="text-xs text-medium-gray">Sent via: Email</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Download size={12} />
                    </Button>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <FileText size={14} className="text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Claim Report - C1122</p>
                        <p className="text-xs text-medium-gray">Generated: Dec 20, 2023</p>
                        <p className="text-xs text-medium-gray">Sent via: Portal</p>
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
      </div>
    </div>
  );
}
