// NFT type definitions based on Supabase schema

export interface NFTAwarded {
  id: string;
  user_id: string;
  nft_type: string;
  token_id_on_chain: string;
  metadata?: Record<string, any>;
  minted_at: string;
}

export interface CreateNFTAwardedDTO {
  user_id: string;
  nft_type: string;
  token_id_on_chain: string;
  metadata?: Record<string, any>;
}

export interface NFTWithUser extends NFTAwarded {
  user: {
    id: string;
    username: string;
    name?: string;
  };
}

// Common NFT types
export enum NFTType {
  COMPLETION_BADGE = 'completion_badge',
  TOP_FREELANCER = 'top_freelancer',
  VERIFIED_CLIENT = 'verified_client',
  MILESTONE_ACHIEVER = 'milestone_achiever',
  FIVE_STAR_RATING = 'five_star_rating',
}
