const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const nextConfig = {
	reactStrictMode: true,
	basePath: '',
	images: {
		domains: ['images.unsplash.com']
	}
}

module.exports = {
	async redirects() {
		return [
			{
				source: '/(.*)',
				destination: '/index.html',
				permanent: true
			},
			{
				source: '/app/:path*',
				destination: '/index.html',
				permanent: true
			}
		]
	},
	env: {
		SITE_URL: process.env.SITE_URL,
		QSTASH_URL: process.env.QSTASH_URL,
		QSTASH_TOKEN: process.env.QSTASH_TOKEN,
		QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
		QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY,
		SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
	},
	webpack: config => {
		config.plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: path.join(
							__dirname,
							'node_modules/ionicons/dist/ionicons/svg'
						),
						to: path.join(__dirname, 'public/svg')
					}
				]
			})
		)
		return config
	},
	nextConfig
}
