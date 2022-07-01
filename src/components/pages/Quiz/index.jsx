import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'

import {
	IonContent,
	IonIcon,
	IonPage,
	IonText,
	IonFab,
	IonFabButton,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonBackButton,
	IonButtons,
	IonSearchbar,
	IonCheckbox
} from '@ionic/react'
import {
	searchOutline,
	documentOutline,
	shareSocialOutline,
	addOutline
} from 'ionicons/icons'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Avatar from '../../ui/Avatar'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
import Modal from '../../ui/Modal/SheetBottom'

const imageTemp2 =
	'https://pm1.narvii.com/6583/13022a93a381cddb0c98d4e0a813635bd1215d89_hq.jpg'

const Quiz = () => {
	const { user, professional } = useAuth()
	const { register, control, handleSubmit, setValue, getValues, reset } =
		useForm({
			mode: 'onChange'
		})

	const [surveys, setSurveys] = React.useState(null)
	const [invitedPatients, setInvitedPatients] = React.useState(null)
	const [surveySelectedToInvite, setSurveySelectedToInvite] =
		React.useState(null)
	const [isInvitedLoading, setIsInvitedLoading] = React.useState(false)

	React.useEffect(() => {
		const getInvitedPatients = async () => {
			const { data } = await supabase
				.from('profiles')
				.select(
					`
					id,
					nickname,
					avatar_url
				`
				)
				.eq('medic_id', user.id)

			if (data) setInvitedPatients(data)
		}

		if (professional) getInvitedPatients()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	React.useEffect(() => {
		const getSurveys = async () => {
			if (professional) {
				const { data } = await supabase
					.from('surveys')
					.select(
						`
						id,
						profiles:owner_id (nickname),
						title,
						description,
						_survey_invited ( profiles ( * ) )
					`
					)
					.eq('owner_id', user.id)

				if (data) {
					setSurveys(data)
				}
			} else {
				const { data } = await supabase
					.from('_survey_invited')
					.select(
						`
						id,
						surveys ( * )
					`
					)
					.eq('A', user.id)

				if (data && data.surveys) {
					setSurveys(data.surveys)
				}
			}
		}

		getSurveys()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleInvited = async dataForm => {
		setIsInvitedLoading(true)
		let usersInvited = []
		Object.values(dataForm).map(patient => {
			if (patient) {
				usersInvited.push({
					A: patient,
					B: surveySelectedToInvite
				})
			}
		})

		const { data, error } = await supabase
			.from('_survey_invited')
			.insert(usersInvited)

		if (data) {
			setIsInvitedLoading(false)
			setSurveySelectedToInvite(null)
			reset()
		}

		if (error) {
			console.log(error)
			setIsInvitedLoading(false)
		}
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/app/home" />
					</IonButtons>
					<IonTitle className="text-lg font-semibold">
						Questionários
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding" fullscreen>
				<Input
					icon={<IonIcon src={searchOutline} />}
					placeholder="Pesquisar"
					background="bg-white"
					classContent="mb-6"
				/>
				<div>
					<IonText>Recentes</IonText>
					{!surveys ? (
						<>
							<br />
							<IonText>Nenhum questionário encontrado.</IonText>
						</>
					) : (
						surveys.map((item, index) => (
							<Link to={`/form/answers/${item.id}`} key={index}>
								<div
									className={`grid ${
										professional
											? 'grid-cols-[auto_1fr_auto]'
											: 'grid-cols-[auto_1fr]'
									} mt-5 items-center gap-4 ${
										!professional && 'bg-gray-200 p-3 rounded-2xl'
									}`}
								>
									<div className="relative">
										<div className="bg-purple-opacity-100 text-white flex justify-center items-center text-3xl p-5 rounded-2xl">
											<IonIcon src={documentOutline} color="white" />
										</div>
										{/* {professional && (
										<div className="absolute bottom-0 right-0">
											<Avatar
												background={item.peaples[0].image}
												width={'20px'}
												height={'20px'}
												style={{ border: '1px solid #ffffff' }}
												className={`absolute bottom-0 right-0`}
											/>
											<Avatar
												background={item.peaples[1].image}
												width={'20px'}
												height={'20px'}
												style={{ border: '1px solid #ffffff' }}
												className={`absolute bottom-0 right-2`}
											/>
											<Avatar
												background={item.peaples[2].image}
												width={'20px'}
												height={'20px'}
												style={{ border: '1px solid #ffffff' }}
												className={`absolute bottom-0 right-4`}
											/>
										</div>
									)} */}
									</div>
									<div className="flex flex-col">
										<IonText className="text-black">
											{item.title}
										</IonText>
										<IonText className="text-gray-900 text-xsm">
											{item.description}
										</IonText>
										{!professional && (
											<div className="flex items-center mt-3">
												<Avatar
													background={imageTemp2}
													width={'20px'}
													height={'20px'}
													style={{ border: '1px solid #ffffff' }}
												/>
												<IonText className="ml-1 capitalize">
													{item.profiles.nickname}
												</IonText>
											</div>
										)}
									</div>
									{professional && (
										<div
											className="text-purple-100 text-2xl"
											onClick={e => {
												e.preventDefault()
												setSurveySelectedToInvite(item.id)
											}}
										>
											<IonIcon
												src={shareSocialOutline}
												color="#AC8FBF"
											/>
										</div>
									)}
								</div>
							</Link>
						))
					)}
				</div>
				{professional && (
					<IonFab vertical="bottom" horizontal="end" slot="fixed">
						<IonFabButton href="/app/form">
							<IonIcon icon={addOutline} color="#fff" />
						</IonFabButton>
					</IonFab>
				)}
				<Modal
					isOpen={!!surveySelectedToInvite}
					onDidDismiss={() => {
						if (!isInvitedLoading) {
							reset()
							setSurveySelectedToInvite(null)
						}
					}}
					height={80}
					title="Enviar para"
					swipeToClose={false}
				>
					<form onSubmit={handleSubmit(handleInvited)}>
						<IonSearchbar className="mb-4" />
						<div>
							{/* <IonText className="font-bold">Ultimos envios</IonText>
							<IonSlides
								options={{
									slidesPerView: 5.2,
									spaceBetween: 5,
									speed: 400,
									autoHeight: true
								}}
							>
								{surveys &&
								surveySelectedToInvite &&
								surveys.filter(
									survey => survey.id === surveySelectedToInvite
								) ? (
									surveys
										.filter(
											survey => survey.id === surveySelectedToInvite
										)[0]
										._survey_invited.map(({ profiles }, index) => (
											<IonSlide key={index}>
												<Avatar
													background={
														profiles.avatar_url ?? imageTemp2
													}
													hasBorder={false}
													width="70px"
													height="70px"
												/>
											</IonSlide>
										))
								) : (
									<IonText className="font-bold">
										Nenhum paciente encontrado.
									</IonText>
								)}
							</IonSlides> */}
						</div>
						<div className="mt-7">
							<IonText className="font-bold">Lista de Pacientes</IonText>
							<div className="overflow-scroll h-[32vh]">
								{invitedPatients ? (
									invitedPatients.map((item, index) => {
										// const validating = surveys
										// 	.filter(
										// 		survey =>
										// 			survey.id === surveySelectedToInvite
										// 	)[0]
										// 	?._survey_invited?.find(
										// 		patient => patient.id === item.id
										// 	)

										// console.log(item.id)
										// console.log(!!validating)
										return (
											<div
												key={index}
												className="grid grid-cols-[auto_1fr_auto] gap-4 items-center mt-4"
											>
												<Avatar
													background={
														item.avatar_url ?? imageTemp2
													}
													hasBorder={false}
													width="70px"
													height="70px"
												/>
												<IonText className="font-bold">
													{item.nickname}
												</IonText>
												<Controller
													control={control}
													name={`envited${index}`}
													render={({ field: { onChange } }) => (
														<IonCheckbox
															value={item.id}
															disabled={isInvitedLoading}
															onIonChange={() =>
																!isInvitedLoading &&
																onChange(item.id)
															}
														/>
													)}
												/>
											</div>
										)
									})
								) : (
									<IonText className="font-bold">
										Nenhum paciente encontrado.
									</IonText>
								)}
							</div>
						</div>
						<Button
							className={`${
								isInvitedLoading ? 'bg-gray-400' : 'bg-purple-100'
							} mt-2 py-4`}
							type="submit"
							disabled={isInvitedLoading}
						>
							<IonText className="text-white text-lg">
								{isInvitedLoading ? 'Eviando...' : 'Enviar'}
							</IonText>
						</Button>
					</form>
				</Modal>
			</IonContent>
		</IonPage>
	)
}

export default Quiz
