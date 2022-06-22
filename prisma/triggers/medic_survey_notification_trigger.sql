DROP TRIGGER IF EXISTS medic_survey_notification on public.surveys;
CREATE TRIGGER medic_survey_notification
AFTER INSERT ON public.answers
FOR EACH ROW EXECUTE PROCEDURE public.handle_medic_survey_notification();
