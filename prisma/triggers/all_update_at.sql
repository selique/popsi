create extension if not exists moddatetime schema extensions;

create trigger handle_updated_at before update on _survey_invited
  for each row execute procedure moddatetime (updated_at);
