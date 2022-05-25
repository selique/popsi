import {
	IonContent,
	IonPage,
	IonIcon,
	IonText,
	useIonRouter
} from '@ionic/react'
import { arrowBack } from 'ionicons/icons'

import Avatar from '../../ui/Avatar'
import Button from '../../ui/Button'

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const ProfessionalProfile = () => {
	const router = useIonRouter()
	return (
		<IonPage>
			<IonContent>
				<div className="relative">
					<div
						className="absolute top-4 left-4 text-white text-2xl"
						onClick={() => router.goBack()}
					>
						<IonIcon src={arrowBack} color="#fff" />
					</div>
					<div className="bg-gradient-to-r from-[#87C6EB] to-[#883DB9B2] w-full h-[20vh] rounded-b-[40px]"></div>
					<div className="absolute top-[70%] left-[39%]">
						<Avatar
							width={'100px'}
							height={'100px'}
							background={imageTemp}
							style={{ outline: '20px solid #f4f4f4', border: 0 }}
						/>
					</div>
				</div>
				<div className="mt-[7vh] ion-padding">
					<div className="flex flex-col items-center">
						<IonText className="w-full font-regular text-black text-lg text-center">
							Doutora Adriana Nogister
						</IonText>
						<IonText className="text-gray-900 mt-4 text-sm text-center font-regular">
							Especialidades
						</IonText>
						<div className="w-full grid grid-cols-3 text-xsm gap-3 text-center items-center mt-3">
							<IonText className="text-gray-900 font-light">
								Depressão
							</IonText>
							<IonText className="text-gray-900 font-light">
								Auto conhecimento
							</IonText>
							<IonText className="text-gray-900 font-light">
								Ansiedade
							</IonText>
						</div>
					</div>
					<Button className="bg-blue-200 mt-6">
						<IonText className="text-white">Editar perfil</IonText>
					</Button>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default ProfessionalProfile
