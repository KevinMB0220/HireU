-- Create contracts table
-- This table stores smart contract references and escrow information
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  freelancer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID REFERENCES users(id) ON DELETE CASCADE,
  contract_on_chain_id TEXT NOT NULL,
  escrow_status TEXT DEFAULT 'pending' CHECK (escrow_status IN ('pending', 'funded', 'released', 'disputed')),
  amount_locked DECIMAL NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_contracts_project_id ON contracts(project_id);
CREATE INDEX idx_contracts_freelancer_id ON contracts(freelancer_id);
CREATE INDEX idx_contracts_client_id ON contracts(client_id);
CREATE INDEX idx_contracts_escrow_status ON contracts(escrow_status);
CREATE INDEX idx_contracts_on_chain_id ON contracts(contract_on_chain_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contracts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_contracts_updated_at
BEFORE UPDATE ON contracts
FOR EACH ROW
EXECUTE FUNCTION update_contracts_updated_at();

-- Add comments for documentation
COMMENT ON TABLE contracts IS 'Stores contract information and links to on-chain smart contracts';
COMMENT ON COLUMN contracts.contract_on_chain_id IS 'Reference to the smart contract address on the blockchain';
COMMENT ON COLUMN contracts.escrow_status IS 'Escrow status: pending, funded, released, disputed';
COMMENT ON COLUMN contracts.amount_locked IS 'Amount locked in escrow (USDT)';
