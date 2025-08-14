import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export interface BankBalance {
  id: string;
  user_id: string;
  amount: number;
  updated_at: string;
  created_at: string;
}

export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  period: string;
  category?: string;
  description?: string;
  updated_at: string;
  created_at: string;
}

export interface Sale {
  id: string;
  user_id: string;
  amount: number;
  period: string;
  description?: string;
  updated_at: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_orders: number;
  pending: number;
  completed: number;
  updated_at: string;
  created_at: string;
}

export interface Reminder {
  id: string;
  user_id: string;
  title: string;
  due_date: string;
  completed: boolean;
  updated_at: string;
  created_at: string;
}

export interface ProfitLoss {
  id: string;
  user_id: string;
  amount: number;
  period: string;
  updated_at: string;
  created_at: string;
}

export const useDashboardData = () => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  
  const [bankBalance, setBankBalance] = useState<BankBalance | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [orders, setOrders] = useState<Order | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [profitLoss, setProfitLoss] = useState<ProfitLoss | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  const fetchAllData = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      // Fetch bank balance
      const { data: bankData } = await supabase
        .from('bank_balance')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setBankBalance(bankData);

      // Fetch expenses
      const { data: expenseData } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setExpenses(expenseData || []);

      // Fetch sales
      const { data: salesData } = await supabase
        .from('sales')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setSales(salesData || []);

      // Fetch orders
      const { data: orderData } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setOrders(orderData);

      // Fetch reminders
      const { data: reminderData } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', false)
        .order('due_date', { ascending: true });
      setReminders(reminderData || []);

      // Fetch profit/loss
      const { data: profitData } = await supabase
        .from('profit_loss')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setProfitLoss(profitData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update functions
  const updateBankBalance = async (amount: number) => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('bank_balance')
        .upsert({
          user_id: user.id,
          amount,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setBankBalance(data);
      toast({
        title: "Success",
        description: "Bank balance updated successfully",
      });
    } catch (error) {
      console.error('Error updating bank balance:', error);
      toast({
        title: "Error",
        description: "Failed to update bank balance",
        variant: "destructive",
      });
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id' | 'user_id' | 'updated_at' | 'created_at'>) => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert({
          ...expense,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Expense added successfully",
      });
    } catch (error) {
      console.error('Error adding expense:', error);
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      });
    }
  };

  const addSale = async (sale: Omit<Sale, 'id' | 'user_id' | 'updated_at' | 'created_at'>) => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('sales')
        .insert({
          ...sale,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Sale added successfully",
      });
    } catch (error) {
      console.error('Error adding sale:', error);
      toast({
        title: "Error",
        description: "Failed to add sale",
        variant: "destructive",
      });
    }
  };

  const updateOrders = async (orderData: { total_orders: number; pending: number; completed: number }) => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .upsert({
          user_id: user.id,
          ...orderData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setOrders(data);
      toast({
        title: "Success",
        description: "Orders updated successfully",
      });
    } catch (error) {
      console.error('Error updating orders:', error);
      toast({
        title: "Error",
        description: "Failed to update orders",
        variant: "destructive",
      });
    }
  };

  const addReminder = async (reminder: Omit<Reminder, 'id' | 'user_id' | 'updated_at' | 'created_at' | 'completed'>) => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('reminders')
        .insert({
          ...reminder,
          user_id: user.id,
          completed: false,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Reminder added successfully",
      });
    } catch (error) {
      console.error('Error adding reminder:', error);
      toast({
        title: "Error",
        description: "Failed to add reminder",
        variant: "destructive",
      });
    }
  };

  const updateProfitLoss = async (amount: number) => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('profit_loss')
        .upsert({
          user_id: user.id,
          amount,
          period: 'month',
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setProfitLoss(data);
      toast({
        title: "Success",
        description: "Profit/Loss updated successfully",
      });
    } catch (error) {
      console.error('Error updating profit/loss:', error);
      toast({
        title: "Error",
        description: "Failed to update profit/loss",
        variant: "destructive",
      });
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user?.id) return;

    fetchAllData();

    const channel = supabase
      .channel('dashboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bank_balance',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            setBankBalance(payload.new as BankBalance);
          } else if (payload.eventType === 'DELETE') {
            setBankBalance(null);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'expenses',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          // Refetch expenses to maintain order
          fetchExpenses();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sales',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          // Refetch sales to maintain order
          fetchSales();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            setOrders(payload.new as Order);
          } else if (payload.eventType === 'DELETE') {
            setOrders(null);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reminders',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          // Refetch reminders to maintain order
          fetchReminders();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profit_loss',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            setProfitLoss(payload.new as ProfitLoss);
          } else if (payload.eventType === 'DELETE') {
            setProfitLoss(null);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  // Helper functions for real-time refetching
  const fetchExpenses = async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setExpenses(data || []);
  };

  const fetchSales = async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from('sales')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setSales(data || []);
  };

  const fetchReminders = async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from('reminders')
      .select('*')
      .eq('user_id', user.id)
      .eq('completed', false)
      .order('due_date', { ascending: true });
    setReminders(data || []);
  };

  return {
    // Data
    bankBalance,
    expenses,
    sales,
    orders,
    reminders,
    profitLoss,
    loading,
    
    // Functions
    updateBankBalance,
    addExpense,
    addSale,
    updateOrders,
    addReminder,
    updateProfitLoss,
    fetchAllData,
  };
};