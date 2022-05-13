import * as React from 'react'

import {
	IonPage,
	IonContent,
	IonText,
	IonSlides,
	IonSlide,
	IonModal,
	IonTitle
} from '@ionic/react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import Letter from '../../../assets/icons/Letter'
import Lines from '../../../assets/Lines'
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

const months = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro'
]

const dayOfMonths = [
	{
		day: '01',
		dayWeek: 'Dom'
	},
	{
		day: '02',
		dayWeek: 'Seg'
	},
	{
		day: '03',
		dayWeek: 'Ter'
	},
	{
		day: '04',
		dayWeek: 'Qua'
	},
	{
		day: '05',
		dayWeek: 'Qui'
	},
	{
		day: '06',
		dayWeek: 'Sex'
	},
	{
		day: '07',
		dayWeek: 'Sab'
	}
]

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
					<IonSlide>
						<ShortcutCard>
							<Letter color="#7A7A7A" />
							<IonText className="font-bold mt-4 mb-2 text-gray-900">
								Agenda
							</IonText>
							<IonText className="text-left text-xsm text-gray-900">
								Agende horarios de consultas.
							</IonText>
						</ShortcutCard>
					</IonSlide>
					<IonSlide>
						<ShortcutCard>
							<Letter color="#7A7A7A" />
							<IonText className="font-bold mt-4 mb-2 text-gray-900">
								Agenda
							</IonText>
							<IonText className="text-left text-xsm text-gray-900">
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
				<Link href="/patients" passHref>
					<Button className="bg-blue-200">
						<IonText className="text-white font-semibold">
							Ver Pacientes
						</IonText>
					</Button>
				</Link>
				<Link href="/profile" passHref>
					<Button className="bg-blue-200">
						<IonText className="text-white font-semibold">Perfil</IonText>
					</Button>
				</Link>
				<IonModal
					isOpen={modalOpen}
					onDidDismiss={() => setModalOpen(false)}
					breakpoints={[0, 0.8, 1]}
					initialBreakpoint={0.8}
					backdropBreakpoint={0.2}
				>
					<IonContent className="ion-padding">
						<div className="flex justify-center my-4">
							<IonText className="text-black font-semibold text-center">
								Agenda
							</IonText>
						</div>
						<div className="relative rounded-2xl bg-purple-100">
							<Lines
								color="#fff"
								className="w-full absolute top-0 left-[-5%]"
							/>
							<div className="p-4">
								<IonSlides>
									{months.map(item => (
										<IonSlide key={item}>
											<IonText className="text-white font-semibold">
												{item}
											</IonText>
										</IonSlide>
									))}
								</IonSlides>
								<IonSlides
									options={{
										slidesPerView: 5,
										spaceBetween: 5
									}}
									className="my-6"
								>
									{dayOfMonths.map(item => (
										<IonSlide key={item.day}>
											<div
												className="rounded-lg p-3"
												style={{ border: '1px solid white' }}
											>
												<div className="flex flex-col">
													<IonText className="text-white font-light text-xsm">
														{item.dayWeek}
													</IonText>
													<IonText className="text-white text-xl mt-2">
														{item.day}
													</IonText>
												</div>
											</div>
										</IonSlide>
									))}
								</IonSlides>
								<Button onClick={() => console.log('Clickou')}>
									<IonText className="text-black text-semibold">
										Novo agendamento
									</IonText>
								</Button>
							</div>
						</div>
						<div className="mt-5">
							<IonText className="text-black font-semibold">
								Quarta, 27 de abril
							</IonText>
						</div>
					</IonContent>
				</IonModal>
			</IonContent>
		</IonPage>
	)
}

export default Home
