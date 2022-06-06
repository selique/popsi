ALTER TABLE IF EXISTS public.profiles OWNER to postgres;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO postgres;
GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO service_role;

ALTER TABLE IF EXISTS public.surveys OWNER to postgres;
GRANT ALL ON TABLE public.surveys TO authenticated;
GRANT ALL ON TABLE public.surveys TO postgres;
GRANT ALL ON TABLE public.surveys TO anon;
GRANT ALL ON TABLE public.surveys TO service_role;

ALTER TABLE IF EXISTS public.questions OWNER to postgres;
GRANT ALL ON TABLE public.questions TO authenticated;
GRANT ALL ON TABLE public.questions TO postgres;
GRANT ALL ON TABLE public.questions TO anon;
GRANT ALL ON TABLE public.questions TO service_role;

ALTER TABLE IF EXISTS public.answers OWNER to postgres;
GRANT ALL ON TABLE public.answers TO authenticated;
GRANT ALL ON TABLE public.answers TO postgres;
GRANT ALL ON TABLE public.answers TO anon;
GRANT ALL ON TABLE public.answers TO service_role;
