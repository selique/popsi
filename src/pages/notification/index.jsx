import { IonPage, IonContent, IonBackButton, IonText } from '@ionic/react'
import styled from 'styled-components'

import TemplateTabs from '../../components/templates/Tabs'
import Avatar from '../../components/ui/Avatar'

const Line = styled.div`
	border-bottom: 1px solid #e6e6e6;
`

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const Notification = () => {
	return (
		<IonPage>
			<IonContent>
				<TemplateTabs>
					<div className="flex justify-center py-6">
						<IonText className="text-black font-semibold">
							Notificações
						</IonText>
					</div>
					<Line />
					<div>
						<div className="grid grid-cols-[auto_1fr] items-center gap-3 px-4">
							<Avatar
								background={imageTemp}
								width="80px"
								height="80px"
							/>
							<div className="flex flex-col my-10">
								<IonText className="text-black font-light mb-1 text-sm">
									Seu paciênte,{' '}
									<IonText className="font-semibold text-black">
										José Vaz
									</IonText>{' '}
									finalizou o questionário “Questionário 1”.
								</IonText>
								<IonText className="font-extralight text-xsm">
									7m
								</IonText>
							</div>
						</div>
						<Line />
					</div>
				</TemplateTabs>
			</IonContent>
		</IonPage>
	)
}

export default Notification
