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
import styled from 'styled-components'

import Avatar from '../../ui/Avatar'

const Line = styled.div`
	border-bottom: 1px solid #e6e6e6;
`

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const Notification = () => {
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
					<div className="flex items-center px-4">
						<Avatar background={imageTemp} width="70px" height="70px" />
						<div className="flex flex-col my-10 w-3/5">
							<IonText className="text-black font-light mb-1 text-sm">
								Seu paciênte,{' '}
								<IonText className="font-semibold text-black">
									José Vaz
								</IonText>{' '}
								finalizou o questionário “Questionário 1”.
							</IonText>
							<IonText className="font-extralight text-xsm">7m</IonText>
						</div>
						<div className="w-4 h-4 bg-glossyGrape rounded-full" />
					</div>
					<Line />
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Notification
