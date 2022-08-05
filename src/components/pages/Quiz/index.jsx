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
	IonCheckbox,
	IonItem,
	IonLabel,
	useIonRouter,
	createGesture
} from '@ionic/react'
import {
	searchOutline,
	addOutline,
	chevronForwardOutline,
	moveOutline
} from 'ionicons/icons'
import styled, { css } from 'styled-components'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Avatar from '../../ui/Avatar'
import Input from '../../ui/Input'
import Modal from '../../ui/Modal/SheetBottom'
import QuizList from '../../ui/QuizList'
import { createScheduledJob } from './../../../utils/createScheduleQStash'
import Button from './../../ui/Button'
import FrequencyModal from './FrequencyModal'

const imageTemp2 =
	'https://pm1.narvii.com/6583/13022a93a381cddb0c98d4e0a813635bd1215d89_hq.jpg'

const GridWrapper = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	overflow-y: hidden;
`

const Grid = styled.div`
	width: 100%;
	display: grid;
	grid-template-rows: repeat(2, min-content) 1fr;
	overflow: hidden;
`

const GridRow = styled.div`
	grid-area: ${({ area }) => area};

	${({ scrollable }) =>
		scrollable &&
		css`
			overflow-y: scroll;
		`}
`

const Quiz = () => {
	const { userSession, professional } = useAuth()
	const router = useIonRouter()

	const { control, handleSubmit, reset } = useForm({
		mode: 'onChange'
	})

	const [showFrequencyModal, setShowFrequencyModal] = React.useState(false)
	const [surveySelectedToInvite, setSurveySelectedToInvite] =
		React.useState(null)
	const [searchSurvey, setSearchSurvey] = React.useState('')

	const [invitedPatients, setInvitedPatients] = React.useState(null)
	const [isInvitedLoading, setIsInvitedLoading] = React.useState(false)
	const [schedule, setSchedule] = React.useState('0 * * * *')

	const buttonAddSurveyRef = React.useRef(null)

	const daysOfTheWeek = [
		'Domingo',
		'Segunda-feira',
		'Terça-feira',
		'Quarta-feira',
		'Quinta-feira',
		'Sexta-feira',
		'Sábado'
	]

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

			await createScheduledJob(schedule, invitedUsers)
		}

		if (error) {
			console.log(error)
			setIsInvitedLoading(false)
		}
	}

	React.useEffect(() => {
		// Gesture from ionic => https://ionicframework.com/docs/utilities/gestures
		const gesture = createGesture({
			el: buttonAddSurveyRef.current,
			onMove: detail => {
				const { innerWidth: screenWidth, innerHeight: screenHeight } =
					window

				// Calculate X and Y position to sync with the mouse position
				const currentX = detail.currentX - screenWidth + 50
				const currentY = detail.currentY - screenHeight + 100

				// Positioning X and delimiting the screen range
				const positioningX =
					currentX > 0
						? 0
						: currentX < -screenWidth + 73
						? -screenWidth + 73
						: currentX

				// Positioning Y and delimiting the screen range
				const positioningY =
					currentY > 0
						? 0
						: currentY < -screenHeight + 225
						? -screenHeight + 225
						: currentY

				// Set position for the element
				buttonAddSurveyRef.current.style.transform = `translate(${positioningX}px, ${positioningY}px)`
			}
		})

		const resetPostionOnResize = () =>
			(buttonAddSurveyRef.current.style.transform = '')

		if (buttonAddSurveyRef.current) {
			// Add gesture event from ionic to move the element
			gesture.enable()

			// Add resize event from javascript to reset the position when resize screen
			window.addEventListener('resize', resetPostionOnResize)
		}

		return () => {
			// Remove events when component unmount
			gesture.destroy()
			window.removeEventListener('resize', resetPostionOnResize)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buttonAddSurveyRef])

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
			<IonContent
				className="ion-padding relative overflow-y-hidden"
				fullscreen
			>
				{professional && (
					<IonFabButton
						className="absolute right-[10px] bottom-[70px] z-10"
						ref={buttonAddSurveyRef}
						onClick={() => router.push('/app/form')}
					>
						<IonIcon icon={addOutline} color="#fff" />
					</IonFabButton>
				)}
				<GridWrapper>
					<Grid>
						<GridRow area="1 / 1 / 2 / 2">
							<Input
								icon={<IonIcon src={searchOutline} />}
								onChange={e => setSearchSurvey(e.target.value)}
								placeholder="Pesquisar"
								background="bg-white"
								classContent="mb-6"
							/>
						</GridRow>
						<GridRow area="2 / 1 / 3 / 2">
							<IonText>Recentes</IonText>
						</GridRow>
						<GridRow area="3 / 1 / 4 / 2" scrollable={true}>
							<QuizList
								searchSurvey={searchSurvey}
								setSurveySelectedToInvite={setSurveySelectedToInvite}
							/>
						</GridRow>
					</Grid>
				</GridWrapper>
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
								<IonItem
									lines="none"
									className="ion-justify-content-around ion-align-items-center"
								>
									<IonLabel className="font-bold">Frequência</IonLabel>

									<div
										onClick={() => {
											setShowFrequencyModal(!showFrequencyModal)
										}}
										className="flex justify-center"
									>
										<IonLabel>{schedule}</IonLabel>
										<IonIcon
											className="h-6"
											icon={chevronForwardOutline}
										/>
									</div>
								</IonItem>
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
				{/* Frequency */}
				{showFrequencyModal && (
					<FrequencyModal
						isOpen={showFrequencyModal}
						setIsOpen={setShowFrequencyModal}
						setSchedule={setSchedule}
						daysOfTheWeek={daysOfTheWeek}
					/>
				)}
			</IonContent>
		</IonPage>
	)
}

export default Quiz
