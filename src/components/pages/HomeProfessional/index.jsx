import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Clipboard } from '@capacitor/clipboard'
import { Share } from '@capacitor/share'
import {
	IonAvatar,
	IonCol,
	IonGrid,
	IonList,
	IonNote,
	IonRow,
	isPlatform,
	useIonRouter
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

const HomeProfessional = () => {
	const [modalInviteUserOpen, setModalInviteUserOpen] = React.useState(false)
	const { user } = useAuth()

	const router = useIonRouter()

	const slideOpts = {
		slidesPerView: 2.6,
		spaceBetween: 5,
		speed: 400,
		autoHeight: true
	}

	const handleShareUrl = async () => {
		try {
			await Share.share({
				title: 'Seu Psicologo te convidou para Popsi',
				text: 'Complete seu cadastro na Popsicle e aproveite os benefícios',
				url: `${process.env.SITE_URL}/sign-up?medic=${user.id}`
			})
		} catch (error) {
			console.log(error)
		}
	}

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
						<IonAvatar
							className="flex items-center w-[50px] h-max"
							onClick={() => router.push('/app/profile')}
						>
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
					<IonItem lines="none" className="mt-2">
						<IonLabel position="stacked">Link</IonLabel>
						<Button
							className="justify-start w-full"
							onClick={() => {
								Clipboard.write({
									string: `${process.env.SITE_URL}/sign-up?medic=${user.id}`
								})
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
									className="opacity-100 bg-purple-100 text-white font-bold text-lg"
									onClick={() => handleShareUrl()}
									type="submit"
								>
									Compartilhar
								</Button>
							</IonCol>
						</IonRow>
					</IonGrid>
				</ModalSheet>
			</IonContent>
		</IonPage>
	)
}

export default HomeProfessional
