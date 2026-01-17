-- FIX: RLS Policies with Infinite Recursion
-- Run this in Supabase SQL Editor to fix the profile lookup issue

-- Drop problematic policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create simpler policies without recursion
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admin policy that doesn't cause recursion
-- Use a subquery with security definer function instead
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    auth.uid() = id OR public.is_admin()
  );

-- Fix card_designs policy
DROP POLICY IF EXISTS "Admins can manage designs" ON card_designs;
CREATE POLICY "Admins can manage designs" ON card_designs
  FOR ALL USING (public.is_admin());

-- Fix agents policy
DROP POLICY IF EXISTS "Admins can manage agents" ON agents;
CREATE POLICY "Admins can manage agents" ON agents
  FOR ALL USING (public.is_admin());

-- Fix customers policy
DROP POLICY IF EXISTS "Admins can manage customers" ON customers;
CREATE POLICY "Admins can manage customers" ON customers
  FOR ALL USING (public.is_admin());

-- Fix orders policy
DROP POLICY IF EXISTS "Admins can manage orders" ON orders;
CREATE POLICY "Admins can manage orders" ON orders
  FOR ALL USING (public.is_admin());

-- Fix payouts policy
DROP POLICY IF EXISTS "Admins can manage payouts" ON payouts;
CREATE POLICY "Admins can manage payouts" ON payouts
  FOR ALL USING (public.is_admin());

-- Fix expenses policy
DROP POLICY IF EXISTS "Only admins can access expenses" ON expenses;
CREATE POLICY "Only admins can access expenses" ON expenses
  FOR ALL USING (public.is_admin());

-- DONE!
