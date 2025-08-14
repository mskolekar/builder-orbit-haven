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




        {/* Row 1: Financial Summary (moved to first position) */}
        <div className={`transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <Card className="shadow-sm bg-white mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign size={16} />
                Financial Summary - All Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="text-xs text-gray-500 mb-1">Current Due</div>
                  <div className="text-2xl font-bold text-red-600">$150</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="text-xs text-gray-500 mb-1">Total Due</div>
                  <div className="text-2xl font-bold text-orange-600">$275</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-xs text-gray-500 mb-1">Total Paid</div>
                  <div className="text-2xl font-bold text-green-600">$8,460</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-xs text-gray-500 mb-1">Annual Premium Total</div>
                  <div className="text-2xl font-bold text-blue-600">$4,200</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="text-xs text-gray-500 mb-1">Credit Available</div>
                  <div className="text-2xl font-bold text-purple-600">$85</div>
                </div>
              </div>

              {/* Upcoming Payment Section */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar size={14} className="text-amber-600" />
                    Upcoming Payment
                  </h3>
                  <div className="text-xs font-medium text-gray-600">
                    Reference: 1-345567B
                  </div>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="text-3xl font-bold text-amber-800">$150</div>
                  <div className="text-lg font-semibold text-gray-800">Due on Aug 1, 2025</div>
                  <div className="text-sm text-red-600 font-medium">Late fee after: Aug 5, 2025</div>
                  <Button
                    size="sm"
                    className="bg-[#0054A6] hover:bg-[#003d7a] text-white px-8 py-2 font-medium mt-4"
                    onClick={() => console.log('Navigate to payment')}
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Activity Timeline, Diaries */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>

          {/* Activity Timeline */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity size={16} />
                  Activity Timeline
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
                      <TableHead className="text-xs h-8">Date</TableHead>
                      <TableHead className="text-xs h-8">Activity</TableHead>
                      <TableHead className="text-xs h-8">Action Taken By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivity.slice(0, 5).map((activity, index) => (
                      <TableRow key={index} className="h-10 hover:bg-blue-50">
                        <TableCell className="text-xs py-2">
                          {activity.date === '2 hours ago' ? 'Jul 01, 2025 14:30' :
                           activity.date === '1 day ago' ? 'Jun 30, 2025 09:15' :
                           activity.date === '3 days ago' ? 'Jun 28, 2025 16:45' :
                           'Jun 28, 2025 11:20'}
                        </TableCell>
                        <TableCell className="text-sm py-2">{activity.type}</TableCell>
                        <TableCell className="text-sm py-2">{activity.user}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Diaries & Documents */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock size={16} />
                  Diaries
                </CardTitle>
                <Button variant="outline" size="sm" className="h-7">
                  <Plus size={10} className="mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Diaries Table - 70% */}
              <div className="h-48 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8">Due Date</TableHead>
                      <TableHead className="text-xs h-8">Title</TableHead>
                      <TableHead className="text-xs h-8">Priority</TableHead>
                      <TableHead className="text-xs h-8">Entity</TableHead>
                      <TableHead className="text-xs h-8">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingReminders.map((reminder, index) => (
                      <TableRow key={reminder.id} className="h-8 hover:bg-blue-50 cursor-pointer">
                        <TableCell className="text-xs py-1">
                          <div className="flex items-center gap-1">
                            <Calendar size={10} />
                            08-15-25
                          </div>
                        </TableCell>
                        <TableCell className="text-xs py-1">{reminder.type}</TableCell>
                        <TableCell className="py-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            reminder.priority === 'high' ? 'bg-red-100 text-red-700' :
                            reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {reminder.priority}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs py-1">A9876</TableCell>
                        <TableCell className="py-1">
                          <Button variant="ghost" size="sm" className="h-5 w-12 p-0 text-xs">
                            Close
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Documents Section - 30% */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Documents</h4>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    Upload Documents
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    Download Documents
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
              <CardTitle className="text-base flex items-center gap-2">
                <FileText size={16} />
                Claims History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8">Claim #</TableHead>
                      <TableHead className="text-xs h-8">Type</TableHead>
                      <TableHead className="text-xs h-8">Date Filed</TableHead>
                      <TableHead className="text-xs h-8">
                        <div className="flex items-center gap-1">
                          Status
                          <ColumnFilter
                            options={claimsStatuses}
                            selectedValues={claimsStatusFilter}
                            onFilterChange={setClaimsStatusFilter}
                          />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8">Amount</TableHead>
                      <TableHead className="text-xs h-8">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClaims.map((claim, index) => (
                      <TableRow key={index} className="h-10 hover:bg-blue-50">
                        <TableCell className="text-sm font-medium py-2">{claim.claimNumber}</TableCell>
                        <TableCell className="text-sm py-2">{claim.type}</TableCell>
                        <TableCell className="text-sm py-2">{claim.date.replace('Filed: ', '')}</TableCell>
                        <TableCell className="py-2">{getStatusBadge(claim.status)}</TableCell>
                        <TableCell className="text-sm font-semibold py-2">{claim.amount}</TableCell>
                        <TableCell className="py-2">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Eye size={12} />
                          </Button>
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
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp size={16} />
                Submissions
              </CardTitle>
              <p className="text-xs text-gray-500">Applications in progress</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8">Submission</TableHead>
                      <TableHead className="text-xs h-8">LOB</TableHead>
                      <TableHead className="text-xs h-8">
                        <div className="flex items-center gap-1">
                          Status
                          <ColumnFilter
                            options={submissionStatuses}
                            selectedValues={submissionStatusFilter}
                            onFilterChange={setSubmissionStatusFilter}
                          />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8">Progress</TableHead>
                      <TableHead className="text-xs h-8">End Date</TableHead>
                      <TableHead className="text-xs h-8">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission, index) => (
                      <TableRow key={index} className="h-10 hover:bg-blue-50">
                        <TableCell className="text-sm font-medium py-2">{submission.id}</TableCell>
                        <TableCell className="text-sm py-2">{submission.lob}</TableCell>
                        <TableCell className="py-2">{getStatusBadge(submission.status)}</TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2">
                            <Progress value={submission.progress} className="flex-1 h-1" />
                            <span className="text-xs font-medium w-8">{submission.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm py-2">{submission.endDate}</TableCell>
                        <TableCell className="py-2">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Eye size={12} />
                          </Button>
                        </TableCell>
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
