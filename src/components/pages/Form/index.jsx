import * as React from 'react'

import {
	IonPage,
	IonContent,
	IonBackButton,
	IonIcon,
	IonCheckbox,
	IonText,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonList,
	IonRadioGroup,
	IonItem,
	IonLabel,
	IonRadio
} from '@ionic/react'
import {
	shareSocialOutline,
	settingsOutline,
	trashOutline
} from 'ionicons/icons'
import Router from 'next/router'

import Button from '../../ui/Button'
import Input from '../../ui/Input'

const FormProfessional = () => {
	return (
		<>
			<div className="bg-purple-100 p-4">
				<div className="flex justify-between items-center">
					<IonBackButton defaultHref="/app/quiz" className="text-white" />
					<div className="flex text-2xl text-white">
						<IonIcon
							src={shareSocialOutline}
							color="#ffffff"
							className="mr-3"
						/>
						<IonIcon src={settingsOutline} color="#ffffff" />
					</div>
				</div>
				<input
					placeholder="Título"
					className="bg-transparent border-t-0 border-l-0 border-r-0 border-2 border-white text-white font-semibold text-3xl w-full my-6 placeholder:text-white outline-none"
				/>
			</div>
			<div className="p-4 w-full flex flex-col items-center">
				<div className="p-3 w-full border-dashed border-gray-900 rounded-lg bg-gray-100">
					<Input placeholder="Pergunta 1" background="bg-white" />
					<div className="py-4 flex flex-col items-center">
						<div className="flex item-center mb-3 w-full">
							<IonCheckbox id="alternative1" />
							<label
								htmlFor="alternative1"
								className="m-0 ml-3 font-light"
							>
								Alternative 1
							</label>
						</div>
						<div className="w-1/2">
							<Button className="bg-blue-200 py-3">
								<IonText className="text-white font-medium">
									Mais opções
								</IonText>
							</Button>
						</div>
					</div>
					<div className="flex justify-between text-2xl mt-2">
						<div />
						<IonIcon src={trashOutline} />
					</div>
				</div>
				<div className="w-1/2 mt-6">
					<Button className="bg-purple-100">
						<IonText className="text-white font-medium">
							Mais pergunta?
						</IonText>
					</Button>
				</div>
			</div>
		</>
	)
}

const FormClient = () => {
	const [idQuiz, setIdQuiz] = React.useState(0)

	const quiz = [
		{
			ask: 'Pergunta 1'
		},
		{
			ask: 'Pergunta 2'
		},
		{
			ask: 'Pergunta 3'
		}
	]

	return (
		<>
			<div className="h-[75vh] p-4">
				<div className="bg-white shadow-lg p-4 rounded-2xl flex flex-col">
					<IonText>
						{idQuiz + 1}/{quiz.length}
					</IonText>
					<IonText className="text-3xl mt-5">{quiz[idQuiz].ask}</IonText>
					<IonList className="my-10">
						<IonRadioGroup>
							<IonItem>
								<IonLabel>Alternative 1</IonLabel>
								<IonRadio slot="start" value="alternativa 1" />
							</IonItem>
							<IonItem>
								<IonLabel>Alternative 2</IonLabel>
								<IonRadio slot="start" value="alternativa 2" />
							</IonItem>
							<IonItem>
								<IonLabel>Alternative 3</IonLabel>
								<IonRadio slot="start" value="alternativa 3" />
							</IonItem>
							<IonItem>
								<IonLabel>Alternative 4</IonLabel>
								<IonRadio slot="start" value="alternativa 4" />
							</IonItem>
						</IonRadioGroup>
					</IonList>
					<Button
						onClick={() => {
							if (idQuiz + 1 < quiz.length) {
								setIdQuiz(idQuiz + 1)
							} else {
								Router.back()
							}
						}}
						className="bg-purple-100"
					>
						<IonText className="text-xl text-white">
							{quiz.length === idQuiz + 1 ? 'Acabou' : 'Próximo'}
						</IonText>
					</Button>
				</div>
			</div>
		</>
	)
}

const Form = () => {
	const professional = false

	return (
		<IonPage>
			{!professional && (
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonBackButton defaultHref="/app/homeclient" />
						</IonButtons>
						<IonTitle className="text-lg font-semibold">
							Questionários
						</IonTitle>
					</IonToolbar>
				</IonHeader>
			)}
			<IonContent fullscreen>
				{professional ? <FormProfessional /> : <FormClient />}
			</IonContent>
		</IonPage>
	)
}

export default Form
