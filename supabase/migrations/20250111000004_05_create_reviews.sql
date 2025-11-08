-- Create reviews table
-- This table stores reviews between users for completed contracts
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT one_review_per_contract UNIQUE (from_user_id, contract_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_reviews_from_user_id ON reviews(from_user_id);
CREATE INDEX idx_reviews_to_user_id ON reviews(to_user_id);
CREATE INDEX idx_reviews_contract_id ON reviews(contract_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Add comments for documentation
COMMENT ON TABLE reviews IS 'Stores reviews between users for completed work';
COMMENT ON COLUMN reviews.rating IS 'Rating from 1 to 5 stars';
COMMENT ON CONSTRAINT one_review_per_contract ON reviews IS 'Ensures one review per user per contract';
