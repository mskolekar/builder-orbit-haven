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
            <Route 
              path="/personal-details" 
              element={
                <PlaceholderPage 
                  title="Personal Details" 
                  description="Manage customer personal information and contact details."
                />
              } 
            />
            <Route 
              path="/communication" 
              element={
                <PlaceholderPage 
                  title="Communication" 
                  description="View communication history and send messages."
                />
              } 
            />
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
              path="/history" 
              element={
                <PlaceholderPage 
                  title="History" 
                  description="View complete customer interaction and transaction history."
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
