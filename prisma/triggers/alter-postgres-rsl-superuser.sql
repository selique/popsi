-- 2. Enabled RLS to all tables for public.schema
ALTER table profiles enable row level security;
ALTER table answers enable row level security;
ALTER table questions enable row level security;
ALTER table surveys enable row level security;
ALTER table _survey_invited enable row level security;
ALTER table _prisma_migrations enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

create policy "Medic can only invited one time a user."
  on _survey_invited for update
  using ( auth.uid() = id );

/**
 * REALTIME SUBSCRIPTIONS
 * Realtime enables listening to any table in your public schema.
 */

begin;
  -- remove the realtime publication
  drop publication if exists supabase_realtime;

  -- re-create the publication but don't enable it for any tables
  create publication supabase_realtime for all tables;

commit;

-- -- add a table to the publication
-- alter publication supabase_realtime add table profiles;

-- Automatically update timestamps
-- Update a column timestamp on every update.
create extension if not exists moddatetime schema extensions;

-- assuming the "table_name" and a timestamp column "updated_at"
-- this trigger will set the "updated_at" column to the current timestamp for every update
  SELECT 'create trigger handle_updated_at before update on ' || table_name || ' for each row execute procedure moddatetime(updated_at);' from information_schema.tables where table_schema = 'public';


-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible." on storage.objects
  for select using ((bucket_id = 'avatars'::text) AND (role() = 'authenticated'::text));

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check ((bucket_id = 'avatars'::text) AND (role() = 'authenticated'::text));

create policy "Anyone can update an avatar." on storage.objects
  for update with check ((bucket_id = 'avatars'::text) AND (role() = 'authenticated'::text));

create policy "Anyone can delete an avatar." on storage.objects
  for delete using ((bucket_id = 'avatars'::text) AND (role() = 'authenticated'::text));

