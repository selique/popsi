import * as React from 'react'

import {
	IonPage,
	IonContent,
	IonText,
	IonSlides,
	IonSlide,
	IonButton,
	IonModal,
	IonBackdrop
} from '@ionic/react'
import Image from 'next/image'
import styled from 'styled-components'

import Letter from '../../../assets/icons/Letter'
import Profile from '../../../assets/Profile.png'
import Button from '../../ui/Button'
import Card from '../../ui/Card'
import ShortcutCard from '../../ui/ShortcutCard'

const Slide = styled(IonSlides)`
	ion-slide {
		height: 100% !important;
		padding: 15px 0;
	}
`

const Home = () => {
	const [modalOpen, setModalOpen] = React.useState(false)

	const slideOpts = {
		slidesPerView: 2.6,
		spaceBetween: 5,
		speed: 400,
		autoHeight: true
	}

	return (
		<IonPage>
			<IonContent className="ion-padding bg-white-100" fullscreen>
				<div className="flex justify-between">
					<div className="flex flex-col">
						<IonText className="text-sm text-gray-900 mb-1 font-light">
							Bem vinda
						</IonText>
						<IonText className="text-black-200 text-3xl font-bold">
							Drª Adriana
						</IonText>
					</div>
					<Image src={Profile} alt="Foto de perfil" />
				</div>
				<Slide options={slideOpts} className="mt-4 mb-3">
					<IonSlide className="h-full">
						<ShortcutCard background="bg-purple-100">
							<Letter />
							<IonText className="text-white font-bold mt-4 mb-2">
								Convite
							</IonText>
							<IonText className="text-white text-left text-xsm">
								Convide seus paciêntes, convide seus paciêntes
							</IonText>
						</ShortcutCard>
					</IonSlide>
					<IonSlide style={{ height: '100% !important' }}>
						<ShortcutCard>
							<Letter color="#7A7A7A" />
							<IonText className="text-white font-bold mt-4 mb-2 text-gray-900">
								Agenda
							</IonText>
							<IonText className="text-white text-left text-xsm text-gray-900">
								Agende horarios de consultas.
							</IonText>
						</ShortcutCard>
					</IonSlide>
					<IonSlide>
						<ShortcutCard>
							<Letter color="#7A7A7A" />
							<IonText className="text-white font-bold mt-4 mb-2 text-gray-900">
								Agenda
							</IonText>
							<IonText className="text-white text-left text-xsm text-gray-900">
								Agende horarios de consultas.
							</IonText>
						</ShortcutCard>
					</IonSlide>
				</Slide>
				<Card>
					<div className="flex flex-col">
						<IonText className="font-semibold text-black-200">
							Hoje, 27 de Abril
						</IonText>
						<IonText className="font-semibold text-gray-900 text-xsm">
							Suas consultas mais recentes
						</IonText>
					</div>
					<div className="my-4">
						<div className="flex items-center">
							<Image src={Profile} alt="Foto de perfil" />
							<div className="flex flex-col ml-3">
								<IonText>Ana Lisa</IonText>
								<IonText className="font-light text-sm">
									14:30 pm
								</IonText>
							</div>
						</div>
						<div className="flex items-center my-3">
							<Image src={Profile} alt="Foto de perfil" />
							<div className="flex flex-col ml-3">
								<IonText>Ana Lisa</IonText>
								<IonText className="font-light text-sm">
									11:00 am
								</IonText>
							</div>
						</div>
						<div className="flex items-center">
							<Image src={Profile} alt="Foto de perfil" />
							<div className="flex flex-col ml-3">
								<IonText>Ana Lisa</IonText>
								<IonText className="font-light text-sm">
									08:25 am
								</IonText>
							</div>
						</div>
					</div>
					<Button
						className="bg-blue-200"
						onClick={() => setModalOpen(true)}
					>
						<IonText className="text-white font-semibold">
							Ver agenda completa
						</IonText>
					</Button>
				</Card>
			</IonContent>
		</IonPage>
	)
}

export default Home
