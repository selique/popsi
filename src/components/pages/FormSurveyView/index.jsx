import * as React from 'react'
import { useParams, useLocation } from 'react-router-dom'

import {
	IonBackButton,
	IonText,
	IonInput,
	IonTitle,
	IonCheckbox,
	useIonLoading,
	useIonToast,
	useIonRouter,
	IonRadio,
	IonItem,
	IonLabel,
	IonIcon,
	IonPopover,
	IonList,
	IonPage,
	IonHeader,
	IonButtons,
	IonContent,
	IonRadioGroup
} from '@ionic/react'
import { createOutline, ellipsisVerticalOutline } from 'ionicons/icons'

import { supabase } from '../../../utils/supabaseClient'

const FormSurveyView = () => {
	const { idForm } = useParams()
	const { search } = useLocation()
	const Router = useIonRouter()
	const [form, setForm] = React.useState(null)
	const [inviteId, setInviteId] = React.useState(null)
	const [popoverState, setShowPopover] = React.useState({
		showPopover: false,
		event: undefined,
		id: null
	})

	const [showToast, dimissToast] = useIonToast()
	const [showLoading, hideLoading] = useIonLoading()

	const [isLoading, setIsLoading] = React.useState(false)

	React.useState(() => {
		if (search) {
			const params = new URLSearchParams(search)
			setInviteId(params.get('inviteId'))
		}
	}, [search])

	const getAnswers = async () => {
		// fazer o sistema de mostrar as respostas
		const { data } = await supabase
			.from('_survey_invited')
			.select(
				`
				answers!inner (
					*,
					questions:questionId (*)
				),
				survey_generate_invite:survey_generate_invite_id (
					surveys:survey_id (title)
				)
			`
			)
			.eq('survey_generate_invite_id', inviteId)
			.single()

		if (data) {
			const questions = data.answers.map(answer => ({
				title: answer.questions.question,
				description: answer.questions.description,
				answer: answer.answer,
				type: answer.questions.type,
				...(['MULTIPLE_CHOICE', 'SINGLE_CHOICE'].includes(
					answer.questions.type
				)
					? {
							[answer.questions.type.toLowerCase()]:
								answer.questions.alternatives
					  }
					: {})
			}))

			setForm({
				title: data.survey_generate_invite.surveys.title,
				questions
			})
		}
	}

	React.useEffect(() => {
		if (inviteId) {
			getAnswers()
		} else if (idForm) {
			const getDataForm = async () => {
				await dimissToast()
				setIsLoading(true)
				await showLoading()
				const { data, error } = await supabase
					.from('surveys')
					.select(
						`
						title,
						questions!inner (*)
					`
					)
					.eq('id', idForm)
					.single()

				if (data) {
					// Filtering questions' fields to create the correct object to set for form
					const questionsData = data.questions
						.sort((a, b) => {
							// Sorting the questions by their position
							if (a.position < b.position) {
								return -1
							}
							if (a.position > b.position) {
								return 1
							}
						})
						.map(({ type, alternatives, description, question }) => ({
							title: question,
							description,
							type,
							...(['MULTIPLE_CHOICE', 'SINGLE_CHOICE'].includes(type)
								? { [type.toLowerCase()]: alternatives }
								: {})
						}))
					setForm({ title: data.title, questions: questionsData })
				}

				if (error) {
					console.error(error)
					showToast({
						header: 'Erro',
						message:
							'Algo deu errado ao abrir a edição do formulário, tente novamente e caso o erro persistir contate o suporte',
						position: 'top',
						color: 'danger',
						cssClass: 'text-white',
						duration: 5000,
						animated: true
					})
				}
				setIsLoading(false)
				await hideLoading()
			}
			getDataForm()
		} else {
			showToast({
				header: 'Erro',
				message: 'Formulário não encontrado.',
				position: 'top',
				color: 'danger',
				cssClass: 'text-white',
				duration: 5000,
				animated: true
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return isLoading ? (
		<IonTitle>Carregando..</IonTitle>
	) : !idForm || !form ? (
		<div className="flex flex-col">
			<div className="bg-purple-100 p-4 flex justify-between items-center">
				<IonBackButton defaultHref="/app/quiz" className="text-white" />
				<IonTitle className="text-white font-bold text-[40px]" size="large">
					Questionário
				</IonTitle>
			</div>
			<IonTitle>Formulário não encontrado</IonTitle>
		</div>
	) : (
		<IonPage>
			<IonHeader>
				<div className="flex h-full items-center justify-between w-full bg-purple-100">
					<IonButtons>
						<IonBackButton
							className="text-white"
							defaultHref="/app/quiz"
						/>
					</IonButtons>
					<IonTitle className="text-[30px] font-semibold text-white">
						{form.title}
					</IonTitle>
					{!inviteId && (
						<IonIcon
							icon={ellipsisVerticalOutline}
							className="text-2xl mr-3 text-white"
							onClick={e => {
								e.persist()
								setShowPopover({
									showPopover: true,
									event: e
								})
							}}
						/>
					)}
				</div>
			</IonHeader>
			<IonContent>
				<IonPopover
					event={popoverState.event}
					isOpen={popoverState.showPopover}
					onDidDismiss={() =>
						setShowPopover({
							showPopover: false,
							event: undefined
						})
					}
				>
					<IonList>
						<IonItem
							button
							onClick={() => {
								Router.push(`/app/form?id=${idForm}`)
								setShowPopover({
									showPopover: false,
									event: undefined
								})
							}}
						>
							<IonIcon icon={createOutline} className="px-2" />
							<IonLabel>Editar Formulário</IonLabel>
						</IonItem>
					</IonList>
				</IonPopover>
				{/* <div className="bg-purple-100 p-4">
					<div className="flex justify-between items-center">
						<IonBackButton defaultHref="/app/quiz" className="text-white" />

					</div>
					<IonTitle className="text-white font-bold text-[40px]" size="large">
						{form.title}
					</IonTitle>
				</div> */}
				<div className="px-8 pt-6 flex flex-col items-center">
					{form.questions.map((question, index) => {
						const alternatives = question[question.type.toLowerCase()]

						return (
							<div
								key={index}
								className="p-3 w-full rounded-lg bg-white mb-6 last:mb-0 shadow-md"
							>
								<div className="flex flex-col mb-3">
									<IonText className="font-semibold text-[20px]">
										{question.title}
									</IonText>
									{question.description && (
										<IonText className="text-[15px]">
											*{question.description}*
										</IonText>
									)}
								</div>

								{question.type === 'MULTIPLE_CHOICE' &&
									alternatives.map((alternative, index) => (
										<div
											key={`${alternative}-${index}`}
											className="flex items-center gap-2 mb-3 last:mb-0"
										>
											<IonCheckbox
												slot="start"
												disabled={true}
												checked={
													inviteId &&
													question.answer.includes(alternative)
												}
											/>
											<IonText>{alternative}</IonText>
										</div>
									))}

								{question.type === 'SINGLE_CHOICE' && (
									<IonRadioGroup
										{...(inviteId
											? { value: question.answer[0] }
											: {})}
									>
										{alternatives.map((alternative, index) => (
											<div
												key={`${alternative}-${index}`}
												className="flex items-center gap-2 mb-3 last:mb-0"
											>
												<IonRadio
													disabled={true}
													slot="start"
													value={alternative}
												/>
												<IonText>{alternative}</IonText>
											</div>
										))}
									</IonRadioGroup>
								)}
								{question.type === 'TEXT' &&
									(inviteId ? (
										<IonText>{question.answer[0]}</IonText>
									) : (
										<IonInput value="Resposta" disabled={true} />
									))}
							</div>
						)
					})}
				</div>
			</IonContent>
		</IonPage>
	)
}

export default FormSurveyView
