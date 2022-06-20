import * as React from 'react'

import {
	IonPage,
	IonContent,
	IonBackButton,
	IonText,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle
} from '@ionic/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styled from 'styled-components'

import Avatar from '../../ui/Avatar'
import { useAuth } from './../../../contexts/Auth'
import { supabase } from './../../../utils/supabaseClient'

dayjs.extend(relativeTime)

const Line = styled.div`
	border-bottom: 1px solid #e6e6e6;
`

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const Notification = () => {
	const { user, professional } = useAuth()
	const [notifications, setNotifications] = React.useState(null)

	React.useEffect(() => {
		const getNotifications = async () => {
			if (professional) {
				const { data } = await supabase
					.from('surveys_notifications')
					.select(
						`
						content,
						surveys_id,
						profiles:patient_id ( nickname, nickname ),
						surveys:surveys_id ( title )
					`
					)
					.match({ for: 'MEDIC', medic_id: user.id })

				if (data) {
					setNotifications(data)
					console.log('MEDIC', user.id)
				}
			} else {
				const { data } = await supabase
					.from('surveys_notifications')
					.select(
						`
						content,
						surveys_id,
						profiles:medic_id ( nickname, nickname ),
						surveys:surveys_id ( title )
					`
					)
					.match({ for: 'PATIENT', patient_id: user.id })

				if (data) {
					setNotifications(data)
					console.log('PATIENT', data)
				}
			}
		}

		if (user) getNotifications()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
					{notifications &&
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
											<IonText className="text-black font-light mb-1 text-sm">
												O medico{' '}
												<IonText className="font-semibold text-black">
													{notification.profiles.nickname}
												</IonText>{' '}
												te convdou para responder o questionário “
												{notification.surveys.title}”.
											</IonText>
										)}
										<IonText className="font-extralight text-xsm">
											{dayjs(notification.created_at).fromNow(true)}
										</IonText>
									</div>
									<div className="w-4 h-4 bg-glossyGrape rounded-full" />
								</div>
								<Line />
							</React.Fragment>
						))}
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Notification
