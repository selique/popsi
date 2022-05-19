import React from 'react'

import { setupIonicReact } from '@ionic/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import 'tailwindcss/tailwind.css'

// core css require for ionic components to work properly
import '@ionic/react/css/core.css'

// basic css for apps build with ionics
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

// optional css utils that can be commented out
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import '../styles/global.css'
import '../styles/variables.css'

import { AuthProvider } from '../contexts/Auth'

setupIonicReact()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{/* <Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, viewport-fit=cover"
				></meta>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</Head> */}
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</>
	)
}

export default MyApp
