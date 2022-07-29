create or replace function handle_patient_survey_invite() returns trigger as $$
  declare
    m_id uuid;
  begin
    select owner_id
    from surveys
    where id = new."B" into m_id;

    select
      cron.schedule(
        concat(new.id, new.patient_id, new.survey_id),
        new.schedule,
        $$
          insert into public._survey_invited(
            survey_generate_invite_id,
            patient_id,
            created_at
          ) value (
            new.id,
            new.patient_id,
            current_timestamp
          );

           insert into public.surveys_notifications(
            "for",
            medic_id,
            patient_id,
            surveys_id,
            created_at
          )
          values (
            'PATIENT',
            m_id,
            new.patient_id,
            new.id,
            current_timestamp
          );
        $$
      );

  end;
$$ language plpgsql;
