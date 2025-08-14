
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Boxes, Package, AlertTriangle, TrendingDown } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { EditableCard } from "@/components/EditableCard";
import { AuthGuard } from "@/components/AuthGuard";

const InventoryMain = () => {
  const { sales, expenses, loading } = useDashboardData();

  // Calculate inventory metrics based on sales and expenses
  const totalSales = sales.reduce((sum, sale) => sum + Number(sale.amount), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const estimatedInventoryValue = totalExpenses * 1.3; // Rough estimate

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-navy-800 mb-2">Inventory Management</h1>
        <p className="text-gray-600">Monitor stock levels and inventory analytics</p>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sales.length}</div>
            <p className="text-xs text-muted-foreground">Total transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total sales value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Inventory</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{estimatedInventoryValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Estimated value</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Inventory Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
              [Inventory Levels Over Time Chart]
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Stock Movement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
              [Stock In/Out Chart]
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
              [Inventory by Category Chart]
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Inventory = () => (
  <AuthGuard>
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <DashboardSidebar />
        <InventoryMain />
      </div>
    </SidebarProvider>
  </AuthGuard>
);

export default Inventory;
