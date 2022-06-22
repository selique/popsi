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
				lg: '18px',
				xl: '20px',
				'2xl': '24px',
				'3xl': '28px',
				'4xl': '32px',
				'5xl': '36px',
				'6xl': '40px'
			},
			colors: {
				white: {
					DEFAULT: '#ffffff',
					100: '#f4f4f4'
				},
				blue: {
					100: '#D8EAF6',
					200: '#87C6EB',
					500: '#6599FF'
				},
				black: {
					DEFAULT: '#000000',
					100: '#5e5a5a',
					200: '#2D2D2D',
					300: '#3F3F3F'
				},
				gray: {
					100: '#EAEAEA',
					200: '#e4e4e4',
					900: '#7A7A7A'
				},
				purple: {
					DEFAULT: '#c700ff',
					100: '#AC8FBF',
					200: '#c5bdec',
					opacity: {
						100: '#7B61FF4D'
					}
				},
				glossyGrape: {
					DEFAULT: '#AC8FBF'
				},
				texasRose: {
					DEFAULT: '#FFA951'
				},
				deYork: {
					DEFAULT: '#90C387'
				}
			}
		}
	},
	corePlugins: {
		preflight: false
	},
	plugins: []
}
