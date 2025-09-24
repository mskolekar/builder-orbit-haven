import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Edit3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SensitiveText from '@/components/ui/sensitive-text';

interface SubItem {
  label: string;
  path: string;
}

interface CustomerCenterSidebarItem {
  label: string;
  path: string;
  subItems?: SubItem[];
}

const customerCenterItems: CustomerCenterSidebarItem[] = [
  { label: 'Overview', path: '/customer-details' },
  {
    label: 'Personal Details',
    path: '/customer-details/personal-details',
    subItems: [
      { label: 'Basic Info', path: '/customer-details/profile?section=person-info' },
      { label: 'Addresses', path: '/customer-details/profile?section=addresses' },
      { label: 'Contact Info', path: '/customer-details/contact-delivery?tab=contact' },
      { label: 'Additional Info', path: '/customer-details/profile?section=additional-info' },
      { label: 'Work History', path: '/customer-details/profile?section=person-history' }
    ]
  },
  {
    label: 'Loss History',
    path: '/customer-details/loss-history',
    subItems: [
      { label: 'Prior Policy', path: '/customer-details/loss-history?tab=prior-policy' },
      { label: 'Prior Losses', path: '/customer-details/loss-history?tab=prior-losses' }
    ]
  },
  { label: 'Relationships & Roles', path: '/customer-details/relationships' },
  { label: 'Workgroups', path: '/customer-details/workgroups' },
  { label: 'Risk Mgt Credit Program', path: '/customer-details/risk-management-credit' },
  {
    label: 'Journals',
    path: '/customer-details/journals',
    subItems: [
      { label: 'Diaries', path: '/customer-details/journals?tab=diaries' },
      { label: 'Notes', path: '/customer-details/journals?tab=notes' },
      { label: 'Document', path: '/customer-details/journals?tab=document' },
      { label: 'Email', path: '/customer-details/journals?tab=email' },
      { label: 'Assignment/Approval History', path: '/customer-details/journals?tab=assignment-approval' }
    ]
  },
  { label: 'Financials', path: '/customer-details/financials' }
];

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

export default function CustomerDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const currentPath = `/customer-details${window.location.pathname.replace('/customer-details', '')}${window.location.search}`;

  const toggleExpanded = (itemPath: string) => {
    setExpandedItems(prev =>
      prev.includes(itemPath)
        ? prev.filter(path => path !== itemPath)
        : [...prev, itemPath]
    );
  };

  const isActive = (path: string) => {
    if (path === '/customer-details') {
      return currentPath === '/customer-details' || currentPath === '/customer-details/';
    }
    return currentPath === path || currentPath.startsWith(path);
  };

  const isMainPageActive = (item: CustomerCenterSidebarItem) => {
    if (item.path === '/customer-details') {
      return currentPath === '/customer-details' || currentPath === '/customer-details/';
    }
    return currentPath.startsWith(item.path);
  };

  const navigateToProfile = () => {
    navigate('/customer-details/profile?section=personal-info');
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Unified Blue Header */}
      <div className="bg-gradient-to-r from-[#0054A6] to-[#003d7a] text-white px-4 py-3 flex items-center gap-4 shadow-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
          className="text-white hover:bg-white/10 p-1 h-8 w-8"
          title={isLeftPanelCollapsed ? "Expand Panel" : "Collapse Panel"}
        >
          {isLeftPanelCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
        </Button>
        
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">{customerData.name}</h1>
          <div className="text-white/70">|</div>
          <Badge className="bg-white/15 text-white border-white/30 hover:bg-white/20">
            {customerData.status}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className={cn(
          "bg-gradient-to-b from-[#0054A6] to-[#003d7a] text-white flex flex-col shadow-lg transition-all duration-300",
          isLeftPanelCollapsed ? "w-0 overflow-hidden" : "w-64"
        )}>
          <nav className="flex-1 px-3 py-4 overflow-y-auto" role="navigation" aria-label="Customer Center Navigation">
            <ul className="space-y-1" role="menubar">
              {customerCenterItems.map((item) => {
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isMainActive = isMainPageActive(item);
                const isExpanded = expandedItems.includes(item.path);

                return (
                  <li key={item.path}>
                    <button
                      onClick={(e) => {
                        if (hasSubItems) {
                          e.preventDefault();
                          toggleExpanded(item.path);
                        } else {
                          navigate(item.path);
                        }
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-lg text-sm transition-colors w-full gap-3 px-3 py-2",
                        isMainActive && !window.location.search
                          ? "bg-white text-[#0054A6]"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      )}
                      aria-label={item.label}
                      aria-expanded={hasSubItems ? isExpanded : undefined}
                      aria-haspopup={hasSubItems ? "menu" : undefined}
                    >
                      <div className="flex items-center gap-3">
                        {item.label}
                      </div>
                      {hasSubItems && (
                        isExpanded ?
                          <ChevronDown size={14} /> :
                          <ChevronRight size={14} />
                      )}
                    </button>

                    {hasSubItems && isExpanded && (
                      <ul className="mt-1 ml-6 space-y-1">
                        {item.subItems!.map((subItem) => (
                          <li key={subItem.path}>
                            <button
                              onClick={() => navigate(subItem.path)}
                              className={cn(
                                "block px-3 py-1.5 text-xs rounded transition-colors border-l-2 border-white/20 pl-4 w-full text-left",
                                isActive(subItem.path)
                                  ? "bg-white/15 text-white border-white/40"
                                  : "text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30"
                              )}
                              role="menuitem"
                              aria-label={subItem.label}
                            >
                              {subItem.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 overflow-auto">
          {/* Breadcrumb */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="text-sm text-gray-600">
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Home</span>
              <span className="mx-2">&gt;</span>
              <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Customer Center</span>
              <span className="mx-2">&gt;</span>
              <span className="text-gray-900">Overview</span>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="p-6">
            <Card className="shadow-sm border">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0054A6] to-[#003d7a] rounded-full flex items-center justify-center text-white text-lg font-semibold shadow-lg">
                        RK
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-gray-900">{customerData.name}</h2>
                        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
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
                  
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 text-blue-600 hover:bg-blue-50"
                      onClick={navigateToProfile}
                    >
                      <Edit3 size={12} />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <div>
                        <span className="text-xs text-gray-500">DOB</span>
                        <p className="text-sm font-medium"><SensitiveText value={customerData.dateOfBirth} /></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <span className="text-xs text-gray-500">Gender</span>
                        <p className="text-sm font-medium">{customerData.gender}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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

            {/* Additional content sections can go here */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-[#0054A6] hover:bg-[#003d7a]">
                      Create New Policy
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      View Claims History
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Last Login</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Policy Updated</span>
                      <span className="font-medium">Yesterday</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Document Uploaded</span>
                      <span className="font-medium">3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
