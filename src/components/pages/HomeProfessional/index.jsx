import * as React from 'react'

import 'swiper/css'
import { Clipboard } from '@capacitor/clipboard'
import { Share } from '@capacitor/share'
import {
	IonAvatar,
	IonCol,
	IonGrid,
	IonRow,
	useIonRouter,
	useIonToast,
	IonPage,
	IonContent,
	IonText,
	IonLabel
} from '@ionic/react'
import { Swiper, SwiperSlide } from 'swiper/react'

import Letter from '../../../assets/icons/Letter'
import { useAuth } from '../../../contexts/Auth'
import handlePronoun from '../../../utils/pronoun'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal/SheetBottom'
import ShortcutCard from '../../ui/ShortcutCard'
import UploadAvatar from '../../UploadAvatar'
import AnswaredSurveys from './AswaredSurveys'

const HomeProfessional = () => {
	const [modalInviteUserOpen, setModalInviteUserOpen] = React.useState(false)
	const { user } = useAuth()

	const router = useIonRouter()
	const [showToast] = useIonToast()

	const handleShareUrl = async () => {
		try {
			await Share.share({
				title: 'Seu Psicologo te convidou para Popsi',
				text: 'Complete seu cadastro na Popsicle e aproveite os benefícios',
				url: `/sign-up?medic=${user.id}`
			})
		} catch (error) {
			console.log(error)
		} finally {
			setModalInviteUserOpen(false)
		}
	}

	return (
		<IonPage>
			<IonContent className="ion-padding bg-white-100" fullscreen>
				<IonGrid>
					<IonRow>
						<IonCol className="flex flex-col w-[calc(100%-50px)]">
							<IonText className="text-sm text-gray-900 mb-1 font-light">
								{user?.pronoun
									? handlePronoun(user?.pronoun) === 'n'
										? 'Bem vindo(a)'
										: handlePronoun(user?.pronoun) === 'm'
										? 'Bem vindo'
										: 'Bem vinda'
									: 'Bem vindo(a)'}
							</IonText>
							<IonText className="text-black-200 text-2xl font-bold truncate">
								{user?.nickname}
							</IonText>
						</IonCol>
						<IonCol className="ion-align-items-center ion-justify-content-end flex">
							<IonAvatar
								className="flex items-center w-[50px] h-[50px]"
								onClick={() => router.push('/app/profile')}
							>
								<UploadAvatar disabledUpload alt="Foto de perfil" />
							</IonAvatar>
						</IonCol>
					</IonRow>
				</IonGrid>
				<Swiper spaceBetween={50} slidesPerView={3} className="my-3">
					<SwiperSlide>
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
								Convide seus paciêntes para fazer parte da Popsi.
							</IonText>
						</ShortcutCard>
					</SwiperSlide>
					{/* <SwiperSlide>
						<ShortcutCard>
							<Letter color="#7A7A7A" />
							<IonText className="font-bold mt-4 mb-2 text-gray-900">
								Agenda
							</IonText>
							<IonText className="text-left text-xsm text-gray-900">
								Agende horarios de consultas.
							</IonText>
						</ShortcutCard>
					</SwiperSlide> */}
				</Swiper>
				<AnswaredSurveys />
				<Modal
					title="Convidar paciênte"
					isOpen={modalInviteUserOpen}
					onDidDismiss={() => setModalInviteUserOpen(false)}
					height={30}
				>
					<IonText>Link de Convite</IonText>
					<Button
						className="justify-start w-full"
						onClick={() => {
							Clipboard.write({
								string: `${process.env.SITE_URL}/sign-up?medic=${user.id}`
							})
							showToast({
								header: 'Link Copiado para a área de transferência',
								position: 'top',
								color: 'purple',
								cssClass: 'text-white',
								duration: 5000,
								animated: true
							})
							setModalInviteUserOpen(false)
						}}
					>
						<IonText>
							{`${process.env.SITE_URL}/sign-up?medic=${user.id}`}
						</IonText>
					</Button>
					<Button
						className="opacity-100 bg-purple-100 text-white font-bold text-lg mt-2"
						onClick={() => handleShareUrl()}
						type="submit"
					>
						Compartilhar
					</Button>
				</Modal>
			</IonContent>
		</IonPage>
	)
}

export default HomeProfessional
