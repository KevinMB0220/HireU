// Wallet type definitions based on Supabase schema

export type WalletType = 'invisible' | 'external';

export interface Wallet {
  id: string;
  user_id: string;
  address: string;
  encrypted_private_key?: string;
  type: WalletType;
  created_at: string;
}

export interface CreateWalletDTO {
  user_id: string;
  address: string;
  encrypted_private_key?: string;
  type: WalletType;
}

export interface WalletWithPrivateKey extends Omit<Wallet, 'encrypted_private_key'> {
  private_key: string;
}

export interface GenerateWalletResult {
  wallet: Wallet;
  publicKey: string;
  privateKey?: string; // Only for invisible wallets during initial generation
}
