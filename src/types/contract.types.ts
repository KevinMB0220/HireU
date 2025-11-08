// Contract type definitions based on Supabase schema

export type EscrowStatus = 'pending' | 'funded' | 'released' | 'disputed';

export interface Contract {
  id: string;
  project_id?: string;
  freelancer_id: string;
  client_id: string;
  contract_on_chain_id: string;
  escrow_status: EscrowStatus;
  amount_locked: number;
  created_at: string;
  updated_at: string;
}

export interface CreateContractDTO {
  project_id?: string;
  freelancer_id: string;
  client_id: string;
  contract_on_chain_id: string;
  amount_locked: number;
}

export interface UpdateContractDTO {
  escrow_status?: EscrowStatus;
}

export interface ContractWithUsers extends Contract {
  freelancer: {
    id: string;
    username: string;
    name?: string;
    wallet_address: string;
  };
  client: {
    id: string;
    username: string;
    name?: string;
    wallet_address: string;
  };
}
