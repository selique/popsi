import { Link } from 'react-router-dom'

import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonItem,
	IonAvatar,
	IonText,
	IonIcon,
	IonButtons,
	IonBackButton,
	IonToggle
} from '@ionic/react'
import {
	documentTextOutline,
	chevronForward,
	pieChartOutline
} from 'ionicons/icons'

import Card from '../../../ui/Card'

const PatientOptions = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/app/patients/quiz" />
					</IonButtons>
					<IonTitle className="text-lg font-semibold">Opções</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<Card classContainer="mb-6">
					<IonItem lines="none">
						<IonAvatar slot="start">{/* <Image /> */}</IonAvatar>
						<div className="flex flex-col">
							<IonText className="font-semibold">
								Cintia S. Amaro
							</IonText>
							<IonText className="text-gray-900 text-sm">
								Guarulhos, São Paulo
							</IonText>
						</div>
					</IonItem>
				</Card>
				<IonText className="text-black text-lg">
					Questionario ativo para esse usuario
				</IonText>
				<div className="mt-6">
					<Card classContainer="mb-3">
						<IonItem lines="none">
							<div
								slot="start"
								className="flex items-center justify-center bg-purple-200 py-3 px-2 rounded-2xl"
							>
								<IonIcon
									icon={pieChartOutline}
									className="text-3xl text-white"
								/>
							</div>
							<div className="flex flex-col">
								<IonText className="font-semibold text-black">
									Gráfico
								</IonText>
							</div>
							<Link to={`#`} slot="end">
								<div className="bg-purple-200 flex items-center justify-center p-1 rounded-xl">
									<IonIcon
										icon={chevronForward}
										className="text-4xl text-white"
									/>
								</div>
							</Link>
						</IonItem>
					</Card>
					<Card classContainer="mb-3">
						<IonItem lines="none">
							<div
								slot="start"
								className="flex items-center justify-center bg-purple-200 py-3 px-2 rounded-2xl"
							>
								<IonIcon
									icon={documentTextOutline}
									className="text-3xl text-white"
								/>
							</div>
							<div className="flex flex-col">
								<IonText className="font-semibold text-black">
									Histórico
								</IonText>
							</div>
							<Link
								to={`/app/patients/quiz/options/historic/piasjfndiasjfnd`}
								slot="end"
							>
								<div className="bg-purple-200 flex items-center justify-center p-1 rounded-xl">
									<IonIcon
										icon={chevronForward}
										className="text-4xl text-white"
									/>
								</div>
							</Link>
						</IonItem>
					</Card>
					<Card>
						<IonItem lines="none">
							<IonText className="font-bold text-black">
								Ativar/desativar envio
							</IonText>
							<IonToggle slot="end" color="purple" />
						</IonItem>
					</Card>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default PatientOptions
