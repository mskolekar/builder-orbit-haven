import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ColumnFilter } from '@/components/ui/column-filter';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
  MoreHorizontal,
  ArrowUpDown
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
  { id: "A9876", lob: "PL", status: "In progress", startDate: "01-01-24", endDate: "12-31-24", progress: 75 },
  { id: "A9876", lob: "PL", status: "Bound", startDate: "01-01-24", endDate: "12-31-24", progress: 100 }
];

const initialDiariesData = [
  { id: 1, dueDate: "12-15-24", title: "Approval request approved.", priority: "Medium", status: "Open" },
  { id: 2, dueDate: "12-15-24", title: "Invoice Approval Request", priority: "Medium", status: "Open" },
  { id: 3, dueDate: "12-15-24", title: "Approval request approved.", priority: "Medium", status: "Open" },
  { id: 4, dueDate: "12-15-24", title: "Approval request declined.", priority: "Medium", status: "Open" },
  { id: 5, dueDate: "12-15-24", title: "Approval request declined.", priority: "Medium", status: "Open" },
  { id: 6, dueDate: "12-15-24", title: "Invoice Approval Request", priority: "Medium", status: "Open" },
  { id: 7, dueDate: "12-15-24", title: "Approval request approved.", priority: "Medium", status: "Open" },
  { id: 8, dueDate: "12-22-24", title: "Invoice Approval Request", priority: "Medium", status: "Open" },
  { id: 9, dueDate: "12-22-24", title: "Approval request approved.", priority: "Medium", status: "Open" }
];

const policyData = [
  { policy: "1-2213668", lob: "Excess E&O", coverage: "$1,000,000/$2,000,000", startDate: "01-01-22", endDate: "01-01-23", status: "Expired", premium: "$2,275", lastClaim: "Never", employerNumber: "A001904", premiumDue: "$125", premiumPaid: "$2,150" },
  { policy: "1-7433808", lob: "Primary E&O", coverage: "$1,000,000/$2,000,000", startDate: "01-01-23", endDate: "01-01-24", status: "Expired", premium: "$2,350", lastClaim: "Never", employerNumber: "A001904", premiumDue: "$175", premiumPaid: "$2,175" },
  { policy: "1-2731058", lob: "Excess E&O", coverage: "$1,000,000/$2,000,000", startDate: "06-01-25", endDate: "01-01-26", status: "Active", premium: "$1,890", lastClaim: "Never", employerNumber: "F_96954", premiumDue: "$189", premiumPaid: "$1,701" },
  { policy: "37676SLIT70", lob: "Primary E&O", coverage: "$1,000,000/$2,000,000", startDate: "06-01-25", endDate: "01-01-26", status: "Active", premium: "$1,975", lastClaim: "Never", employerNumber: "F_34810", premiumDue: "$0", premiumPaid: "$1,975" },
  { policy: "1-4755556", lob: "Excess E&O", coverage: "$1,000,000/$2,000,000", startDate: "06-01-25", endDate: "01-01-26", status: "Active", premium: "$1,825", lastClaim: "Never", employerNumber: "A001904", premiumDue: "$365", premiumPaid: "$1,460" },
  { policy: "1-8793492", lob: "Primary E&O", coverage: "$1,000,000/$2,000,000", startDate: "01-01-26", endDate: "01-01-27", status: "Active", premium: "$2,450", lastClaim: "Never", employerNumber: "09212024", premiumDue: "$245", premiumPaid: "$2,205" }
];

const claimsHistory = [
  { type: "Home Burglary", date: "02-28-23", status: "Reopen", amount: "$5,300", claimNumber: "C1045", incurred: "$7,300", reserves: "$2,000", paid: "$5,300", recoveries: "$500" },
  { type: "Auto Collision", date: "05-16-23", status: "Open", amount: "$0", claimNumber: "C1122", incurred: "$2,000", reserves: "$2,000", paid: "$0", recoveries: "$0" },
  { type: "Critical Illness", date: "12-15-23", status: "Open", amount: "$0", claimNumber: "C1189", incurred: "$0", reserves: "$0", paid: "$0", recoveries: "$0" }
];

const recentActivity = [
  {
    type: "Last Premium Paid - $150",
    date: "07-01-25",
    description: "Premium payment processed successfully.",
    user: "System",
    category: "payment"
  },
  {
    type: "Follow-up on recent claim #C1122 progress.",
    date: "06-30-25",
    description: "Provided update on claim status, awaiting adjuster report.",
    user: "UW John",
    category: "claim"
  },
  {
    type: "Confirmation of payment received premium.",
    date: "06-29-25",
    description: "Auto premium receipt sent to customer.",
    user: "System",
    category: "payment"
  },
  {
    type: "Logged customer preference for email communication.",
    date: "06-28-25",
    description: "Preferred contact method updated.",
    user: "Agent Johnson",
    category: "profile"
  }
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    'active': { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
    'bound': { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
    'in progress': { color: 'bg-slate-50 text-slate-700 border-slate-200', icon: Clock },
    'pending': { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertCircle },
    'expired': { color: 'bg-gray-50 text-gray-600 border-gray-200', icon: XCircle },
    'approved': { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
    'closed': { color: 'bg-gray-50 text-gray-600 border-gray-200', icon: XCircle },
    'scheduled': { color: 'bg-slate-50 text-slate-700 border-slate-200', icon: Calendar },
    'open': { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertCircle },
    'reopen': { color: 'bg-orange-50 text-orange-700 border-orange-200', icon: AlertTriangle },
  };

  const config = statusConfig[status.toLowerCase()] || { color: 'bg-gray-50 text-gray-600 border-gray-200', icon: AlertCircle };
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

const getRowBgColor = (status: string, type: 'policy' | 'claim' | 'submission') => {
  const normalizedStatus = status.toLowerCase();

  if (type === 'policy') {
    switch (normalizedStatus) {
      case 'active': return 'bg-emerald-25 hover:bg-emerald-50';
      case 'expired': return 'bg-gray-25 hover:bg-gray-50';
      case 'pending': return 'bg-amber-25 hover:bg-amber-50';
      default: return 'hover:bg-gray-50';
    }
  } else if (type === 'claim') {
    switch (normalizedStatus) {
      case 'open': return 'bg-amber-25 hover:bg-amber-50';
      case 'reopen': return 'bg-orange-25 hover:bg-orange-50';
      default: return 'hover:bg-gray-50';
    }
  } else if (type === 'submission') {
    switch (normalizedStatus) {
      case 'in progress': return 'bg-blue-25 hover:bg-blue-50';
      case 'bound': return 'bg-emerald-25 hover:bg-emerald-50';
      default: return 'hover:bg-gray-50';
    }
  }

  return 'hover:bg-gray-50';
};

export default function Dashboard() {
  const navigate = useNavigate();

  // Filter states
  const [policyStatusFilter, setPolicyStatusFilter] = useState<string[]>([]);
  const [policyLobFilter, setPolicyLobFilter] = useState<string[]>([]);
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState<string[]>([]);
  const [claimsStatusFilter, setClaimsStatusFilter] = useState<string[]>([]);

  // Diaries state
  const [diariesData, setDiariesData] = useState(initialDiariesData);
  const [diaryToClose, setDiaryToClose] = useState<number | null>(null);

  // Animation states
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Diary functions
  const handleCloseDiary = (diaryId: number) => {
    setDiaryToClose(diaryId);
  };

  const confirmCloseDiary = () => {
    if (diaryToClose) {
      setDiariesData(prev => prev.map(diary =>
        diary.id === diaryToClose
          ? { ...diary, status: 'Closed' }
          : diary
      ));
      setDiaryToClose(null);
    }
  };

  const cancelCloseDiary = () => {
    setDiaryToClose(null);
  };

  // Filter open diaries for display
  const openDiaries = diariesData.filter(diary => diary.status === 'Open');

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

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




        {/* Row 1: Financial Information - Horizontal Strip */}
        <div className={`transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <Card className="shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('Navigate to financial details')}>
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                <DollarSign size={16} className="text-slate-600" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative bg-green-50 border border-green-200 rounded-lg p-4 overflow-hidden">
                  <div className="text-xs text-green-600 mb-1 font-medium">Amount Paid</div>
                  <div className="text-xl font-bold text-green-800">$8,460</div>
                  <div className="text-xs text-green-500 mt-1">Aggregate premium paid to date</div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-400"></div>
                </div>
                <div className="relative bg-amber-50 border border-amber-200 rounded-lg p-4 overflow-hidden">
                  <div className="text-xs text-amber-600 mb-1 font-medium">Total Due</div>
                  <div className="text-xl font-bold text-amber-800">$275</div>
                  <div className="text-xs text-amber-500 mt-1">Aggregate premium currently due (YTD)</div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-400"></div>
                </div>
                <div className="relative bg-blue-50 border border-blue-200 rounded-lg p-4 overflow-hidden">
                  <div className="text-xs text-blue-600 mb-1 font-medium">Outstanding Balance</div>
                  <div className="text-xl font-bold text-blue-800">$190</div>
                  <div className="text-xs text-blue-500 mt-1">Outstanding premium (after credit application)</div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-400"></div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  size="sm"
                  className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
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
        </div>

        {/* Row 2: Activity Timeline, Diaries */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>

          {/* Activity Timeline */}
          <Card className="shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('Navigate to activity timeline')}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                  <Clock size={16} className="text-slate-600" />
                  Activity Timeline
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50 w-24">
                        <div className="flex items-center gap-1">
                          Date
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Activity
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Action Taken By
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivity.slice(0, 4).map((activity, index) => (
                      <TableRow key={index} className="h-10 hover:bg-gray-50">
                        <TableCell className="text-xs py-2 w-24 whitespace-nowrap">
                          {activity.date}
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
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Due Date
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Title
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Priority
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Actions
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openDiaries.map((diary) => (
                      <TableRow key={diary.id} className="h-8 hover:bg-gray-50 cursor-pointer">
                        <TableCell className="text-xs py-1">{diary.dueDate}</TableCell>
                        <TableCell className="text-xs py-1">{diary.title}</TableCell>
                        <TableCell className="py-1">
                          <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityBadgeColor(diary.priority)}`}>
                            {diary.priority}
                          </span>
                        </TableCell>
                        <TableCell className="py-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-12 p-0 text-xs text-gray-600 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCloseDiary(diary.id);
                            }}
                          >
                            Close
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {openDiaries.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-gray-500 text-sm">
                          No open diaries
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Row 2: Policy Details, Claims History, Submissions */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>

          {/* Policy Details */}
          <Card className="shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('Navigate to policy details')}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                  <Shield size={16} className="text-slate-600" />
                  Policies
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Policy Number
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Program/LOB
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Status
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Effective Date
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Expiration Date
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Premium Due
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Premium Paid
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPolicies.map((policy, index) => (
                      <TableRow key={index} className={`h-10 ${getRowBgColor(policy.status, 'policy')} cursor-pointer`} onClick={(e) => {
                        e.stopPropagation();
                        console.log('Open policy details', policy.policy);
                      }}>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-2">
                            {getPolicyIcon(policy.lob)}
                            <span className="text-sm font-medium text-gray-800">{policy.policy}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">{policy.lob}</TableCell>
                        <TableCell className="py-2">{getStatusBadge(policy.status)}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">{policy.startDate}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">{policy.endDate}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700 font-semibold">{policy.premiumDue}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700 font-semibold">{policy.premiumPaid}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Claims History */}
          <Card className="shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('Navigate to claims history')}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                  <AlertTriangle size={16} className="text-slate-600" />
                  Claims
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Claim Number
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Status
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50 w-24">
                        <div className="flex items-center gap-1">
                          Loss Date
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Incurred
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Reserves
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Paid
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Recoveries
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClaims.filter(claim => claim.status === 'Open' || claim.status === 'Reopen').map((claim, index) => (
                      <TableRow key={index} className={`h-10 ${getRowBgColor(claim.status, 'claim')} cursor-pointer`} onClick={(e) => {
                        e.stopPropagation();
                        console.log('Open claim details', claim.claimNumber);
                      }}>
                        <TableCell className="text-sm font-medium py-2 text-gray-800">{claim.claimNumber}</TableCell>
                        <TableCell className="py-2">{getStatusBadge(claim.status)}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700 w-24 whitespace-nowrap">{claim.date}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">{claim.incurred}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">{claim.reserves}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">{claim.paid}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">{claim.recoveries}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Submissions */}
          <Card className="shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" onClick={() => console.log('Navigate to submissions')}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2 text-gray-700">
                  <TrendingUp size={16} className="text-slate-600" />
                  Submissions
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Submission Number
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Product
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Status
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Effective Date
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center gap-1">
                          Expiration Date
                          <ArrowUpDown size={12} className="text-gray-400" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.filter(submission => submission.status === 'In progress').map((submission, index) => (
                      <TableRow key={index} className={`h-10 ${getRowBgColor(submission.status, 'submission')} cursor-pointer`} onClick={(e) => {
                        e.stopPropagation();
                        console.log('Open submission details', submission.id);
                      }}>
                        <TableCell className="text-sm font-medium py-2 text-gray-800">{submission.id}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">{submission.lob}</TableCell>
                        <TableCell className="py-2">{getStatusBadge(submission.status)}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">{submission.startDate}</TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">{submission.endDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Close Diary Confirmation Dialog */}
        <AlertDialog open={diaryToClose !== null} onOpenChange={cancelCloseDiary}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Close Diary</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to close this diary? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelCloseDiary}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmCloseDiary} className="bg-[#0054A6] hover:bg-[#003d7a]">
                Close Diary
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
