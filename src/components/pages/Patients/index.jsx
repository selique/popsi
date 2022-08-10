import * as React from 'react'
import { Link } from 'react-router-dom'

import {
	IonContent,
	IonIcon,
	IonPage,
	IonText,
	IonAvatar,
	IonToolbar,
	IonTitle,
	useIonLoading,
	useIonToast,
	IonItem,
	useIonRouter,
	IonHeader,
	IonImg
} from '@ionic/react'
import { filterOutline, addOutline, searchOutline } from 'ionicons/icons'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Card from '../../ui/Card'
import UploadAvatar from '../../UploadAvatar'
import Input from './../../ui/Input'

const Patients = () => {
	const router = useIonRouter()

	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()
	const { user, loading } = useAuth()
	const [patients, setPatients] = React.useState([])
	const [patientsFiltered, setPatientsFiltered] = React.useState([])
	const [searchPatient, setSearchPatient] = React.useState('')

	const getPatients = async () => {
		await showLoading()
		try {
			let { data, error, status } = await supabase
				.from('profiles')
				.select(
					`
					id,
					full_name,
					avatar_url
				`
				)
				.eq('medic_id', user?.id)

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setPatients(data)
			}
		} catch (error) {
			showToast({
				header: 'Erro',
				message: error.message,
				position: 'top',
				color: 'purple',
				cssClass: 'text-white',
				duration: 5000,
				animated: true
			})
		} finally {
			await hideLoading()
		}
	}

	React.useEffect(() => {
		if (user) {
			getPatients()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	React.useEffect(() => {
		if (patients && searchPatient !== '') {
			const filteredArray = patients.filter(({ full_name }) => {
				return full_name.toLowerCase().includes(searchPatient.toLowerCase())
			})
			setPatientsFiltered(filteredArray)
		} else {
			setPatientsFiltered(patients)
		}
	}, [patients, searchPatient])

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
					<Input
						icon={<IonIcon src={searchOutline} />}
						onChange={e => setSearchPatient(e.target.value)}
						placeholder="Pesquisar"
						background="bg-white"
						classContent="mb-6"
					/>
					{/* <div className="flex items-center justify-between mb-5">
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
					</IonSlides> */}
					<div className="mt-5">
						<Card>
							{!patientsFiltered ||
							(patientsFiltered && patientsFiltered.length === 0) ? (
								<IonText>Nenhum paciente encontrado.</IonText>
							) : (
								patientsFiltered.map(
									({ full_name, avatar_url, id }, index) => {
										return (
											// <Link
											// 	to={`/app/patients/quiz/${id}`}
											// >
											<IonItem
												key={id}
												lines={
													index + 1 === patientsFiltered.length &&
													'none'
												}
											>
												{avatar_url ? (
													<IonAvatar className="flex items-center w-[50px] h-[50px]">
														<UploadAvatar
															_avatarUrl={avatar_url}
															disabledUpload
															alt="Foto de perfil"
														/>
													</IonAvatar>
												) : (
													<IonAvatar
														className="flex items-center w-[50px] h-[50px]"
														onClick={() =>
															router.push('/app/profile')
														}
													>
														<IonImg
															src={'/img/Profile.png'}
															alt={full_name}
														/>
													</IonAvatar>
												)}
												<IonText className="font-semibold ml-3">
													{full_name}
												</IonText>
											</IonItem>
											// </Link>
										)
									}
								)
							)}
						</Card>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Patients
