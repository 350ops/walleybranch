# Walley - Digital Wallet Template

Thank you for buying the Walley Wallet template!

## Features

- Built with Expo, React Native & Nativewind
- Dark/light mode
- Fully customizable components
- TypeScript 

## Getting Started

```bash
# Use Node.js v20
nvm use 20

# Install dependencies
npm install

# Handle peer dependency issues
npm install --legacy-peer-deps

# Start the Expo development server with a clean cache
npx expo start -c
```

## Supabase Setup

The database schema and RLS policies now live under `supabase/schema`. Run each file from psql or the Supabase SQL editor in this order:

1. `profiles.sql` (creates profiles table + trigger)
2. `recipients.sql`
3. `cards.sql`
4. `transactions.sql`
5. `user_settings.sql`
6. `notifications.sql`
7. `accounts.sql`

`supabase_schema.sql` contains storage policies plus notes on how to include the new scripts. Make sure the private `avatars` bucket exists.

## Data Layer

`contexts/DataContext.tsx` exposes a `SupabaseDataProvider` that caches profile, cards, recipients, transactions, user settings, notifications, and account balances. The app is wrapped with this provider in `app/_layout.tsx`, and typed hooks live under `hooks/` (e.g., `useCards`, `useRecipients`, `useTransactions`, etc.).

The data layer automatically:

- Reacts to Supabase auth session changes
- Refreshes cached data when the app returns to the foreground
- Provides mutation helpers (`addCard`, `addRecipient`, `updateProfile`, `updateUserSettings`, `markNotificationAsRead`, etc.)

Use the hooks in screens/components instead of manual Supabase calls so that cached data stays in sync across the app.
