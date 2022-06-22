import * as React from 'react'

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing'
import { isPlatform } from '@ionic/react'
import {
	IonPage,
	IonContent,
	IonText,
	IonSlides,
	IonSlide,
	IonModal,
	IonItem,
	IonLabel,
	IonTextarea,
	IonIcon
} from '@ionic/react'
import { close } from 'ionicons/icons'
import Image from 'next/image'
import styled from 'styled-components'

import Letter from '../../../assets/icons/Letter'
import Lines from '../../../assets/Lines'
import Profile from '../../../assets/Profile.png'
import { useAuth } from '../../../contexts/Auth'
import Button from '../../ui/Button'
import Card from '../../ui/Card'
import Chart from '../../ui/Chart'
import Modal from '../../ui/Modal'
import ShortcutCard from '../../ui/ShortcutCard'

const Slide = styled(IonSlides)`
	ion-slide {
		height: 100% !important;
		padding: 30px 0;

		& > div {
			height: -webkit-fill-available !important;
		}
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

const HomeProfessional = () => {
	const [modalAgendaOpen, setModalAgendaOpen] = React.useState(false)
	const [modalInviteUserOpen, setModalInviteUserOpen] = React.useState(false)
	const { user } = useAuth()

	const slideOpts = {
		slidesPerView: 2.6,
		spaceBetween: 5,
		speed: 400,
		autoHeight: true
	}

	const handleShareUrl = async () => {
		try {
			return await SocialSharing.share(
				'Complete seu cadastro na Popsicle e aproveite os benefícios',
				'Seu Psicologo te convidou para Popsi',
				'',
				`${process.env.SITE_URL}/sign-up?medic=${user.id}`
			)
		} catch (error) {
			console.log(error)
		}
	}

	const areaChartData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'Quantidade de pacientes',
				backgroundColor: '#AC8FBF',
				borderColor: '#AC8FBF',
				borderWidth: 3,
				hoverBackgroundColor: '#AC8FBF',
				hoverBorderColor: '#AC8FBF',
				data: [65, 59, 80, 81, 56, 55, 40],
				tension: 0.4,
				segment: {
					borderColor: '#AC8FBF',
					backgroundColor: '#AC8FBF'
				}
			}
		]
	}

	return (
		<IonPage>
			<IonContent className="ion-padding bg-white-100" fullscreen>
				<div className="flex justify-between">
					<div className="flex flex-col">
						<IonText className="text-sm text-gray-900 mb-1 font-light">
							Bem vindo{'(a)'}
						</IonText>
						<IonText className="text-black-200 text-3xl font-bold">
							{user.user_metadata.nickname}
						</IonText>
					</div>
					<Image src={Profile} alt="Foto de perfil" />
				</div>
				<Slide options={slideOpts} className="mt-4 mb-3">
					<IonSlide className="h-full">
						<ShortcutCard
							type="button"
							onClick={() => setModalInviteUserOpen(true)}
							background="bg-purple-100"
						>
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
						onClick={() => setModalAgendaOpen(true)}
					>
						<IonText className="text-white font-semibold">
							Ver agenda completa
						</IonText>
					</Button>
				</Card>
				<Card className="mt-4">
					<div className="flex flex-col mb-4">
						<IonText className="text-xsm">Resumo semanal</IonText>
						<IonText className="font-semibold text-sm">
							Hoje, 02 de maio
						</IonText>
					</div>
					<Chart
						data={areaChartData}
						options={{
							maintainAspectRatio: true
						}}
					/>
				</Card>
				<IonModal
					isOpen={modalInviteUserOpen}
					onDidDismiss={() => setModalInviteUserOpen(false)}
					breakpoints={[0, 0.2, 0.5, 1]}
					initialBreakpoint={0.5}
					backdropBreakpoint={0.2}
				>
					<IonContent className="ion-padding">
						{isPlatform !== 'ios' || isPlatform !== 'android' ? (
							<>
								<IonItem lines="none">
									<IonLabel>
										<IonText className="text-xl font-semibold">
											Convite web
										</IonText>
									</IonLabel>
									<IonIcon
										slot="end"
										icon={close}
										onClick={() => setModalInviteUserOpen(false)}
									/>
								</IonItem>
								<IonItem lines="none">
									<IonText className="text-sm text-gray-600">
										clique para copiar e envie o link abaixo para
										convidar
									</IonText>
								</IonItem>
								<IonItem lines="none">
									<IonTextarea
										onClick={() =>
											navigator.clipboard.writeText(
												`${process.env.SITE_URL}/sign-up?medic=${user.id}`
											)
										}
										value={`${process.env.SITE_URL}/sign-up?medic=${user.id}`}
										readonly
										className="text-sm"
									/>
								</IonItem>
							</>
						) : (
							<IonItem lines="none">
								<IonLabel>
									<IonText className="text-xl font-semibold">
										Convite mobile
									</IonText>
								</IonLabel>
								<IonIcon
									slot="end"
									icon={close}
									onClick={() => setModalInviteUserOpen(false)}
								/>
								<div className="flex justify-center my-4">
									<IonText className="text-black font-semibold text-center">
										Convidar paciente
									</IonText>
								</div>
								<div className="bg-gray-300 flex justify-center my-4">
									<IonText className="text-gray-900 text-center">
										{`${process.env.SITE_URL}/sign-up?medic=${user.id}`}
									</IonText>
								</div>
								<Button
									className="bg-purple-200"
									onClick={() => handleShareUrl()}
								>
									<IonText className="text-black text-semibold">
										Compartilhar
									</IonText>
								</Button>
							</IonItem>
						)}
					</IonContent>
				</IonModal>
				<Modal
					isOpen={modalAgendaOpen}
					onDidDismiss={() => setModalAgendaOpen(false)}
					height={80}
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
								<div className="my-2">
									<IonSlides>
										{months.map(item => (
											<IonSlide key={item}>
												<IonText className="text-white font-semibold">
													{item}
												</IonText>
											</IonSlide>
										))}
									</IonSlides>
								</div>
								<div className="mb-4">
									<IonSlides
										options={{
											slidesPerView: 5,
											spaceBetween: 5
										}}
										className="my-10"
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
								</div>
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
				</Modal>
			</IonContent>
		</IonPage>
	)
}

export default HomeProfessional
