/**
 * @file Database Setup Script
 * @description Run this script to set up the initial database schema
 * 
 * Usage: npx tsx scripts/setup-database.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables. Make sure .env.local is set up.')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runSQL(sql: string, description: string) {
    console.log(`⏳ ${description}...`)
    const { error } = await supabase.rpc('exec_sql', { sql })

    if (error) {
        // Try direct query if RPC doesn't exist
        const { error: directError } = await supabase.from('_setup').select('*').limit(0)
        if (directError?.message?.includes('relation "_setup" does not exist')) {
            // Expected - table doesn't exist
        }
        console.log(`   ⚠️  Note: ${error.message}`)
        return false
    }

    console.log(`   ✅ ${description} - Done`)
    return true
}

async function setupDatabase() {
    console.log('\n🚀 TapOnce Database Setup\n')
    console.log('='.repeat(50))

    // We'll use the Supabase REST API to execute SQL
    const schema = `
-- =============================================
-- TAPONCE DATABASE SCHEMA
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

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_agents_referral_code ON agents(referral_code);
CREATE INDEX IF NOT EXISTS idx_customers_slug ON customers(slug);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_agent ON orders(agent_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read, created_at DESC);

-- =============================================
-- ENABLE ROW LEVEL SECURITY
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

-- =============================================
-- RLS POLICIES - PROFILES
-- =============================================

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================
-- RLS POLICIES - CARD DESIGNS
-- =============================================

DROP POLICY IF EXISTS "Anyone can view active designs" ON card_designs;
CREATE POLICY "Anyone can view active designs" ON card_designs
  FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Admins can manage designs" ON card_designs;
CREATE POLICY "Admins can manage designs" ON card_designs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================
-- RLS POLICIES - CUSTOMERS
-- =============================================

DROP POLICY IF EXISTS "Public can view active customers" ON customers;
CREATE POLICY "Public can view active customers" ON customers
  FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Customers can update own profile" ON customers;
CREATE POLICY "Customers can update own profile" ON customers
  FOR UPDATE USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage customers" ON customers;
CREATE POLICY "Admins can manage customers" ON customers
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================
-- RLS POLICIES - AGENTS
-- =============================================

DROP POLICY IF EXISTS "Agents can view own data" ON agents;
CREATE POLICY "Agents can view own data" ON agents
  FOR SELECT USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage agents" ON agents;
CREATE POLICY "Admins can manage agents" ON agents
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================
-- RLS POLICIES - ORDERS
-- =============================================

DROP POLICY IF EXISTS "Agents can view own orders" ON orders;
CREATE POLICY "Agents can view own orders" ON orders
  FOR SELECT USING (
    agent_id IN (SELECT id FROM agents WHERE profile_id = auth.uid())
  );

DROP POLICY IF EXISTS "Agents can create orders" ON orders;
CREATE POLICY "Agents can create orders" ON orders
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'agent')
  );

DROP POLICY IF EXISTS "Customers can view own orders" ON orders;
CREATE POLICY "Customers can view own orders" ON orders
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE profile_id = auth.uid())
  );

DROP POLICY IF EXISTS "Admins can manage orders" ON orders;
CREATE POLICY "Admins can manage orders" ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================
-- RLS POLICIES - PAYOUTS
-- =============================================

DROP POLICY IF EXISTS "Agents can view own payouts" ON payouts;
CREATE POLICY "Agents can view own payouts" ON payouts
  FOR SELECT USING (
    agent_id IN (SELECT id FROM agents WHERE profile_id = auth.uid())
  );

DROP POLICY IF EXISTS "Admins can manage payouts" ON payouts;
CREATE POLICY "Admins can manage payouts" ON payouts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================
-- RLS POLICIES - EXPENSES
-- =============================================

DROP POLICY IF EXISTS "Only admins can access expenses" ON expenses;
CREATE POLICY "Only admins can access expenses" ON expenses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =============================================
-- RLS POLICIES - NOTIFICATIONS
-- =============================================

DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- =============================================
-- TRIGGER: Create profile on user signup
-- =============================================

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
-- SEED DATA: Sample Card Designs
-- =============================================

INSERT INTO card_designs (name, description, base_msp, preview_url, status) VALUES
  ('Vertical Blue Premium', 'Professional vertical design with blue gradient', 600, '/assets/images/cards/vertical-blue.png', 'active'),
  ('Horizontal Gold Elite', 'Elegant horizontal card with gold accents', 800, '/assets/images/cards/horizontal-gold.png', 'active'),
  ('Minimal White Classic', 'Clean minimalist design in white', 500, '/assets/images/cards/minimal-white.png', 'active'),
  ('Dark Mode Professional', 'Modern dark theme for tech professionals', 700, '/assets/images/cards/dark-mode.png', 'active')
ON CONFLICT DO NOTHING;

-- =============================================
-- DONE!
-- =============================================
  `;

    console.log('\n📋 Schema ready. Please run this SQL in your Supabase Dashboard.')
    console.log('\n   1. Go to: https://supabase.com/dashboard/project/xuzdqjjvysngyereykqk/sql')
    console.log('   2. Click "New Query"')
    console.log('   3. Paste the contents of scripts/schema.sql')
    console.log('   4. Click "Run"')
    console.log('\n')
}

setupDatabase()
