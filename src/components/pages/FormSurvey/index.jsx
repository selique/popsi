import * as React from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import {
	IonPage,
	IonContent,
	IonBackButton,
	IonIcon,
	IonText,
	IonButton,
	IonInput,
	IonSelect,
	IonSelectOption,
	IonReorderGroup,
	IonReorder,
	IonTextarea
} from '@ionic/react'
import {
	shareSocialOutline,
	settingsOutline,
	trashOutline
} from 'ionicons/icons'
import Router from 'next/router'
import { uuid } from 'uuidv4'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'

const MultipleChoiceFieldArray = ({ nestIndex, control, register }) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `questions[${nestIndex}].multiple_choice`
	})

	return (
		<div>
			{fields.map((item, k) => {
				return (
					<div
						key={item.id}
						className="grid grid-cols-[1fr_auto] items-center"
					>
						<IonInput
							placeholder="Titulo da Pergunta"
							className="mb-2 h-max"
							{...register(
								`questions[${nestIndex}].multiple_choice[${k}]`
							)}
						/>
						<IonButton
							onClick={() => remove(k)}
							size="small"
							color="danger"
							slot="end"
							className="p-0"
						>
							<IonIcon icon={trashOutline} />
						</IonButton>
					</div>
				)
			})}
			<IonButton color="blue" onClick={() => append()}>
				<IonText className="text-white font-medium">
					Adicionar Pergunta
				</IonText>
			</IonButton>
		</div>
	)
}

const SingleChoiceFieldArray = ({ nestIndex, control, register }) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `questions[${nestIndex}].single_choice`
	})

	return (
		<div>
			{fields.map((item, k) => {
				return (
					<div
						key={item.id}
						className="grid grid-cols-[1fr_auto] items-center"
					>
						<IonInput
							placeholder="Titulo da Pergunta"
							className="mb-2 h-max"
							{...register(
								`questions[${nestIndex}].single_choice[${k}]`
							)}
						/>
						<IonButton
							onClick={() => remove(k)}
							size="small"
							color="danger"
							slot="end"
							className="p-0"
						>
							<IonIcon icon={trashOutline} />
						</IonButton>
					</div>
				)
			})}
			<IonButton color="blue" onClick={() => append()}>
				<IonText className="text-white font-medium">
					Adicionar Pergunta
				</IonText>
			</IonButton>
		</div>
	)
}

const FormProfessional = ({ idForm }) => {
	const { user } = useAuth()
	const { register, control, handleSubmit, reset, setValue, watch } = useForm({
		defaultValues: {
			questions: [{ title: '', type: 'TEXT', description: '' }]
		}
	})
	const { fields, append, prepend, remove, swap, move, insert, replace } =
		useFieldArray({
			control,
			name: 'questions'
		})

	React.useEffect(() => {
		if (idForm) {
			const getQuestions = async () => {
				const { data } = await supabase
					.from('questions')
					.select('*')
					.eq('surveysId', idForm)

				console.log(data)
			}

			const getDataForm = async () => {
				const { data: dataSurvey } = await supabase
					.from('surveys')
					.select('title')
					.eq('id', idForm)
					.single()
				if (dataSurvey) {
					setValue('title', dataSurvey.title)
					getQuestions()
				}
			}
			getDataForm()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idForm])

	const onSubmit = async data => {
		console.log(data)
		const { data: dataSurveys } = await supabase
			.from('surveys')
			.insert([
				{
					id: uuid(),
					title: data.title,
					description: '',
					profileId: user.id
				}
			])
			.single()

		if (!!data && !!data.questions && dataSurveys) {
			let dataQuestion = []
			data.questions.map(question => {
				const defaultData = {
					id: uuid(),
					question: question.title,
					type: question.type,
					surveysId: dataSurveys.id
				}

				if (
					question.type !== 'MULTIPLE_CHOICE' &&
					question.type !== 'SINGLE_CHOICE'
				) {
					dataQuestion.push(defaultData)
				} else {
					dataQuestion.push({
						...defaultData,
						alternatives:
							question.type === 'MULTIPLE_CHOICE'
								? question.multiple_choice
								: question.single_choice
					})
				}
			})

			const { data: dataQuestions } = await supabase
				.from('questions')
				.insert(dataQuestion)

			if (dataQuestions) Router.back()
		}
	}

	// if you want to control your fields with watch
	// const watchResult = watch("test");
	// console.log(watchResult);

	// The following is useWatch example
	// console.log(useWatch({ name: "test", control }));

	function doReorder(event) {
		// The `from` and `to` properties contain the index of the item
		// when the drag started and ended, respectively
		// console.log(
		// 	'Dragged from index',
		// 	event.detail.from,
		// 	'to',
		// 	event.detail.to
		// )
		move(event.detail.from, event.detail.to)

		// Finish the reorder and position the item in the DOM based on
		// where the gesture ended. This method can also be called directly
		// by the reorder group
		event.detail.complete()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="bg-purple-100 p-4">
				<div className="flex justify-between items-center">
					<IonBackButton defaultHref="/app/quiz" className="text-white" />
					<div className="flex text-2xl text-white">
						<IonIcon
							src={shareSocialOutline}
							color="#ffffff"
							className="mr-3"
						/>
						<IonIcon src={settingsOutline} color="#ffffff" />
					</div>
				</div>
				<input
					placeholder="Título"
					className="bg-transparent border-t-0 border-l-0 border-r-0 border-2 border-white text-white font-semibold text-3xl w-full my-6 placeholder:text-white outline-none"
					{...register('title')}
				/>
			</div>
			<IonReorderGroup
				disabled={false}
				onIonItemReorder={doReorder}
				className="px-8 pt-6 flex flex-col items-center"
			>
				{fields.map((field, index) => {
					return (
						<div
							key={field.id}
							className="p-3 w-full border-dashed border-gray-900 rounded-lg bg-white mb-6 last:mb-0"
						>
							<div className="flex justify-between text-2xl mb-2">
								<IonReorder className="grow" />
								{index !== 0 && (
									<IonIcon
										src={trashOutline}
										onClick={() => remove(index)}
									/>
								)}
							</div>

							<IonInput
								placeholder="Titulo da Pergunta"
								className="mb-2"
								{...register(`questions.${index}.title`)}
							/>
							<Controller
								name={`questions.${index}.type`}
								control={control}
								render={({ field }) => (
									<IonSelect
										placeholder="Tipo de resposta"
										value={field.value}
										className="mb-2"
										onIonChange={e => {
											if (
												e.detail.value !== 'MULTIPLE_CHOICE' ||
												e.detail.value !== 'SINGLE_CHOICE'
											) {
												setValue(
													`questions.${index}.${e.detail.value.toLowerCase()}`,
													[]
												)
												setValue(
													`questions.${index}.type`,
													e.detail.value
												)
											} else {
												setValue(
													`questions.${index}.type`,
													e.detail.value
												)
											}
										}}
									>
										<IonSelectOption value="TEXT">{`Texto`}</IonSelectOption>
										<IonSelectOption value="MULTIPLE_CHOICE">{`Multipla escolha`}</IonSelectOption>
										<IonSelectOption value="SINGLE_CHOICE">{`Escolha Única`}</IonSelectOption>
										<IonSelectOption value="SCALE">{`Escala`}</IonSelectOption>
									</IonSelect>
								)}
							/>

							{watch(`questions.${index}.type`) ===
								'MULTIPLE_CHOICE' && (
								// add options dinamicly with useFieldArray
								<MultipleChoiceFieldArray
									nestIndex={index}
									{...{ control, register }}
								/>
							)}
							{watch(`questions.${index}.type`) === 'SINGLE_CHOICE' && (
								// add options dinamicly with useFieldArray
								<SingleChoiceFieldArray
									nestIndex={index}
									{...{ control, register }}
								/>
							)}
							<IonTextarea
								placeholder="descrição da pergunta..."
								className="mb-2"
								{...register(`questions.${index}.description`)}
							/>
						</div>
					)
				})}
			</IonReorderGroup>
			<IonButton
				expand="full"
				shape="round"
				color="blue"
				onClick={() => {
					append()
				}}
			>
				<IonText className="text-white font-medium">
					Adicionar pergunta
				</IonText>
			</IonButton>
			<IonButton color="purple" expand="full" shape="round" type="submit">
				<IonText className="text-white font-medium">
					Salvar Questionário
				</IonText>
			</IonButton>
		</form>
	)
}

const FormSurvey = () => {
	const { id } = useParams()

	return (
		<IonPage>
			<IonContent fullscreen>
				<FormProfessional idForm={id} />
			</IonContent>
		</IonPage>
	)
}

export default FormSurvey
