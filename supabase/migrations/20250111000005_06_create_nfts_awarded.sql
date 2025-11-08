-- Create nfts_awarded table
-- This table stores NFT awards given to users for achievements
CREATE TABLE nfts_awarded (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  nft_type TEXT NOT NULL,
  token_id_on_chain TEXT NOT NULL,
  metadata JSONB,
  minted_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_nfts_awarded_user_id ON nfts_awarded(user_id);
CREATE INDEX idx_nfts_awarded_nft_type ON nfts_awarded(nft_type);
CREATE INDEX idx_nfts_awarded_token_id ON nfts_awarded(token_id_on_chain);

-- Add comments for documentation
COMMENT ON TABLE nfts_awarded IS 'Stores NFT awards given to users for achievements and completed work';
COMMENT ON COLUMN nfts_awarded.nft_type IS 'Type of NFT awarded (e.g., completion badge, top freelancer, etc.)';
COMMENT ON COLUMN nfts_awarded.token_id_on_chain IS 'Token ID on the blockchain';
COMMENT ON COLUMN nfts_awarded.metadata IS 'Additional NFT metadata in JSON format';
