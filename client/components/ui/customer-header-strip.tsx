import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CustomerHeaderStripProps {
  isCustomerSidebarCollapsed: boolean;
  onToggleCustomerSidebar: () => void;
}

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
  { label: 'Overview', path: '/' },
  {
    label: 'Personal Details',
    path: '/personal-details',
    subItems: [
      { label: 'Basic Info', path: '/profile?section=person-info' },
      { label: 'Addresses', path: '/profile?section=addresses' },
      { label: 'Contact Info', path: '/contact-delivery?tab=contact' },
      { label: 'Additional Info', path: '/profile?section=additional-info' },
      { label: 'Work History', path: '/profile?section=person-history' }
    ]
  },
  {
    label: 'Loss History',
    path: '/loss-history',
    subItems: [
      { label: 'Prior Policy', path: '/loss-history?tab=prior-policy' },
      { label: 'Prior Losses', path: '/loss-history?tab=prior-losses' }
    ]
  },
  { label: 'Relationships & Roles', path: '/relationships' },
  { label: 'Workgroups', path: '/workgroups' },
  { label: 'Risk Mgt Credit Program', path: '/risk-management-credit' },
  {
    label: 'Journals',
    path: '/journals',
    subItems: [
      { label: 'Diaries', path: '/journals?tab=diaries' },
      { label: 'Notes', path: '/journals?tab=notes' },
      { label: 'Document', path: '/journals?tab=document' },
      { label: 'Email', path: '/journals?tab=email' },
      { label: 'Assignment/Approval History', path: '/journals?tab=assignment-approval' }
    ]
  },
  { label: 'Financials', path: '/financials' }
];

const customerData = {
  name: "Rose K",
  status: "Active"
};

export function CustomerHeaderStrip({ isCustomerSidebarCollapsed, onToggleCustomerSidebar }: CustomerHeaderStripProps) {
  const location = useLocation();

  const getBreadcrumb = () => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section');
    const tab = searchParams.get('tab');

    let breadcrumb = 'Home > Customer Center';

    // Find the main menu item
    const mainItem = customerCenterItems.find(item => {
      if (item.path === '/') return path === '/';
      return path.startsWith(item.path);
    });

    if (!mainItem) return `${breadcrumb} > Overview`;

    breadcrumb += ` > ${mainItem.label}`;

    // If there's a section or tab, find the sub-item
    if ((section || tab) && mainItem.subItems) {
      const subItem = mainItem.subItems.find(sub => {
        const subParams = new URLSearchParams(sub.path.split('?')[1] || '');
        return subParams.get('section') === section || subParams.get('tab') === tab;
      });
      if (subItem) {
        breadcrumb += ` > ${subItem.label}`;
      }
    }

    return breadcrumb;
  };

  const breadcrumb = getBreadcrumb();

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
      {/* Blue Header Strip */}
      <div className="bg-[#0054A6] text-white h-12 flex items-center px-4">
        <div className="flex items-center gap-3">
          {/* Collapse/Expand Button */}
          <button
            onClick={onToggleCustomerSidebar}
            className="text-white hover:bg-white/10 p-1.5 rounded transition-colors flex items-center justify-center"
            title={isCustomerSidebarCollapsed ? "Expand Customer Center" : "Collapse Customer Center"}
          >
            {isCustomerSidebarCollapsed ? <Menu size={16} /> : <X size={16} />}
          </button>
          
          {/* Customer Name and Status */}
          <div className="text-sm font-bold">
            {customerData.name} | {customerData.status}
          </div>
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className="bg-white px-4 py-2 border-b border-gray-100">
        <div className="text-sm text-gray-600">
          {breadcrumb.split(' > ').map((crumb, index, array) => (
            <span key={index}>
              {crumb}
              {index < array.length - 1 && (
                <span className="mx-2 text-gray-400">&gt;</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
