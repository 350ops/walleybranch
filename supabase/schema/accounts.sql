-- Optional accounts table for balances/analytics dashboards.
create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  balance numeric(12,2) not null default 0,
  available_balance numeric(12,2) not null default 0,
  currency text not null default 'USD',
  updated_at timestamptz not null default now()
);

create unique index if not exists accounts_user_unique on public.accounts (user_id);

alter table public.accounts enable row level security;

drop policy if exists "manage own accounts" on public.accounts;
create policy "manage own accounts"
  on public.accounts
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.set_accounts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_accounts_updated_at on public.accounts;
create trigger set_accounts_updated_at
  before update on public.accounts
  for each row
  execute procedure public.set_accounts_updated_at();

-- Auto-create an account shell for each new auth user.
create or replace function public.handle_new_user_account()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.accounts (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_account on auth.users;
create trigger on_auth_user_created_account
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user_account();
