// User type definitions based on Supabase schema

export interface User {
  id: string;
  wallet_address: string;
  email?: string;
  username: string;
  name?: string;
  bio?: string;
  is_freelancer: boolean;
  reputation_score: number;
  created_at: string;
  last_login_at?: string;
  nonce?: string;
}

export interface CreateUserDTO {
  wallet_address: string;
  username: string;
  email?: string;
  name?: string;
  bio?: string;
  is_freelancer?: boolean;
}

export interface UpdateUserDTO {
  email?: string;
  username?: string;
  name?: string;
  bio?: string;
  is_freelancer?: boolean;
  last_login_at?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name?: string;
  bio?: string;
  reputation_score: number;
  is_freelancer: boolean;
}
