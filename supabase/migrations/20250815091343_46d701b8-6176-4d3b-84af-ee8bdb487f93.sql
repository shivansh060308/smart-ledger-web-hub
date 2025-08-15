-- Create Amazon seller account integration tables
CREATE TABLE public.amazon_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  seller_id TEXT NOT NULL,
  marketplace_ids TEXT[] NOT NULL DEFAULT '{}',
  refresh_token TEXT NOT NULL,
  access_token TEXT,
  access_token_expires_at TIMESTAMP WITH TIME ZONE,
  region TEXT NOT NULL DEFAULT 'us-east-1',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.amazon_accounts ENABLE ROW LEVEL SECURITY;

-- Create policies for amazon_accounts
CREATE POLICY "Users can view their own Amazon accounts" 
ON public.amazon_accounts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Amazon accounts" 
ON public.amazon_accounts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Amazon accounts" 
ON public.amazon_accounts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Amazon accounts" 
ON public.amazon_accounts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create Amazon orders table
CREATE TABLE public.amazon_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  amazon_account_id UUID NOT NULL REFERENCES public.amazon_accounts(id) ON DELETE CASCADE,
  amazon_order_id TEXT NOT NULL UNIQUE,
  marketplace_id TEXT NOT NULL,
  order_status TEXT NOT NULL,
  purchase_date TIMESTAMP WITH TIME ZONE NOT NULL,
  last_update_date TIMESTAMP WITH TIME ZONE,
  order_total_amount NUMERIC(10, 2),
  order_total_currency TEXT,
  number_of_items_shipped INTEGER DEFAULT 0,
  number_of_items_unshipped INTEGER DEFAULT 0,
  buyer_email TEXT,
  fulfillment_channel TEXT,
  ship_service_level TEXT,
  order_type TEXT,
  earliest_ship_date TIMESTAMP WITH TIME ZONE,
  latest_ship_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.amazon_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for amazon_orders
CREATE POLICY "Users can view their own Amazon orders" 
ON public.amazon_orders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Amazon orders" 
ON public.amazon_orders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Amazon orders" 
ON public.amazon_orders 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Amazon orders" 
ON public.amazon_orders 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create Amazon products table
CREATE TABLE public.amazon_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  amazon_account_id UUID NOT NULL REFERENCES public.amazon_accounts(id) ON DELETE CASCADE,
  asin TEXT NOT NULL,
  marketplace_id TEXT NOT NULL,
  sku TEXT,
  title TEXT,
  brand TEXT,
  category TEXT,
  price NUMERIC(10, 2),
  currency TEXT,
  inventory_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(amazon_account_id, asin, marketplace_id)
);

-- Enable Row Level Security
ALTER TABLE public.amazon_products ENABLE ROW LEVEL SECURITY;

-- Create policies for amazon_products
CREATE POLICY "Users can view their own Amazon products" 
ON public.amazon_products 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Amazon products" 
ON public.amazon_products 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Amazon products" 
ON public.amazon_products 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Amazon products" 
ON public.amazon_products 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create Amazon settlements/financial data table
CREATE TABLE public.amazon_settlements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  amazon_account_id UUID NOT NULL REFERENCES public.amazon_accounts(id) ON DELETE CASCADE,
  settlement_id TEXT NOT NULL UNIQUE,
  settlement_start_date TIMESTAMP WITH TIME ZONE,
  settlement_end_date TIMESTAMP WITH TIME ZONE,
  deposit_date TIMESTAMP WITH TIME ZONE,
  total_amount NUMERIC(12, 2),
  currency TEXT,
  marketplace_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.amazon_settlements ENABLE ROW LEVEL SECURITY;

-- Create policies for amazon_settlements
CREATE POLICY "Users can view their own Amazon settlements" 
ON public.amazon_settlements 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Amazon settlements" 
ON public.amazon_settlements 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Amazon settlements" 
ON public.amazon_settlements 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Amazon settlements" 
ON public.amazon_settlements 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add triggers for automatic timestamp updates
CREATE TRIGGER update_amazon_accounts_updated_at
BEFORE UPDATE ON public.amazon_accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_amazon_orders_updated_at
BEFORE UPDATE ON public.amazon_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_amazon_products_updated_at
BEFORE UPDATE ON public.amazon_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_amazon_settlements_updated_at
BEFORE UPDATE ON public.amazon_settlements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_amazon_accounts_user_id ON public.amazon_accounts(user_id);
CREATE INDEX idx_amazon_orders_user_id ON public.amazon_orders(user_id);
CREATE INDEX idx_amazon_orders_amazon_account_id ON public.amazon_orders(amazon_account_id);
CREATE INDEX idx_amazon_orders_purchase_date ON public.amazon_orders(purchase_date);
CREATE INDEX idx_amazon_products_user_id ON public.amazon_products(user_id);
CREATE INDEX idx_amazon_products_amazon_account_id ON public.amazon_products(amazon_account_id);
CREATE INDEX idx_amazon_settlements_user_id ON public.amazon_settlements(user_id);
CREATE INDEX idx_amazon_settlements_amazon_account_id ON public.amazon_settlements(amazon_account_id);