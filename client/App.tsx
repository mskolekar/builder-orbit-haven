import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { CustomerCenterSidebar } from "@/components/ui/customer-center-sidebar";
import { PersonDetailsSection } from "@/components/ui/person-details-section";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, ChevronLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Communication from "@/pages/Communication";
import History from "@/pages/History";
import CustomerDetails from "@/pages/CustomerDetails";
import CustomerCenterHome from "@/pages/CustomerCenterHome";
import CustomerCenterSearch from "@/pages/CustomerCenterSearch";
import SubmissionSearch from "@/pages/SubmissionSearch";
import Submissions from "@/pages/Submissions";
import Incidents from "@/pages/Incidents";
import CheckProcessing from "@/pages/CheckProcessing";
import PersonInfo from "@/pages/PersonInfo";
import AdditionalInfo from "@/pages/AdditionalInfo";
import PlaceholderPage from "@/pages/PlaceholderPage";
import NotFound from "@/pages/NotFound";
import { BasicDetailsSection } from "@/components/ui/basic-details-section";
import { OrganizationDetailsSection } from "@/components/ui/organization-details-section";
import { PersonDetailsUnderwriter } from "@/components/ui/person-details-underwriter";
import { PersonDetailsClaimant } from "@/components/ui/person-details-claimant";
import { PersonDetailsProspect } from "@/components/ui/person-details-prospect";

const profileMap: Record<
  string,
  { name: string; status: string; role: string; memberSince?: string }
> = {
  olivia: {
    name: "Olivia R",
    status: "Active",
    role: "Insured",
    memberSince: "2019",
  },
  "john-wills": {
    name: "John Wills",
    status: "Active",
    role: "Underwriter",
    memberSince: "2018",
  },
  "shawn-elkins": {
    name: "Shawn Elkins",
    status: "Active",
    role: "Claimant",
    memberSince: "2021",
  },
  "abc-ltd": {
    name: "ABC Ltd",
    status: "Active",
    role: "Organization",
    memberSince: "2017",
  },
  "josh-fernandes": {
    name: "Josh Fernandes",
    status: "New",
    role: "Prospect",
    memberSince: "2025",
  },
};

function AppContent() {
  const location = useLocation();
  const [isOmsSidebarCollapsed, setIsOmsSidebarCollapsed] = useState(false);
  const [
    isCustomerCenterSidebarCollapsed,
    setIsCustomerCenterSidebarCollapsed,
  ] = useState(false);

  // Check if current route is customer details (which has its own layout)
  const isCustomerDetailsRoute =
    location.pathname.startsWith("/customer-details");

  // Active profile (from /overview/:id)
  const overviewMatch = location.pathname.match(/^\/overview\/([^/]+)/);
  const activeProfileKey = overviewMatch ? overviewMatch[1] : "olivia";
  const activeProfile = profileMap[activeProfileKey] || profileMap["olivia"];

  // Define which routes should show the Customer Center sidebar (exclude /customer-center search)
  const customerCenterRoutes = [
    "/overview",
    "/person-info",
    "/additional-info",
    "/licenses-certifications",
    "/workgroups",
    "/relationships",
    "/prior-policy",
    "/prior-losses",
    "/login-info",
    "/upload-sign",
    "/journals",
  ];
  const showCustomerCenterSidebar = customerCenterRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  // If it's a customer details route, render just that component
  if (isCustomerDetailsRoute) {
    return (
      <Routes>
        <Route path="/customer-details/*" element={<CustomerDetails />} />
      </Routes>
    );
  }

  const styleParam = new URLSearchParams(location.search).get("style");
  const styleClass =
    styleParam === "fintech-fonts"
      ? "fintech-fonts"
      : styleParam === "modern-enterprise"
        ? "modern-enterprise"
        : "";

  return (
    <div className={`h-screen bg-gray-50 flex ${styleClass}`}>
      {/* OneShield Sidebar - Starts from top of page */}
      <Sidebar
        isCollapsed={isOmsSidebarCollapsed}
        onToggleCollapse={() =>
          setIsOmsSidebarCollapsed(!isOmsSidebarCollapsed)
        }
      />

      {/* Main content area with header and content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${isOmsSidebarCollapsed ? "ml-16" : "ml-64"}`}
      >
        {/* White OneShield Header */}
        <Header />

        {showCustomerCenterSidebar ? (
          <div className="flex flex-col flex-1">
            {/* Blue Customer Header spanning Customer Center area */}
            <div className="mt-px bg-gradient-to-r from-[#0054A6] to-[#003d7a] text-white px-4 py-2 flex items-center gap-4 shadow-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setIsCustomerCenterSidebarCollapsed(
                    !isCustomerCenterSidebarCollapsed,
                  )
                }
                className="text-white hover:bg-white/10 p-1 h-8 w-8"
                title={
                  isCustomerCenterSidebarCollapsed
                    ? "Expand Panel"
                    : "Collapse Panel"
                }
              >
                {isCustomerCenterSidebarCollapsed ? (
                  <Menu size={16} />
                ) : (
                  <ChevronLeft size={16} />
                )}
              </Button>

              <div className="flex items-center gap-3 flex-1">
                <h1 className="text-lg font-semibold">{activeProfile.name}</h1>
                <div className="text-white/70">|</div>
                <Badge
                  className={
                    activeProfile.status === "Active"
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                      : "bg-white/15 text-white border-white/30 hover:bg-white/20"
                  }
                >
                  {activeProfile.status}
                </Badge>
              </div>
            </div>

            <div className="flex flex-1">
              <CustomerCenterSidebar
                isCollapsed={isCustomerCenterSidebarCollapsed}
                onToggleCollapse={() =>
                  setIsCustomerCenterSidebarCollapsed(
                    !isCustomerCenterSidebarCollapsed,
                  )
                }
              />
              <div className="flex-1 flex flex-col">
                {/* Breadcrumb */}
                <div className="bg-white border-b border-gray-200 px-6 py-3">
                  <div className="text-sm text-gray-600 flex items-center flex-wrap gap-1">
                    {(() => {
                      const params = new URLSearchParams(location.search);
                      const section = params.get("section");
                      const tab = params.get("tab");
                      const path = location.pathname;

                      const mainMap: Record<
                        string,
                        { label: string; to: string }
                      > = {
                        "/overview": {
                          label: "Overview",
                          to: `/overview/${activeProfileKey}`,
                        },
                        "/person-info": {
                          label: "Person Info",
                          to: "/person-info",
                        },
                        "/additional-info": {
                          label: "Additional Info",
                          to: "/additional-info",
                        },
                        "/licenses-certifications": {
                          label: "Licenses",
                          to: "/licenses-certifications",
                        },
                        "/workgroups": {
                          label: "Work Groups",
                          to: "/workgroups",
                        },
                        "/relationships": {
                          label: "Relationship & Roles",
                          to: "/relationships",
                        },
                        "/prior-policy": {
                          label: "Prior Policy",
                          to: "/prior-policy",
                        },
                        "/prior-losses": {
                          label: "Prior Losses",
                          to: "/prior-losses",
                        },
                        "/login-info": {
                          label: "Login Info",
                          to: "/login-info",
                        },
                        "/upload-sign": {
                          label: "Upload Sign",
                          to: "/upload-sign",
                        },
                        "/journals": {
                          label: "Journal",
                          to: "/journals",
                        },
                      };

                      const sectionMap: Record<string, string> = {
                        "personal-info": "Basic Info",
                        "person-info": "Basic Info",
                        addresses: "Addresses",
                        "additional-info": "Additional Info",
                        "person-history": "Work History",
                      };

                      const tabMap: Record<string, string> = {
                        contact: "Contact Info",
                        "prior-policy": "Prior Policy",
                        "prior-losses": "Prior Losses",
                        diaries: "Diaries",
                        notes: "Notes",
                        document: "Document",
                        email: "Email",
                        "assignment-approval": "Assignment/Approval History",
                      };

                      const keys = Object.keys(mainMap);
                      const currentKey =
                        keys.find((k) =>
                          k === "/" ? path === "/" : path.startsWith(k),
                        ) || "/";
                      const crumbs: { label: string; to?: string }[] = [];

                      crumbs.push({
                        label: "Customer Center",
                        to: "/customer-center",
                      });

                      if (currentKey !== "/") {
                        crumbs.push(mainMap[currentKey]);
                      } else {
                        crumbs.push({ label: mainMap["/"].label });
                      }

                      // Add Communication as a sub-breadcrumb if on /communication path
                      if (path === "/communication") {
                        crumbs.push({
                          label: "Communication",
                          to: "/communication",
                        });
                      } else {
                        const subLabel = section
                          ? sectionMap[section]
                          : tab
                            ? tabMap[tab]
                            : undefined;
                        if (subLabel) {
                          crumbs.push({
                            label: subLabel,
                            to: location.pathname + location.search,
                          });
                        }
                      }

                      return (
                        <>
                          {crumbs.map((c, i) => (
                            <span key={i} className="flex items-center">
                              {c.to ? (
                                <a
                                  href={c.to}
                                  className="hover:text-blue-600 cursor-pointer"
                                >
                                  {c.label}
                                </a>
                              ) : (
                                <span
                                  className={
                                    i === crumbs.length - 1
                                      ? "text-gray-900"
                                      : ""
                                  }
                                >
                                  {c.label}
                                </span>
                              )}
                              {i < crumbs.length - 1 && (
                                <span className="mx-2">&gt;</span>
                              )}
                            </span>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                </div>
                {location.pathname.startsWith("/overview/") &&
                  (activeProfileKey === "olivia" ? (
                    <PersonDetailsSection />
                  ) : activeProfileKey === "abc-ltd" ? (
                    <OrganizationDetailsSection />
                  ) : activeProfileKey === "shawn-elkins" ? (
                    <PersonDetailsClaimant />
                  ) : activeProfileKey === "john-wills" ? (
                    <PersonDetailsUnderwriter />
                  ) : activeProfileKey === "josh-fernandes" ? (
                    <PersonDetailsProspect />
                  ) : (
                    <BasicDetailsSection
                      name={activeProfile.name}
                      role={activeProfile.role}
                      status={activeProfile.status}
                      memberSince={activeProfile.memberSince}
                    />
                  ))}
                <Routes>
                  <Route path="/overview/:profileId" element={<Dashboard />} />
                  <Route
                    path="/person-info"
                    element={<PersonInfo />}
                  />
                  <Route
                    path="/additional-info"
                    element={
                      <PlaceholderPage
                        title="Additional Info"
                        description="View and manage additional customer information."
                      />
                    }
                  />
                  <Route
                    path="/licenses-certifications"
                    element={
                      <PlaceholderPage
                        title="Licenses"
                        description="View and manage licenses and certifications."
                      />
                    }
                  />
                  <Route
                    path="/workgroups"
                    element={
                      <PlaceholderPage
                        title="Work Groups"
                        description="Manage workgroup assignments and team collaboration."
                      />
                    }
                  />
                  <Route
                    path="/relationships"
                    element={
                      <PlaceholderPage
                        title="Relationship & Roles"
                        description="View and manage customer relationships and roles."
                      />
                    }
                  />
                  <Route
                    path="/prior-policy"
                    element={
                      <PlaceholderPage
                        title="Prior Policy"
                        description="View prior insurance policy information."
                      />
                    }
                  />
                  <Route
                    path="/prior-losses"
                    element={
                      <PlaceholderPage
                        title="Prior Losses"
                        description="View prior loss history and claims information."
                      />
                    }
                  />
                  <Route
                    path="/login-info"
                    element={
                      <PlaceholderPage
                        title="Login Info"
                        description="Manage login credentials and account access information."
                      />
                    }
                  />
                  <Route
                    path="/upload-sign"
                    element={
                      <PlaceholderPage
                        title="Upload Sign"
                        description="Upload signature and verify identity."
                      />
                    }
                  />
                  <Route
                    path="/journals"
                    element={
                      <PlaceholderPage
                        title="Journal"
                        description="View and manage customer journals and notes."
                      />
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route
                path="/customer-center"
                element={<CustomerCenterSearch />}
              />
              <Route path="/submission-search" element={<SubmissionSearch />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/communication" element={<Communication />} />
              <Route path="/history" element={<History />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/submissions" element={<Submissions />} />
              <Route
                path="/policies"
                element={
                  <PlaceholderPage
                    title="Policies"
                    description="Manage insurance policies."
                  />
                }
              />
              <Route
                path="/accounting"
                element={
                  <PlaceholderPage
                    title="Accounting"
                    description="Handle accounting and financial operations."
                  />
                }
              />
              <Route
                path="/accounting/check-processing"
                element={<CheckProcessing />}
              />
              <Route
                path="/search"
                element={
                  <PlaceholderPage
                    title="Search Center"
                    description="Search across all system data."
                  />
                }
              />
              <Route
                path="/utilities"
                element={
                  <PlaceholderPage
                    title="Other Utilities"
                    description="Access system utilities and tools."
                  />
                }
              />
              <Route
                path="/links"
                element={
                  <PlaceholderPage
                    title="Quick Links"
                    description="Access frequently used links and resources."
                  />
                }
              />
              <Route
                path="/bulk-changes"
                element={
                  <PlaceholderPage
                    title="Bulk Change Endorsements"
                    description="Process bulk policy endorsements."
                  />
                }
              />
              <Route
                path="/users"
                element={
                  <PlaceholderPage
                    title="Manage Users"
                    description="Manage system users and permissions."
                  />
                }
              />
              <Route
                path="/reports"
                element={
                  <PlaceholderPage
                    title="Analytic Reports"
                    description="View analytics and generate reports."
                  />
                }
              />
              <Route
                path="/rapid-claims/bulk-payments"
                element={
                  <PlaceholderPage
                    title="Bulk Payments"
                    description="Process bulk payment operations."
                  />
                }
              />
              <Route
                path="/rapid-claims/bulk-receipts"
                element={
                  <PlaceholderPage
                    title="Bulk Receipts"
                    description="Manage bulk receipt operations."
                  />
                }
              />
              <Route
                path="/rapid-claims/process-groups"
                element={
                  <PlaceholderPage
                    title="Process Groups of Payments"
                    description="Process groups of payments."
                  />
                }
              />
              <Route
                path="/rapid-claims/release-repetitive"
                element={
                  <PlaceholderPage
                    title="Release Repetitive Payments"
                    description="Release repetitive payment batches."
                  />
                }
              />
              <Route
                path="/rapid-claims/review-reserves"
                element={
                  <PlaceholderPage
                    title="Review Held Reserves"
                    description="Review and manage held reserves."
                  />
                }
              />
              <Route
                path="/rapid-claims/transfer-void"
                element={
                  <PlaceholderPage
                    title="Transfer/Void/Stop/Reissue Payments"
                    description="Manage payment modifications and transfers."
                  />
                }
              />
              <Route
                path="/rapid-claims/post-payments"
                element={
                  <PlaceholderPage
                    title="Post Payments to Claims"
                    description="Post payments to claim records."
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
