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
	IonList,
	IonItemDivider,
	IonLabel,
	IonBadge
} from '@ionic/react'
import {
	documentTextOutline,
	chevronForward,
	checkmarkOutline,
	closeOutline
} from 'ionicons/icons'

import Card from '../../../ui/Card'

const PatientHistoric = () => {
	const quiz = [
		{
			data: '08/07/2022',
			quiz: [
				{
					title: 'Questionário 1',
					amountQuestions: 10,
					amountAnswers: 5
				}
			]
		},
		{
			data: '09/07/2022',
			quiz: [
				{
					title: 'Questionário 2',
					amountQuestions: 10,
					amountAnswers: 7
				},
				{
					title: 'Questionário 3',
					amountQuestions: 10,
					amountAnswers: 6
				}
			]
		},
		{
			data: '13/07/2022',
			quiz: [
				{
					title: 'Questionário 4',
					amountQuestions: 5,
					amountAnswers: 5
				},
				{
					title: 'Questionário 5',
					amountQuestions: 6,
					amountAnswers: 4
				},
				{
					title: 'Questionário 6',
					amountQuestions: 9,
					amountAnswers: 0
				}
			]
		}
	]

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/app/patients/quiz/options/iajbsdpaijsb" />
					</IonButtons>
					<IonTitle className="text-lg font-semibold">Histórico</IonTitle>
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
				<div className="mt-6">
					<IonList>
						{quiz.map(item => (
							<>
								<IonText className="text-black font-semibold">
									{item.data}
								</IonText>
								{item.quiz.map((quiz, index) => (
									<Card classContainer="my-3" key={index}>
										<IonItem
											lines="none"
											className="overflow-visible"
										>
											<div
												slot="start"
												className="flex relative items-center justify-center bg-purple-200 py-3 px-2 rounded-2xl"
											>
												<IonIcon
													icon={documentTextOutline}
													className="text-3xl text-white"
												/>
												<IonBadge
													color={
														quiz.amountAnswers ===
														quiz.amountQuestions
															? 'success'
															: quiz.amountAnswers > 0
															? 'warning'
															: 'danger'
													}
													className="absolute bottom-[70%] left-[70%] rounded-full flex items-center justify-center"
												>
													<IonIcon
														icon={
															quiz.amountAnswers > 0
																? checkmarkOutline
																: closeOutline
														}
														className="text-white"
													/>
												</IonBadge>
											</div>
											<div className="flex flex-col">
												<IonText className="font-semibold">
													{quiz.title}
												</IonText>
												<IonText className="text-gray-900 text-sm flex items-center">
													{quiz.amountAnswers}/
													{quiz.amountQuestions} respondidas
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
								))}
							</>
						))}
					</IonList>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default PatientHistoric
