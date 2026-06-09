-- =============================================
-- TAPONCE COMPACT COMPLETE DATABASE SCHEMA
-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/pprekbauclaojotdxjdz/sql
-- =============================================

-- Enable extension for UUID generation if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- STEP 1: CREATE TABLES
-- =============================================

-- 1. PROFILES TABLE (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'agent', 'customer')),
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CARD DESIGNS TABLE
CREATE TABLE IF NOT EXISTS card_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  base_msp DECIMAL(10,2) NOT NULL DEFAULT 600,
  preview_url TEXT,
  template_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  total_sales INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AGENTS TABLE
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referral_code TEXT UNIQUE NOT NULL,
  city TEXT,
  upi_id TEXT,
  bank_account TEXT,
  bank_ifsc TEXT,
  bank_holder_name TEXT,
  base_commission DECIMAL(10,2) DEFAULT 100.00,
  parent_agent_id UUID REFERENCES agents(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  total_sales INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  available_balance DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  company TEXT,
  job_title TEXT,
  bio TEXT,
  whatsapp TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  custom_links JSONB DEFAULT '[]',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended')),
  profession TEXT CHECK (profession IN (
    'ceo', 'doctor', 'lawyer', 'realtor', 'influencer', 
    'designer', 'consultant', 'sales', 'entrepreneur', 
    'musician', 'photographer', 'coach', 'teacher', 
    'student', 'freelancer', 'other'
  )),
  theme_preset TEXT CHECK (theme_preset IN (
    'midnight', 'ocean', 'sunset', 'forest', 
    'minimal', 'neon', 'professional', 'custom'
  )),
  accent_color TEXT,
  tagline TEXT,
  location TEXT,
  cta_text TEXT,
  cta_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. AGENT MSPs TABLE
CREATE TABLE IF NOT EXISTS agent_msps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  card_design_id UUID NOT NULL REFERENCES card_designs(id) ON DELETE CASCADE,
  msp_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agent_id, card_design_id)
);

-- 6. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number SERIAL UNIQUE,
  customer_id UUID REFERENCES customers(id),
  agent_id UUID REFERENCES agents(id),
  card_design_id UUID NOT NULL REFERENCES card_designs(id),
  customer_name TEXT NOT NULL,
  customer_company TEXT,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_whatsapp TEXT,
  customer_photo_url TEXT,
  line1_text TEXT,
  line2_text TEXT,
  msp_at_order DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) DEFAULT 0,
  override_commission DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending_approval' CHECK (status IN (
    'pending_approval', 'approved', 'printing', 'printed',
    'ready_to_ship', 'shipped', 'delivered', 'paid',
    'rejected', 'cancelled'
  )),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN (
    'pending', 'advance_paid', 'paid', 'cod'
  )),
  is_direct_sale BOOLEAN DEFAULT FALSE,
  is_below_msp BOOLEAN DEFAULT FALSE,
  portfolio_slug TEXT,
  shipping_address JSONB,
  tracking_number TEXT,
  special_instructions TEXT,
  admin_notes TEXT,
  rejection_reason TEXT,
  claim_token TEXT UNIQUE,
  claim_token_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ
);

-- 7. PAYOUTS TABLE
CREATE TABLE IF NOT EXISTS payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('upi', 'bank_transfer', 'cash')),
  admin_notes TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN (
    'printing', 'shipping', 'agent_commission', 'marketing', 'other'
  )),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  expense_date DATE NOT NULL,
  order_id UUID REFERENCES orders(id),
  agent_payout_id UUID REFERENCES payouts(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  action_url TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AGENT APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS agent_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    experience TEXT,
    referral_code_used TEXT,
    parent_agent_id UUID REFERENCES agents(id),
    generated_referral_code TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES profiles(id)
);

-- =============================================
-- STEP 2: CREATE INDEXES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_agents_referral_code ON agents(referral_code);
CREATE INDEX IF NOT EXISTS idx_customers_slug ON customers(slug);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_agent ON orders(agent_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_claim_token ON orders(claim_token) WHERE claim_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_applications_status ON agent_applications(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_applications_email ON agent_applications(email);

-- =============================================
-- STEP 3: ENABLE ROW LEVEL SECURITY
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_msps ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_applications ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 4: FUNCTIONS & TRIGGERS
-- =============================================

-- Admin Helper Function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Order Number Trigger (Offset by 12000)
CREATE OR REPLACE FUNCTION public.format_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 12000 + NEW.order_number;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_format_order_number ON orders;
CREATE TRIGGER trigger_format_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION public.format_order_number();

-- Commission Calculation Function
CREATE OR REPLACE FUNCTION public.calculate_commission(
  p_sale_price DECIMAL,
  p_msp DECIMAL,
  p_base_commission DECIMAL DEFAULT 100
)
RETURNS DECIMAL AS $$
DECLARE
  negotiation_bonus DECIMAL;
BEGIN
  IF p_sale_price > p_msp THEN
    negotiation_bonus := (p_sale_price - p_msp) * 0.5;
  ELSE
    negotiation_bonus := 0;
  END IF;
  
  RETURN p_base_commission + negotiation_bonus;
END;
$$ LANGUAGE plpgsql;

-- Agent Balance Update Trigger
CREATE OR REPLACE FUNCTION public.update_agent_balance_on_paid()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'paid' AND OLD.status != 'paid' THEN
    IF NEW.agent_id IS NOT NULL THEN
      UPDATE agents
      SET 
        available_balance = available_balance + NEW.commission_amount,
        total_earnings = total_earnings + NEW.commission_amount,
        total_sales = total_sales + 1
      WHERE id = NEW.agent_id;
      
      -- Parent agent override (2% of sale price)
      UPDATE agents parent
      SET available_balance = available_balance + (NEW.sale_price * 0.02)
      FROM agents child
      WHERE child.id = NEW.agent_id 
        AND parent.id = child.parent_agent_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_agent_balance ON orders;
CREATE TRIGGER trigger_update_agent_balance
  AFTER UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_agent_balance_on_paid();

-- New User Profile Handle Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- STEP 5: ROW LEVEL SECURITY POLICIES
-- =============================================

-- Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin());

-- Card Designs
DROP POLICY IF EXISTS "Anyone can view active designs" ON card_designs;
CREATE POLICY "Anyone can view active designs" ON card_designs
  FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Admins can manage designs" ON card_designs;
CREATE POLICY "Admins can manage designs" ON card_designs
  FOR ALL USING (public.is_admin());

-- Customers
DROP POLICY IF EXISTS "Public can view active customers" ON customers;
CREATE POLICY "Public can view active customers" ON customers
  FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Customers can update own profile" ON customers;
CREATE POLICY "Customers can update own profile" ON customers
  FOR UPDATE USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage customers" ON customers;
CREATE POLICY "Admins can manage customers" ON customers
  FOR ALL USING (public.is_admin());

-- Agents
DROP POLICY IF EXISTS "Agents can view own data" ON agents;
CREATE POLICY "Agents can view own data" ON agents
  FOR SELECT USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage agents" ON agents;
CREATE POLICY "Admins can manage agents" ON agents
  FOR ALL USING (public.is_admin());

-- Agent MSPs
DROP POLICY IF EXISTS "Agents can view own MSPs" ON agent_msps;
CREATE POLICY "Agents can view own MSPs" ON agent_msps
  FOR SELECT USING (agent_id IN (SELECT id FROM agents WHERE profile_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage MSPs" ON agent_msps;
CREATE POLICY "Admins can manage MSPs" ON agent_msps
  FOR ALL USING (public.is_admin());

-- Orders
DROP POLICY IF EXISTS "Agents can view own orders" ON orders;
CREATE POLICY "Agents can view own orders" ON orders
  FOR SELECT USING (agent_id IN (SELECT id FROM agents WHERE profile_id = auth.uid()));

DROP POLICY IF EXISTS "Agents can create orders" ON orders;
CREATE POLICY "Agents can create orders" ON orders
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'agent'));

DROP POLICY IF EXISTS "Customers can view own orders" ON orders;
CREATE POLICY "Customers can view own orders" ON orders
  FOR SELECT USING (customer_id IN (SELECT id FROM customers WHERE profile_id = auth.uid()));

DROP POLICY IF EXISTS "Anyone can place orders" ON orders;
CREATE POLICY "Anyone can place orders" ON orders
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage orders" ON orders;
CREATE POLICY "Admins can manage orders" ON orders
  FOR ALL USING (public.is_admin());

-- Payouts
DROP POLICY IF EXISTS "Agents can view own payouts" ON payouts;
CREATE POLICY "Agents can view own payouts" ON payouts
  FOR SELECT USING (agent_id IN (SELECT id FROM agents WHERE profile_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage payouts" ON payouts;
CREATE POLICY "Admins can manage payouts" ON payouts
  FOR ALL USING (public.is_admin());

-- Expenses
DROP POLICY IF EXISTS "Only admins can access expenses" ON expenses;
CREATE POLICY "Only admins can access expenses" ON expenses
  FOR ALL USING (public.is_admin());

-- Notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Agent Applications
DROP POLICY IF EXISTS "Anyone can apply" ON agent_applications;
CREATE POLICY "Anyone can apply" ON agent_applications
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view applications" ON agent_applications;
CREATE POLICY "Admins can view applications" ON agent_applications
    FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update applications" ON agent_applications;
CREATE POLICY "Admins can update applications" ON agent_applications
    FOR UPDATE USING (public.is_admin());

-- =============================================
-- STEP 6: SEED CARD DESIGNS
-- =============================================
INSERT INTO card_designs (id, name, description, base_msp, preview_url, status) VALUES
  ('cd111111-1111-1111-1111-111111111111', 'Vertical Blue Premium', 'Professional vertical design with blue gradient', 600, 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400', 'active'),
  ('cd222222-2222-2222-2222-222222222222', 'Horizontal Gold Elite', 'Elegant horizontal card with gold accents', 800, 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=600', 'active'),
  ('cd333333-3333-3333-3333-333333333333', 'Minimal White Classic', 'Clean minimalist design in white', 500, 'https://images.unsplash.com/photo-1541182388248-95b2e42f9eee?w=400', 'active'),
  ('cd444444-4444-4444-4444-444444444444', 'Dark Mode Professional', 'Modern dark theme for tech professionals', 700, 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400', 'active')
ON CONFLICT (id) DO UPDATE 
SET name = EXCLUDED.name, description = EXCLUDED.description, base_msp = EXCLUDED.base_msp, preview_url = EXCLUDED.preview_url;
