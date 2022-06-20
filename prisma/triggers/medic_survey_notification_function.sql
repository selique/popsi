create or replace function handle_medic_survey_notification() returns trigger as $$
  declare
    s_id uuid;
    m_id uuid;
  begin
    select "surveysId"
    from question
    where id = new."questionId" into s_id;

    select id
    from surveys_notifications
    where patient_id = new."profileId" and surveys_id = s_id and status = 'SENT';

    if not found then
      select owner_id
      from surveys
      where id = s_id into m_id;

      insert into public.surveys_notifications(
        id,
        "for",
        medic_id,
        patient_id,
        survey_id,
        created_at
      )
      values (
        uuid_generate_v1(),
        'MEDIC',
        m_id,
        new."profileId",
        s_id,
        current_timestamp
      );

      return new;
    end if;
  end;
$$ language plpgsql;
