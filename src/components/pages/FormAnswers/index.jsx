import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'

import {
	IonText,
	IonRadioGroup,
	IonItem,
	IonLabel,
	IonRadio,
	IonPage,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonCheckbox,
	IonInput,
	useIonLoading,
	useIonToast,
	IonButton
} from '@ionic/react'
import Router from 'next/router'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'

const FormAnswers = () => {
	const [idQuiz, setIdQuiz] = React.useState(0)
	const [questions, setQuestions] = React.useState([])
	const [answers, setAnswers] = React.useState([])
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()
	const { id } = useParams()
	const { user, professional } = useAuth()
	const { register, control, handleSubmit, setValue, getValues } = useForm({
		mode: 'onChange'
	})

	const { state: locationState } = useLocation()

	React.useEffect(() => {
		const getAnswers = async () => {
			await showLoading()
			try {
				const { data, error, status } = await supabase
					.from('questions')
					.select('*')
					.eq('surveysId', id)

				if (error && status !== 406) {
					throw error
				}

				if (data) {
					setQuestions(data)
				}
			} catch (error) {
				showToast({
					header: 'Erro',
					message: error.message,
					position: 'top',
					color: 'danger',
					cssClass: 'text-white',
					duration: 5000,
					animated: true
				})
			} finally {
				await hideLoading()
			}
		}

		getAnswers()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onSubmit = async dataForm => {
		let data = []
		if (dataForm) {
			if (Array.isArray(dataForm[`answers${idQuiz}`])) {
				let array = []
				dataForm[`answers${idQuiz}`].map(item => !!item && array.push(item))

				data.push({
					answer: array,
					profileId: user.id,
					questionId: questions[idQuiz].id,
					invite_id: locationState.id
				})
			} else {
				data.push({
					answer: [dataForm[`answers${idQuiz}`]],
					profileId: user.id,
					questionId: questions[idQuiz].id,
					invite_id: locationState.id
				})
			}

			if (data.length > 0) {
				setAnswers([...answers, ...data])
			}
		}

		if (answers.length + 1 === questions.length) {
			const { data: dataAnswer, error: errorAnswer } = await supabase
				.from('answers')
				.insert([...answers, ...data])

			const { data: dataInvite, error: errorInvite } = await supabase
				.from('_survey_invited')
				.update({ status: 'FINISHED' })
				.eq('id', locationState.id)

			if (dataAnswer && dataInvite) {
				Router.back()
				showToast({
					header: 'Finalizado',
					message: 'Respostas enviadas com sucesso.',
					position: 'top',
					color: 'success',
					cssClass: 'text-white',
					duration: 5000,
					animated: true
				})
			}

			if (errorAnswer || errorInvite) {
				Router.back()
				showToast({
					header: 'Erro',
					message:
						'Algo deu errado tente novamente, caso o erro persistir contate o suporte.',
					position: 'top',
					color: 'danger',
					cssClass: 'text-white',
					duration: 5000,
					animated: true
				})
			}
		} else if (dataForm && idQuiz + 1 < questions.length) {
			setIdQuiz(idQuiz + 1)
		}
	}

	const MultipleChoice = ({ alternatives }) => {
		return alternatives.map((alternative, index) => {
			return (
				<IonItem key={index} lines="none">
					<IonLabel>{alternative}</IonLabel>
					<Controller
						control={control}
						name={`answers${idQuiz}.${index}`}
						render={({ field: { value, onChange } }) => (
							<IonCheckbox
								slot="start"
								value={value}
								onIonChange={({ detail: { checked } }) =>
									onChange(alternative)
								}
							/>
						)}
					/>
				</IonItem>
			)
		})
	}

	const SingleChoice = ({ alternatives }) => {
		return (
			<Controller
				key={idQuiz}
				name={`answers${idQuiz}`}
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<IonRadioGroup
						value={field.value}
						onIonChange={e => {
							setValue(`answers${idQuiz}`, e.target.value)
						}}
					>
						{alternatives.map((alternative, index) => (
							<IonItem key={index} lines="none">
								<IonLabel>{alternative}</IonLabel>
								<IonRadio slot="start" value={alternative} />
							</IonItem>
						))}
					</IonRadioGroup>
				)}
			/>
		)
	}

	const TextInput = () => {
		return (
			<IonItem lines="none">
				<IonInput
					{...register(`answers${idQuiz}`, {
						required: true
					})}
				/>
			</IonItem>
		)
	}

	return questions.length === 0 ? (
		<div>Carregando</div>
	) : (
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
			<div className="h-[80vh] p-4">
				<div className="bg-white shadow-lg p-4 rounded-2xl flex flex-col">
					<IonText>
						{idQuiz + 1}/{questions.length}
					</IonText>
					<IonText className="text-2xl my-5">
						{questions[idQuiz].question}
					</IonText>
					<form onSubmit={handleSubmit(onSubmit)}>
						{questions[idQuiz].type === 'SINGLE_CHOICE' && (
							<SingleChoice
								alternatives={questions[idQuiz].alternatives}
							/>
						)}
						{questions[idQuiz].type === 'MULTIPLE_CHOICE' && (
							<MultipleChoice
								alternatives={questions[idQuiz].alternatives}
							/>
						)}
						{questions[idQuiz].type === 'TEXT' && <TextInput />}
						<IonButton
							color="purple"
							type="submit"
							// onClick={e => {
							// 	e.preventDefault()
							// 	if (idQuiz + 1 < questions.length) {
							// 		setIdQuiz(idQuiz + 1)
							// 	} else {
							// 		Router.back()
							// 	}
							// }}
						>
							<IonText className="text-xl text-white">
								{questions.length === idQuiz + 1
									? 'Finalizar'
									: 'Próximo'}
							</IonText>
						</IonButton>
					</form>
				</div>
			</div>
		</IonPage>
	)
}

export default FormAnswers
