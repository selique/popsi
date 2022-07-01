import * as React from 'react'

import { supabase } from './../utils/supabaseClient'
import { useAuth } from './Auth'

const ChatNotificationsContext = React.createContext()

const ChatNotificationsProvider = ({ children }) => {
	const [isThereMessages, setIsThereMessages] = React.useState(false)
	const [patients, setPatients] = React.useState([])

	const { user, professional } = useAuth()

	React.useEffect(() => {
		// Function to check if there is some unread message
		const checkMessages = async () => {
			const { count } = await supabase
				.from('messages')
				.select('id', { count: 'exact', head: true })
				.eq('receiver_id', user.id)
				.eq('status', 'SENT')

			if (count && count > 0) {
				setIsThereMessages(true)
			} else {
				setIsThereMessages(false)
			}
		}

		if (user) checkMessages()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	React.useEffect(() => {
		const getPatients = async () => {
			const { data } = await supabase
				.from('profiles')
				.select(
					`
					id,
					full_name,
					avatar_url,
					messages!messages_sender_id_fkey (*)
				`
				)
				.eq('medic_id', user.id)

			if (data) setPatients(data)
		}

		if (professional) getPatients()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, professional])

	React.useEffect(() => {
		let subscription
		if (user) {
			if (professional) {
				subscription = supabase
					.from(`messages:receiver_id=eq.${user.id}`)
					.on('INSERT', payload => {
						setIsThereMessages(payload.new.status === 'SENT')
						if (professional) {
							setPatients(prev => {
								const getPatient = prev.find(
									patient => patient.id === payload.new.sender_id
								)
								const newMessages = getPatient.messages.concat(
									payload.new
								)
								return prev.map(patient =>
									patient.id === payload.new.sender_id
										? { ...patient, messages: newMessages }
										: patient
								)
							})
						}
					})
					.on('UPDATE', payload => {
						setIsThereMessages(payload.new.status === 'SENT')
						if (professional) {
							setPatients(prev => {
								const getPatient = prev.find(
									patient => patient.id === payload.new.sender_id
								)
								const updatedMessages = getPatient.messages.map(
									message =>
										message.id === payload.new.id
											? payload.new
											: message
								)
								return prev.map(patient =>
									patient.id === payload.new.sender_id
										? { ...patient, messages: updatedMessages }
										: patient
								)
							})
						}
					})
					.subscribe()

				return () => supabase.removeSubscription(subscription)
			} else {
				subscription = supabase
					.from(`messages:receiver_id=eq.${user.id}`)
					.on('INSERT', payload =>
						setIsThereMessages(payload.new.status === 'SENT')
					)
					.on('UPDATE', payload =>
						setIsThereMessages(payload.new.status === 'SENT')
					)
					.subscribe()

				return () => supabase.removeSubscription(subscription)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, professional])

	return (
		<ChatNotificationsContext.Provider
			value={{
				isThereMessages,
				patients
			}}
		>
			{children}
		</ChatNotificationsContext.Provider>
	)
}

export const useChatNotifications = () => {
	const context = React.useContext(ChatNotificationsContext)
	if (context === undefined) {
		throw new Error(
			'useChatNotifications must be used within a ChatNotificationsProvider'
		)
	}
	return context
}

export default ChatNotificationsProvider
