
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Plus } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AuthGuard } from "@/components/AuthGuard";

const TransactionsMain = () => {
  const { sales, expenses, addSale, addExpense, loading } = useDashboardData();
  const { toast } = useToast();
  const [newAmount, setNewAmount] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');

  const totalIncome = sales.reduce((sum, sale) => sum + Number(sale.amount), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const netFlow = totalIncome - totalExpenses;
  const totalTransactions = sales.length + expenses.length;

  const handleAddTransaction = async () => {
    if (!newAmount) {
      toast({
        title: "Error",
        description: "Please enter transaction amount",
        variant: "destructive",
      });
      return;
    }

    try {
      if (transactionType === 'income') {
        await addSale({
          amount: Number(newAmount),
          period: 'month',
          description: newDescription || undefined
        });
      } else {
        await addExpense({
          amount: Number(newAmount),
          period: 'month',
          description: newDescription || undefined
        });
      }

      setNewAmount('');
      setNewDescription('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-navy-800 mb-2">Transactions</h1>
        <p className="text-gray-600">Monitor all financial transactions and payments</p>
      </div>

      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money In</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Out</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Flow</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{netFlow.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {netFlow >= 0 ? 'Positive flow' : 'Negative flow'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Transaction */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Transaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div>
              <label className="text-sm font-medium">Type</label>
              <select 
                value={transactionType} 
                onChange={(e) => setTransactionType(e.target.value as 'income' | 'expense')}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Amount (₹)</label>
              <Input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Description (optional)</label>
              <Input
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Transaction description"
              />
            </div>
            <Button onClick={handleAddTransaction} disabled={loading}>
              Add Transaction
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {totalTransactions > 0 ? (
              <div className="space-y-3">
                {[...sales.map(s => ({...s, type: 'income'})), ...expenses.map(e => ({...e, type: 'expense'}))]
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .slice(0, 10)
                  .map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <div>
                          <div className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'}₹{Number(transaction.amount).toLocaleString()}
                          </div>
                          {transaction.description && (
                            <div className="text-sm text-gray-600">{transaction.description}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No transactions yet. Add your first transaction above!
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Income Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Income:</span>
                <span className="font-bold text-green-600">₹{totalIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Sales:</span>
                <span className="font-bold">{sales.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Sale:</span>
                <span className="font-bold">
                  ₹{sales.length > 0 ? Math.round(totalIncome / sales.length).toLocaleString() : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Expense Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Expenses:</span>
                <span className="font-bold text-red-600">₹{totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Expenses:</span>
                <span className="font-bold">{expenses.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Expense:</span>
                <span className="font-bold">
                  ₹{expenses.length > 0 ? Math.round(totalExpenses / expenses.length).toLocaleString() : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Transactions = () => (
  <AuthGuard>
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <DashboardSidebar />
        <TransactionsMain />
      </div>
    </SidebarProvider>
  </AuthGuard>
);

export default Transactions;
