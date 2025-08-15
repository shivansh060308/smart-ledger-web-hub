
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { AuthGuard } from "@/components/AuthGuard";
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
import AmazonCallback from "./pages/AmazonCallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout" element={<AuthGuard><Checkout /></AuthGuard>} />
            <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/dashboard/sales" element={<AuthGuard><Sales /></AuthGuard>} />
            <Route path="/dashboard/inventory" element={<AuthGuard><Inventory /></AuthGuard>} />
            <Route path="/dashboard/offers" element={<AuthGuard><Offers /></AuthGuard>} />
            <Route path="/dashboard/orders" element={<AuthGuard><Orders /></AuthGuard>} />
            <Route path="/dashboard/transactions" element={<AuthGuard><Transactions /></AuthGuard>} />
            <Route path="/dashboard/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/auth/amazon/callback" element={<AmazonCallback />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
