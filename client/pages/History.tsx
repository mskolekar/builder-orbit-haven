import { TabbedLayout } from '@/components/ui/tabbed-layout';
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
import { FileText, AlertTriangle, Eye, Download } from 'lucide-react';

const PriorLossTab = () => {
  const priorLosses = [
    { date: "2022-03-15", type: "Auto Accident", amount: "$3,200", status: "Settled", claim: "C2045" },
    { date: "2021-08-22", type: "Home Water Damage", amount: "$1,800", status: "Closed", claim: "C1876" },
    { date: "2020-11-10", type: "Theft", amount: "$950", status: "Paid", claim: "C1654" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Prior Loss History</CardTitle>
          <p className="text-medium-gray text-sm">Complete history of previous claims and losses.</p>
        </CardHeader>
        <CardContent>
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
                    <Badge className="bg-brand-green text-white text-xs">{loss.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{loss.claim}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Eye size={12} className="mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const PriorPolicyTab = () => {
  const priorPolicies = [
    { policy: "P2021-AUTO", period: "2021-2022", type: "Auto Insurance", premium: "$1,150", status: "Expired" },
    { policy: "P2020-HOME", period: "2020-2021", type: "Home Insurance", premium: "$750", status: "Expired" },
    { policy: "P2019-LIFE", period: "2019-2020", type: "Life Insurance", premium: "$320", status: "Expired" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Prior Policy History</CardTitle>
          <p className="text-medium-gray text-sm">Historical policy information and coverage details.</p>
        </CardHeader>
        <CardContent>
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
                    <Badge className="bg-gray-500 text-white text-xs">{policy.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Download size={12} className="mr-1" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const AuditLogsTab = () => {
  const auditLogs = [
    { timestamp: "2024-01-15 09:32:15", user: "Agent Smith", action: "Policy Updated", details: "Premium amount modified for policy A9876" },
    { timestamp: "2024-01-14 14:22:08", user: "Rose K", action: "Profile Updated", details: "Email address changed" },
    { timestamp: "2024-01-13 11:15:43", user: "Admin User", action: "Claim Created", details: "New claim C1122 submitted" },
    { timestamp: "2024-01-12 16:45:22", user: "Agent Johnson", action: "Communication Logged", details: "Phone call regarding policy renewal" },
    { timestamp: "2024-01-11 10:08:31", user: "System", action: "Payment Processed", details: "Premium payment of $150 processed" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Audit Logs</CardTitle>
          <p className="text-medium-gray text-sm">Complete audit trail of all system activities and changes.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLogs.map((log, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-start gap-3">
                  <FileText size={14} className="text-brand-blue mt-0.5" />
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
        </CardContent>
      </Card>
    </div>
  );
};

export default function History() {
  const tabs = [
    {
      id: 'prior-loss',
      label: 'Prior Loss',
      content: <PriorLossTab />
    },
    {
      id: 'prior-policy',
      label: 'Prior Policy',
      content: <PriorPolicyTab />
    },
    {
      id: 'audit-logs',
      label: 'Audit Logs',
      content: <AuditLogsTab />
    }
  ];

  return (
    <TabbedLayout
      title="History"
      description="View comprehensive historical data and audit trails."
      tabs={tabs}
      defaultTab="prior-loss"
    />
  );
}
