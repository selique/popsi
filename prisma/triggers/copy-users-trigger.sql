-- Only run this directly via Supabase or PostgreSQL
-- Because Prisma cannot access auth.users
-- Create trigger to run the function whenever a new signup happens
DROP TRIGGER IF EXISTS on_auth_user_created on auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
