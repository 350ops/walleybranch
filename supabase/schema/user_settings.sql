-- User-specific settings that drive preferences inside the client.
create table if not exists public.user_settings (
  user_id uuid primary key references auth.users (id) on delete cascade,
  notifications_enabled boolean not null default true,
  push_tokens text[] not null default '{}'::text[],
  language text not null default 'en',
  theme text not null default 'system',
  spending_limit numeric(12,2),
  biometric_enabled boolean not null default false,
  weekly_digest boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;

drop policy if exists "manage own settings" on public.user_settings;
create policy "manage own settings"
  on public.user_settings
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.set_user_settings_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_user_settings_updated_at on public.user_settings;
create trigger set_user_settings_updated_at
  before update on public.user_settings
  for each row
  execute procedure public.set_user_settings_updated_at();

-- Ensure a settings row is created whenever a new auth user is created.
create or replace function public.handle_new_user_settings()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_settings on auth.users;
create trigger on_auth_user_created_settings
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user_settings();
