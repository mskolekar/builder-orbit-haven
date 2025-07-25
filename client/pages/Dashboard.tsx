import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Plus, FileText, AlertTriangle, Home, Car, Briefcase, Shield } from 'lucide-react';

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
      return <Badge className="bg-brand-green text-white">Active</Badge>;
    case 'bound':
      return <Badge className="bg-brand-blue text-white">Bound</Badge>;
    case 'in progress':
      return <Badge className="bg-brand-orange text-white">In progress</Badge>;
    case 'pending':
      return <Badge className="bg-gray-500 text-white">Pending</Badge>;
    case 'expired':
      return <Badge className="bg-brand-red text-white">Expired</Badge>;
    case 'approved':
      return <Badge className="bg-brand-green text-white">Approved</Badge>;
    case 'closed':
      return <Badge className="bg-gray-600 text-white">Closed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPolicyIcon = (lob: string) => {
  switch (lob.toLowerCase()) {
    case 'auto':
      return <Car size={16} className="text-brand-blue" />;
    case 'home':
      return <Home size={16} className="text-brand-green" />;
    case 'life':
    case 'critical illness':
    case 'disability':
      return <Shield size={16} className="text-brand-purple" />;
    case 'business':
      return <Briefcase size={16} className="text-brand-orange" />;
    default:
      return <FileText size={16} className="text-gray-500" />;
  }
};

export default function Dashboard() {
  return (
    <div className="flex-1 bg-light-gray/30 p-4 lg:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Customer Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Left Column - Customer Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-brand-purple to-brand-blue rounded-full flex items-center justify-center text-white text-2xl font-semibold mb-3">
                  RK
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{customerData.name}</h2>
                  <p className="text-medium-gray">{customerData.role}</p>
                  <Badge className="bg-brand-green text-white">{customerData.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-medium-gray">Date of Birth</span>
                    <p>{customerData.dateOfBirth}</p>
                  </div>
                  <div>
                    <span className="text-medium-gray">Gender</span>
                    <p>{customerData.gender}</p>
                  </div>
                  <div>
                    <span className="text-medium-gray">LSC#</span>
                    <p>{customerData.lsc}</p>
                  </div>
                  <div>
                    <span className="text-medium-gray">Phone</span>
                    <p>{customerData.phone}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-medium-gray">Email</span>
                  <p>{customerData.email}</p>
                </div>
                <div className="text-sm">
                  <span className="text-medium-gray">Address</span>
                  <p>{customerData.address}</p>
                </div>
                
                {/* Last Premium Paid */}
                <div className="mt-6 p-4 bg-light-gray rounded-lg">
                  <div className="text-sm">
                    <span className="text-medium-gray">Last Premium Paid</span>
                    <p className="text-lg font-semibold">$150</p>
                    <p className="text-medium-gray">July 1, 2025</p>
                  </div>
                  <div className="mt-3">
                    <span className="text-medium-gray">Upcoming Premium</span>
                    <p className="text-lg font-semibold">$150</p>
                    <p className="text-medium-gray">Aug 1, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Reminders and Submissions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Reminders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Upcoming Reminders</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus size={16} className="mr-2" />
                  Add Reminder
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-medium-gray text-sm mb-4">Critical upcoming events and tasks.</p>
                <div className="space-y-3">
                  {upcomingReminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                        <div>
                          <p className="font-medium">{reminder.type}</p>
                          <p className="text-sm text-medium-gray">{reminder.dueDate}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye size={16} className="mr-2" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submissions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Submissions</CardTitle>
                <p className="text-medium-gray text-sm">In progress</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Submission No.</TableHead>
                      <TableHead>LOB</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission, index) => (
                      <TableRow key={index}>
                        <TableCell>{submission.id}</TableCell>
                        <TableCell>{submission.lob}</TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>{submission.startDate}</TableCell>
                        <TableCell>{submission.endDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Policy Details and Claims History */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Policy Details */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Policy Details</CardTitle>
                    <p className="text-medium-gray text-sm">Overview of all active and inactive policies.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">$9,500 / $12,500</p>
                    <p className="text-sm text-medium-gray">Paid vs YTD Premium</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Policy</TableHead>
                      <TableHead>LOB</TableHead>
                      <TableHead>Coverage</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Premium</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {policyData.map((policy, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getPolicyIcon(policy.lob)}
                            {policy.policy}
                          </div>
                        </TableCell>
                        <TableCell>{policy.lob}</TableCell>
                        <TableCell>{policy.coverage}</TableCell>
                        <TableCell>{policy.startDate}</TableCell>
                        <TableCell>{policy.endDate}</TableCell>
                        <TableCell>{getStatusBadge(policy.status)}</TableCell>
                        <TableCell>{policy.premium}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Claims History */}
          <div className="xl:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Claims History</CardTitle>
                <p className="text-medium-gray text-sm">Recent claims submitted by the customer.</p>
                <div className="mt-4">
                  <p className="text-2xl font-bold">$6,500 / $10,000</p>
                  <p className="text-sm text-medium-gray">Paid Claims vs Reserve</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {claimsHistory.map((claim, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={16} className="text-brand-blue" />
                      <span className="font-medium">{claim.type}</span>
                    </div>
                    <p className="text-sm text-medium-gray">{claim.date}</p>
                    <div className="flex justify-between items-center mt-2">
                      {getStatusBadge(claim.status)}
                      <span className="font-semibold">{claim.amount}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity and Risk Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity & Interactions</CardTitle>
              <p className="text-medium-gray text-sm">Recent notes, calls, emails, and more.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <FileText size={16} className="text-brand-blue mt-1" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-sm text-medium-gray mt-1">{activity.date}</p>
                      <p className="text-sm text-medium-gray mt-1">{activity.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risk Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risk Alerts & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-medium-gray">
                <AlertTriangle size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No current risk alerts or compliance issues.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
