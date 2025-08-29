import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { CustomerCenterSidebar } from '@/components/ui/customer-center-sidebar';
import { PersonDetailsSection } from '@/components/ui/person-details-section';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, ChevronLeft, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Communication from '@/pages/Communication';
import History from '@/pages/History';
import CustomerDetails from '@/pages/CustomerDetails';
import PlaceholderPage from '@/pages/PlaceholderPage';
import NotFound from '@/pages/NotFound';

const customerData = {
  name: "Rose K",
  status: "Active"
};

function AppContent() {
  const location = useLocation();
  const [isOmsSidebarCollapsed, setIsOmsSidebarCollapsed] = useState(false);
  const [isCustomerCenterSidebarCollapsed, setIsCustomerCenterSidebarCollapsed] = useState(false);

  // Check if current route is customer details (which has its own layout)
  const isCustomerDetailsRoute = location.pathname.startsWith('/customer-details');

  // Define which routes should show the Customer Center sidebar
  const customerCenterRoutes = ['/', '/profile', '/personal-details', '/loss-history', '/relationships', '/workgroups', '/risk-management-credit', '/contact-delivery', '/journals', '/financials'];
  const showCustomerCenterSidebar = customerCenterRoutes.some(route =>
    route === '/' ? location.pathname === '/' : location.pathname.startsWith(route)
  );

  // If it's a customer details route, render just that component
  if (isCustomerDetailsRoute) {
    return (
      <Routes>
        <Route path="/customer-details/*" element={<CustomerDetails />} />
      </Routes>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* OneShield Sidebar - Starts from top of page */}
      <Sidebar
        isCollapsed={isOmsSidebarCollapsed}
        onToggleCollapse={() => setIsOmsSidebarCollapsed(!isOmsSidebarCollapsed)}
      />

      {/* Main content area with header and content */}
      <div className="flex flex-col flex-1">
        {/* White OneShield Header */}
        <Header />

        {showCustomerCenterSidebar ? (
          <div className="flex flex-col flex-1">
            {/* Blue Customer Header spanning Customer Center area */}
            <div className="mt-px bg-gradient-to-r from-[#0054A6] to-[#003d7a] text-white px-4 py-3 flex items-center gap-4 shadow-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCustomerCenterSidebarCollapsed(!isCustomerCenterSidebarCollapsed)}
                className="text-white hover:bg-white/10 p-1 h-8 w-8"
                title={isCustomerCenterSidebarCollapsed ? "Expand Panel" : "Collapse Panel"}
              >
                {isCustomerCenterSidebarCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
              </Button>

              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold">{customerData.name}</h1>
                <div className="text-white/70">|</div>
                <Badge className="bg-white/15 text-white border-white/30 hover:bg-white/20">
                  {customerData.status}
                </Badge>
              </div>
            </div>

            <div className="flex flex-1">
              <CustomerCenterSidebar
                isCollapsed={isCustomerCenterSidebarCollapsed}
                onToggleCollapse={() => setIsCustomerCenterSidebarCollapsed(!isCustomerCenterSidebarCollapsed)}
              />
              <div className="flex-1 flex flex-col">
                {/* Breadcrumb */}
                <div className="bg-white border-b border-gray-200 px-6 py-3">
                  <div className="text-sm text-gray-600 flex items-center flex-wrap gap-1">
                    {(() => {
                      const params = new URLSearchParams(location.search);
                      const section = params.get('section');
                      const tab = params.get('tab');
                      const path = location.pathname;

                      const mainMap: Record<string, { label: string; to: string }> = {
                        '/': { label: 'Overview', to: '/' },
                        '/profile': { label: 'Personal Details', to: '/personal-details' },
                        '/personal-details': { label: 'Personal Details', to: '/personal-details' },
                        '/loss-history': { label: 'Loss History', to: '/loss-history' },
                        '/relationships': { label: 'Relationships & Roles', to: '/relationships' },
                        '/workgroups': { label: 'Workgroups', to: '/workgroups' },
                        '/risk-management-credit': { label: 'Risk Mgt Credit Program', to: '/risk-management-credit' },
                        '/contact-delivery': { label: 'Contact & Delivery', to: '/contact-delivery' },
                        '/journals': { label: 'Journals', to: '/journals' },
                        '/financials': { label: 'Financials', to: '/financials' },
                      };

                      const sectionMap: Record<string, string> = {
                        'personal-info': 'Basic Info',
                        'person-info': 'Basic Info',
                        'addresses': 'Addresses',
                        'additional-info': 'Additional Info',
                        'person-history': 'Work History',
                      };

                      const tabMap: Record<string, string> = {
                        'contact': 'Contact Info',
                        'prior-policy': 'Prior Policy',
                        'prior-losses': 'Prior Losses',
                        'diaries': 'Diaries',
                        'notes': 'Notes',
                        'document': 'Document',
                        'email': 'Email',
                        'assignment-approval': 'Assignment/Approval History',
                      };

                      const keys = Object.keys(mainMap);
                      const currentKey = keys.find(k => (k === '/' ? path === '/' : path.startsWith(k))) || '/';
                      const crumbs: { label: string; to?: string }[] = [];

                      crumbs.push({ label: 'Customer Center', to: '/' });

                      if (currentKey !== '/') {
                        crumbs.push(mainMap[currentKey]);
                      } else {
                        crumbs.push({ label: mainMap['/'].label });
                      }

                      const subLabel = section ? sectionMap[section] : (tab ? tabMap[tab] : undefined);
                      if (subLabel) {
                        crumbs.push({ label: subLabel, to: location.pathname + location.search });
                      }

                      return (
                        <>
                          {crumbs.map((c, i) => (
                            <span key={i} className="flex items-center">
                              {c.to ? (
                                <a href={c.to} className="hover:text-blue-600 cursor-pointer">
                                  {c.label}
                                </a>
                              ) : (
                                <span className={i === crumbs.length - 1 ? 'text-gray-900' : ''}>{c.label}</span>
                              )}
                              {i < crumbs.length - 1 && <span className="mx-2">&gt;</span>}
                            </span>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                </div>
                {location.pathname === '/' && (
                  <PersonDetailsSection />
                )}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/communication" element={<Communication />} />
                  <Route path="/history" element={<History />} />
                  <Route
                    path="/loss-history"
                    element={
                      <PlaceholderPage
                        title="Loss History"
                        description="View prior policies and losses history."
                      />
                    }
                  />
                  <Route
                    path="/relationships"
                    element={
                      <PlaceholderPage
                        title="Relationships & Roles"
                        description="View and manage customer relationships and roles."
                      />
                    }
                  />
                  <Route
                    path="/workgroups"
                    element={
                      <PlaceholderPage
                        title="Workgroups"
                        description="Manage workgroup assignments and team collaboration."
                      />
                    }
                  />
                  <Route
                    path="/risk-management-credit"
                    element={
                      <PlaceholderPage
                        title="Risk Management Credit Program"
                        description="Manage risk assessment and credit programs."
                      />
                    }
                  />
                  <Route
                    path="/contact-delivery"
                    element={
                      <PlaceholderPage
                        title="Contact & Delivery"
                        description="Manage contact information and delivery preferences."
                      />
                    }
                  />
                  <Route
                    path="/journals"
                    element={
                      <PlaceholderPage
                        title="Journals"
                        description="View and manage customer journals and notes."
                      />
                    }
                  />
                  <Route
                    path="/financials"
                    element={
                      <PlaceholderPage
                        title="Financials"
                        description="View financial information and transactions."
                      />
                    }
                  />
                  <Route
                    path="/personal-details"
                    element={
                      <PlaceholderPage
                        title="Personal Details"
                        description="Manage customer personal information and details."
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
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/communication" element={<Communication />} />
              <Route path="/history" element={<History />} />
              <Route
                path="/new-submission"
                element={
                  <PlaceholderPage
                    title="New Submission"
                    description="Create new insurance submissions."
                  />
                }
              />
              <Route
                path="/submissions"
                element={
                  <PlaceholderPage
                    title="Submissions"
                    description="Manage insurance submissions."
                  />
                }
              />
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
