import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'

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
	IonCheckbox
} from '@ionic/react'
import { searchOutline, addOutline } from 'ionicons/icons'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Avatar from '../../ui/Avatar'
import Input from '../../ui/Input'
import Modal from '../../ui/Modal/SheetBottom'
import { createScheduledJob } from './../../../utils/createScheduleQStash'
import Button from './../../ui/Button'
import QuizList from './../../ui/QuizList'

const imageTemp2 =
	'https://pm1.narvii.com/6583/13022a93a381cddb0c98d4e0a813635bd1215d89_hq.jpg'

const Quiz = () => {
	const { userSession, professional } = useAuth()

	const { register, control, handleSubmit, setValue, getValues, reset } =
		useForm({
			mode: 'onChange'
		})

	const [surveySelectedToInvite, setSurveySelectedToInvite] =
		React.useState(null)
	const [searchSurvey, setSearchSurvey] = React.useState('')

	const [invitedPatients, setInvitedPatients] = React.useState(null)
	const [isInvitedLoading, setIsInvitedLoading] = React.useState(false)
	const [schedule, setSchedule] = React.useState('* * * * *')

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
				.eq('medic_id', userSession.id)

			if (data) setInvitedPatients(data)
		}

		if (professional) getInvitedPatients()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleInvited = async dataForm => {
		setIsInvitedLoading(true)
		let usersInvited = []
		Object.values(dataForm).map(patient => {
			if (patient) {
				usersInvited.push({
					patient_id: patient,
					survey_id: surveySelectedToInvite,
					allow_reply_later: false,
					schedule
				})
			}
		})

		const { data, error } = await supabase
			.from('survey_generate_invite')
			.insert(usersInvited)

		if (data) {
			setIsInvitedLoading(false)
			setSurveySelectedToInvite(null)
			reset()

			const invitedUsers = data.map(({ id, patient_id }) => ({
				survey_generate_invite_id: id,
				patient_id
			}))

			const response = await createScheduledJob(schedule, invitedUsers)
			console.log('response', response)
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
					onChange={e => setSearchSurvey(e.target.value)}
					placeholder="Pesquisar"
					background="bg-white"
					classContent="mb-6"
				/>
				<div>
					<IonText>Recentes</IonText>
					<QuizList searchSurvey={searchSurvey} />
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
						<Input
							icon={<IonIcon src={searchOutline} />}
							placeholder="Pesquisar"
							background="bg-white"
							classContent="mb-6"
							className="drop-shadow-md"
						/>
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
