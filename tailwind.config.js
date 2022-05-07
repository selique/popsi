module.exports = {
	content: [
		'./src/pages/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		extend: {
			fontSize: {
				xsm: '12px',
				sm: '14px',
				md: '16px',
				lg: '18px'
			},
			colors: {
				blue: {
					100: '#D8EAF6'
				},
				black: {
					DEFAULT: '#000000',
					100: '#5e5a5a'
				}
			}
		}
	},
	corePlugins: {
		preflight: false
	},
	plugins: []
}
