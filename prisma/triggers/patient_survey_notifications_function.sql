-- Drop trigger
DROP FUNCTION IF EXISTS handle_patient_survey_notification cascade;

-- This procedure generate frequency of invite patient for survey
create or replace function handle_patient_survey_notification() returns trigger as $$
  declare
    s_id uuid;
    m_id uuid;
  begin
    -- Get survey id
    select survey_id
    from survey_generate_invite
    where id = new.survey_generate_invite_id into s_id;

    -- Get medic ID from table surveys
    select owner_id
    from surveys
    where id = s_id into m_id;

    insert into public.surveys_notifications(
      "for",
      medic_id,
      patient_id,
      surveys_id,
      created_at
    ) values (
      'PATIENT',
      m_id,
      new.patient_id,
      s_id,
      current_timestamp
    );

    return new;
  end;
$$ language plpgsql;
