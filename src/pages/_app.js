import { defineCustomElements as ionDefineCustomElements } from '@ionic/core/loader'

import Head from 'next/head'

import 'tailwindcss/tailwind.css'

// core css require for ionic components to work properly
import '@ionic/core/css/core.css'

// basic css for apps build with ionic
import '@ionic/core/css/normalize.css'
import '@ionic/core/css/structure.css'
import '@ionic/core/css/typography.css'

// optional css utils that can be commented out
import '@ionic/core/css/padding.css'
import '@ionic/core/css/float-elements.css'
import '@ionic/core/css/text-alignment.css'
import '@ionic/core/css/text-transformation.css'
import '@ionic/core/css/flex-utils.css'
import '@ionic/core/css/display.css'

import '../styles/global.css'
import '../styles/variables.css'
import React from 'react'

function MyApp({ Component, pageProps }) {
	React.useEffect(() => ionDefineCustomElements(window))

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, viewport-fit=cover"
				></meta>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
