import {
	IonContent,
	IonIcon,
	IonPage,
	IonSlide,
	IonSlides,
	IonText
} from '@ionic/react'
import { search, filterOutline, addOutline } from 'ionicons/icons'

import Avatar from '../../components/ui/Avatar'
import Input from '../../components/ui/Input'

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const Patients = () => {
	return (
		<IonPage>
			<IonContent className="ion-padding bg-black">
				<div className="flex justify-center">
					<IonText className="text-black font-semibold">
						Meus paciêntes
					</IonText>
				</div>
				<Input
					placeholder="Pesquisar"
					icon={<IonIcon src={search} />}
					background="bg-white"
					classContent="my-5"
				/>
				<div className="flex items-center justify-between">
					<IonText className="text-black">Lista personlizada</IonText>
					<IonIcon src={filterOutline} />
				</div>
				<IonSlides
					options={{
						slidesPerView: 4.5
					}}
					className="mt-3 mb-5	"
				>
					<IonSlide className="py-3">
						<Avatar>
							<IonIcon src={addOutline} size="large" color="#ffffff" />
						</Avatar>
					</IonSlide>
					{[...Array(10)].map((_, index) => (
						<IonSlide className="py-3" key={index}>
							<Avatar background={imageTemp} />
						</IonSlide>
					))}
				</IonSlides>
				<div>
					{[...Array(10)].map((_, index) => (
						<div
							key={index}
							className="my-8 grid grid-cols-[auto_1fr_auto] items-center gap-3"
						>
							<Avatar background={imageTemp} />
							<div className="flex flex-col">
								<IonText className="font-semibold">
									Cintia S. Amaro
								</IonText>
								<IonText className="font-light text-xsm">
									Guarulhos, São Paulo
								</IonText>
							</div>
							<div className="flex flex-col items-end">
								<IonText className="font-light text-xsm">
									Ultimo acesso
								</IonText>
								<IonText className="font-light text-xsm">
									Hoje as 10:13am
								</IonText>
							</div>
						</div>
					))}
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Patients
