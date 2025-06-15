
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Home, ShoppingCart, Boxes, Percent, ListOrdered, Wallet, User, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Sales", to: "/dashboard/sales", icon: ShoppingCart },
  { label: "Inventory", to: "/dashboard/inventory", icon: Boxes },
  { label: "Offers", to: "/dashboard/offers", icon: Percent },
  { label: "Orders", to: "/dashboard/orders", icon: ListOrdered },
  { label: "Transactions", to: "/dashboard/transactions", icon: Wallet },
  { label: "User Profile", to: "/dashboard/profile", icon: User },
  { label: "Connect Website/Amazon", to: "/connect-services", icon: Settings }
];

const DashboardSidebar = () => {
  const location = useLocation();
  return (
    <Sidebar className="border-r border-gray-200 bg-gradient-to-b from-white to-gray-50">
      <SidebarHeader className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-navy-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SL</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-navy-800">Smart Ledger</h2>
            <p className="text-xs text-gray-500">Business Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            {menu.map(item => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === item.to}
                  className={`
                    group relative overflow-hidden rounded-xl p-3 transition-all duration-300 ease-out
                    ${location.pathname === item.to 
                      ? 'bg-gradient-to-r from-teal-500 to-navy-600 text-white shadow-lg transform scale-105' 
                      : 'hover:bg-gradient-to-r hover:from-teal-50 hover:to-navy-50 hover:shadow-md hover:transform hover:scale-102'
                    }
                  `}
                >
                  <Link to={item.to} className="flex items-center gap-3 w-full">
                    <div className={`
                      p-2 rounded-lg transition-all duration-300
                      ${location.pathname === item.to 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-teal-100 group-hover:text-teal-700'
                      }
                    `}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className={`
                      font-medium transition-all duration-300
                      ${location.pathname === item.to ? 'text-white' : 'text-gray-700 group-hover:text-navy-800'}
                    `}>
                      {item.label}
                    </span>
                    {location.pathname === item.to && (
                      <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
