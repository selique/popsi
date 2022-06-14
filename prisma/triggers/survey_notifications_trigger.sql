DROP TRIGGER IF EXISTS survey_notification on public.surveys;
CREATE TRIGGER survey_notification
AFTER INSERT OR UPDATE ON public.surveys
FOR EACH ROW EXECUTE PROCEDURE public.handle_survey_notification();
