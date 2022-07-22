create or replace function handle_medic_survey_notification() returns trigger as $$
  declare
    s_id uuid;
    m_id uuid;
  begin
    select "surveysId"
    from questions
    where id = new."questionId" into s_id;

    if not exists (select from surveys_notifications where patient_id = new."profileId" and surveys_id = s_id and status = 'SENT') then
      select owner_id
      from surveys
      where id = s_id into m_id;

      update public.surveys_notifications
      set status = 'FINISHED', updated_at = current_timestamp
      where "for" = 'PATIENT' and medic_id = m_id and patient_id = new."profileId" and surveys_id = s_id;

      insert into public.surveys_notifications(
        "for",
        medic_id,
        patient_id,
        surveys_id,
        created_at
      )
      values (
        'MEDIC',
        m_id,
        new."profileId",
        s_id,
        current_timestamp
      );
    end if;
    return new;
  end;
$$ language plpgsql;
