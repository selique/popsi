import * as React from 'react'
import { Link } from 'react-router-dom'

import { IonIcon, IonItem, IonPopover, IonText } from '@ionic/react'
import {
	shareSocialOutline,
	documentTextOutline,
	ellipsisHorizontalOutline,
	createOutline
} from 'ionicons/icons'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Card from '../Card'
import SurveyStatus from './surveyStatus'

const QuizList = ({ searchSurvey = '', setSurveySelectedToInvite, style }) => {
	const { userSession, user, professional } = useAuth()

	const [surveys, setSurveys] = React.useState(null)
	const [surveysFiltered, setSurveysFiltered] = React.useState(null)

	const [showPopOver, setShowPopOver] = React.useState({
		open: false,
		event: null
	})

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
											? ``
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
									<>
										<IonIcon
											icon={ellipsisHorizontalOutline}
											className="text-2xl"
											slot="end"
											onClick={e =>
												setShowPopOver({
													open: true,
													event: e
												})
											}
										/>
										<IonPopover
											isOpen={showPopOver.open}
											event={showPopOver.event}
											onDidDismiss={() =>
												setShowPopOver({
													open: false,
													event: undefined
												})
											}
										>
											<div className="flex flex-col p-2 bg-white">
												<div
													className="flex items-center py-2"
													onClick={e => {
														e.preventDefault()
														setShowPopOver({
															open: false,
															event: undefined
														})
														setSurveySelectedToInvite(survey.id)
													}}
												>
													<IonIcon
														icon={shareSocialOutline}
														className="text-md mr-2"
													/>
													<IonText className="text-md">
														Convidar Paciente
													</IonText>
												</div>
												<div
													className="flex items-center py-2"
													onClick={e => {
														e.preventDefault()
														setShowPopOver({
															open: false,
															event: undefined
														})
													}}
												>
													<IonIcon
														icon={createOutline}
														className="text-md mr-2"
													/>
													<IonText className="text-md">
														Editar formulário
													</IonText>
												</div>
											</div>
										</IonPopover>
									</>
								)}
							</IonItem>
						</Card>
					)
				})
			)}
		</>
	)
}

export default QuizList
