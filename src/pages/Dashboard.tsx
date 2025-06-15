
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, BarChart, Boxes, ShoppingCart, Bell, Users, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockData = {
  bankBalance: 124563,
  profitLoss: "+₹12,345",
  expenses: "₹8,550",
  sales: "₹54,200",
  totalOrders: 128,
  pendingOrders: 7,
  completedOrders: 121,
  reminders: [
    { label: "GST Filing Due", date: "20 June, 2025" },
    { label: "Renew Amazon Sync", date: "1 July, 2025" },
  ]
};

const CardSection = ({ title, icon, value, extra }: { title: string; icon: React.ReactNode; value: string|number; extra?: React.ReactNode }) => (
  <Card className="flex-1 min-w-[180px] flex flex-col">
    <CardHeader className="flex flex-row items-center gap-2 pb-2">
      <span className="bg-teal-100 text-teal-700 rounded-full p-2">{icon}</span>
      <CardTitle className="text-base font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between">
      <div className="text-lg font-bold">{value}</div>
      {extra && <div className="mt-2 text-xs text-gray-500">{extra}</div>}
    </CardContent>
  </Card>
);

const DashboardMain = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy-800">Welcome to your Dashboard</h1>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate("/connect-services")}>
          <Link2 className="w-4 h-4" />
          Connect Website or Amazon
        </Button>
      </div>
      {/* Dashboard cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <CardSection title="Bank Balance" icon={<Banknote className="w-6 h-6" />} value={"₹" + mockData.bankBalance.toLocaleString()} />
        <CardSection title="Profit/Loss" icon={<BarChart className="w-6 h-6" />} value={mockData.profitLoss} />
        <CardSection title="Expenses (This Month)" icon={<Boxes className="w-6 h-6" />} value={mockData.expenses} />
        <CardSection title="Sales" icon={<ShoppingCart className="w-6 h-6" />} value={mockData.sales} />
      </div>

      {/* Order status & reminders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Orders Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-8 text-base">
              <div>
                <div className="font-semibold text-navy-700">{mockData.totalOrders}</div>
                <div className="text-xs text-gray-600">Total Orders</div>
              </div>
              <div>
                <div className="font-semibold text-orange-600">{mockData.pendingOrders}</div>
                <div className="text-xs text-gray-600">Pending</div>
              </div>
              <div>
                <div className="font-semibold text-green-600">{mockData.completedOrders}</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle><Bell className="w-5 h-5 mr-2 inline" />Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {mockData.reminders.map((r, i) => (
                <li className="mb-2 flex items-center gap-2" key={i}>
                  <span className="bg-yellow-100 px-2 py-1 rounded text-xs text-yellow-700">{r.label}</span>
                  <span className="text-xs text-gray-500">{r.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Future: charts here */}
      <div className="bg-white rounded-lg border p-6 text-gray-400 text-center">
        [Analytics Chart will appear here...]
      </div>
    </div>
  );
};

const Dashboard = () => (
  <SidebarProvider>
    <div className="min-h-screen bg-gray-50 flex w-full">
      <DashboardSidebar />
      <DashboardMain />
    </div>
  </SidebarProvider>
);

export default Dashboard;
