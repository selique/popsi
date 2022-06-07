import * as React from 'react'
import Lottie from 'react-lottie'

import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonText,
	IonModal
} from '@ionic/react'
import Router from 'next/router'

import animation from '../../../assets/animations/breathing.json'
import Button from '../../ui/Button'

const Breathing = () => {
	const [showModal, setShowModal] = React.useState(false)
	const [count, setCount] = React.useState(5)
	const [breathe, setBreath] = React.useState(true)

	React.useEffect(() => {
		if (showModal && count > 0) {
			setTimeout(() => {
				setCount(count - 1)
			}, 1000)
		}
	}, [count, showModal])

	React.useEffect(() => {
		if (showModal && count === 0) {
			setTimeout(() => {
				setBreath(!breathe)
			}, 5000)
		}
	}, [breathe, count, showModal])

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/app/home" />
					</IonButtons>
					<IonTitle className="text-lg font-semibold">Respiração</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<div className="h-[75vh] flex items-center">
					<div className="flex flex-col">
						<IonText className="text-xl mb-8 font-medium">
							Bem vindo, Geovane
						</IonText>
						<IonText className="text-xl text-gray-900">
							A respiração profunda guiada pode ajudá-lo a se sentir mais
							calmo, focado e centrado em apenas um minuto.
						</IonText>
					</div>
				</div>
				<div className="bg-green">
					<Button
						className="bg-blue-200 py-4"
						onClick={() => setShowModal(true)}
					>
						<IonText className="text-bold text-white text-xl">
							Iniciar
						</IonText>
					</Button>
				</div>
			</IonContent>
			<IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
				<div className="h-[100vh] flex flex-col items-center justify-center">
					{count > 0 ? (
						<div className="flex flex-col items-center">
							<IonText className="text-[150px] text-bold mb-10">
								{count}
							</IonText>
							<IonText className="text-3xl font-light text-center px-4">
								Aguarde a contagem regressiva para iniciar
							</IonText>
						</div>
					) : (
						<div className="flex flex-col items-center">
							<IonText className="text-black text-xl">
								Dê um tempo e respire fundo
							</IonText>
							<div className="relative flex justify-center items-center">
								<Lottie options={defaultOptions} />
								<IonText className="absolute text-xl font-semibold text-white">
									{breathe ? 'Respire' : 'Inspire'}
								</IonText>
							</div>
							<IonText
								onClick={() => Router.back()}
								className="text-red font-bold text-xl"
							>
								Cancelar
							</IonText>
						</div>
					)}
				</div>
			</IonModal>
		</IonPage>
	)
}

export default Breathing
