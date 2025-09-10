import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnFilter } from "@/components/ui/column-filter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";

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
  satisfactionScore: 4.8,
};

const upcomingReminders = [
  {
    id: 1,
    type: "Policy Renewal Review - Auto",
    dueDate: "Due in 45 days",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    type: "Follow up on Claim #C1122",
    dueDate: "Due in about 1 week",
    status: "pending",
    priority: "medium",
  },
  {
    id: 3,
    type: "Annual Review Meeting",
    dueDate: "Due in 2 weeks",
    status: "scheduled",
    priority: "low",
  },
];

const submissions = [
  {
    id: "1-928763A-0134",
    program: "Primary E&O",
    proposedEffectiveDate: "01-01-26",
    status: "In Progress",
    submissionType: "New",
  },
  {
    id: "1-178221LT97-9914",
    program: "MDP E&O",
    proposedEffectiveDate: "01-01-26",
    status: "In Progress",
    submissionType: "Renewal",
  },
];

const formatToMMDDYY = (input: string) => {
  // Convert common date formats to MM-DD-YY; otherwise return as-is
  // YYYY-MM-DD -> MM-DD-YY
  const isoMatch = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, y, m, d] = isoMatch;
    return `${m}-${d}-${y.slice(2)}`;
  }
  // MM-DD-YYYY -> MM-DD-YY
  const usMatch = input.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (usMatch) {
    const [, m, d, y] = usMatch;
    return `${m}-${d}-${y.slice(2)}`;
  }
  return input;
};

const getTodayMMDDYY = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  return `${mm}-${dd}-${yy}`;
};

const activitiesByProfile: Record<
  string,
  { date: string; type: string; file: string; user: string }[]
> = {
  olivia: [
    {
      date: "09-07-25",
      type: "Recurring payment profile set with Credit_Card",
      file: "P 1-4755556",
      user: "Shelton K",
    },
    {
      date: "09-01-25",
      type: "Recurring payment received $150",
      file: "P 1-7433808",
      user: "System",
    },
    {
      date: "08-20-25",
      type: "Indemnity reserve decreased by $1,000",
      file: "C 1045",
      user: "Anna R",
    },
    {
      date: "07-31-25",
      type: "Proposal quote shared with broker",
      file: "S 928703A",
      user: "Shelton K",
    },
  ],
  "john-wills": [
    {
      date: "09-07-25",
      type: "Proposal quote shared with broker",
      file: "P 1-4712556",
      user: "John W",
    },
    {
      date: "09-01-25",
      type: "Requested documents",
      file: "P 1-8793492",
      user: "John W",
    },
    {
      date: "08-20-25",
      type: "Requested documents for UW review",
      file: "S 928763A-01",
      user: "John W",
    },
    {
      date: "07-31-25",
      type: "Logged customer preference for email communication",
      file: "N/A",
      user: "John W",
    },
  ],
  "shawn-elkins": [
    {
      date: "09-08-25",
      type: "Claim payment issued $2,500",
      file: "C 2025-45",
      user: "System",
    },
    {
      date: "09-03-25",
      type: "Medical reserve increased by $10,000",
      file: "C 2025-45",
      user: "Anna R",
    },
    {
      date: "08-29-25",
      type: "Indemnity reserve decreased by $3,000",
      file: "C 2025-45",
      user: "Anna R",
    },
    {
      date: "08-20-25",
      type: "FNOL submitted",
      file: "I 789432",
      user: "Josh K",
    },
  ],
  "abc-ltd": [
    {
      date: "09-09-25",
      type: "Proposal quote shared with broker",
      file: "P 1-9834521",
      user: "John W",
    },
    {
      date: "09-04-25",
      type: "Claim payment issued $12,000",
      file: "C 1045",
      user: "System",
    },
    {
      date: "08-30-25",
      type: "Reserve increased by $25,000",
      file: "C 1122",
      user: "Anna R",
    },
    {
      date: "08-15-25",
      type: "Added an endorsement",
      file: "P 1-9834521",
      user: "John W",
    },
  ],
  "josh-fernandes": [
    {
      date: getTodayMMDDYY(),
      type: "New Profile Added",
      file: "-",
      user: "System",
    },
  ],
};

const diariesByProfile: Record<
  string,
  {
    id: number;
    dueDate: string;
    title: string;
    priority: "High" | "Medium" | "Low";
    status: "Open" | "Closed";
    file: string;
  }[]
> = {
  olivia: [
    {
      id: 1,
      dueDate: "09-10-25",
      title: "New Submission Added for Review",
      priority: "High",
      status: "Open",
      file: "S 928703A",
    },
    {
      id: 2,
      dueDate: "09-11-25",
      title: "Report Review Request",
      priority: "Medium",
      status: "Open",
      file: "P 1-475556",
    },
    {
      id: 3,
      dueDate: "09-12-25",
      title: "Invoice Approval Request",
      priority: "Medium",
      status: "Open",
      file: "P 1-7433808",
    },
    {
      id: 4,
      dueDate: "09-13-25",
      title: "Approval Request Declined",
      priority: "High",
      status: "Open",
      file: "C 1045",
    },
    {
      id: 5,
      dueDate: "09-14-25",
      title: "Follow-Up Required on Submission",
      priority: "Medium",
      status: "Open",
      file: "S 928703B",
    },
  ],
  "john-wills": [
    {
      id: 1,
      dueDate: "09-10-25",
      title: "Proposal Review Request",
      priority: "High",
      status: "Open",
      file: "P 1-4712556",
    },
    {
      id: 2,
      dueDate: "09-11-25",
      title: "Added Endorsement",
      priority: "Medium",
      status: "Open",
      file: "P 1-8793492",
    },
    {
      id: 3,
      dueDate: "09-12-25",
      title: "Requested Documents for Review",
      priority: "High",
      status: "Open",
      file: "S 928763A-01",
    },
    {
      id: 4,
      dueDate: "09-13-25",
      title: "Approval Request Approved",
      priority: "Low",
      status: "Open",
      file: "P 1-4712557",
    },
    {
      id: 5,
      dueDate: "09-14-25",
      title: "Follow-Up Required on Submission",
      priority: "Medium",
      status: "Open",
      file: "S 928763B",
    },
  ],
  "shawn-elkins": [
    {
      id: 1,
      dueDate: "09-10-25",
      title: "Requested Documents for Review",
      priority: "High",
      status: "Open",
      file: "C 2025-45",
    },
    {
      id: 2,
      dueDate: "09-11-25",
      title: "Follow-Up Required on Claim",
      priority: "Medium",
      status: "Open",
      file: "C 2025-46",
    },
    {
      id: 3,
      dueDate: "09-12-25",
      title: "Approval Request Declined",
      priority: "High",
      status: "Open",
      file: "C 2025-47",
    },
    {
      id: 4,
      dueDate: "09-13-25",
      title: "Approval Request Approved",
      priority: "Low",
      status: "Open",
      file: "I 789432",
    },
    {
      id: 5,
      dueDate: "09-14-25",
      title: "Follow-Up Required on Claim",
      priority: "Medium",
      status: "Open",
      file: "C 2025-48",
    },
  ],
  "abc-ltd": [
    {
      id: 1,
      dueDate: "09-10-25",
      title: "New Submission Added for Review",
      priority: "High",
      status: "Open",
      file: "S 928800A",
    },
    {
      id: 2,
      dueDate: "09-11-25",
      title: "Report Review Request",
      priority: "Medium",
      status: "Open",
      file: "P 1-9834521",
    },
    {
      id: 3,
      dueDate: "09-12-25",
      title: "Invoice Approval Request",
      priority: "Medium",
      status: "Open",
      file: "C 1122",
    },
    {
      id: 4,
      dueDate: "09-13-25",
      title: "Approval Request Pending",
      priority: "High",
      status: "Open",
      file: "C 1045",
    },
    {
      id: 5,
      dueDate: "09-14-25",
      title: "Invoice Approved",
      priority: "Low",
      status: "Open",
      file: "P 1-9834522",
    },
  ],
  "josh-fernandes": [],
};

const policyData = [
  {
    policy: "1-8793492",
    lob: "Primary E&O",
    coverage: "$1,000,000/$2,000,000",
    startDate: "01-01-26",
    endDate: "01-01-27",
    status: "Active",
    premium: "$2,450",
    lastClaim: "Never",
    employerNumber: "09212024",
    premiumDue: "$245",
    premiumPaid: "$2,205",
  },
  {
    policy: "1-2731058",
    lob: "Excess E&O",
    coverage: "$1,000,000/$2,000,000",
    startDate: "06-01-25",
    endDate: "01-01-26",
    status: "Active",
    premium: "$1,890",
    lastClaim: "Never",
    employerNumber: "F_96954",
    premiumDue: "$189",
    premiumPaid: "$1,701",
  },
  {
    policy: "37676SLIT70",
    lob: "Primary E&O",
    coverage: "$1,000,000/$2,000,000",
    startDate: "06-01-25",
    endDate: "01-01-26",
    status: "Active",
    premium: "$1,975",
    lastClaim: "Never",
    employerNumber: "F_34810",
    premiumDue: "$0",
    premiumPaid: "$1,975",
  },
  {
    policy: "1-4755556",
    lob: "Excess E&O",
    coverage: "$1,000,000/$2,000,000",
    startDate: "06-01-25",
    endDate: "01-01-26",
    status: "Active",
    premium: "$1,825",
    lastClaim: "Never",
    employerNumber: "A001904",
    premiumDue: "$365",
    premiumPaid: "$1,460",
  },
  {
    policy: "1-2213668",
    lob: "Excess E&O",
    coverage: "$1,000,000/$2,000,000",
    startDate: "01-01-22",
    endDate: "01-01-23",
    status: "Expired",
    premium: "$2,275",
    lastClaim: "Never",
    employerNumber: "A001904",
    premiumDue: "$125",
    premiumPaid: "$2,150",
  },
  {
    policy: "1-7433808",
    lob: "Primary E&O",
    coverage: "$1,000,000/$2,000,000",
    startDate: "01-01-23",
    endDate: "01-01-24",
    status: "Expired",
    premium: "$2,350",
    lastClaim: "Never",
    employerNumber: "A001904",
    premiumDue: "$175",
    premiumPaid: "$2,175",
  },
];

const claimsHistory = [
  {
    type: "Home Burglary",
    date: "02-28-23",
    status: "Reopen",
    amount: "$5,300",
    claimNumber: "C1045",
    incurred: "$7,300",
    reserves: "$2,000",
    paid: "$5,300",
    recoveries: "$500",
  },
  {
    type: "Auto Collision",
    date: "05-16-23",
    status: "Open",
    amount: "$0",
    claimNumber: "C1122",
    incurred: "$2,000",
    reserves: "$2,000",
    paid: "$0",
    recoveries: "$0",
  },
  {
    type: "Critical Illness",
    date: "12-15-23",
    status: "Open",
    amount: "$0",
    claimNumber: "C1189",
    incurred: "$0",
    reserves: "$0",
    paid: "$0",
    recoveries: "$0",
  },
];

// Activities moved to activitiesByProfile above

const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: "bg-gray-50 text-gray-700 border-gray-200",
    bound: "bg-gray-50 text-gray-700 border-gray-200",
    "in progress": "bg-gray-50 text-gray-700 border-gray-200",
    pending: "bg-gray-100 text-gray-700 border-gray-200",
    expired: "bg-gray-50 text-gray-600 border-gray-200",
    approved: "bg-gray-50 text-gray-700 border-gray-200",
    closed: "bg-gray-50 text-gray-600 border-gray-200",
    scheduled: "bg-gray-50 text-gray-700 border-gray-200",
    open: "bg-gray-100 text-gray-700 border-gray-200",
    reopen: "bg-gray-100 text-gray-700 border-gray-200",
  };

  const color =
    statusConfig[status.toLowerCase()] ||
    "bg-gray-50 text-gray-600 border-gray-200";

  return <Badge className={`${color} border text-xs`}>{status}</Badge>;
};

const getPolicyIcon = (lob: string) => {
  switch (lob.toLowerCase()) {
    case "auto":
      return <Car size={14} className="text-blue-600" />;
    case "home":
      return <Home size={14} className="text-blue-600" />;
    case "life":
    case "critical illness":
    case "disability":
      return <Shield size={14} className="text-blue-600" />;
    case "business":
      return <Briefcase size={14} className="text-blue-600" />;
    default:
      return <FileText size={14} className="text-blue-600" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-gray-400";
    case "medium":
      return "bg-gray-400";
    case "low":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const getRowBgColor = (
  status: string,
  type: "policy" | "claim" | "submission",
) => {
  return "hover:bg-gray-50";
};

export default function Dashboard() {
  const navigate = useNavigate();

  // Filter states
  const [policyStatusFilter, setPolicyStatusFilter] = useState<string[]>([]);
  const [policyLobFilter, setPolicyLobFilter] = useState<string[]>([]);
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState<
    string[]
  >([]);
  const [claimsStatusFilter, setClaimsStatusFilter] = useState<string[]>([]);

  // Diaries state
  const [diariesData, setDiariesData] = useState(diariesByProfile["olivia"]);
  const [diaryToClose, setDiaryToClose] = useState<number | null>(null);

  // Animation states
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Collapsible states
  const [isFinancialCollapsed, setIsFinancialCollapsed] = useState(false);
  const [isActivityCollapsed, setIsActivityCollapsed] = useState(false);
  const [isDiariesCollapsed, setIsDiariesCollapsed] = useState(false);
  const [isPoliciesCollapsed, setIsPoliciesCollapsed] = useState(false);
  const [isClaimsCollapsed, setIsClaimsCollapsed] = useState(false);
  const [isSubmissionsCollapsed, setIsSubmissionsCollapsed] = useState(false);

  // Diary functions
  const handleCloseDiary = (diaryId: number) => {
    setDiaryToClose(diaryId);
  };

  const confirmCloseDiary = () => {
    if (diaryToClose) {
      setDiariesData((prev) =>
        prev.map((diary) =>
          diary.id === diaryToClose ? { ...diary, status: "Closed" } : diary,
        ),
      );
      setDiaryToClose(null);
    }
  };

  const cancelCloseDiary = () => {
    setDiaryToClose(null);
  };

  // Filter and sort open diaries for display (High priority first, then Medium, then Low)
  const openDiaries = diariesData
    .filter((diary) => diary.status === "Open")
    .sort((a, b) => {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const getPriorityBadgeColor = (priority: string) => {
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getDiaryRowBgColor = (priority: string) => {
    return "hover:bg-gray-50";
  };

  // Get unique values for filters
  const policyStatuses = [...new Set(policyData.map((p) => p.status))];
  const policyLobs = [...new Set(policyData.map((p) => p.lob))];
  const submissionStatuses = [...new Set(submissions.map((s) => s.status))];
  const claimsStatuses = [...new Set(claimsHistory.map((c) => c.status))];

  // Apply filters
  const filteredPolicies = policyData.filter((policy) => {
    const statusMatch =
      policyStatusFilter.length === 0 ||
      policyStatusFilter.includes(policy.status);
    const lobMatch =
      policyLobFilter.length === 0 || policyLobFilter.includes(policy.lob);
    return statusMatch && lobMatch;
  });

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submissionStatusFilter.length === 0 ||
      submissionStatusFilter.includes(submission.status),
  );

  const filteredClaims = claimsHistory.filter(
    (claim) =>
      claimsStatusFilter.length === 0 ||
      claimsStatusFilter.includes(claim.status),
  );

  const { profileId } = useParams();
  const isShawn = profileId === "shawn-elkins";
  const isJohn = profileId === "john-wills";
  const isNewProspect = profileId === "josh-fernandes";
  const hideFinancial = isJohn || isShawn;

  if (isNewProspect) {
    // No data for new prospect
    filteredPolicies.length = 0;
    filteredSubmissions.length = 0;
    filteredClaims.length = 0;
  }

  useEffect(() => {
    const key = profileId && diariesByProfile[profileId] ? profileId : "olivia";
    setDiariesData(diariesByProfile[key]);

    // Collapse all tiles by default for new prospect
    const collapse = !!(profileId === "josh-fernandes");
    setIsFinancialCollapsed(collapse);
    setIsActivityCollapsed(collapse);
    setIsDiariesCollapsed(collapse);
    setIsPoliciesCollapsed(collapse);
    setIsClaimsCollapsed(collapse);
    setIsSubmissionsCollapsed(collapse);
  }, [profileId]);

  const selectedActivities =
    profileId && activitiesByProfile[profileId]
      ? activitiesByProfile[profileId]
      : activitiesByProfile["olivia"];

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Row 1: Financial Information - Horizontal Strip */}
        <div
          className={`${hideFinancial ? "hidden" : ""} transition-all duration-1000 delay-300 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <Card
            className="shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => console.log("Navigate to financial details")}
          >
            <CardHeader
              className="pb-4 flex flex-row items-center justify-between cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsFinancialCollapsed((v) => !v);
              }}
            >
              <CardTitle className="text-base text-gray-700">
                Financial Summary
              </CardTitle>
              {!isShawn && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-[#0054A6] hover:bg-[#003d7a] text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Navigate to payment");
                    }}
                  >
                    Pay Now
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className={isFinancialCollapsed ? "hidden" : ""}>
              {isShawn ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-hidden">
                    <div className="text-xs text-gray-600 mb-1 font-medium">
                      Total Incurred (This Claimant)
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      $11,800.00
                    </div>
                    <Progress value={21} className="h-2 mt-2" />
                    <div className="text-xs text-gray-500 mt-1">
                      21% of available coverage
                    </div>
                  </div>
                  <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-hidden">
                    <div className="text-xs text-gray-600 mb-1 font-medium">
                      Outstanding Reserves
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      $7,250.00
                    </div>
                    <Progress value={60} className="h-2 mt-2" />
                    <div className="text-xs text-gray-500 mt-1">
                      Reserve adequacy: Good
                    </div>
                  </div>
                  <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-hidden">
                    <div className="text-xs text-gray-600 mb-1 font-medium">
                      Amount Paid
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      $5,200.00
                    </div>
                    <Progress value={40} className="h-2 mt-2" />
                    <div className="text-xs text-gray-500 mt-1">
                      Last payment Mar 15, 2024
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-hidden">
                    <div className="text-xs text-gray-600 mb-1 font-medium">
                      Amount Paid
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      $8,460
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Aggregate premium paid to date
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-400"></div>
                  </div>
                  <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-hidden">
                    <div className="text-xs text-gray-600 mb-1 font-medium">
                      Total Due
                    </div>
                    <div className="text-xl font-bold text-gray-800">$275</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Aggregate premium currently due (YTD)
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-400"></div>
                  </div>
                  <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-hidden">
                    <div className="text-xs text-gray-600 mb-1 font-medium">
                      Outstanding Balance
                    </div>
                    <div className="text-xl font-bold text-gray-800">$190</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Outstanding premium (after credit application)
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-400"></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Activity Timeline, Diaries */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 delay-400 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          {/* Activity Timeline */}
          <Card
            className={
              "shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            }
            onClick={() => console.log("Navigate to activity timeline")}
          >
            <CardHeader
              className="pb-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsActivityCollapsed((v) => !v);
              }}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-gray-700">
                  Activity Timeline
                </CardTitle>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className={isActivityCollapsed ? "hidden" : ""}>
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
                          File
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
                    {selectedActivities.slice(0, 4).map((activity, index) => (
                      <TableRow key={index} className="h-10 hover:bg-gray-50">
                        <TableCell className="text-xs py-2 w-24 whitespace-nowrap">
                          {formatToMMDDYY(activity.date)}
                        </TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">
                          {activity.type}
                        </TableCell>
                        <TableCell className="text-sm py-2 text-gray-700">
                          {activity.file}
                        </TableCell>
                        <TableCell className="text-sm py-2 text-gray-600">
                          {activity.user}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Diaries */}
          <Card
            className={
              "shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            }
            onClick={() => console.log("Navigate to diaries")}
          >
            <CardHeader
              className="pb-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsDiariesCollapsed((v) => !v);
              }}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-gray-700">
                  Diaries
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 border-gray-300 text-gray-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Plus size={10} className="mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className={isDiariesCollapsed ? "hidden" : ""}>
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
                          File
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
                      <TableRow
                        key={diary.id}
                        className={`h-8 ${getDiaryRowBgColor(diary.priority)} cursor-pointer`}
                      >
                        <TableCell className="text-xs py-1">
                          {formatToMMDDYY(diary.dueDate)}
                        </TableCell>
                        <TableCell className="text-xs py-1">
                          {diary.title}
                        </TableCell>
                        <TableCell className="py-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs border ${getPriorityBadgeColor(diary.priority)}`}
                          >
                            {diary.priority}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs py-1 text-gray-700">
                          {diary.file}
                        </TableCell>
                        <TableCell className="py-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-12 p-0 text-xs text-gray-600 hover:text-[#0054A6] hover:bg-blue-50"
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
                        <TableCell
                          colSpan={5}
                          className="text-center py-4 text-gray-500 text-sm"
                        >
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

        {/* Row 2: Policy Details and Claims History */}
        <div
          className={`grid grid-cols-1 ${isShawn ? "" : "lg:grid-cols-2"} gap-6 transition-all duration-1000 delay-400 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          {/* Policy Details */}
          {!isShawn && (
            <Card
              className={
                "shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              }
              onClick={() => setIsPoliciesCollapsed((v) => !v)}
            >
              <CardHeader
                className="pb-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPoliciesCollapsed((v) => !v);
                }}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-gray-700">
                    Policies
                  </CardTitle>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={isPoliciesCollapsed ? "hidden" : ""}>
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
                      {filteredPolicies.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-4 text-gray-500 text-sm"
                          >
                            No policies
                          </TableCell>
                        </TableRow>
                      )}
                      {filteredPolicies.map((policy, index) => (
                        <TableRow
                          key={index}
                          className={`h-10 ${getRowBgColor(policy.status, "policy")} cursor-pointer`}
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Open policy details", policy.policy);
                          }}
                        >
                          <TableCell className="py-2">
                            <span className="text-sm font-medium text-gray-800">
                              {policy.policy}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm py-2 text-gray-700">
                            {policy.lob}
                          </TableCell>
                          <TableCell className="py-2">
                            {getStatusBadge(policy.status)}
                          </TableCell>
                          <TableCell className="text-sm py-2 text-gray-700">
                            {policy.startDate}
                          </TableCell>
                          <TableCell className="text-sm py-2 text-gray-700">
                            {policy.endDate}
                          </TableCell>
                          <TableCell className="text-sm py-2 text-gray-700 font-semibold">
                            {policy.premiumDue}
                          </TableCell>
                          <TableCell className="text-sm py-2 text-gray-700 font-semibold">
                            {policy.premiumPaid}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Right column: Submissions for John, Claims otherwise */}
          {isJohn ? (
            <Card
              className={
                "shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              }
              onClick={() => setIsSubmissionsCollapsed((v) => !v)}
            >
              <CardHeader
                className="pb-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSubmissionsCollapsed((v) => !v);
                }}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-gray-700">
                    Submissions
                  </CardTitle>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={isSubmissionsCollapsed ? "hidden" : ""}>
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
                            Program
                            <ArrowUpDown size={12} className="text-gray-400" />
                          </div>
                        </TableHead>
                        <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                          <div className="flex items-center gap-1">
                            Proposed Effective Date
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
                            Submission Type
                            <ArrowUpDown size={12} className="text-gray-400" />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.map((submission, index) => (
                        <TableRow
                          key={index}
                          className={`h-10 ${getRowBgColor(submission.status, "submission")} cursor-pointer`}
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(
                              "Open submission details",
                              submission.id,
                            );
                          }}
                        >
                          <TableCell className="text-sm font-medium py-2 text-gray-800">
                            {submission.id}
                          </TableCell>
                          <TableCell className="text-sm py-2 text-gray-700">
                            {submission.program}
                          </TableCell>
                          <TableCell className="text-sm py-2 text-gray-700">
                            {submission.proposedEffectiveDate}
                          </TableCell>
                          <TableCell className="py-2">
                            {getStatusBadge(submission.status)}
                          </TableCell>
                          <TableCell className="text-sm py-2 text-gray-700">
                            {submission.submissionType}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card
              className={
                "shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              }
              onClick={() => setIsClaimsCollapsed((v) => !v)}
            >
              <CardHeader
                className="pb-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsClaimsCollapsed((v) => !v);
                }}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-gray-700">
                    {isShawn ? "Claims & Incidents" : "Claims"}
                  </CardTitle>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={isClaimsCollapsed ? "hidden" : ""}>
                <div className="overflow-x-auto">
                  <Table>
                    {isShawn ? (
                      <>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                              ID
                            </TableHead>
                            <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                              Type
                            </TableHead>
                            <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                              Description
                            </TableHead>
                            <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                              Date
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            {
                              id: "23E-1234",
                              type: "Claim",
                              desc: "Property damage - Garage Fire",
                              date: "2024-01-15",
                            },
                            {
                              id: "23E-5678",
                              type: "Claim",
                              desc: "Auto accident - Rear end collision",
                              date: "2024-02-20",
                            },
                            {
                              id: "INCIDENT-1234",
                              type: "Incident",
                              desc: "Multi-vehicle collision",
                              date: "2024-03-10",
                            },
                            {
                              id: "INCIDENT-5678",
                              type: "Incident",
                              desc: "Weather-related damage",
                              date: "2024-03-25",
                            },
                          ].map((row) => (
                            <TableRow
                              key={row.id}
                              className="h-10 hover:bg-gray-50"
                            >
                              <TableCell className="text-sm font-medium text-gray-800">
                                {row.id}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs border ${row.type === "Claim" ? "bg-gray-100 text-gray-700 border-gray-200" : "bg-gray-100 text-gray-700 border-gray-200"}`}
                                >
                                  {row.type}
                                </span>
                              </TableCell>
                              <TableCell className="text-sm text-gray-700">
                                {row.desc}
                              </TableCell>
                              <TableCell className="text-sm text-gray-700">
                                {row.date}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </>
                    ) : (
                      <>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                              <div className="flex items-center gap-1">
                                Claim Number
                                <ArrowUpDown
                                  size={12}
                                  className="text-gray-400"
                                />
                              </div>
                            </TableHead>
                            <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                              <div className="flex items-center gap-1">
                                Status
                                <ArrowUpDown
                                  size={12}
                                  className="text-gray-400"
                                />
                              </div>
                            </TableHead>
                            <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50 w-24">
                              <div className="flex items-center gap-1">
                                Loss Date
                                <ArrowUpDown
                                  size={12}
                                  className="text-gray-400"
                                />
                              </div>
                            </TableHead>
                            <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                              <div className="flex items-center gap-1">
                                Incurred
                                <ArrowUpDown
                                  size={12}
                                  className="text-gray-400"
                                />
                              </div>
                            </TableHead>
                            <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                              <div className="flex items-center gap-1">
                                Reserves
                                <ArrowUpDown
                                  size={12}
                                  className="text-gray-400"
                                />
                              </div>
                            </TableHead>
                            <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                              <div className="flex items-center gap-1">
                                Paid
                                <ArrowUpDown
                                  size={12}
                                  className="text-gray-400"
                                />
                              </div>
                            </TableHead>
                            <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                              <div className="flex items-center gap-1">
                                Recoveries
                                <ArrowUpDown
                                  size={12}
                                  className="text-gray-400"
                                />
                              </div>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredClaims.filter(
                            (claim) =>
                              claim.status === "Open" ||
                              claim.status === "Reopen",
                          ).length === 0 && (
                            <TableRow>
                              <TableCell
                                colSpan={7}
                                className="text-center py-4 text-gray-500 text-sm"
                              >
                                No claims
                              </TableCell>
                            </TableRow>
                          )}
                          {filteredClaims
                            .filter(
                              (claim) =>
                                claim.status === "Open" ||
                                claim.status === "Reopen",
                            )
                            .map((claim, index) => (
                              <TableRow
                                key={index}
                                className={`h-10 ${getRowBgColor(claim.status, "claim")} cursor-pointer`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(
                                    "Open claim details",
                                    claim.claimNumber,
                                  );
                                }}
                              >
                                <TableCell className="text-sm font-medium py-2 text-gray-800">
                                  {claim.claimNumber}
                                </TableCell>
                                <TableCell className="py-2">
                                  {getStatusBadge(claim.status)}
                                </TableCell>
                                <TableCell className="text-sm py-2 text-gray-700 w-24 whitespace-nowrap">
                                  {claim.date}
                                </TableCell>
                                <TableCell className="text-sm py-2 text-gray-700">
                                  {claim.incurred}
                                </TableCell>
                                <TableCell className="text-sm py-2 text-gray-700">
                                  {claim.reserves}
                                </TableCell>
                                <TableCell className="text-sm py-2 text-gray-700">
                                  {claim.paid}
                                </TableCell>
                                <TableCell className="text-sm py-2 text-gray-700">
                                  {claim.recoveries}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </>
                    )}
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Row 3 */}
        {!isJohn && !isShawn && (
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 delay-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {/* Submissions */}
            <Card
              className={
                "shadow-sm bg-white border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              }
              onClick={() => setIsSubmissionsCollapsed((v) => !v)}
            >
              <CardHeader
                className="pb-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSubmissionsCollapsed((v) => !v);
                }}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-gray-700">
                    Submissions
                  </CardTitle>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={isSubmissionsCollapsed ? "hidden" : ""}>
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
                            Program
                            <ArrowUpDown size={12} className="text-gray-400" />
                          </div>
                        </TableHead>
                        <TableHead className="text-xs h-8 text-gray-600 cursor-pointer hover:bg-gray-50">
                          <div className="flex items-center gap-1">
                            Proposed Effective Date
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
                            Submission Type
                            <ArrowUpDown size={12} className="text-gray-400" />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-4 text-gray-500 text-sm"
                          >
                            No submissions
                          </TableCell>
                        </TableRow>
                      )}
                      {filteredSubmissions.map((submission, index) => (
                        <TableRow
                          key={index}
                          className={`h-10 ${getRowBgColor(submission.status, "submission")} cursor-pointer`}
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(
                              "Open submission details",
                              submission.id,
                            );
                          }}
                        >
                          <TableCell className="text-sm font-medium py-2 text-gray-800">
                            {submission.id}
                          </TableCell>
                          <TableCell className="text-sm py-2 text-gray-700">
                            {submission.program}
                          </TableCell>
                          <TableCell className="text-sm py-2 text-gray-700">
                            {submission.proposedEffectiveDate}
                          </TableCell>
                          <TableCell className="py-2">
                            {getStatusBadge(submission.status)}
                          </TableCell>
                          <TableCell className="text-sm py-2 text-gray-700">
                            {submission.submissionType}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Empty space to maintain layout consistency with Policy/Claims row */}
            <div></div>
          </div>
        )}

        {/* Close Diary Confirmation Dialog */}
        <AlertDialog
          open={diaryToClose !== null}
          onOpenChange={cancelCloseDiary}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Close Diary</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to close this diary? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelCloseDiary}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmCloseDiary}
                className="bg-[#0054A6] hover:bg-[#003d7a]"
              >
                Close Diary
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
