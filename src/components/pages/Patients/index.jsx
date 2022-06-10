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
	useIonToast
} from '@ionic/react'
import { search, filterOutline, addOutline } from 'ionicons/icons'

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
				<Input
					placeholder="Pesquisar"
					icon={<IonIcon src={search} />}
					background="bg-white"
					classContent="my-5"
				/>
				<div className="flex items-center justify-between">
					<IonText className="text-black">Lista personlizada</IonText>
					<IonIcon src={filterOutline} />
				</div>
				<IonSlides
					options={{
						slidesPerView: 4.5
					}}
					className="mt-3 mb-5	"
				>
					<IonSlide className="py-3">
						<Avatar>
							<IonIcon src={addOutline} size="large" color="#ffffff" />
						</Avatar>
					</IonSlide>
					{[...Array(10)].map((_, index) => (
						<IonSlide className="py-3" key={index}>
							<Avatar background={imageTemp} />
						</IonSlide>
					))}
				</IonSlides>
				<div>
					{patient.map(({ full_name, avatar_url }, index) => (
						<div
							key={index}
							className="my-8 grid grid-cols-3 items-center"
						>
							<Avatar background={avatar_url} />
							<div className="flex flex-col">
								<IonText className="font-semibold">{full_name}</IonText>
							</div>
						</div>
					))}
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Patients
