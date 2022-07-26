export const createScheduledJob = async (_schedule, invitedUsers) => {
	return await fetch(`${process.env.QSTASH_URL}survey_invite`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
			'Upstash-Cron': _schedule
		},
		body: JSON.stringify({
			invitedUsers
		})
	})
}
