-- Master schema entry point.
-- Run each table migration located in supabase/schema/*
-- Example (inside psql):
--   \i supabase/schema/profiles.sql
--   \i supabase/schema/recipients.sql
--   ...
-- Storage policies remain here for convenience.

-- Add Storage Policies (Run this if you haven't set them up in the UI)

-- Allow public viewing of avatars
create policy "Avatar images are publicly accessible." on storage.objects
  for select using ( bucket_id = 'avatars' );

-- Allow authenticated users to upload avatars
create policy "Anyone can upload an avatar." on storage.objects
  for insert with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );

-- Allow users to update their own avatars
create policy "Users can update their own avatar." on storage.objects
  for update using ( bucket_id = 'avatars' and auth.uid() = owner )
  with check ( bucket_id = 'avatars' and auth.uid() = owner );

-- Note: If you get an error saying policies already exist, that's fine!
-- It means you are already set up.
