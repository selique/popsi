create or replace function handle_patient_survey_notification() returns trigger as $$
  declare
    m_id uuid;
    medic_name text;
    survey_name text;
  begin
    select owner_id
    from surveys
    where id = new."B" into m_id;

    select nickname
    from profiles
    where id = m_id into medic_name;

    select title
    from surveys
    where id = new."B" into survey_name;

    insert into public.surveys_notifications(
      id,
      "for",
      medic_id,
      patient_id,
      surveys_id,
      created_at
    )
    values (
      uuid_generate_v1(),
      'PATIENT',
      m_id,
      NEW."A",
      NEW."B",
      current_timestamp
    );

    return new;
  end;
$$ language plpgsql;
