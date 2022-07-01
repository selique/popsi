import dynamic from 'next/dynamic'

import { AuthProvider } from '../contexts/Auth'
import ChatNotificationsProvider from '../contexts/chatNotifications'

const App = dynamic(() => import('../components/AppShell'), {
	ssr: false
})

export default function Index() {
	return (
		<AuthProvider>
			<ChatNotificationsProvider>
				<App />
			</ChatNotificationsProvider>
		</AuthProvider>
	)
}
