-- =============================================
-- Migration: Add Claim Token Columns to Orders
-- Run this in Supabase SQL Editor to add claim account functionality
-- =============================================

-- Add claim_token column for account claiming
ALTER TABLE orders ADD COLUMN IF NOT EXISTS claim_token TEXT UNIQUE;

-- Add claim_token_used to track if token was already used
ALTER TABLE orders ADD COLUMN IF NOT EXISTS claim_token_used BOOLEAN DEFAULT FALSE;

-- Create index for faster claim token lookups
CREATE INDEX IF NOT EXISTS idx_orders_claim_token ON orders(claim_token) WHERE claim_token IS NOT NULL;

-- Grant permissions for the columns
COMMENT ON COLUMN orders.claim_token IS 'Unique token for customers to claim their account and set password';
COMMENT ON COLUMN orders.claim_token_used IS 'Whether the claim token has been used to create an account';

-- =============================================
-- DONE! 🎉
-- Columns added: claim_token, claim_token_used
-- Index created: idx_orders_claim_token
-- =============================================
