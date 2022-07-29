grant usage on schema public to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;

alter default privileges for user supabase_admin in schema public grant all
    on sequences to postgres, anon, authenticated, service_role;
alter default privileges for user supabase_admin in schema public grant all
    on tables to postgres, anon, authenticated, service_role;
alter default privileges for user supabase_admin in schema public grant all
    on functions to postgres, anon, authenticated, service_role;

-- grant usage on schema cron to {{DB user}};
-- grant all privileges on all tables in schema cron to {{DB user}};
