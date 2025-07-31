import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from '@/components/ui/sidebar';
import { Header } from '@/components/ui/header';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Communication from '@/pages/Communication';
import History from '@/pages/History';
import PlaceholderPage from '@/pages/PlaceholderPage';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/history" element={<History />} />
            <Route
              path="/workgroup"
              element={
                <PlaceholderPage
                  title="Workgroup"
                  description="Manage workgroup assignments and team collaboration."
                />
              }
            />
            <Route
              path="/relationships"
              element={
                <PlaceholderPage
                  title="Relationships"
                  description="View and manage customer relationships and referrals."
                />
              }
            />
            <Route
              path="/credit-programs"
              element={
                <PlaceholderPage
                  title="Credit Programs"
                  description="Manage customer credit programs and payment plans."
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
