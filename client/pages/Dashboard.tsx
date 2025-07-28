import { useState, useEffect } from 'react';
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
    case 'high': return 'bg-blue-600';
    case 'medium': return 'bg-blue-400';
    case 'low': return 'bg-blue-200';
    default: return 'bg-gray-400';
  }
};

export default function Dashboard() {
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
    <div className="flex-1 bg-white p-3 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Enhanced Personal Profile Section */}
        <Card className={`relative shadow-sm border transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2 p-1 h-6 w-6"
          >
            <Edit3 size={12} />
          </Button>
          <CardContent className="p-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg">
                    RK
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle size={12} className="text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900">{customerData.name}</h2>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      <CheckCircle size={10} className="mr-1" />
                      {customerData.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 font-medium">{customerData.role}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={12} />
                      Customer since {customerData.memberSince}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <div>
                    <span className="text-xs text-gray-500">DOB</span>
                    <p className="text-sm font-medium">{customerData.dateOfBirth}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-gray-400" />
                  <div>
                    <span className="text-xs text-gray-500">Gender</span>
                    <p className="text-sm font-medium">{customerData.gender}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-gray-400" />
                  <div>
                    <span className="text-xs text-gray-500">LSC#</span>
                    <p className="text-sm font-medium">{customerData.lsc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-400" />
                  <div className="min-w-0">
                    <span className="text-xs text-gray-500">Phone</span>
                    <p className="text-sm font-medium whitespace-nowrap">{customerData.phone}</p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Mail size={14} className="text-gray-400" />
                  <div>
                    <span className="text-xs text-gray-500">Email</span>
                    <p className="text-sm font-medium">{customerData.email}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex items-center gap-2 text-sm">
              <MapPin size={14} className="text-gray-400" />
              <span className="text-gray-500">Address:</span>
              <span className="font-medium">{customerData.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Premium Tiles and Reminders */}
        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-3 transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <Card
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            onClick={() => console.log('Navigate to payment history')}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <DollarSign size={14} className="group-hover:scale-110 transition-transform" />
                <ExternalLink size={10} className="opacity-70" />
              </div>
              <div className="text-xs font-medium opacity-90">Last Premium</div>
              <div className="text-lg font-bold">$150</div>
              <div className="text-xs opacity-75">July 1, 2025</div>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-br from-blue-400 to-blue-500 text-white cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            onClick={() => console.log('Navigate to upcoming payments')}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <Calendar size={14} className="group-hover:scale-110 transition-transform" />
                <ExternalLink size={10} className="opacity-70" />
              </div>
              <div className="text-xs font-medium opacity-90">Next Premium</div>
              <div className="text-lg font-bold">$150</div>
              <div className="text-xs opacity-75">Aug 1, 2025</div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock size={16} />
                    Upcoming Reminders
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">Critical upcoming events and tasks</p>
                </div>
                <Button variant="outline" size="sm" className="h-7">
                  <Plus size={10} className="mr-1" />
                  Add
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {upcomingReminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-6 rounded-full ${getPriorityColor(reminder.priority)}`}></div>
                        <div>
                          <p className="text-sm font-medium">{reminder.type}</p>
                          <p className="text-xs text-gray-500">{reminder.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(reminder.status)}
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Eye size={12} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submissions and Policy Details */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {/* Submissions */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission, index) => (
                      <TableRow key={index} className="h-12 hover:bg-blue-50">
                        <TableCell className="text-sm font-medium">{submission.id}</TableCell>
                        <TableCell className="text-sm">{submission.lob}</TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={submission.progress} className="flex-1 h-2" />
                            <span className="text-xs font-medium w-10">{submission.progress}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Policy Details */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield size={16} />
                    Policy Details
                  </CardTitle>
                  <p className="text-xs text-gray-500 mt-1">Active policy portfolio</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">$9.5K</p>
                  <p className="text-xs text-gray-500">of $12.5K YTD</p>
                  <Progress value={76} className="w-20 h-1 mt-1" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto max-h-48 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8">Policy</TableHead>
                      <TableHead className="text-xs h-8">
                        <div className="flex items-center gap-1">
                          LOB
                          <ColumnFilter
                            options={policyLobs}
                            selectedValues={policyLobFilter}
                            onFilterChange={setPolicyLobFilter}
                          />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8">
                        <div className="flex items-center gap-1">
                          Status
                          <ColumnFilter
                            options={policyStatuses}
                            selectedValues={policyStatusFilter}
                            onFilterChange={setPolicyStatusFilter}
                          />
                        </div>
                      </TableHead>
                      <TableHead className="text-xs h-8">Premium</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPolicies.map((policy, index) => (
                      <TableRow key={index} className="h-10 hover:bg-blue-50 group">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getPolicyIcon(policy.lob)}
                            <span className="text-sm">{policy.policy}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{policy.lob}</TableCell>
                        <TableCell>{getStatusBadge(policy.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{policy.premium}</span>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal size={12} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Claims and Risk Section */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {/* Claims History */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText size={16} />
                      Claims History
                      <ColumnFilter
                        options={claimsStatuses}
                        selectedValues={claimsStatusFilter}
                        onFilterChange={setClaimsStatusFilter}
                      />
                    </CardTitle>
                    <p className="text-xs text-gray-500 mt-1">Recent claims and settlements</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">$6.5K / $10K</p>
                    <p className="text-xs text-gray-500">Paid vs Reserve</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredClaims.map((claim, index) => (
                  <div key={index} className="p-3 bg-blue-50 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText size={14} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{claim.type}</span>
                            <span className="text-xs text-gray-500">#{claim.claimNumber}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{claim.date}</p>
                          <div className="flex items-center gap-3 mt-2">
                            {getStatusBadge(claim.status)}
                            <span className="text-sm font-semibold text-blue-600">{claim.amount}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-8">
                        <Eye size={12} className="mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Risk & Compliance */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield size={16} />
                Risk & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={24} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-medium">All Clear</p>
                  <p className="text-xs text-gray-500">No active risk alerts</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-xs">Compliance Score</span>
                    <span className="text-sm font-bold text-blue-600">98%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-xs">Last Audit</span>
                    <span className="text-sm font-medium">2024-01-15</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-xs">Next Review</span>
                    <span className="text-sm font-medium">2024-07-15</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className={`shadow-sm transition-all duration-1000 delay-600 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity size={16} />
              Recent Activity & Interactions
            </CardTitle>
            <p className="text-xs text-gray-500">Latest system activities and customer interactions</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-3 bg-blue-50 border rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {activity.category === 'claim' ? 
                        <AlertTriangle size={14} className="text-blue-600" /> :
                        activity.category === 'payment' ?
                        <DollarSign size={14} className="text-blue-600" /> :
                        <User size={14} className="text-blue-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.type}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">by {activity.user}</span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs px-2 hover:bg-blue-100">
                          <Eye size={10} className="mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
