import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { CustomerCenterSidebar } from '@/components/ui/customer-center-sidebar';
import { PersonDetailsSection } from '@/components/ui/person-details-section';
import { CustomerHeader } from '@/components/ui/customer-header';
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isCollapsed={isOmsSidebarCollapsed}
        onToggleCollapse={() => setIsOmsSidebarCollapsed(!isOmsSidebarCollapsed)}
      />
      {showCustomerCenterSidebar && (
        <CustomerCenterSidebar
          isCollapsed={isCustomerCenterSidebarCollapsed}
          onToggleCollapse={() => setIsCustomerCenterSidebarCollapsed(!isCustomerCenterSidebarCollapsed)}
        />
      )}
      <div className="flex-1 flex flex-col">
        <Header />
        {showCustomerCenterSidebar && location.pathname === '/' && (
          <PersonDetailsSection />
        )}
        {showCustomerCenterSidebar && location.pathname !== '/' && (
          <CustomerHeader />
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
