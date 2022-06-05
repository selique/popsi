import * as React from 'react'

import { defineCustomElements } from '@ionic/pwa-elements/loader'
import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import '@ionic/core/css/core.css'
import '@ionic/core/css/padding.css'
import '@ionic/core/css/float-elements.css'
import '@ionic/core/css/text-alignment.css'
import '@ionic/core/css/text-transformation.css'
import '@ionic/core/css/flex-utils.css'
import '@ionic/core/css/display.css'

import '../styles/global.css'
import '../styles/variables.css'

function MyApp({ Component, pageProps }) {
	React.useEffect(() => {
		// window is accessible here.
		defineCustomElements(window)
	}, [])

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, viewport-fit=cover"
				></meta>
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
