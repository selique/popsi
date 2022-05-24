-- This trigger can be pasted into the first init migration
-- Copy from auth.users to public.users
DROP FUNCTION IF EXISTS handle_new_user cascade;
-- inserts a row into public.profiles table
create or replace function public.handle_new_user()
returns trigger as $$
    begin
        insert into public.profiles (id, full_name, avatar_url)
        values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
        return new;
    end;
$$ language plpgsql security definer set search_path = public;
