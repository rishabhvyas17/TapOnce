-- TapOnce Seed Data for Supabase
-- Based on exact table definitions
-- 
-- NOTE: This script first CLEARS existing data, then inserts fresh test data.
-- Run this in Supabase SQL Editor.

-- ============================================
-- STEP 1: CLEAR EXISTING DATA (in correct order for FK constraints)
-- ============================================
DELETE FROM agent_msps;
DELETE FROM payouts;
DELETE FROM expenses;
DELETE FROM orders;
DELETE FROM customers;
DELETE FROM agents;
-- DO NOT delete profiles - they are linked to auth.users

-- ============================================
-- STEP 2: UPDATE EXISTING PROFILES
-- ============================================
UPDATE profiles SET phone = '+919999900000', avatar_url = NULL WHERE role = 'admin';
UPDATE profiles SET phone = '+919876543210', avatar_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' WHERE role = 'agent';
UPDATE profiles SET phone = '+919876543100', avatar_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' WHERE role = 'customer';

-- ============================================
-- STEP 3: CARD DESIGNS
-- ============================================
INSERT INTO card_designs (id, name, description, base_msp, preview_url, template_url, status, total_sales) VALUES
('cd111111-1111-1111-1111-111111111111', 'Vertical Blue Premium', 'Professional vertical design with blue gradient.', 600, 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=600&fit=crop', NULL, 'active', 42),
('cd222222-2222-2222-2222-222222222222', 'Horizontal Gold Elite', 'Premium horizontal card with gold foil accents.', 800, 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=600&h=400&fit=crop', NULL, 'active', 28),
('cd333333-3333-3333-3333-333333333333', 'Minimal White Pro', 'Clean, minimalist design.', 550, 'https://images.unsplash.com/photo-1541182388248-95b2e42f9eee?w=400&h=600&fit=crop', NULL, 'active', 35),
('cd444444-4444-4444-4444-444444444444', 'Dark Mode Executive', 'Sleek dark theme for professionals.', 700, 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop', NULL, 'active', 19),
('cd555555-5555-5555-5555-555555555555', 'Corporate Classic', 'Traditional styling with NFC.', 500, 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=400&h=600&fit=crop', NULL, 'inactive', 15),
('cd666666-6666-6666-6666-666666666666', 'Gradient Sunset', 'Vibrant gradient design.', 650, 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=600&fit=crop', NULL, 'active', 22)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, base_msp = EXCLUDED.base_msp;

-- ============================================
-- STEP 4: AGENT (linked to existing agent profile)
-- ============================================
INSERT INTO agents (id, profile_id, referral_code, city, upi_id, bank_account, bank_ifsc, bank_holder_name, base_commission, parent_agent_id, status, total_sales, total_earnings, available_balance)
SELECT 
    'a0000001-0001-0001-0001-000000000001',
    id,
    'PRINCE10',
    'Delhi',
    'prince@oksbi',
    NULL,
    NULL,
    'Prince Yadav',
    100.00,
    NULL,
    'active',
    45,
    12600.00,
    2300.00
FROM profiles 
WHERE role = 'agent'
LIMIT 1;

-- ============================================
-- STEP 5: CUSTOMER (linked to existing customer profile)
-- ============================================
INSERT INTO customers (id, profile_id, slug, company, job_title, bio, whatsapp, linkedin_url, instagram_url, facebook_url, twitter_url, website_url, custom_links, status)
SELECT 
    'c0000001-0001-0001-0001-000000000001',
    id,
    'rahul-verma',
    'Tech Solutions Pvt Ltd',
    'Founder & CEO',
    'Passionate entrepreneur building innovative tech solutions. 10+ years of experience.',
    '+919876543100',
    'https://linkedin.com/in/rahulverma',
    'https://instagram.com/rahulverma',
    NULL,
    'https://twitter.com/rahulverma',
    'https://rahulverma.com',
    '[]'::jsonb,
    'active'
FROM profiles 
WHERE role = 'customer'
LIMIT 1;

-- ============================================
-- STEP 6: ORDERS (order_number is auto-generated SERIAL)
-- ============================================
-- Note: order_number is SERIAL, so we don't specify it

INSERT INTO orders (id, customer_id, agent_id, card_design_id, customer_name, customer_company, customer_phone, customer_email, customer_whatsapp, customer_photo_url, line1_text, line2_text, msp_at_order, sale_price, commission_amount, override_commission, status, payment_status, is_direct_sale, is_below_msp, portfolio_slug, special_instructions, created_at) VALUES
-- Paid orders
('aaaa1111-1111-1111-1111-111111111111', 'c0000001-0001-0001-0001-000000000001', 'a0000001-0001-0001-0001-000000000001', 'cd111111-1111-1111-1111-111111111111', 'Rahul Verma', 'Tech Solutions', '9876543100', 'rahul@tech.com', '9876543100', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'RAHUL VERMA', 'Founder & CEO', 600, 850, 225, 0, 'paid', 'paid', false, false, 'rahul-verma', NULL, NOW() - INTERVAL '12 days'),

('aaaa2222-2222-2222-2222-222222222222', NULL, 'a0000001-0001-0001-0001-000000000001', 'cd222222-2222-2222-2222-222222222222', 'Dr. Priya Sharma', 'Apollo Hospitals', '9876543101', 'priya@apollo.com', NULL, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400', 'DR. PRIYA SHARMA', 'Cardiologist', 800, 900, 150, 0, 'paid', 'paid', false, false, NULL, NULL, NOW() - INTERVAL '10 days'),

-- Delivered (COD pending)
('aaaa3333-3333-3333-3333-333333333333', NULL, 'a0000001-0001-0001-0001-000000000001', 'cd333333-3333-3333-3333-333333333333', 'Arjun Patel', 'Freelance Design', '9876543102', 'arjun@design.co', '9876543102', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', 'ARJUN PATEL', 'UI/UX Designer', 550, 700, 175, 0, 'delivered', 'cod', false, false, NULL, NULL, NOW() - INTERVAL '8 days'),

-- Shipped
('aaaa4444-4444-4444-4444-444444444444', NULL, 'a0000001-0001-0001-0001-000000000001', 'cd444444-4444-4444-4444-444444444444', 'Sneha Kapoor', 'Influencer', '9876543103', 'sneha@gmail.com', '9876543103', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', 'SNEHA KAPOOR', 'Content Creator', 700, 950, 225, 0, 'shipped', 'advance_paid', false, false, NULL, 'Urgent delivery', NOW() - INTERVAL '5 days'),

-- Printing
('aaaa5555-5555-5555-5555-555555555555', NULL, 'a0000001-0001-0001-0001-000000000001', 'cd666666-6666-6666-6666-666666666666', 'Vikram Singh', 'StartupX', '9876543105', 'vikram@startup.io', NULL, NULL, 'VIKRAM SINGH', 'Co-Founder', 650, 750, 150, 0, 'printing', 'paid', false, false, NULL, NULL, NOW() - INTERVAL '3 days'),

-- Approved
('aaaa6666-6666-6666-6666-666666666666', NULL, 'a0000001-0001-0001-0001-000000000001', 'cd111111-1111-1111-1111-111111111111', 'Meera Joshi', 'Global Consulting', '9876543106', 'meera@consult.com', NULL, NULL, 'MEERA JOSHI', 'Managing Partner', 600, 1000, 300, 0, 'approved', 'paid', false, false, NULL, NULL, NOW() - INTERVAL '2 days'),

-- Pending Approval
('aaaa7777-7777-7777-7777-777777777777', NULL, 'a0000001-0001-0001-0001-000000000001', 'cd222222-2222-2222-2222-222222222222', 'Ravi Kumar', 'TechStart', '9876543107', 'ravi@tech.in', NULL, NULL, 'RAVI KUMAR', 'CTO', 800, 800, 100, 0, 'pending_approval', 'pending', false, false, NULL, NULL, NOW() - INTERVAL '12 hours'),

-- Pending Approval (Below MSP)
('aaaa8888-8888-8888-8888-888888888888', NULL, 'a0000001-0001-0001-0001-000000000001', 'cd444444-4444-4444-4444-444444444444', 'Sanjay Patil', 'Local Business', '9876543108', 'sanjay@local.com', NULL, NULL, 'SANJAY PATIL', 'Owner', 700, 500, 0, 0, 'pending_approval', 'pending', false, true, NULL, 'Discount requested', NOW() - INTERVAL '6 hours'),

-- Direct sale (no agent)
('aaaa9999-9999-9999-9999-999999999999', NULL, NULL, 'cd111111-1111-1111-1111-111111111111', 'Kavita Reddy', 'Reddy Industries', '9876543109', 'kavita@reddy.com', NULL, NULL, 'KAVITA REDDY', 'Director', 600, 1200, 0, 0, 'paid', 'paid', true, false, NULL, NULL, NOW() - INTERVAL '7 days');

-- ============================================
-- STEP 7: EXPENSES (category: printing, shipping, agent_commission, marketing, other)
-- ============================================
INSERT INTO expenses (id, category, amount, description, expense_date, order_id, agent_payout_id) VALUES
('eeee1111-1111-1111-1111-111111111111', 'printing', 7500, 'Batch print - 50 cards (Week 1)', CURRENT_DATE - 14, NULL, NULL),
('eeee2222-2222-2222-2222-222222222222', 'shipping', 1250, 'Blue Dart courier charges', CURRENT_DATE - 10, NULL, NULL),
('eeee3333-3333-3333-3333-333333333333', 'other', 3000, 'Premium packaging boxes from PackagingHub', CURRENT_DATE - 7, NULL, NULL),
('eeee4444-4444-4444-4444-444444444444', 'marketing', 5000, 'Instagram ads campaign (January)', CURRENT_DATE - 5, NULL, NULL),
('eeee5555-5555-5555-5555-555555555555', 'printing', 4500, 'Batch print - 30 cards (Week 2)', CURRENT_DATE - 3, NULL, NULL),
('eeee6666-6666-6666-6666-666666666666', 'other', 800, 'Office supplies', CURRENT_DATE - 2, NULL, NULL);

-- ============================================
-- STEP 8: PAYOUTS (for Prince)
-- ============================================
INSERT INTO payouts (id, agent_id, amount, payment_method, admin_notes, status, created_at) VALUES
('bbbb1111-1111-1111-1111-111111111111', 'a0000001-0001-0001-0001-000000000001', 5000, 'upi', 'Paid via UPI to prince@oksbi', 'completed', NOW() - INTERVAL '20 days'),
('bbbb2222-2222-2222-2222-222222222222', 'a0000001-0001-0001-0001-000000000001', 3500, 'bank_transfer', 'NEFT to HDFC acc ending 4521', 'completed', NOW() - INTERVAL '10 days'),
('bbbb3333-3333-3333-3333-333333333333', 'a0000001-0001-0001-0001-000000000001', 1800, 'cash', 'Cash handover at office', 'completed', NOW() - INTERVAL '5 days');

-- ============================================
-- STEP 9: AGENT MSPs (custom pricing - uses msp_amount not custom_msp)
-- ============================================
INSERT INTO agent_msps (id, agent_id, card_design_id, msp_amount) VALUES
('cccc1111-1111-1111-1111-111111111111', 'a0000001-0001-0001-0001-000000000001', 'cd111111-1111-1111-1111-111111111111', 550),
('cccc2222-2222-2222-2222-222222222222', 'a0000001-0001-0001-0001-000000000001', 'cd222222-2222-2222-2222-222222222222', 750);

-- ============================================
-- DONE! Summary:
-- ============================================
-- ✅ 3 Profiles updated (phone + avatar)
-- ✅ 6 Card Designs
-- ✅ 1 Agent (Prince)
-- ✅ 1 Customer (Rahul Verma with slug: rahul-verma)
-- ✅ 9 Orders (various statuses for Kanban)
-- ✅ 6 Expenses
-- ✅ 3 Payouts
-- ✅ 2 Agent MSPs (custom pricing)
