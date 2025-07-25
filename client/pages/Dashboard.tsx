import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ColumnFilter } from '@/components/ui/column-filter';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Plus, FileText, AlertTriangle, Home, Car, Briefcase, Shield, Edit3, ExternalLink, Calendar, DollarSign } from 'lucide-react';

const customerData = {
  name: "Rose K",
  role: "Lawyer",
  status: "Active",
  dateOfBirth: "••••••••",
  gender: "Female",
  lsc: "000000",
  phone: "(416) 555-0123",
  email: "rose.greenthumb@example.com",
  address: "1508 - 141 Lyon Court, Toronto, ON M5B 3H2"
};

const upcomingReminders = [
  {
    id: 1,
    type: "Policy Renewal Review - Auto",
    dueDate: "Due in 45 days",
    status: "pending"
  },
  {
    id: 2,
    type: "Follow up on Claim #C1122",
    dueDate: "Due in about 1 week",
    status: "pending"
  }
];

const submissions = [
  { id: "A9876", lob: "PL", status: "In progress", startDate: "01/01/2024", endDate: "12/31/2024" },
  { id: "A9876", lob: "PL", status: "Bound", startDate: "01/01/2024", endDate: "12/31/2024" }
];

const policyData = [
  { policy: "A9876", lob: "Auto", coverage: "Full Coverage", startDate: "01/01/2024", endDate: "12/31/2024", status: "Active", premium: "$1,200" },
  { policy: "H2345", lob: "Home", coverage: "All Perils", startDate: "03/15/2023", endDate: "03/14/2025", status: "Active", premium: "$850" },
  { policy: "L7890", lob: "Life", coverage: "$500,000", startDate: "06/01/2022", endDate: "05/31/2032", status: "Active", premium: "$340" },
  { policy: "C1234", lob: "Critical Illness", coverage: "$100,000", startDate: "09/01/2023", endDate: "08/31/2028", status: "Active", premium: "$75" },
  { policy: "D5678", lob: "Disability", coverage: "$3,000/mo", startDate: "04/01/2022", endDate: "03/31/2027", status: "Active", premium: "$50" },
  { policy: "RV3333", lob: "RV", coverage: "Liability", startDate: "07/01/2021", endDate: "06/30/2023", status: "Expired", premium: "$45" },
  { policy: "B9999", lob: "Business", coverage: "General Liability", startDate: "10/01/2023", endDate: "09/30/2024", status: "Pending", premium: "$1,250" }
];

const claimsHistory = [
  { type: "Auto Collision", date: "Filed: May 16, 2023", status: "Pending", amount: "N/A" },
  { type: "Home Burglary", date: "Filed: Feb 28, 2023", status: "Approved", amount: "$5,300" },
  { type: "Critical Illness", date: "Filed: Dec 15, 2023", status: "Closed", amount: "$0" }
];

const recentActivity = [
  {
    type: "Follow-up on recent claim #C1122 progress.",
    date: "Date: Jul 26, 2023",
    description: "Provided update on claim status, awaiting adjuster report."
  },
  {
    type: "Confirmation of payment received premium.",
    date: "Date: May 08, 2023",
    description: "Auto premium receipt sent to customer."
  },
  {
    type: "Logged customer preference for email communication.",
    date: "Date: Feb 17, 2023",
    description: "Preferred contact method updated."
  }
];

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return <Badge className="bg-brand-green text-white text-xs">Active</Badge>;
    case 'bound':
      return <Badge className="bg-brand-blue text-white text-xs">Bound</Badge>;
    case 'in progress':
      return <Badge className="bg-brand-orange text-white text-xs">In progress</Badge>;
    case 'pending':
      return <Badge className="bg-gray-500 text-white text-xs">Pending</Badge>;
    case 'expired':
      return <Badge className="bg-brand-red text-white text-xs">Expired</Badge>;
    case 'approved':
      return <Badge className="bg-brand-green text-white text-xs">Approved</Badge>;
    case 'closed':
      return <Badge className="bg-gray-600 text-white text-xs">Closed</Badge>;
    default:
      return <Badge variant="secondary" className="text-xs">{status}</Badge>;
  }
};

const getPolicyIcon = (lob: string) => {
  switch (lob.toLowerCase()) {
    case 'auto':
      return <Car size={14} className="text-brand-blue" />;
    case 'home':
      return <Home size={14} className="text-brand-green" />;
    case 'life':
    case 'critical illness':
    case 'disability':
      return <Shield size={14} className="text-brand-purple" />;
    case 'business':
      return <Briefcase size={14} className="text-brand-orange" />;
    default:
      return <FileText size={14} className="text-gray-500" />;
  }
};

export default function Dashboard() {
  // Filter states
  const [policyStatusFilter, setPolicyStatusFilter] = useState<string[]>([]);
  const [policyLobFilter, setPolicyLobFilter] = useState<string[]>([]);
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState<string[]>([]);
  const [claimsStatusFilter, setClaimsStatusFilter] = useState<string[]>([]);

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
    <div className="flex-1 bg-gray-50 p-3 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-3">
        
        {/* Row 1: Personal Profile Section - Horizontal */}
        <Card className="relative shadow-sm">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2 p-1.5 h-auto"
          >
            <Edit3 size={14} />
          </Button>
          <CardContent className="p-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-purple to-brand-blue rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  RK
                </div>
                <div>
                  <h2 className="text-base font-semibold">{customerData.name}</h2>
                  <p className="text-xs text-medium-gray">{customerData.role}</p>
                  <Badge className="bg-brand-green text-white text-xs mt-1">{customerData.status}</Badge>
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
                <div>
                  <span className="text-medium-gray">DOB</span>
                  <p className="text-sm">{customerData.dateOfBirth}</p>
                </div>
                <div>
                  <span className="text-medium-gray">Gender</span>
                  <p className="text-sm">{customerData.gender}</p>
                </div>
                <div>
                  <span className="text-medium-gray">LSC#</span>
                  <p className="text-sm">{customerData.lsc}</p>
                </div>
                <div>
                  <span className="text-medium-gray">Phone</span>
                  <p className="text-sm">{customerData.phone}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-medium-gray">Email</span>
                  <p className="text-sm">{customerData.email}</p>
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs">
              <span className="text-medium-gray">Address</span>
              <p className="text-sm">{customerData.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Row 2: Premium Tiles and Upcoming Reminders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="grid grid-cols-2 gap-2">
            <Card 
              className="bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 border-brand-blue/20 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => console.log('Navigate to payment history')}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={14} className="text-brand-blue" />
                  <div className="text-xs text-medium-gray">Last Premium</div>
                  <ExternalLink size={10} className="text-brand-blue ml-auto" />
                </div>
                <div className="text-lg font-bold text-brand-blue">$150</div>
                <div className="text-xs text-medium-gray">July 1, 2025</div>
              </CardContent>
            </Card>
            <Card 
              className="bg-gradient-to-r from-brand-orange/10 to-brand-orange/5 border-brand-orange/20 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => console.log('Navigate to upcoming payments')}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={14} className="text-brand-orange" />
                  <div className="text-xs text-medium-gray">Next Premium</div>
                  <ExternalLink size={10} className="text-brand-orange ml-auto" />
                </div>
                <div className="text-lg font-bold text-brand-orange">$150</div>
                <div className="text-xs text-medium-gray">Aug 1, 2025</div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Upcoming Reminders</CardTitle>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Plus size={12} className="mr-1" />
                  Add
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-medium-gray text-xs mb-2">Critical upcoming events and tasks.</p>
                <div className="space-y-2">
                  {upcomingReminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand-blue rounded-full"></div>
                        <div>
                          <p className="text-xs font-medium">{reminder.type}</p>
                          <p className="text-xs text-medium-gray">{reminder.dueDate}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-6 text-xs px-2">
                        <Eye size={10} className="mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Row 3: Submissions and Policy Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Submissions */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Submissions</CardTitle>
              <p className="text-medium-gray text-xs">In progress</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs h-8">Submission No.</TableHead>
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
                      <TableHead className="text-xs h-8">Start Date</TableHead>
                      <TableHead className="text-xs h-8">End Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission, index) => (
                      <TableRow key={index} className="h-10">
                        <TableCell className="text-xs">{submission.id}</TableCell>
                        <TableCell className="text-xs">{submission.lob}</TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell className="text-xs">{submission.startDate}</TableCell>
                        <TableCell className="text-xs">{submission.endDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Policy Details */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-sm">Policy Details</CardTitle>
                  <p className="text-medium-gray text-xs">Overview of policies.</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">$9.5K / $12.5K</p>
                  <p className="text-xs text-medium-gray">Paid vs YTD</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto max-h-44 overflow-y-auto">
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
                      <TableRow key={index} className="h-10">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getPolicyIcon(policy.lob)}
                            <span className="text-xs">{policy.policy}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">{policy.lob}</TableCell>
                        <TableCell>{getStatusBadge(policy.status)}</TableCell>
                        <TableCell className="text-xs font-medium">{policy.premium}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 4: Claims History and Risk Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Claims History */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm">Claims History</CardTitle>
                  <ColumnFilter
                    options={claimsStatuses}
                    selectedValues={claimsStatusFilter}
                    onFilterChange={setClaimsStatusFilter}
                  />
                </div>
                <p className="text-medium-gray text-xs">Recent claims submitted.</p>
                <div className="mt-1">
                  <p className="text-sm font-bold">$6.5K / $10K</p>
                  <p className="text-xs text-medium-gray">Paid vs Reserve</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {filteredClaims.map((claim, index) => (
                <div key={index} className="p-2 border rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={12} className="text-brand-blue" />
                    <span className="text-xs font-medium">{claim.type}</span>
                  </div>
                  <p className="text-xs text-medium-gray">{claim.date}</p>
                  <div className="flex justify-between items-center mt-1">
                    {getStatusBadge(claim.status)}
                    <span className="text-xs font-semibold">{claim.amount}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risk Alerts & Compliance */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Risk Alerts & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4 text-medium-gray">
                <AlertTriangle size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-xs">No current risk alerts or compliance issues.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 5: Recent Activity */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Recent Activity & Interactions</CardTitle>
            <p className="text-medium-gray text-xs">Recent notes, calls, emails, and more.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-2 border rounded">
                  <div className="flex items-start gap-2">
                    <FileText size={12} className="text-brand-blue mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">{activity.type}</p>
                      <p className="text-xs text-medium-gray mt-1">{activity.date}</p>
                      <p className="text-xs text-medium-gray mt-1">{activity.description}</p>
                      <Button variant="outline" size="sm" className="h-6 text-xs mt-1 px-2">
                        View
                      </Button>
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
