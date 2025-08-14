
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, BarChart, Boxes, ShoppingCart, Bell, Users, Link2, Filter, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "@/hooks/useDashboardData";
import { EditableCard } from "@/components/EditableCard";
import { EditableOrdersCard } from "@/components/EditableOrdersCard";
import { AddReminderForm } from "@/components/AddReminderForm";

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
  const [expenseFilter, setExpenseFilter] = useState("month");
  
  const {
    bankBalance,
    expenses,
    sales,
    orders,
    reminders,
    profitLoss,
    loading,
    updateBankBalance,
    addExpense,
    addSale,
    updateOrders,
    addReminder,
    updateProfitLoss,
  } = useDashboardData();

  const expenseFilters = ["today", "week", "month", "quarterly", "yearly"];

  // Calculate filtered expense amount
  const getFilteredExpenseAmount = () => {
    const filteredExpenses = expenses.filter(expense => expense.period === expenseFilter);
    return filteredExpenses.reduce((total, expense) => total + Number(expense.amount), 0);
  };

  // Calculate filtered sales amount
  const getFilteredSalesAmount = () => {
    const filteredSales = sales.filter(sale => sale.period === expenseFilter);
    return filteredSales.reduce((total, sale) => total + Number(sale.amount), 0);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const handleAddExpense = async (amount: number) => {
    await addExpense({
      amount,
      period: expenseFilter,
      category: 'General',
      description: `${expenseFilter} expense`
    });
  };

  const handleAddSale = async (amount: number) => {
    await addSale({
      amount,
      period: expenseFilter,
      description: `${expenseFilter} sale`
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

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
        <EditableCard
          title="Bank Balance"
          icon={<Banknote className="w-6 h-6" />}
          value={formatCurrency(bankBalance?.amount || 0)}
          onSave={updateBankBalance}
        />
        
        <EditableCard
          title="Profit/Loss"
          icon={<BarChart className="w-6 h-6" />}
          value={formatCurrency(profitLoss?.amount || 0)}
          onSave={updateProfitLoss}
        />
        
        <Card className="flex-1 min-w-[180px] flex flex-col hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <span className="bg-teal-100 text-teal-700 rounded-full p-2">
              <Boxes className="w-6 h-6" />
            </span>
            <div className="flex-1 flex items-center justify-between">
              <CardTitle className="text-base font-medium">Expenses</CardTitle>
              <div className="relative">
                <select 
                  value={expenseFilter}
                  onChange={(e) => setExpenseFilter(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-xs text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  {expenseFilters.map(filter => (
                    <option key={filter} value={filter}>
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </option>
                  ))}
                </select>
                <Filter className="w-3 h-3 absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{formatCurrency(getFilteredExpenseAmount())}</div>
              <Button 
                onClick={() => handleAddExpense(0)}
                size="sm"
                variant="outline"
                className="text-xs px-2 py-1 h-auto"
              >
                + Add
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500">This {expenseFilter}</div>
          </CardContent>
        </Card>
        
        <Card className="flex-1 min-w-[180px] flex flex-col hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <span className="bg-teal-100 text-teal-700 rounded-full p-2">
              <ShoppingCart className="w-6 h-6" />
            </span>
            <CardTitle className="text-base font-medium">Sales</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{formatCurrency(getFilteredSalesAmount())}</div>
              <Button 
                onClick={() => handleAddSale(0)}
                size="sm"
                variant="outline"
                className="text-xs px-2 py-1 h-auto"
              >
                + Add
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500">This {expenseFilter}</div>
          </CardContent>
        </Card>
      </div>

      {/* Order status & reminders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <EditableOrdersCard
          totalOrders={orders?.total_orders || 0}
          pendingOrders={orders?.pending || 0}
          completedOrders={orders?.completed || 0}
          onSave={updateOrders}
        />
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle><Bell className="w-5 h-5 mr-2 inline" />Reminders</CardTitle>
            <AddReminderForm onAdd={addReminder} />
          </CardHeader>
          <CardContent>
            {reminders.length === 0 ? (
              <div className="text-gray-500 text-sm text-center py-4">
                No pending reminders. Add one to get started!
              </div>
            ) : (
              <ul className="space-y-2">
                {reminders.map((reminder) => (
                  <li className="flex items-center gap-2" key={reminder.id}>
                    <span className="bg-yellow-100 px-2 py-1 rounded text-xs text-yellow-700 flex-1">
                      {reminder.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(reminder.due_date).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
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
