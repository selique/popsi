module.exports = {
	env: {
		SITE_URL: process.env.SITE_URL,
		QSTASH_URL: process.env.QSTASH_URL,
		QSTASH_TOKEN: process.env.QSTASH_TOKEN,
		QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
		QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY,
		SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
	},
	generateBuildId: async () => {
		// You can, for example, get the latest git commit hash here
		return 'popsicle'
	}
}
