import * as React from 'react'
import { Link } from 'react-router-dom'

import {
	IonPage,
	IonContent,
	IonBackButton,
	IonText,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonIcon,
	IonTitle,
	useIonRouter
} from '@ionic/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
	arrowForward,
	checkmarkCircleOutline,
	arrowBack,
	alertCircleOutline
} from 'ionicons/icons'
import styled from 'styled-components'

import Avatar from '../../ui/Avatar'
import { useAuth } from './../../../contexts/Auth'
import { supabase } from './../../../utils/supabaseClient'
import Button from './../../ui/Button'

dayjs.extend(relativeTime)

const Line = styled.div`
	border-bottom: 1px solid #e6e6e6;
`

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const Notification = () => {
	const { user, professional } = useAuth()
	const router = useIonRouter()
	const [notifications, setNotifications] = React.useState(null)
	const [disableNotification, setDisableNotification] = React.useState(null)

	const getNotifications = async () => {
		if (professional) {
			const { data } = await supabase
				.from('surveys_notifications')
				.select(
					`
					*,
					profiles:patient_id ( nickname, nickname ),
					surveys:surveys_id ( title )
				`
				)
				.match({ for: 'MEDIC', medic_id: user.id })

			if (data) {
				setNotifications(data)
			}
		} else {
			const { data } = await supabase
				.from('surveys_notifications')
				.select(
					`
					*,
					profiles:medic_id ( nickname, nickname ),
					surveys:surveys_id ( title )
				`
				)
				.match({ for: 'PATIENT', patient_id: user.id })

			if (data) {
				setNotifications(data)
			}
		}
	}
	React.useEffect(() => {
		if (user) getNotifications()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	React.useEffect(() => {
		const notificationSubscription = supabase
			.from(
				`surveys_notifications:${
					professional ? 'medic_id' : 'patient_id'
				}=eq.${user.id}`
			)
			.on('*', () => getNotifications())
			.subscribe()

		return () => supabase.removeSubscription(notificationSubscription)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleRedirectToSurvey = async surveys_id => {
		setDisableNotification(true)

		const { data } = await supabase
			.from('surveys_notifications')
			.update({
				status: 'IN_PROGRESS'
			})
			.match({
				surveys_id,
				for: professional ? 'MEDIC' : 'PATIENT',
				[professional ? 'medic_id' : 'patient_id']: user.id
			})

		if (data) {
			router.push(`/form/answers/${surveys_id}`)
		}

		setDisableNotification(false)
	}

	const notificationColor = status => {
		switch (status) {
			case 'SENT':
				return 'bg-deYork'
			case 'RECEIVED':
				return 'bg-glossyGrape'
			case 'IN_PROGRESS':
				return 'bg-texasRose'
			case 'FINISHED':
				return 'bg-deYork'
			default:
				return 'bg-glossyGrape'
		}
	}

	const notificationIcon = status => {
		switch (status) {
			case 'SENT':
				return arrowForward
			case 'RECEIVED':
				return arrowBack
			case 'IN_PROGRESS':
				return alertCircleOutline
			case 'FINISHED':
				return checkmarkCircleOutline
			default:
				return arrowForward
		}
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle className="text-lg font-semibold">
						Notificações
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div>
					{notifications && notifications.length > 0 ? (
						notifications.map((notification, index) => (
							<React.Fragment key={index}>
								<div className="flex items-center px-4">
									<Avatar
										background={imageTemp}
										width="70px"
										height="70px"
									/>
									<div className="flex flex-col my-10 w-3/5">
										{notification.content ? (
											<IonText className="text-black font-light mb-1 text-sm">
												{notification.content}
											</IonText>
										) : professional ? (
											<IonText className="text-black font-light mb-1 text-sm">
												Seu paciente{' '}
												<IonText className="font-semibold text-black">
													{notification.profiles.nickname}
												</IonText>{' '}
												finalizou o questionário “
												{notification.surveys.title}”.
											</IonText>
										) : (
											<Button
												disabled={disableNotification}
												onClick={() =>
													handleRedirectToSurvey(
														notification.surveys_id
													)
												}
											>
												<IonText className="text-black font-light mb-1 text-sm">
													O medico{' '}
													<IonText className="font-semibold text-black">
														{notification.profiles.nickname}
													</IonText>{' '}
													te convdou para responder o questionário
													“{notification.surveys.title}”.
												</IonText>
											</Button>
										)}
										<IonText className="font-extralight text-xsm">
											{dayjs(
												notification.updated_at ??
													notification.created_at
											).fromNow(true)}
										</IonText>
									</div>
									<div
										className={`w-4 h-4 ${notificationColor(
											notification.status
										)} rounded-full ${
											notification.status === 'READED' && 'hidden'
										}`}
									>
										<IonIcon
											icon={notificationIcon(notification.status)}
										/>
									</div>
								</div>
								<Line />
							</React.Fragment>
						))
					) : (
						<IonTitle className="text-lg font-semibold">
							Nenhuma notificação
						</IonTitle>
					)}
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Notification
