-- This trigger can be pasted into the first init migration
-- Copy from auth.users to public.users
DROP FUNCTION IF EXISTS handle_new_user cascade;
-- inserts a row into public.profiles table
create or replace function public.handle_new_user()
	returns trigger
	language plpgsql
	security definer set search_path = public
as $$
	begin
		insert into public.profiles (
			id,
			full_name,
			avatar_url,
			nickname,
			gender_identity,
			pronoun,
			cpf,
			birth_date,
			medic_id,
			"role",
			created_at
	) values (
		new.id,
		new.raw_user_meta_data->>'full_name',
		new.raw_user_meta_data->>'avatar_url',
		new.raw_user_meta_data->>'nickname',
		new.raw_user_meta_data->>'gender_identity',
		new.raw_user_meta_data->>'pronoun',
		new.raw_user_meta_data->>'cpf',
		to_date(new.raw_user_meta_data->>'birth_date', 'YYYY-MM-DD'),
		(new.raw_user_meta_data->>'medic_id')::uuid,
		(new.raw_user_meta_data->>'role')::roles,
		current_timestamp
		);

		if new.raw_user_meta_data->>'medic_id' is not null then
			insert into public.chats (
				medic_id,
				patient_id
			) values (
				(new.raw_user_meta_data->>'medic_id')::uuid,
				new.id
			);
		end if;

		return new;
	end;
$$;
