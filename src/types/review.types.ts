// Review type definitions based on Supabase schema

export interface Review {
  id: string;
  from_user_id: string;
  to_user_id: string;
  contract_id: string;
  rating: number; // 1-5
  comment?: string;
  created_at: string;
}

export interface CreateReviewDTO {
  from_user_id: string;
  to_user_id: string;
  contract_id: string;
  rating: number;
  comment?: string;
}

export interface ReviewWithUsers extends Review {
  from_user: {
    id: string;
    username: string;
    name?: string;
  };
  to_user: {
    id: string;
    username: string;
    name?: string;
  };
}
