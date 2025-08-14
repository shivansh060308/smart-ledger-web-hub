
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListOrdered, Clock, CheckCircle, XCircle } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { EditableOrdersCard } from "@/components/EditableOrdersCard";
import { AuthGuard } from "@/components/AuthGuard";

const OrdersMain = () => {
  const { orders, updateOrders, loading } = useDashboardData();

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-navy-800 mb-2">Orders Management</h1>
        <p className="text-gray-600">Track and manage all customer orders</p>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders?.total_orders || 0}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{orders?.pending || 0}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{orders?.completed || 0}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {orders?.total_orders ? Math.round((orders.completed / orders.total_orders) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Editable Orders */}
      <EditableOrdersCard 
        totalOrders={orders?.total_orders || 0}
        pendingOrders={orders?.pending || 0}
        completedOrders={orders?.completed || 0}
        onSave={updateOrders}
        loading={loading}
      />

      {/* Charts and Analytics Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Orders Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
              [Orders Over Time Chart]
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
              [Order Status Pie Chart]
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
              [AOV Trend Chart]
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Orders = () => (
  <AuthGuard>
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <DashboardSidebar />
        <OrdersMain />
      </div>
    </SidebarProvider>
  </AuthGuard>
);

export default Orders;
