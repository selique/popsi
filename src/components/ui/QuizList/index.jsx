import * as React from 'react'
import { Link } from 'react-router-dom'

import {
	IonIcon,
	IonItem,
	IonPopover,
	IonText,
	useIonToast,
	useIonLoading,
	IonLabel,
	IonList,
	IonContent,
	useIonRouter
} from '@ionic/react'
import {
	shareSocialOutline,
	documentTextOutline,
	ellipsisHorizontalOutline,
	createOutline,
	trashOutline,
	eyeOutline
} from 'ionicons/icons'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Card from '../Card'
import SurveyStatus from './surveyStatus'

const QuizList = ({
	searchSurvey = '',
	setSurveySelectedToInvite,
	isTherePatients
}) => {
	const { userSession, user, professional } = useAuth()
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()
	const [surveys, setSurveys] = React.useState(null)
	const [surveysFiltered, setSurveysFiltered] = React.useState(null)
	const [popoverState, setShowPopover] = React.useState({
		showPopover: false,
		event: undefined,
		id: null
	})

	const router = useIonRouter()

	const fetchProfessionalSurveys = async () => {
		const { data } = await supabase
			.from('surveys')
			.select(
				`
				id,
				profiles:owner_id (nickname),
				title,
				description,
				survey_generate_invite ( profiles:patient_id ( * ) )
			`
			)
			.eq('owner_id', userSession.id)

		if (data) {
			setSurveys(data)
		}
	}

	const fetchPatientSurveys = async () => {
		const { data } = await supabase
			.from('_survey_invited')
			.select(
				`
				id,
				status,
				survey_generate_invite (
					profiles:patient_id ( * ),
					surveys:survey_id (
						id,
						title,
						description
					)
				)
			`
			)
			.eq('patient_id', userSession.id)

		if (data) {
			setSurveys(
				data.map(item => ({
					id: item.id,
					status: item.status,
					survey: item.survey_generate_invite.surveys
				}))
			)
		}
	}

	const deleteSurvey = async id => {
		await showLoading()
		try {
			let { data, error, status } = await supabase
				.from('surveys')
				.delete()
				.eq('id', id)

			if (error) {
				showToast({
					header: 'Erro',
					message: error.message,
					position: 'top',
					color: 'danger',
					cssClass: 'text-white',
					duration: 3000,
					animated: true
				})
				throw error
			}

			if (data) {
				await fetchProfessionalSurveys()
				showToast({
					header: 'Sucesso',
					message: 'Questionario deletado com sucesso',
					position: 'top',
					color: 'success',
					cssClass: 'text-white',
					duration: 3000,
					animated: true
				})
			}
		} catch (error) {
			showToast({
				header: 'Erro',
				message: error.message,
				position: 'top',
				color: 'danger',
				cssClass: 'text-white',
				duration: 3000,
				animated: true
			})
		} finally {
			await hideLoading()
		}
	}

	React.useEffect(() => {
		if (surveys && searchSurvey !== '') {
			const filteredArray = surveys.filter(item => {
				const survey = item.survey ? item.survey : item

				return survey.title
					.toLowerCase()
					.includes(searchSurvey.toLowerCase())
			})
			setSurveysFiltered(filteredArray)
		} else {
			setSurveysFiltered(surveys)
		}
	}, [surveys, searchSurvey])

	const professionalSurveysSubscription = () => {
		const subscription = supabase
			.from(`surveys:owner_id=eq.${userSession.id}`)
			.on('*', () => fetchProfessionalSurveys())
			.subscribe()

		return subscription
	}

	const patientSurveysSubscription = () => {
		const subscription = supabase
			.from(`_survey_invited:patient_id=eq.${userSession.id}`)
			.on('*', () => fetchPatientSurveys())
			.subscribe()

		return subscription
	}

	React.useEffect(() => {
		if (user) {
			if (professional) {
				fetchProfessionalSurveys()
				const subscription = professionalSurveysSubscription()

				return () => supabase.removeSubscription(subscription)
			} else {
				fetchPatientSurveys()
				const subscription = patientSurveysSubscription()

				return () => supabase.removeSubscription(subscription)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, professional])

	const handleInvitePatientModal = survey_id => {
		if (isTherePatients) {
			setSurveySelectedToInvite(survey_id)
		} else {
			showToast({
				header: 'Erro',
				message:
					'Você precisa ter pelo menos um pacientes para usar essa função.',
				position: 'top',
				color: 'danger',
				cssClass: 'text-white',
				duration: 3000,
				animated: true
			})
		}
	}

	return (
		<>
			{!surveysFiltered || surveysFiltered.length === 0 ? (
				<>
					<br />
					<IonText>Nenhum questionário encontrado.</IonText>
				</>
			) : (
				surveysFiltered.map((item, index) => {
					let survey = item.survey ? item.survey : item

					return (
						<Card
							key={index}
							classContainer={`${
								index + 1 < surveysFiltered.length
									? 'my-3'
									: 'mt-3 mb-10'
							}`}
						>
							<IonItem lines="none">
								<Link
									to={{
										pathname: professional
											? `/form/view/${survey.id}`
											: item.status === 'PENDING'
											? `/form/answers/${survey.id}`
											: '',
										state: { id: item.id }
									}}
									className="flex items-center h-full w-full justify-between"
								>
									<div className="flex items-center">
										<div
											slot="start"
											className="flex items-center justify-center bg-purple-200 py-3 px-2 rounded-2xl mr-2"
										>
											<IonIcon
												icon={documentTextOutline}
												className="text-3xl text-white"
											/>
										</div>
										<div className="flex flex-col">
											<IonText className="font-semibold">
												{survey.title}
											</IonText>
										</div>
									</div>
									{!professional && (
										<SurveyStatus status={item.status} />
									)}
								</Link>
								{professional && (
									<IonIcon
										icon={ellipsisHorizontalOutline}
										className="text-2xl"
										slot="end"
										onClick={e => {
											e.persist()
											setShowPopover({
												showPopover: true,
												event: e,
												id: survey.id
											})
										}}
									/>
								)}

								<IonPopover
									event={popoverState.event}
									id={survey.id}
									isOpen={
										popoverState.showPopover &&
										survey.id === popoverState.id
									}
									onDidDismiss={() =>
										setShowPopover({
											showPopover: false,
											event: undefined,
											id: survey.id
										})
									}
								>
									<IonList>
										<IonItem
											button
											onClick={() => {
												handleInvitePatientModal(survey.id)
												setShowPopover({
													showPopover: false,
													event: undefined,
													id: survey.id
												})
											}}
										>
											<IonIcon
												icon={shareSocialOutline}
												className="px-2"
											/>
											<IonLabel>Convidar Paciente</IonLabel>
										</IonItem>
										<IonItem
											button
											onClick={() => {
												router.push(`form?id=${survey.id}`)
												setShowPopover({
													showPopover: false,
													event: undefined,
													id: survey.id
												})
											}}
										>
											<IonIcon
												icon={createOutline}
												className="px-2"
											/>
											<IonLabel>Editar Formulário</IonLabel>
										</IonItem>
										<IonItem
											button
											onClick={() => {
												deleteSurvey(survey.id)
												setShowPopover({
													showPopover: false,
													event: undefined,
													id: survey.id
												})
											}}
										>
											<IonIcon
												icon={trashOutline}
												className="px-2"
											/>
											<IonLabel>Deletar Questionario</IonLabel>
										</IonItem>
									</IonList>
								</IonPopover>
							</IonItem>
						</Card>
					)
				})
			)}
		</>
	)
}

export default QuizList
