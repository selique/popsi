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
	env: {
		SITE_URL: process.env.SITE_URL
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
