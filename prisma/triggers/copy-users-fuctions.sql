-- This trigger can be pasted into the first init migration
-- Copy from auth.users to public.users
DROP FUNCTION IF EXISTS handle_new_user cascade;
-- inserts a row into public.profiles table
create or replace function public.handle_new_user()
returns trigger 
	LANGUAGE plpgsql 
	SECURITY DEFINER
as $$
	begin
		insert into public.profiles (
			id,
			full_name,
			avatar_url,
			created_at
	) values (
		new.id,
		new.raw_user_meta_data->>'full_name',
		new.raw_user_meta_data->>'avatar_url',
		current_timestamp
		);
		return new;
	end;
$$;
