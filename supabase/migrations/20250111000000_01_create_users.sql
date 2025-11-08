-- Create users table
-- This table stores all user information including wallet addresses and profiles
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT UNIQUE NOT NULL,
  email TEXT,
  username TEXT UNIQUE NOT NULL,
  name TEXT,
  bio TEXT,
  is_freelancer BOOLEAN DEFAULT false,
  reputation_score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP
);

-- Add nonce field for authentication purposes
ALTER TABLE users ADD COLUMN IF NOT EXISTS nonce TEXT;

-- Create indexes for better query performance
CREATE INDEX idx_users_wallet_address ON users(wallet_address);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_is_freelancer ON users(is_freelancer);

-- Add comments for documentation
COMMENT ON TABLE users IS 'Stores user profiles and authentication information';
COMMENT ON COLUMN users.wallet_address IS 'Blockchain wallet address for authentication and payments';
COMMENT ON COLUMN users.nonce IS 'Random nonce used for wallet signature authentication';
COMMENT ON COLUMN users.reputation_score IS 'User reputation score based on completed work and reviews';
