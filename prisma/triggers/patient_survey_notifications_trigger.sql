DROP TRIGGER IF EXISTS patient_survey_notification on public.surveys;
CREATE TRIGGER patient_survey_notification
AFTER INSERT ON public._survey_invited
FOR EACH ROW EXECUTE PROCEDURE public.handle_patient_survey_notification();
