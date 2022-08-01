import * as React from 'react'
import { Link } from 'react-router-dom'

import { IonIcon, IonItem, IonPopover, IonText } from '@ionic/react'
import {
	shareSocialOutline,
	documentTextOutline,
	ellipsisHorizontalOutline,
	createOutline
} from 'ionicons/icons'

import { supabase } from '../../utils/supabaseClient'
import { useAuth } from './../../contexts/Auth'
import Card from './Card'

const QuizList = ({ searchSurvey = '' }) => {
	const { userSession, professional } = useAuth()

	const [surveys, setSurveys] = React.useState(null)
	const [surveysFiltered, setSurveysFiltered] = React.useState(null)

	const [showPopOver, setShowPopOver] = React.useState({
		open: false,
		event: null
	})

	const getProfessionalSurveys = async () => {
		const { data } = await supabase
			.from('surveys')
			.select(
				`
				id,
				profiles:owner_id (nickname),
				title,
				description,
				survey_generate_invite ( profiles ( * ) )
			`
			)
			.eq('owner_id', userSession.id)

		if (data) {
			setSurveys(data)
		}
	}

	const getPatientSurveys = async () => {
		const { data } = await supabase
			.from('_survey_invited')
			.select(
				`
				id,
				status,
				survey_generate_invite (
					profiles ( * ),
					surveys (
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
					status: item.status,
					survey: item.survey_generate_invite.surveys
				}))
			)
		}
	}

	React.useEffect(() => {
		if (professional) {
			getProfessionalSurveys()
		} else {
			getPatientSurveys()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [professional])

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
						<Card key={index} classContainer="my-3">
							<IonItem lines="none">
								<Link
									to={
										professional
											? `/form/answers/${survey.id}`
											: item.status === 'PENDING'
											? `/form/answers/${survey.id}`
											: '#'
									}
									className="flex items-center h-full w-full"
								>
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
											<div className="flex flex-col p-2 bg-red">
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
