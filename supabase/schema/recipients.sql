-- Recipients represent the contacts a user can send funds to.
create table if not exists public.recipients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  email text,
  phone text,
  avatar_url text,
  account_last4 text,
  created_at timestamptz not null default now()
);

alter table public.recipients enable row level security;

drop policy if exists "select own recipients" on public.recipients;
create policy "select own recipients"
  on public.recipients
  for select
  using (auth.uid() = user_id);

drop policy if exists "insert own recipients" on public.recipients;
create policy "insert own recipients"
  on public.recipients
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "update own recipients" on public.recipients;
create policy "update own recipients"
  on public.recipients
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "delete own recipients" on public.recipients;
create policy "delete own recipients"
  on public.recipients
  for delete
  using (auth.uid() = user_id);
