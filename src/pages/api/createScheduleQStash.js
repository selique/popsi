import { verifySignature } from '@upstash/qstash/nextjs'

import { supabaseSuper } from './../../utils/supabaseClient'

async function handler(_, res) {
	const { invitedUsers } = res.req.body

	if (!invitedUsers) {
		console.error('Missing invitedUsers', res.req.body)

		res.status(400).json({
			error: 'Missing invitedUsers'
		})
		return
	}

	const { data, error } = await supabaseSuper
		.from('_survey_invited')
		.insert(invitedUsers)

	if (error) {
		console.error({ error })
		res.status(500).json({ error })
		return
	}

	res.status(200).json({ data })
}

export default verifySignature(handler, {
	currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
	nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
	url: process.env.QSTASH_URL
})

export const config = {
	api: {
		bodyParser: false
	}
}
