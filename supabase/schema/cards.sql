-- Virtual cards associated with a user account.
create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  card_number_last4 text not null,
  expiry_month int not null,
  expiry_year int not null,
  color_scheme text default 'midnight',
  card_brand text default 'Visa',
  nickname text,
  is_default boolean default false,
  created_at timestamptz not null default now()
);

create unique index if not exists cards_user_default_idx
  on public.cards (user_id)
  where is_default;

alter table public.cards enable row level security;

drop policy if exists "select own cards" on public.cards;
create policy "select own cards"
  on public.cards
  for select
  using (auth.uid() = user_id);

drop policy if exists "insert own cards" on public.cards;
create policy "insert own cards"
  on public.cards
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "update own cards" on public.cards;
create policy "update own cards"
  on public.cards
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "delete own cards" on public.cards;
create policy "delete own cards"
  on public.cards
  for delete
  using (auth.uid() = user_id);
