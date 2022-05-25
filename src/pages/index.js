import dynamic from 'next/dynamic'

import { AuthProvider } from '../contexts/Auth'

const App = dynamic(() => import('../components/AppShell'), {
	ssr: false
})

export default function Index() {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	)
}
