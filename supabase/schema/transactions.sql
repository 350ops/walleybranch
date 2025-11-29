-- Transaction history for user cards.
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  card_id uuid references public.cards (id) on delete set null,
  recipient_id uuid references public.recipients (id) on delete set null,
  merchant_name text not null,
  category text,
  amount numeric(12,2) not null,
  payment_method text,
  icon_url text,
  status text default 'completed',
  created_at timestamptz not null default now()
);

create index if not exists transactions_user_created_idx on public.transactions (user_id, created_at desc);

alter table public.transactions enable row level security;

drop policy if exists "select own transactions" on public.transactions;
create policy "select own transactions"
  on public.transactions
  for select
  using (auth.uid() = user_id);

drop policy if exists "insert own transactions" on public.transactions;
create policy "insert own transactions"
  on public.transactions
  for insert
  with check (
    auth.uid() = user_id
    and (
      card_id is null
      or exists (
        select 1 from public.cards c
        where c.id = public.transactions.card_id
          and c.user_id = auth.uid()
      )
    )
  );

drop policy if exists "update own transactions" on public.transactions;
create policy "update own transactions"
  on public.transactions
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "delete own transactions" on public.transactions;
create policy "delete own transactions"
  on public.transactions
  for delete
  using (auth.uid() = user_id);
