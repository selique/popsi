import * as React from 'react'

import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonText,
	IonModal,
	IonButton,
	useIonRouter
} from '@ionic/react'
import Lottie from 'lottie-react'
import styled from 'styled-components'

import animation from '../../../assets/animations/breathing.json'
import { useAuth } from '../../../contexts/Auth'
import Button from '../../ui/Button'

const BreathingCircleAnimate = styled.div`
	width: 45%;
	height: 45%;
	border-radius: 50%;
	position: absolute;
	background-color: #ac8fbf;
	display: flex;
	align-items: center;
	justify-content: center;
	animation: breathing 10s ease-in-out infinite;

	@keyframes breathing {
		0% {
			transform: scale(0.5);
		}
		25% {
			transform: scale(1);
		}
		50% {
			transform: scale(1);
		}
		75% {
			transform: scale(0.5);
		}
		100% {
			transform: scale(0.5);
		}
	}
`

const Breathing = () => {
	const router = useIonRouter()

	const [showModal, setShowModal] = React.useState(false)
	const [breathe, setBreath] = React.useState(true)

	const { user } = useAuth()

	React.useEffect(() => {
		if (showModal) {
			setTimeout(() => {
				setBreath(!breathe)
			}, 5000)
		} else {
			setBreath(true)
		}
	}, [breathe, showModal])

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
							Bem vindo, {user.nickname}
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
					<div className="flex flex-col items-center">
						<IonText className="text-black text-xl">
							Dê um tempo e respire fundo
						</IonText>
						<div className="relative flex justify-center items-center">
							<Lottie
								animationData={animation}
								rendererSettings={{
									preserveAspectRatio: 'xMidYMid slice'
								}}
								autoplay={true}
								loop={true}
							/>
							<BreathingCircleAnimate />
							<IonText className="absolute text-xl font-semibold text-white">
								{breathe ? 'Respire' : 'Inspire'}
							</IonText>
						</div>
						<IonText
							onClick={() => router.goBack()}
							className="text-l cursor-pointer text-red-500"
						>
							Cancelar
						</IonText>
					</div>
				</div>
			</IonModal>
		</IonPage>
	)
}

export default Breathing
