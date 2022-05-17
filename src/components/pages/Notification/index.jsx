import { IonPage, IonContent, IonBackButton, IonText } from '@ionic/react'
import styled from 'styled-components'

import Avatar from '../../ui/Avatar'

const Line = styled.div`
	border: 1px solid #e6e6e6;
`

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const Notification = () => {
	return (
		<IonPage>
			<IonContent>
				<div className="flex justify-between items-center py-6">
					<IonBackButton defaultHref="/home" />
					<IonText className="text-black font-semibold">
						Notificações
					</IonText>
					<div />
				</div>
				<Line />
				<div>
					<div className="grid grid-cols-[auto_1fr] items-center gap-3 px-4">
						<Avatar background={imageTemp} width="80px" height="80px" />
						<div className="flex flex-col my-10">
							<IonText className="text-black font-light mb-1">
								Seu paciênte,{' '}
								<IonText className="font-semibold text-black">
									José Vaz
								</IonText>{' '}
								finalizou o questionário “Questionário 1”.
							</IonText>
							<IonText className="font-extralight">7m</IonText>
						</div>
					</div>
					<Line />
					<div className="grid grid-cols-[auto_1fr] items-center gap-3 px-4">
						<Avatar background={imageTemp} width="80px" height="80px" />
						<div className="flex flex-col my-10">
							<IonText className="text-black font-light mb-1">
								Seu paciênte,{' '}
								<IonText className="font-semibold text-black">
									José Vaz
								</IonText>{' '}
								finalizou o questionário “Questionário 2”.
							</IonText>
							<IonText className="font-extralight">10m</IonText>
						</div>
					</div>
					<Line />
					<div className="grid grid-cols-[auto_1fr] items-center gap-3 px-4">
						<Avatar background={imageTemp} width="80px" height="80px" />
						<div className="flex flex-col my-10">
							<IonText className="text-black font-light mb-1">
								Seu paciênte,{' '}
								<IonText className="font-semibold text-black">
									José Vaz
								</IonText>{' '}
								finalizou o questionário “Questionário 3”.
							</IonText>
							<IonText className="font-extralight">15m</IonText>
						</div>
					</div>
					<Line />
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Notification
