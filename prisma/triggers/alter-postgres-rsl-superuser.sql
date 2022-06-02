-- 2. Enabled RLS to all tables for public.schema
ALTER table profiles enable row level security;
ALTER table answers enable row level security;
ALTER table questions enable row level security;
ALTER table surveys enable row level security;
ALTER table _prisma_migrations enable row level security;


CREATE POLICY "Enable read access to everyone"
	ON "public"."profiles"
	FOR SELECT USING (true);

CREATE POLICY "Enable insert access for authenticated users only"
	ON "public"."profiles" FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update access for users based  on their user ID"
	ON "public"."profiles" FOR UPDATE
	USING (auth.uid() = id)
	WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable delete access for users based on their user ID"
	ON "public"."profiles"
	FOR DELETE USING (auth.uid() = id);

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
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update an avatar." on storage.objects
  for update with check (bucket_id = 'avatars');

-- --
-- grant usage on schema public to postgres, anon, authenticated, service_role;
-- ALTER default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
-- ALTER default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
-- ALTER default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;

-- -- These are required so that the users receive grants whenever "supabase_admin" creates tables/function
-- ALTER default privileges for user supabase_admin in schema public grant all
--     on sequences to postgres, anon, authenticated, service_role;
-- ALTER default privileges for user supabase_admin in schema public grant all
--     on tables to postgres, anon, authenticated, service_role;
-- ALTER default privileges for user supabase_admin in schema public grant all
--     on functions to postgres, anon, authenticated, service_role;
