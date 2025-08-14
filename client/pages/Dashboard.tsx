import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ColumnFilter } from '@/components/ui/column-filter';
import { Progress } from '@/components/ui/progress';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Eye, 
  Plus, 
  FileText, 
  AlertTriangle, 
  Home, 
  Car, 
  Briefcase, 
  Shield, 
  Edit3, 
  ExternalLink, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Users,
  User,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  MoreHorizontal
} from 'lucide-react';

const customerData = {
  name: "Rose K",
  role: "Lawyer",
  status: "Active",
  dateOfBirth: "••••••••",
  gender: "Female",
  lsc: "000000",
  phone: "(416) 555-0123",
  email: "rose.greenthumb@example.com",
  address: "1508 - 141 Lyon Court, Toronto, ON M5B 3H2",
  memberSince: "2019",
  satisfactionScore: 4.8
};

const upcomingReminders = [
  {
    id: 1,
    type: "Policy Renewal Review - Auto",
    dueDate: "Due in 45 days",
    status: "pending",
    priority: "high"
  },
  {
    id: 2,
    type: "Follow up on Claim #C1122",
    dueDate: "Due in about 1 week",
    status: "pending",
    priority: "medium"
  },
  {
    id: 3,
    type: "Annual Review Meeting",
    dueDate: "Due in 2 weeks",
    status: "scheduled",
    priority: "low"
  }
];

const submissions = [
  { id: "A9876", lob: "PL", status: "In progress", startDate: "01/01/2024", endDate: "12/31/2024", progress: 75 },
  { id: "A9876", lob: "PL", status: "Bound", startDate: "01/01/2024", endDate: "12/31/2024", progress: 100 }
];

const policyData = [
  { policy: "A9876", lob: "Auto", coverage: "Full Coverage", startDate: "01/01/2024", endDate: "12/31/2024", status: "Active", premium: "$1,200", lastClaim: "2023" },
  { policy: "H2345", lob: "Home", coverage: "All Perils", startDate: "03/15/2023", endDate: "03/14/2025", status: "Active", premium: "$850", lastClaim: "2022" },
  { policy: "L7890", lob: "Life", coverage: "$500,000", startDate: "06/01/2022", endDate: "05/31/2032", status: "Active", premium: "$340", lastClaim: "Never" },
  { policy: "C1234", lob: "Critical Illness", coverage: "$100,000", startDate: "09/01/2023", endDate: "08/31/2028", status: "Active", premium: "$75", lastClaim: "Never" },
  { policy: "D5678", lob: "Disability", coverage: "$3,000/mo", startDate: "04/01/2022", endDate: "03/31/2027", status: "Active", premium: "$50", lastClaim: "Never" },
  { policy: "RV3333", lob: "RV", coverage: "Liability", startDate: "07/01/2021", endDate: "06/30/2023", status: "Expired", premium: "$45", lastClaim: "Never" },
  { policy: "B9999", lob: "Business", coverage: "General Liability", startDate: "10/01/2023", endDate: "09/30/2024", status: "Pending", premium: "$1,250", lastClaim: "Never" }
];

const claimsHistory = [
  { type: "Auto Collision", date: "Filed: May 16, 2023", status: "Pending", amount: "N/A", claimNumber: "C1122" },
  { type: "Home Burglary", date: "Filed: Feb 28, 2023", status: "Approved", amount: "$5,300", claimNumber: "C1045" },
  { type: "Critical Illness", date: "Filed: Dec 15, 2023", status: "Closed", amount: "$0", claimNumber: "C1189" }
];

const recentActivity = [
  {
    type: "Last Premium Paid - $150",
    date: "July 1, 2025",
    description: "Premium payment processed successfully.",
    user: "System",
    category: "payment"
  },
  {
    type: "Follow-up on recent claim #C1122 progress.",
    date: "2 hours ago",
    description: "Provided update on claim status, awaiting adjuster report.",
    user: "UW John",
    category: "claim"
  },
  {
    type: "Confirmation of payment received premium.",
    date: "1 day ago",
    description: "Auto premium receipt sent to customer.",
    user: "System",
    category: "payment"
  },
  {
    type: "Logged customer preference for email communication.",
    date: "3 days ago",
    description: "Preferred contact method updated.",
    user: "Agent Johnson",
    category: "profile"
  }
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    'active': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle },
    'bound': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle },
    'in progress': { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    'pending': { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: AlertCircle },
    'expired': { color: 'bg-gray-100 text-gray-600 border-gray-200', icon: XCircle },
    'approved': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle },
    'closed': { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: XCircle },
    'scheduled': { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Calendar }
  };
  
  const config = statusConfig[status.toLowerCase()] || { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: AlertCircle };
  const IconComponent = config.icon;
  
  return (
    <Badge className={`${config.color} border text-xs flex items-center gap-1`}>
      <IconComponent size={10} />
      {status}
    </Badge>
  );
};

const getPolicyIcon = (lob: string) => {
  switch (lob.toLowerCase()) {
    case 'auto':
      return <Car size={14} className="text-blue-600" />;
    case 'home':
      return <Home size={14} className="text-blue-600" />;
    case 'life':
    case 'critical illness':
    case 'disability':
      return <Shield size={14} className="text-blue-600" />;
    case 'business':
      return <Briefcase size={14} className="text-blue-600" />;
    default:
      return <FileText size={14} className="text-blue-600" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-[#0054A6]';
    case 'medium': return 'bg-[#0074cc]';
    case 'low': return 'bg-[#4d9fff]';
    default: return 'bg-gray-400';
  }
};

export default function Dashboard() {
  const navigate = useNavigate();

  // Filter states
  const [policyStatusFilter, setPolicyStatusFilter] = useState<string[]>([]);
  const [policyLobFilter, setPolicyLobFilter] = useState<string[]>([]);
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState<string[]>([]);
  const [claimsStatusFilter, setClaimsStatusFilter] = useState<string[]>([]);

  // Animation states
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get unique values for filters
  const policyStatuses = [...new Set(policyData.map(p => p.status))];
  const policyLobs = [...new Set(policyData.map(p => p.lob))];
  const submissionStatuses = [...new Set(submissions.map(s => s.status))];
  const claimsStatuses = [...new Set(claimsHistory.map(c => c.status))];

  // Apply filters
  const filteredPolicies = policyData.filter(policy => {
    const statusMatch = policyStatusFilter.length === 0 || policyStatusFilter.includes(policy.status);
    const lobMatch = policyLobFilter.length === 0 || policyLobFilter.includes(policy.lob);
    return statusMatch && lobMatch;
  });

  const filteredSubmissions = submissions.filter(submission => 
    submissionStatusFilter.length === 0 || submissionStatusFilter.includes(submission.status)
  );

  const filteredClaims = claimsHistory.filter(claim =>
    claimsStatusFilter.length === 0 || claimsStatusFilter.includes(claim.status)
  );

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">




        {/* Row 1: Financial Summary, Diaries, Activity Timeline, Documents */}
        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>

          {/* Financial Summary */}
          <Card className="shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('Navigate to financial details')}>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                <DollarSign size={16} className="text-slate-600" />
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Current Due</div>
                  <div className="text-xl font-bold text-gray-800">$150</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Total Due</div>
                  <div className="text-xl font-bold text-gray-700">$275</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Total Paid</div>
                  <div className="text-xl font-bold text-emerald-700">$8,460</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Annual Premium</div>
                  <div className="text-xl font-bold text-slate-700">$4,200</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">Credit Available</div>
                  <div className="text-xl font-bold text-blue-700">$85</div>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-slate-700 hover:bg-slate-800 text-white mt-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Navigate to payment');
                  }}
                >
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Diaries */}
          <Card className="shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('Navigate to diaries')}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                  <Calendar size={16} className="text-slate-600" />
                  Diaries
                </CardTitle>
                <Button variant="outline" size="sm" className="h-7 border-gray-300 text-gray-600">
                  <Plus size={10} className="mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8 text-gray-600">Due Date</TableHead>
                      <TableHead className="text-xs h-8 text-gray-600">Title</TableHead>
                      <TableHead className="text-xs h-8 text-gray-600">Priority</TableHead>
                      <TableHead className="text-xs h-8 text-gray-600">Entity</TableHead>
                      <TableHead className="text-xs h-8 text-gray-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="h-8 hover:bg-gray-50 cursor-pointer">
                      <TableCell className="text-xs py-1">08-15-25</TableCell>
                      <TableCell className="text-xs py-1">Policy Renewal Review - Auto</TableCell>
                      <TableCell className="py-1">
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700 border border-red-200">High</span>
                      </TableCell>
                      <TableCell className="text-xs py-1">A9876</TableCell>
                      <TableCell className="py-1">
                        <Button variant="ghost" size="sm" className="h-5 w-12 p-0 text-xs text-gray-600">Close</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="h-8 hover:bg-gray-50 cursor-pointer">
                      <TableCell className="text-xs py-1">08-20-25</TableCell>
                      <TableCell className="text-xs py-1">Annual Policy Audit – Rose K</TableCell>
                      <TableCell className="py-1">
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700 border border-yellow-200">Medium</span>
                      </TableCell>
                      <TableCell className="text-xs py-1">H2345</TableCell>
                      <TableCell className="py-1">
                        <Button variant="ghost" size="sm" className="h-5 w-12 p-0 text-xs text-gray-600">Close</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="h-8 hover:bg-gray-50 cursor-pointer">
                      <TableCell className="text-xs py-1">08-25-25</TableCell>
                      <TableCell className="text-xs py-1">Review & Approve Claim #C1189</TableCell>
                      <TableCell className="py-1">
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700 border border-red-200">High</span>
                      </TableCell>
                      <TableCell className="text-xs py-1">L7890</TableCell>
                      <TableCell className="py-1">
                        <Button variant="ghost" size="sm" className="h-5 w-12 p-0 text-xs text-gray-600">Close</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="h-8 hover:bg-gray-50 cursor-pointer">
                      <TableCell className="text-xs py-1">09-01-25</TableCell>
                      <TableCell className="text-xs py-1">Financial Statement Review – Rose K</TableCell>
                      <TableCell className="py-1">
                        <span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 border border-emerald-200">Low</span>
                      </TableCell>
                      <TableCell className="text-xs py-1">A9876</TableCell>
                      <TableCell className="py-1">
                        <Button variant="ghost" size="sm" className="h-5 w-12 p-0 text-xs text-gray-600">Close</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card className="shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('Navigate to activity timeline')}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                  <Activity size={16} className="text-slate-600" />
                  Activity Timeline
                </CardTitle>
                <Button variant="outline" size="sm" className="h-7 border-gray-300 text-gray-600">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8 text-gray-600">Date</TableHead>
                      <TableHead className="text-xs h-8 text-gray-600">Activity</TableHead>
                      <TableHead className="text-xs h-8 text-gray-600">Action Taken By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivity.slice(0, 4).map((activity, index) => (
                      <TableRow key={index} className="h-10 hover:bg-gray-50">
                        <TableCell className="text-xs py-2">
                          {activity.date === '2 hours ago' ? 'Jul 01, 2025 14:30' :
                           activity.date === '1 day ago' ? 'Jun 30, 2025 09:15' :
                           activity.date === '3 days ago' ? 'Jun 28, 2025 16:45' :
                           'Jun 28, 2025 11:20'}
                        </TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">{activity.type}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-600">{activity.user}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('Navigate to documents')}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                <FileText size={16} className="text-slate-600" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <FileText size={32} className="mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-500 mb-4">Manage customer documents</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full border-gray-300 text-gray-600">
                    <Plus size={12} className="mr-2" />
                    Upload Documents
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-gray-300 text-gray-600">
                    <Eye size={12} className="mr-2" />
                    View Documents
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 3: Policy Details, Claims History, Submissions */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>

          {/* Policy Details */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield size={16} />
                  Policy Details
                </CardTitle>
                <Button variant="outline" size="sm" className="h-7">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8">Policy Number</TableHead>
                      <TableHead className="text-xs h-8">Product</TableHead>
                      <TableHead className="text-xs h-8">Status</TableHead>
                      <TableHead className="text-xs h-8">Expiration Date</TableHead>
                      <TableHead className="text-xs h-8">Premium</TableHead>
                      <TableHead className="text-xs h-8">Current Due</TableHead>
                      <TableHead className="text-xs h-8">Total Paid</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPolicies.filter(p => p.status === 'Active' || (p.status === 'Expired' && Math.random() > 0.5)).map((policy, index) => (
                      <TableRow key={index} className="h-10 hover:bg-blue-50 cursor-pointer" onClick={() => console.log('Open policy details', policy.policy)}>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2">
                            {getPolicyIcon(policy.lob)}
                            <span className="text-sm font-medium">{policy.policy}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm py-2">{policy.lob}</TableCell>
                        <TableCell className="py-2">{getStatusBadge(policy.status)}</TableCell>
                        <TableCell className="text-sm py-2">{policy.endDate}</TableCell>
                        <TableCell className="text-sm font-semibold py-2">{policy.premium}</TableCell>
                        <TableCell className="text-sm py-2">{index === 0 ? '$150' : '$0'}</TableCell>
                        <TableCell className="text-sm py-2">{policy.premium}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Claims History */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText size={16} />
                  Claims History
                </CardTitle>
                <Button variant="outline" size="sm" className="h-7">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8">Claim Number</TableHead>
                      <TableHead className="text-xs h-8">Status</TableHead>
                      <TableHead className="text-xs h-8">Loss Date</TableHead>
                      <TableHead className="text-xs h-8">Paid</TableHead>
                      <TableHead className="text-xs h-8">Reserves</TableHead>
                      <TableHead className="text-xs h-8">Incurred</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClaims.filter(claim => claim.status === 'Pending' || claim.status === 'Approved').map((claim, index) => (
                      <TableRow key={index} className="h-10 hover:bg-blue-50 cursor-pointer" onClick={() => console.log('Open claim details', claim.claimNumber)}>
                        <TableCell className="text-sm font-medium py-2">{claim.claimNumber}</TableCell>
                        <TableCell className="py-2">{getStatusBadge(claim.status)}</TableCell>
                        <TableCell className="text-sm py-2">May 10, 2023</TableCell>
                        <TableCell className="text-sm py-2">{claim.amount}</TableCell>
                        <TableCell className="text-sm py-2">$2,000</TableCell>
                        <TableCell className="text-sm font-semibold py-2">
                          {claim.amount === '$5,300' ? '$7,300' : claim.amount === 'N/A' ? '$2,000' : '$0'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Submissions */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp size={16} />
                  Submissions
                </CardTitle>
                <Button variant="outline" size="sm" className="h-7">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8">Submission Number</TableHead>
                      <TableHead className="text-xs h-8">Product</TableHead>
                      <TableHead className="text-xs h-8">Status</TableHead>
                      <TableHead className="text-xs h-8">Effective Date</TableHead>
                      <TableHead className="text-xs h-8">Expiration Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.filter(submission => submission.status === 'In progress').map((submission, index) => (
                      <TableRow key={index} className="h-10 hover:bg-blue-50 cursor-pointer" onClick={() => console.log('Open submission details', submission.id)}>
                        <TableCell className="text-sm font-medium py-2">{submission.id}</TableCell>
                        <TableCell className="text-sm py-2">{submission.lob}</TableCell>
                        <TableCell className="py-2">{getStatusBadge(submission.status)}</TableCell>
                        <TableCell className="text-sm py-2">{submission.startDate}</TableCell>
                        <TableCell className="text-sm py-2">{submission.endDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
