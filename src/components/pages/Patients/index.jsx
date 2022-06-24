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
import Card from '../../ui/Card'

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
			setPatient([
				{
					full_name: 'Cintia S. Amaro',
					avatar_url: imageTemp
				},
				{
					full_name: 'Cintia S. Amaro',
					avatar_url: imageTemp
				},
				{
					full_name: 'Cintia S. Amaro',
					avatar_url: imageTemp
				},
				{
					full_name: 'Cintia S. Amaro',
					avatar_url: imageTemp
				},
				{
					full_name: 'Cintia S. Amaro',
					avatar_url: imageTemp
				},
				{
					full_name: 'Cintia S. Amaro',
					avatar_url: imageTemp
				}
			])
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
					<IonTitle className="text-lg font-semibold text-center">
						Pacientes
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding" fullscreen>
				<div className="bg-white-100">
					<IonSearchbar
						placeholder="Pesquisar"
						className="mb-4 bg-white"
					/>
					<div className="flex items-center justify-between mb-5">
						<IonText className="text-black font-medium">
							Favoritos
						</IonText>
						<IonIcon src={filterOutline} />
					</div>
					<IonSlides
						options={{
							slidesPerView: 4.2,
							spaceBetween: 5,
							speed: 400,
							autoHeight: true
						}}
					>
						<IonSlide>
							<div className="w-[80px] h-[80px] border-2 border-white border-solid rounded-full">
								<Avatar width="100%" height="100%" hasBorder={false}>
									<IonIcon
										src={addOutline}
										size="large"
										className="text-white"
									/>
								</Avatar>
							</div>
						</IonSlide>
						{[...Array(10)].map((_, index) => (
							<IonSlide key={index}>
								<div>
									<div className="w-[80px] h-[80px] border-2 border-white border-solid rounded-full">
										<Avatar
											width="100%"
											height="100%"
											background={imageTemp}
											hasBorder={false}
										/>
									</div>
									<IonText className="text-sm">
										Nome {index + 1}
									</IonText>
								</div>
							</IonSlide>
						))}
					</IonSlides>
					<div className="mt-5">
						{patient.map(({ full_name, avatar_url }, index) => (
							<Card
								key={index}
								classContainer="mb-3"
								className="flex items-center"
							>
								<div className="w-[50px] h-[50px]">
									<Avatar
										width="100%"
										height="100%"
										background={avatar_url}
										hasBorder={false}
									/>
								</div>
								<IonText className="font-semibold ml-3 text-xl">
									{full_name}
								</IonText>
							</Card>
						))}
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Patients
