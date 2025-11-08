# Supabase Database Setup

This directory contains all database migrations and setup for the HireU platform.

## Database Structure

The database schema is designed to support a decentralized freelance platform with smart contract integration:

### Tables

1. **users** - User profiles and authentication
   - Stores wallet addresses, usernames, profiles
   - Tracks freelancer status and reputation scores
   - Supports nonce-based wallet authentication

2. **wallets** - Wallet management
   - Supports both invisible (platform-generated) and external wallets
   - Stores encrypted private keys for invisible wallets
   - Links wallets to user accounts

3. **projects** - Project postings
   - Created by clients looking for freelancers
   - Includes budget, description, and status tracking
   - Supports categorization

4. **contracts** - Smart contract references
   - Links to on-chain smart contracts
   - Tracks escrow status (pending, funded, released, disputed)
   - Connects clients, freelancers, and projects

5. **reviews** - User reviews
   - 1-5 star rating system
   - One review per user per contract
   - Builds reputation scores

6. **nfts_awarded** - Achievement NFTs
   - Tracks NFTs awarded to users
   - Stores on-chain token IDs
   - Flexible metadata storage

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Save your project reference ID

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

You can find these in your Supabase dashboard under **Project Settings → API**.

### 3. Install Supabase CLI

```bash
npm install -g supabase
```

### 4. Login and Link Project

```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
```

### 5. Push Migrations

Run all migrations to set up your database:

```bash
npx supabase db push
```

## Migrations

Migrations are stored in `supabase/migrations/` and are numbered for sequential execution:

- `20250111000000_01_create_users.sql` - User table
- `20250111000001_02_create_wallets.sql` - Wallet table
- `20250111000002_03_create_projects.sql` - Projects table
- `20250111000003_04_create_contracts.sql` - Contracts table
- `20250111000004_05_create_reviews.sql` - Reviews table
- `20250111000005_06_create_nfts_awarded.sql` - NFT awards table

## TypeScript Types

All database types are defined in `src/types/` for type-safe database access:

- `user.types.ts` - User-related types
- `wallet.types.ts` - Wallet types
- `project.types.ts` - Project types
- `contract.types.ts` - Contract types
- `review.types.ts` - Review types
- `nft.types.ts` - NFT types

## Usage Example

```typescript
import { supabase } from '@/lib/supabase';
import { User, CreateUserDTO } from '@/types/user.types';

// Create a new user
const newUser: CreateUserDTO = {
  wallet_address: '0x1234...',
  username: 'johndoe',
  is_freelancer: true
};

const { data, error } = await supabase
  .from('users')
  .insert(newUser)
  .select()
  .single();
```

## Integration with Smart Contracts

The database is designed to work alongside Avalanche smart contracts:

- **contracts** table stores references to on-chain contracts via `contract_on_chain_id`
- **wallets** table manages both platform wallets and user-connected wallets
- **nfts_awarded** tracks achievement NFTs minted on-chain
- All payment amounts are stored in USDT decimals

## Security Notes

- Never commit `.env.local` or any files with real credentials
- Private keys are always encrypted before storage
- Row-level security policies should be configured in Supabase dashboard
- Use service role key only on the backend, never expose it to the client
