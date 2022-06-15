CREATE OR replace FUNCTION handle_survey_notification() RETURNS TRIGGER AS $$
  DECLARE
    medic_name text;
  BEGIN
    SELECT full_name
    FROM profiles
    WHERE id = NEW."profileId" INTO medic_name;

    INSERT INTO public.surveys_notifications(
      id,
      status,
      medic_id,
      surveys_id,
      created_at
    )
    VALUES (
      uuid_generate_v1(),
      'CREATED',
      NEW."profileId",
      NEW.id,
      CURRENT_TIMESTAMP
    );

    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;
