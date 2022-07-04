import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing'
import {
	IonAvatar,
	IonCol,
	IonGrid,
	IonList,
	IonNote,
	IonRow,
	isPlatform
} from '@ionic/react'
import {
	IonPage,
	IonContent,
	IonText,
	IonSlides,
	IonSlide,
	IonInput,
	IonItem,
	IonLabel,
	IonTextarea,
	IonIcon
} from '@ionic/react'
import { notificationsOutline } from 'ionicons/icons'
import { close } from 'ionicons/icons'
import Image from 'next/image'
import styled from 'styled-components'

import Letter from '../../../assets/icons/Letter'
import Profile from '../../../assets/Profile.png'
import { useAuth } from '../../../contexts/Auth'
import Button from '../../ui/Button'
import Card from '../../ui/Card'
import ModalSheet from '../../ui/Modal/SheetBottom'
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
	const { setValue, register, handleSubmit, watch } = useForm()

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

	const enviteForEmail = dataForm => console.log(dataForm)

	return (
		<IonPage>
			<IonContent className="ion-padding bg-white-100" fullscreen>
				<div className="flex justify-between">
					<div className="flex flex-col">
						<IonText className="text-sm text-gray-900 mb-1 font-light">
							Bem vindo{'(a)'}
						</IonText>
						<IonText className="text-black-200 text-2xl font-bold">
							{user.user_metadata.nickname}
						</IonText>
					</div>
					<div className="flex items-center">
						<Link to="/app/notification">
							<Button className="mr-2 rounded-full w-max px-3">
								<IonIcon
									icon={notificationsOutline}
									className="text-xl"
								/>
							</Button>
						</Link>
						<IonAvatar className="flex items-center w-[50px] h-max">
							<Image src={Profile} alt="Foto de perfil" />
						</IonAvatar>
					</div>
				</div>
				<Slide options={slideOpts} className="mt-2 mb-3">
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
					<IonText className="font-semibold text-gray-900 text-xl leading-5">
						Questionários respondidos recentemente
					</IonText>
					<div className="my-4">
						{[...Array(6)].map((_, index) => (
							<IonList key={index}>
								<IonItem lines={index === 5 && 'none'}>
									<IonAvatar slot="start">
										<Image src={Profile} alt="Foto de perfil" />
									</IonAvatar>
									<div className="flex flex-col">
										<IonText className="font-semibold">
											Ana Lisa
										</IonText>
										<IonText className="text-gray-900">
											Questionario 1
										</IonText>
									</div>
									<IonNote slot="end">10:30 am</IonNote>
								</IonItem>
							</IonList>
						))}
					</div>
				</Card>
				<ModalSheet
					title="Convidar paciênte"
					isOpen={modalInviteUserOpen}
					onDidDismiss={() => setModalInviteUserOpen(false)}
					height={30}
				>
					{isPlatform !== 'ios' || isPlatform !== 'android' ? (
						<form onSubmit={handleSubmit(enviteForEmail)}>
							<IonItem lines="none" className="mt-2">
								<IonLabel position="stacked">Link</IonLabel>
								<Button
									className="justify-start w-full"
									onClick={() => {
										navigator.clipboard.writeText(
											`${process.env.SITE_URL}/sign-up?medic=${user.id}`
										)
										setModalInviteUserOpen(false)
									}}
								>
									<IonText>
										{`${process.env.SITE_URL}/sign-up?medic=${user.id}`.slice(
											0,
											34
										) + '...'}
									</IonText>
								</Button>

								{/* <IonTextarea
									onClick={() => {
										navigator.clipboard.writeText(
											`${process.env.SITE_URL}/sign-up?medic=${user.id}`
										)
										setModalInviteUserOpen(false)
									}}
									value={`${process.env.SITE_URL}/sign-up?medic=${user.id}`.slice(0, 34) + '...'}
									readonly
									className="text-sm"
								/> */}
							</IonItem>
							<IonGrid>
								<IonRow>
									<IonCol>
										<Button
											className="bg-red-400 text-white font-bold text-lg"
											type="button"
											onClick={() => setModalInviteUserOpen(false)}
										>
											Cancelar
										</Button>
									</IonCol>
									<IonCol>
										<Button
											className={`${
												!watch('emailEnvite') &&
												watch('emailEnvite') === ''
													? 'opacity-40'
													: 'opacity-100'
											} bg-purple-100 text-white font-bold text-lg`}
											type="submit"
											disabled={
												!watch('emailEnvite') &&
												watch('emailEnvite') === ''
											}
										>
											Continuar
										</Button>
									</IonCol>
								</IonRow>
							</IonGrid>
						</form>
					) : (
						<IonItem lines="none">
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
				</ModalSheet>
			</IonContent>
		</IonPage>
	)
}

export default HomeProfessional
