
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, TrendingUp, DollarSign, Calendar, Plus } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { EditableCard } from "@/components/EditableCard";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AuthGuard } from "@/components/AuthGuard";

const SalesMain = () => {
  const { sales, orders, addSale, loading } = useDashboardData();
  const { toast } = useToast();
  const [newSaleAmount, setNewSaleAmount] = useState('');
  const [newSaleDescription, setNewSaleDescription] = useState('');

  const totalSales = sales.reduce((sum, sale) => sum + Number(sale.amount), 0);
  const currentMonthSales = sales.filter(sale => {
    const saleDate = new Date(sale.created_at);
    const currentDate = new Date();
    return saleDate.getMonth() === currentDate.getMonth() && 
           saleDate.getFullYear() === currentDate.getFullYear();
  });

  const handleAddSale = async () => {
    if (!newSaleAmount) {
      toast({
        title: "Error",
        description: "Please enter sale amount",
        variant: "destructive",
      });
      return;
    }

    await addSale({
      amount: Number(newSaleAmount),
      period: 'month',
      description: newSaleDescription || undefined
    });

    setNewSaleAmount('');
    setNewSaleDescription('');
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-navy-800 mb-2">Sales Dashboard</h1>
        <p className="text-gray-600">Track and analyze your sales performance</p>
      </div>

      {/* Sales Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders?.total_orders || 0}</div>
            <p className="text-xs text-muted-foreground">All orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonthSales.length}</div>
            <p className="text-xs text-muted-foreground">Sales this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Sale */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Sale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium">Amount (₹)</label>
              <Input
                type="number"
                value={newSaleAmount}
                onChange={(e) => setNewSaleAmount(e.target.value)}
                placeholder="Enter sale amount"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Description (optional)</label>
              <Input
                value={newSaleDescription}
                onChange={(e) => setNewSaleDescription(e.target.value)}
                placeholder="Sale description"
              />
            </div>
            <Button onClick={handleAddSale} disabled={loading}>
              Add Sale
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            {sales.length > 0 ? (
              <div className="space-y-3">
                {sales.slice(0, 10).map((sale) => (
                  <div key={sale.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">₹{Number(sale.amount).toLocaleString()}</div>
                      {sale.description && (
                        <div className="text-sm text-gray-600">{sale.description}</div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(sale.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No sales data yet. Add your first sale above!
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sales Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Sales:</span>
                <span className="font-bold">₹{totalSales.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Sales:</span>
                <span className="font-bold">{sales.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Sale:</span>
                <span className="font-bold">
                  ₹{sales.length > 0 ? Math.round(totalSales / sales.length).toLocaleString() : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>This Month:</span>
                <span className="font-bold">{currentMonthSales.length} sales</span>
              </div>
              <div className="flex justify-between">
                <span>Pending Orders:</span>
                <span className="font-bold text-orange-600">{orders?.pending || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Completed Orders:</span>
                <span className="font-bold text-green-600">{orders?.completed || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Sales = () => (
  <AuthGuard>
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <DashboardSidebar />
        <SalesMain />
      </div>
    </SidebarProvider>
  </AuthGuard>
);

export default Sales;
