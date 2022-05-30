-- This trigger can be pasted into the first init migration
-- Copy from auth.users to public.users
DROP FUNCTION IF EXISTS handle_new_user cascade;
-- inserts a row into public.profiles table
create or replace function public.handle_new_user()
returns trigger as $$
	begin
		insert into public.profiles (
			id,
			full_name,
			avatar_url,
			nickname,
			matrial_status,
			gender,
			gender_indentity,
			cpf,
			birth_date,
			created_at
	) values (
		new.id,
		new.raw_user_meta_data->>'full_name',
		new.raw_user_meta_data->>'avatar_url',
		new.raw_user_meta_data->>'nickname',
		new.raw_user_meta_data->>'matrial_status',
		new.raw_user_meta_data->>'gender',
		new.raw_user_meta_data->>'gender_indentity',
		new.raw_user_meta_data->>'cpf',
		new.raw_user_meta_data->>'birth_date',
		current_timestamp
		);
		return new;
	end;
$$ language plpgsql security definer set search_path = public;
