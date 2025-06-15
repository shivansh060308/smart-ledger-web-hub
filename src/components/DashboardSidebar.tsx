
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
</lov_write>

<lov-write file_path="src/pages/ConnectServices.tsx">
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Link2, ExternalLink, ShoppingCart } from "lucide-react";

const ConnectServices = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Connect Your Website or Amazon Store</CardTitle>
        <CardDescription>
          Integrate your own website or Amazon store to sync real-time orders, inventory, and sales with Smart Ledger.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Link2 className="w-4 h-4" />
            Connect Website (Coming Soon)
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Connect Amazon (Coming Soon)
          </Button>
          <Button asChild className="w-full mt-2">
            <Link to="/dashboard">
              <ExternalLink className="w-4 h-4 mr-1" />
              Go to Dashboard
            </Link>
          </Button>
          <div className="text-xs text-gray-500 text-center pt-2">
            Need help or custom integration? Contact support.
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ConnectServices;
</lov_write>

<lov-write file_path="src/pages/Sales.tsx">
const Sales = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col p-10">
    <h2 className="text-2xl font-bold text-navy-800 mb-4">Sales Overview</h2>
    <div className="bg-white border rounded-lg p-6 text-gray-400 text-center">
      [Sales data and analytics will appear here...]
    </div>
  </div>
);

export default Sales;
</lov_write>

<lov-write file_path="src/pages/Inventory.tsx">
const Inventory = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col p-10">
    <h2 className="text-2xl font-bold text-navy-800 mb-4">Inventory</h2>
    <div className="bg-white border rounded-lg p-6 text-gray-400 text-center">
      [Inventory management & analytics will appear here...]
    </div>
  </div>
);

export default Inventory;
</lov_write>

<lov-write file_path="src/pages/Offers.tsx">
const Offers = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col p-10">
    <h2 className="text-2xl font-bold text-navy-800 mb-4">Offers and Campaigns</h2>
    <div className="bg-white border rounded-lg p-6 text-gray-400 text-center">
      [Available/promotional offers will appear here...]
    </div>
  </div>
);

export default Offers;
</lov_write>

<lov-write file_path="src/pages/Orders.tsx">
const Orders = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col p-10">
    <h2 className="text-2xl font-bold text-navy-800 mb-4">Orders</h2>
    <div className="bg-white border rounded-lg p-6 text-gray-400 text-center">
      [Orders (pending/completed/etc.) will appear here...]
    </div>
  </div>
);

export default Orders;
</lov_write>

<lov-write file_path="src/pages/Transactions.tsx">
const Transactions = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col p-10">
    <h2 className="text-2xl font-bold text-navy-800 mb-4">Transactions</h2>
    <div className="bg-white border rounded-lg p-6 text-gray-400 text-center">
      [Transaction history and details will appear here...]
    </div>
  </div>
);

export default Transactions;
</lov_write>

<lov-write file_path="src/pages/Profile.tsx">
const Profile = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col p-10">
    <h2 className="text-2xl font-bold text-navy-800 mb-4">User Profile</h2>
    <div className="bg-white border rounded-lg p-6 text-gray-400 text-center">
      [User profile and settings will appear here...]
    </div>
  </div>
);

export default Profile;
</lov_write>

<lov-write file_path="src/App.tsx">
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
import Offers from "./pages/Offers";
import Orders from "./pages/Orders";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import ConnectServices from "./pages/ConnectServices";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/sales" element={<Sales />} />
          <Route path="/dashboard/inventory" element={<Inventory />} />
          <Route path="/dashboard/offers" element={<Offers />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/transactions" element={<Transactions />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/connect-services" element={<ConnectServices />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
</lov_write>
