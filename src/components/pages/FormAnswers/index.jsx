import * as React from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import {
	IonText,
	IonList,
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
	IonInput
} from '@ionic/react'
import { data } from 'autoprefixer'
import Router from 'next/router'
import { uuid } from 'uuidv4'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Button from '../../ui/Button'

const FormAnswers = () => {
	const [idQuiz, setIdQuiz] = React.useState(0)
	const [questions, setQuestions] = React.useState([])
	const [answers, setAnswers] = React.useState([])
	const { id } = useParams()
	const { user } = useAuth()
	const { register, control, handleSubmit, setValue } = useForm()

	React.useEffect(() => {
		const getAnswers = async () => {
			const { data } = await supabase
				.from('questions')
				.select('*')
				.eq('surveysId', id)

			if (data) {
				setQuestions(data)
			}
		}

		getAnswers()
	}, [])

	const onSubmit = async dataForm => {
		let data = []

		if (dataForm) {
			if (Array.isArray(dataForm[`answers${idQuiz}`])) {
				let array = []
				dataForm[`answers${idQuiz}`].map(item => !!item && array.push(item))

				data.push({
					id: uuid(),
					answer: array,
					profileId: user.id,
					questionId: questions[idQuiz].id
				})
			} else {
				data.push({
					id: uuid(),
					answer: [dataForm[`answers${idQuiz}`]],
					profileId: user.id,
					questionId: questions[idQuiz].id
				})
			}

			if (data.length > 0) {
				setAnswers([...answers, ...data])
			}
		}

		if (answers.length + 1 === questions.length) {
			const { data: dataAnswer } = await supabase
				.from('answers')
				.insert([...answers, ...data])

			if (dataAnswer) Router.back()
		} else if (dataForm && idQuiz + 1 < questions.length) {
			setIdQuiz(idQuiz + 1)
		}
	}

	const MultipleChoice = ({ alternatives }) => {
		return (
			<>
				{alternatives.map((alternative, index) => {
					return (
						<IonItem key={index}>
							<IonLabel>{alternative}</IonLabel>
							<IonCheckbox
								slot="start"
								color="primary"
								onIonChange={e => {
									if (e.detail.checked) {
										setValue(`answers${idQuiz}.${index}`, alternative)
									} else {
										setValue(`answers${idQuiz}.${index}`, null)
									}
								}}
								{...register(`answers${idQuiz}.${index}`)}
							/>
						</IonItem>
					)
				})}
			</>
		)
	}

	const SingleChoice = ({ alternatives }) => {
		return (
			<Controller
				key={idQuiz}
				name={`answers${idQuiz}`}
				control={control}
				render={({ field }) => (
					<IonRadioGroup
						value={field.value}
						onIonChange={e => {
							setValue(`answers${idQuiz}`, e.target.value)
						}}
					>
						{alternatives.map((alternative, index) => (
							<IonItem key={index}>
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
			<IonItem>
				<IonInput {...register(`answers${idQuiz}`)} />
			</IonItem>
		)
	}

	if (questions.length === 0) return <div>Carregando</div>

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
						<Button
							// onClick={e => {
							// 	e.preventDefault()
							// 	if (idQuiz + 1 < questions.length) {
							// 		setIdQuiz(idQuiz + 1)
							// 	} else {
							// 		Router.back()
							// 	}
							// }}
							className="bg-purple-100 mt-6"
							type="submit"
						>
							<IonText className="text-xl text-white">
								{questions.length === idQuiz + 1 ? 'Acabou' : 'Próximo'}
							</IonText>
						</Button>
					</form>
				</div>
			</div>
		</IonPage>
	)
}

export default FormAnswers
