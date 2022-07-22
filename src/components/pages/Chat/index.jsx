import * as React from 'react'
import { Virtuoso } from 'react-virtuoso'

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonContent,
	IonIcon,
	IonText,
	IonInput,
	IonButton,
	IonFooter,
	IonFab,
	IonFabButton
} from '@ionic/react'
import {
	attachOutline,
	send,
	camera,
	image,
	chevronDown,
	checkmark,
	checkmarkDone,
	time
} from 'ionicons/icons'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from './../../../utils/supabaseClient'
import { compareDates, translateMonthsToPortuguese } from './utils'

const Chat = ({ match }) => {
	const { user, professional } = useAuth()

	const [error, setError] = React.useState('')

	const [chatData, setChatData] = React.useState({})

	const messagesRef = React.useRef(null)
	const [messages, setMessages] = React.useState([])
	const [message, setMessage] = React.useState('')
	const [countAllMessages, setCountAllMessages] = React.useState(0)

	const [activeAutoScrollToBottom, setActiveAutoScrollToBottom] =
		React.useState(true)

	const [showSendFile, setShowSendFile] = React.useState(false)

	const params = match.params

	const scrollToBottom = () =>
		messagesRef.current?.scrollIntoView({ behavior: 'smooth' })

	const getChatData = async () => {
		const { data, error } = await supabase
			.from('chats')
			.select(
				`
				id,
				profiles:${
					professional ? 'medic_id' : 'patient_id'
				} ( id, nickname, avatar_url )
			`
			)
			.match(
				professional
					? { medic_id: user.id, patient_id: params.id }
					: { patient_id: user.id, medic_id: params.id }
			)
			.single()

		if (data) setChatData(data)
		if (error) setError('Chat: ' + error.message)
	}

	const getMessagesCount = async () => {
		const { count, error } = await supabase
			.from('messages')
			.select('*, chats!inner(*)', { count: 'exact' })
			.eq('chats.medic_id', professional ? user.id : params.id)
			.eq('chats.patient_id', professional ? params.id : user.id)

		if (count) setCountAllMessages(count)
		if (error) setError(error.message)
	}

	const getMessages = async (_to = 0, _for = 19) => {
		const { data, error } = await supabase
			.from('messages')
			.select(
				`
				*,
				chats!inner(*)
			`
			)
			.eq('chats.medic_id', professional ? user.id : params.id)
			.eq('chats.patient_id', professional ? params.id : user.id)
			.order('created_at', { ascending: false })
			.range(_to, _for)

		if (data) {
			setMessages(current => [...data.reverse(), ...current])
			if (activeAutoScrollToBottom) setTimeout(() => scrollToBottom(), 250)
		}
		if (error) setError(error.message)
	}

	React.useEffect(() => {
		getChatData()
		getMessagesCount()
		getMessages()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	React.useEffect(() => {
		if (activeAutoScrollToBottom) setTimeout(() => scrollToBottom(), 250)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages])

	React.useEffect(() => {
		if (chatData) {
			const subscription = supabase
				.from(`messages:chat_id=eq.${chatData.id}`)
				.on('INSERT', payload => {
					setMessages(current => [...current, payload.new])
				})
				.on('UPDATE', payload => {
					setMessages(current => {
						const index = current.findIndex(
							message => message.id === payload.old.id
						)
						if (index !== -1) {
							current[index] = payload.new
						}
						return [...current]
					})
				})
				.subscribe()

			return () => supabase.removeSubscription(subscription)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatData])

	const handleSendMessage = async () => {
		const clearError = () =>
			setTimeout(() => {
				setError('')
			}, 2000)

		if (!message) {
			setError('Digite uma mensagem.')
			clearError()
			return
		}

		// verify if contain email
		if (message.includes('@')) {
			setError('Não é permitido enviar emails.')
			clearError()
			return
		}

		// regex check if contain url anywhere
		const RegexUrl =
			/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gim
		if (RegexUrl.test(message)) {
			setError('Não é permitido enviar links.')
			clearError()
			return
		}

		// verify if contain phone number
		const RegexPhone =
			/\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m
		if (RegexPhone.test(message)) {
			setError('Não é permitido enviar números de telefone.')
			clearError()
			return
		}

		if (message !== '') {
			const { data, error } = await supabase.from('messages').insert({
				chat_id: chatData.id,
				sender_id: user.id,
				receiver_id: params.id,
				message
			})

			if (data) {
				setMessage('')
				setTimeout(() => scrollToBottom(), 250)
			}

			if (error) {
				setError(error.message)
				clearError()
			}
		} else {
			setError('Digite uma mensagem.')
			clearError()
		}
	}

	const loadMore = async () => {
		getMessages(messages.length, messages.length + 19)
	}

	const validateReceiveMessages = e => {
		if (params.id && messages && messages.length > 0) {
			if (e.endIndex >= messages.length - 3) {
				setActiveAutoScrollToBottom(true)

				const isThereSomeReceiveMessage = messages.some(
					message =>
						message.sender_id === params.id && message.status === 'SENT'
				)

				if (isThereSomeReceiveMessage) {
					setTimeout(async () => {
						await supabase
							.from('messages')
							.update({ status: 'READ' })
							.eq('sender_id', params.id)
							.eq('chat_id', chatData.id)
							.eq('status', 'SENT')
					}, 1000)
				}
			} else {
				setActiveAutoScrollToBottom(false)
			}
		}
	}

	const handleOpenSendFile = () => {
		setShowSendFile(!showSendFile)
		setTimeout(() => scrollToBottom(), 250)
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/app/home" />
					</IonButtons>
					<IonTitle className="text-lg font-semibold">
						{chatData?.profiles?.nickname}
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{!activeAutoScrollToBottom && (
					<IonFab vertical="bottom" horizontal="end" slot="fixed">
						<IonFabButton onClick={() => scrollToBottom()}>
							<IonIcon icon={chevronDown} color="#fff" />
						</IonFabButton>
					</IonFab>
				)}
				{messages.length === 0 && (
					<div className="flex h-full w-full items-center justify-center">
						<IonText className="text-center">
							Ainda não há mensagens.
						</IonText>
					</div>
				)}
				{messages && messages.length > 0 && (
					<Virtuoso
						data={messages}
						rangeChanged={validateReceiveMessages}
						initialTopMostItemIndex={messages.length - 1}
						className="flex flex-col items-center justify-center relative"
						components={{ Footer: () => <div ref={messagesRef} /> }}
						itemContent={(index, msg) => {
							return (
								<div className="flex w-full flex-col" key={msg.id}>
									{index === 0 && messages.length < countAllMessages && (
										<div
											className="flex justify-center items-center cursor-pointer"
											onClick={loadMore}
										>
											<IonText className="flex justify-center items-center p-3 px-2 mt-3 bg-glossyGrape text-white text-sm rounded-full">
												Carregar mais
											</IonText>
										</div>
									)}
									{index === 0 && (
										<div className="flex flex-col items-center justify-center my-3">
											<IonText className="text-sm text-gray-600">
												{compareDates(new Date(), msg.created_at)
													? 'Hoje'
													: `
														${
															new Date(msg.created_at)
																.toDateString()
																.split(' ')[2]
														} de ${translateMonthsToPortuguese(
															new Date(msg.created_at)
																.toDateString()
																.split(' ')[1]
													  )} de ${
															new Date(msg.created_at)
																.toDateString()
																.split(' ')[3]
													  }
													`}
											</IonText>
										</div>
									)}
									{index > 0 &&
										!compareDates(
											messages[index - 1].created_at,
											msg.created_at
										) && (
											<div className="flex flex-col items-center justify-center my-3">
												<IonText className="text-sm text-gray-600">
													{compareDates(new Date(), msg.created_at)
														? 'Hoje'
														: `
														${
															new Date(msg.created_at)
																.toDateString()
																.split(' ')[2]
														} de ${translateMonthsToPortuguese(
																new Date(msg.created_at)
																	.toDateString()
																	.split(' ')[1]
														  )} de ${
																new Date(msg.created_at)
																	.toDateString()
																	.split(' ')[3]
														  }
													`}
												</IonText>
											</div>
										)}
									{msg.sender_id === user.id ? (
										<div className="flex justify-end">
											<div className="flex flex-col max-w-[80%] single-message rounded-tl-lg bg-gray-800 rounded-bl-lg rounded-br-lg mb-4 px-4 py-2">
												<IonText className="text-white-100">
													{msg.message}
												</IonText>
												<div className="flex self-end items-center">
													<IonText className="text-white-100 text-xs">
														{new Date(msg.created_at).getHours() <
														10
															? `0${new Date(
																	msg.created_at
															  ).getHours()}:`
															: `${new Date(
																	msg.created_at
															  ).getHours()}:`}
														{new Date(
															msg.created_at
														).getMinutes() < 10
															? `0${new Date(
																	msg.created_at
															  ).getMinutes()}`
															: new Date(
																	msg.created_at
															  ).getMinutes()}
													</IonText>
													<IonIcon
														icon={
															msg.status === 'PENDIND'
																? time
																: checkmarkDone
														}
														className={`text-white text-md ml-1 ${
															msg.status === 'READ'
																? 'text-blue-800'
																: 'text-gray-300'
														}`}
													/>
												</div>
											</div>
											<span>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 10 13"
													width="15"
													height="20"
												>
													<path
														opacity=".13"
														d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
													></path>
													<path
														fill="#858585"
														d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
													></path>
												</svg>
											</span>
										</div>
									) : (
										<div className="flex">
											<span className="scale-x-[-1]">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 10 13"
													width="15"
													height="20"
												>
													<path
														opacity=".13"
														d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
													></path>
													<path
														fill="#AC8FBF"
														d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
													></path>
												</svg>
											</span>
											<div className="flex flex-col max-w-[80%] single-message rounded-tr-lg bg-glossyGrape rounded-bl-lg rounded-br-lg mb-4 px-4 py-2">
												<IonText className="text-white-100">
													{msg.message}
												</IonText>
												<div className="flex self-end items-center">
													<IonText className="text-white-100 text-xs">
														{new Date(msg.created_at).getHours() <
														10
															? `0${new Date(
																	msg.created_at
															  ).getHours()}:`
															: `${new Date(
																	msg.created_at
															  ).getHours()}:`}
														{new Date(
															msg.created_at
														).getMinutes() < 10
															? `0${new Date(
																	msg.created_at
															  ).getMinutes()}`
															: new Date(
																	msg.created_at
															  ).getMinutes()}
													</IonText>
												</div>
											</div>
										</div>
									)}
								</div>
							)
						}}
					/>
				)}
			</IonContent>
			<IonFooter className="relative">
				<div className="flex flex-col w-full aboslute top-0">
					{error && (
						<div className="flex justify-center items-center w-full h-10 bottom-0 left-0 bg-texasRose rounded-tr-lg rounded-tl-lg">
							<IonText className="text-white">{error}</IonText>
						</div>
					)}
				</div>
				<div className="flex justify-around bg-white w-full items-center p-3">
					<div className="flex items-center bg-gray-200 border rounded-md w-4/5">
						<IonInput
							placeholder="Enviar mensagem"
							autofocus="true"
							inputmode="text"
							value={message}
							onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
							onIonInput={e => setMessage(e.target.value)}
							className="w-full bg-transparent placeholder-gray-400"
						/>
						<IonIcon
							onClick={handleOpenSendFile}
							icon={attachOutline}
							className="w-6 h-6 mr-2 text-black"
						/>
					</div>
					<div
						className="mr-3 p-3 bg-gray-200 w-6 h-6 rounded-full"
						onClick={handleSendMessage}
					>
						<IonIcon icon={send} className="w-6 h-6 text-glossyGrape" />
					</div>
				</div>
				{showSendFile && (
					<div className="flex border-t-2 pt-10 pb-10 pl-3">
						<div className="flex justify-center p-3 bg-sky-300 w-10 h-10 rounded-full">
							<IonIcon icon={camera} className="w-8 h-8 text-white" />
						</div>

						<div className="flex justify-center p-3 bg-glossyGrape w-10 h-10 ml-2 rounded-full">
							<IonIcon icon={image} className="w-8 h-8 text-white" />
						</div>
					</div>
				)}
			</IonFooter>
		</IonPage>
	)
}

export default Chat
