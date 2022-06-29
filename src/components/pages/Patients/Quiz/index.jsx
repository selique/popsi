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
	IonBackButton
} from '@ionic/react'
import { documentTextOutline, ellipsisHorizontalOutline } from 'ionicons/icons'

import Card from '../../../ui/Card'

const PatientQuiz = () => {
	const quiz = [
		{
			id: 'noaíndoibhasjdbfpasdj',
			title: 'Questionário 1',
			active: true
		},
		{
			id: 'poknsdpifjaodfbsdbfa',
			title: 'Questionário 2',
			active: false
		},
		{
			id: 'oivjwpiejnfpisjndf',
			title: 'Questionário 3',
			active: false
		}
	]

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/app/patients" />
					</IonButtons>
					<IonTitle className="text-lg font-semibold">
						Questionários
					</IonTitle>
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
					{quiz.map((item, index) => (
						<Card key={index} classContainer="mb-3">
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
									<IonText className="font-semibold">
										{item.title}
									</IonText>
									<IonText className="text-gray-900 text-sm flex items-center">
										{item.active ? 'Ativo' : 'Inativo'}
										<div
											className={`w-[10px] h-[10px] rounded-full ml-1 ${
												item.active ? 'bg-green-600' : 'bg-red-600'
											}`}
										/>
									</IonText>
								</div>
								<Link
									to={`/app/patients/quiz/options/${item.id}`}
									slot="end"
								>
									<IonIcon
										icon={ellipsisHorizontalOutline}
										className="text-2xl"
									/>
								</Link>
							</IonItem>
						</Card>
					))}
				</div>
			</IonContent>
		</IonPage>
	)
}

export default PatientQuiz
