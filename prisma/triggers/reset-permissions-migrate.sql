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

ALTER TABLE IF EXISTS public.surveys_notifications OWNER to postgres;
GRANT ALL ON TABLE public.surveys_notifications TO authenticated;
GRANT ALL ON TABLE public.surveys_notifications TO postgres;
GRANT ALL ON TABLE public.surveys_notifications TO anon;
GRANT ALL ON TABLE public.surveys_notifications TO service_role;

ALTER TABLE IF EXISTS public._survey_invited OWNER to postgres;
GRANT ALL ON TABLE public._survey_invited TO authenticated;
GRANT ALL ON TABLE public._survey_invited TO postgres;
GRANT ALL ON TABLE public._survey_invited TO anon;
GRANT ALL ON TABLE public._survey_invited TO service_role;

ALTER TABLE IF EXISTS public.survey_generate_invite OWNER to postgres;
GRANT ALL ON TABLE public.survey_generate_invite TO authenticated;
GRANT ALL ON TABLE public.survey_generate_invite TO postgres;
GRANT ALL ON TABLE public.survey_generate_invite TO anon;
GRANT ALL ON TABLE public.survey_generate_invite TO service_role;

ALTER TABLE IF EXISTS public.messages OWNER to postgres;
GRANT ALL ON TABLE public.messages TO authenticated;
GRANT ALL ON TABLE public.messages TO postgres;
GRANT ALL ON TABLE public.messages TO anon;
GRANT ALL ON TABLE public.messages TO service_role;

ALTER TABLE IF EXISTS public.chats OWNER to postgres;
GRANT ALL ON TABLE public.chats TO authenticated;
GRANT ALL ON TABLE public.chats TO postgres;
GRANT ALL ON TABLE public.chats TO anon;
GRANT ALL ON TABLE public.chats TO service_role;
