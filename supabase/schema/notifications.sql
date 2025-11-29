-- In-app notifications (used for bell badge + inbox view).
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  body text,
  type text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_read_idx on public.notifications (user_id, read, created_at desc);

alter table public.notifications enable row level security;

drop policy if exists "select own notifications" on public.notifications;
create policy "select own notifications"
  on public.notifications
  for select
  using (auth.uid() = user_id);

drop policy if exists "insert own notifications" on public.notifications;
create policy "insert own notifications"
  on public.notifications
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "update own notifications" on public.notifications;
create policy "update own notifications"
  on public.notifications
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "delete own notifications" on public.notifications;
create policy "delete own notifications"
  on public.notifications
  for delete
  using (auth.uid() = user_id);
