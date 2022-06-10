import * as React from 'react'

import {
	IonContent,
	IonIcon,
	IonPage,
	IonSlide,
	IonSlides,
	IonText,
	IonHeader,
	IonToolbar,
	IonTitle,
	useIonLoading,
	useIonToast,
	IonSearchbar
} from '@ionic/react'
import { filterOutline, addOutline } from 'ionicons/icons'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Avatar from '../../ui/Avatar'
import Input from '../../ui/Input'

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const Patients = () => {
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()
	const { user, loading } = useAuth()
	const [patient, setPatient] = React.useState([])
	const getPatients = async () => {
		await showLoading()
		try {
			let { data, error, status } = await supabase
				.from('profiles')
				.select(
					`
					full_name,
					avatar_url
				`
				)
				.eq('medic_id', user?.id)

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setPatient(data)
			}
		} catch (error) {
			showToast({ message: error.message, duration: 5000 })
		} finally {
			await hideLoading()
		}
	}

	const downloadImage = async path => {
		try {
			const { data, error } = await supabase.storage
				.from('avatars')
				.download(path)

			if (error) {
				throw error
			}
			const url = URL.createObjectURL(data)
			return url
		} catch (error) {
			console.log('Error downloading image: ', error.message)
			return imageTemp
		}
	}

	React.useEffect(() => {
		if (user) {
			getPatients()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle className="text-lg font-semibold">Pacientes</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding bg-black" fullscreen>
				<IonSearchbar placeholder="Pesquisar" />
				<div className="flex items-center justify-between mb-5">
					<IonText className="text-black">Lista personlizada</IonText>
					<IonIcon src={filterOutline} />
				</div>
				<IonSlides
					options={{
						slidesPerView: 4.5,
						spaceBetween: 5,
						speed: 400,
						autoHeight: true
					}}
				>
					<IonSlide>
						<div className="w-[80px] h-[80px]">
							<Avatar width="100%" height="100%" hasBorder={false}>
								<IonIcon
									src={addOutline}
									size="large"
									color="#ffffff"
								/>
							</Avatar>
						</div>
					</IonSlide>
					{[...Array(10)].map((_, index) => (
						<IonSlide key={index}>
							<div className="w-[80px] h-[80px]">
								<Avatar
									width="100%"
									height="100%"
									background={imageTemp}
									hasBorder={false}
								/>
							</div>
						</IonSlide>
					))}
				</IonSlides>
				<div>
					{patient.map(({ full_name, avatar_url }, index) => (
						<div
							key={index}
							className="my-8 grid grid-cols-[80px_1fr_auto] gap-4 items-center"
						>
							<div className="w-[80px] h-[80px]">
								<Avatar
									width="100%"
									height="100%"
									background={avatar_url}
									hasBorder={false}
								/>
							</div>
							<div className="flex flex-col">
								<IonText className="font-semibold">{full_name}</IonText>
								<IonText className="font-light text-sm">
									Guarulhos, São Paulo
								</IonText>
							</div>
							<div className="flex flex-col text-light text-xsm">
								<IonText>Ultimo Acesso</IonText>
								<IonText>Hoje as 10:30</IonText>
							</div>
						</div>
					))}
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Patients
