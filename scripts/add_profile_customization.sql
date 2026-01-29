-- =============================================
-- ADD PROFILE CUSTOMIZATION FIELDS
-- Run this in Supabase SQL Editor
-- =============================================

-- Add profession field to customers table
ALTER TABLE customers ADD COLUMN IF NOT EXISTS profession TEXT 
    CHECK (profession IN (
        'ceo', 'doctor', 'lawyer', 'realtor', 'influencer', 
        'designer', 'consultant', 'sales', 'entrepreneur', 
        'musician', 'photographer', 'coach', 'teacher', 
        'student', 'freelancer', 'other'
    ));

-- Add theme selection field
ALTER TABLE customers ADD COLUMN IF NOT EXISTS theme_preset TEXT 
    CHECK (theme_preset IN (
        'midnight', 'ocean', 'sunset', 'forest', 
        'minimal', 'neon', 'professional', 'custom'
    ));

-- Add custom accent color for 'custom' theme
ALTER TABLE customers ADD COLUMN IF NOT EXISTS accent_color TEXT;

-- Add tagline field
ALTER TABLE customers ADD COLUMN IF NOT EXISTS tagline TEXT;

-- Add location field
ALTER TABLE customers ADD COLUMN IF NOT EXISTS location TEXT;

-- Add custom CTA button fields
ALTER TABLE customers ADD COLUMN IF NOT EXISTS cta_text TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS cta_url TEXT;

-- Set default theme for existing customers
UPDATE customers SET theme_preset = 'midnight' WHERE theme_preset IS NULL;
UPDATE customers SET profession = 'other' WHERE profession IS NULL;

-- Add index for faster slug lookups (if not exists)
CREATE INDEX IF NOT EXISTS idx_customers_slug ON customers(slug);

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'customers' 
ORDER BY ordinal_position;
