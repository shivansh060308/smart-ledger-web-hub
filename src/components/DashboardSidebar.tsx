
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menu.map(item => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton asChild isActive={location.pathname === item.to}>
                  <Link to={item.to}>
                    <item.icon className="mr-2" />
                    <span>{item.label}</span>
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
