import * as React from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'

import {
	IonBackButton,
	IonIcon,
	IonText,
	IonButton,
	IonInput,
	IonSelect,
	IonSelectOption,
	IonReorderGroup,
	IonReorder,
	IonTextarea,
	useIonToast,
	useIonLoading,
	IonButtons
} from '@ionic/react'
import { trashOutline } from 'ionicons/icons'
import _ from 'lodash'
import Router from 'next/router'

import { useAuth } from '../../../contexts/Auth'
import replaceLastComma from '../../../utils/replaceLastComma'
import { supabase } from '../../../utils/supabaseClient'
import MultipleChoiceFieldArray from './MultipleChoiceArray'

const FormProfessional = ({ idForm }) => {
	const { user } = useAuth()
	const [formToUpdate, setFormToUpdate] = React.useState({})
	const { register, control, handleSubmit, setValue, watch } = useForm({
		mode: 'onChange',
		defaultValues: {
			questions: [{ title: '', type: 'TEXT', description: '' }]
		}
	})
	const { fields, append, remove, move } = useFieldArray({
		control,
		name: 'questions'
	})

	const [showToast, dimissToast] = useIonToast()
	const [showLoading, hideLoading] = useIonLoading()

	useFormPersist(idForm ? 'Popsi@editingSurvey' : 'Popsi@addForm', {
		watch,
		setValue
	})

	React.useEffect(() => {
		// Remove persist form when editing some survey
		return () => {
			if (idForm) {
				sessionStorage.removeItem('Popsi@editingSurvey')
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	React.useEffect(() => {
		if (idForm) {
			const getDataForm = async () => {
				await dimissToast()
				await showLoading()
				const { data, error } = await supabase
					.from('surveys')
					.select(
						`
						title,
						questions!inner (*),
						survey_generate_invite (*)
					`
					)
					.eq('id', idForm)
					.single()

				if (data) {
					setValue('title', data.title)
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
					setValue('questions', questionsData, { shouldDirty: false })
					setFormToUpdate({ title: data.title, questions: questionsData })
					const amountOfPeopleInvited = data.survey_generate_invite.length
					if (amountOfPeopleInvited > 0) {
						showToast({
							header: 'Aviso',
							message: `Você não pode editar esse questionário pois ja convidou ${amountOfPeopleInvited} pessoa${
								amountOfPeopleInvited > 1 ? 's' : ''
							} para responde-lo.`,
							position: 'top',
							color: 'warning',
							duration: 5000,
							animated: true
						})
						Router.back()
					}
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
				await hideLoading()
			}
			getDataForm()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onSubmit = async data => {
		await dimissToast()
		// If survey doesn't have a title show a warning and don't create the survey
		if (!data.title) {
			return showToast({
				header: 'Aviso',
				message: 'Adicione um titulo para o questionário.',
				position: 'top',
				color: 'warning',
				duration: 5000,
				animated: true
			})
		}

		// Creating questions array
		let dataQuestion = []
		data.questions.map(question => {
			// Default question object
			const defaultData = {
				question: question.title,
				type: question.type,
				description: question.description
			}

			if (
				question.type !== 'MULTIPLE_CHOICE' &&
				question.type !== 'SINGLE_CHOICE'
			) {
				dataQuestion.push(defaultData)
			} else {
				// Set alternatives for "MULTIPLE_CHOICE" and "SINGLE_CHOICE" question type
				dataQuestion.push({
					...defaultData,
					alternatives:
						question.type === 'MULTIPLE_CHOICE'
							? question.multiple_choice
							: question.single_choice
				})
			}
		})

		const findEmptyTitles = []
		const findEmptyMultipleOptions = []

		dataQuestion.map((quest, index) => {
			if (quest.question === '') {
				findEmptyTitles.push(index + 1)
			}

			if (['MULTIPLE_CHOICE', 'SINGLE_CHOICE'].includes(quest.type)) {
				const findEmptyAlternative = quest.alternatives.some(
					alternative => alternative === ''
				)

				if (findEmptyAlternative) {
					findEmptyMultipleOptions.push(index + 1)
				}
			}
		})

		const countEmptyTitles = findEmptyTitles.length

		// If some question doesn't have a title show a warning and don't create the survey
		if (countEmptyTitles > 0) {
			const emptyTitlesText = replaceLastComma(findEmptyTitles.join(', '))
			return showToast({
				header: 'Aviso',
				message: `Preencha o titulo ${
					countEmptyTitles === 1 ? 'da' : 'das'
				} ${
					countEmptyTitles === 1 ? 'pergunta' : 'perguntas'
				} ${emptyTitlesText}.`,
				position: 'top',
				color: 'warning',
				duration: 5000,
				animated: true
			})
		}

		const countEmptyMultipleOptions = findEmptyMultipleOptions.length

		if (countEmptyMultipleOptions > 0) {
			const emptyMultipleOptionsText = replaceLastComma(
				findEmptyMultipleOptions.join(', ')
			)

			return showToast({
				header: 'Aviso',
				message: `Preencha todas as multiplas escolhas ${
					countEmptyMultipleOptions === 1 ? 'da' : 'das'
				} ${
					countEmptyMultipleOptions === 1 ? 'pergunta' : 'perguntas'
				} ${emptyMultipleOptionsText}.`,
				position: 'top',
				color: 'warning',
				duration: 5000,
				animated: true
			})
		}

		await showLoading()

		if (idForm) {
			// compare if something changed
			if (!_.isEqual(data, formToUpdate)) {
				if (data.title !== formToUpdate.title) {
					var { error: errorSurveys } = await supabase
						.from('surveys')
						.update({
							title: data.title,
							description: '',
							owner_id: user.id
						})
						.eq('id', idForm)
						.single()
				}

				const questions = dataQuestion.map((question, index) => ({
					...question,
					surveysId: idForm,
					position: index + 1
				}))

				const { error: errorDeleteOldQuestions } = await supabase
					.from('questions')
					.delete()
					.match({ surveysId: idForm })

				const { error: errorQuestions } = await supabase
					.from('questions')
					.insert(questions)

				if (errorSurveys || errorQuestions || errorDeleteOldQuestions) {
					showToast({
						header: 'Erro',
						message:
							'Algo deu errado ao atualizar o questionário, tente novamente e caso o erro persistir contate o suporte',
						position: 'top',
						color: 'danger',
						cssClass: 'text-white',
						duration: 5000,
						animated: true
					})
					Router.back()
					return
				}
			}

			showToast({
				header: 'Sucesso',
				message: 'Questionário atualizado.',
				position: 'top',
				color: 'success',
				duration: 5000,
				animated: true
			})

			Router.back()
			await hideLoading()
			return
		}

		const { data: dataSurveys } = await supabase
			.from('surveys')
			.insert([
				{
					title: data.title,
					description: '',
					owner_id: user.id
				}
			])
			.single()

		if (!!data && !!data.questions && dataSurveys) {
			const { data: dataQuestions } = await supabase
				.from('questions')
				.insert(
					dataQuestion.map((question, index) => ({
						...question,
						surveysId: dataSurveys.id,
						position: index + 1
					}))
				)
			if (dataQuestions) {
				sessionStorage.removeItem('Popsi@addForm')
				Router.back()
				showToast({
					header: 'Sucesso',
					message: 'Questionário criado.',
					position: 'top',
					color: 'success',
					duration: 5000,
					animated: true
				})
			}
		}
		await hideLoading()
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
					<IonButtons>
						<IonBackButton
							className="text-white"
							defaultHref="/app/quiz"
						/>
					</IonButtons>
					{/* <div className="flex text-2xl text-white">
						<IonIcon
							src={shareSocialOutline}
							color="#ffffff"
							className="mr-3"
						/>
						<IonIcon src={settingsOutline} color="#ffffff" />
					</div> */}
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
								{fields.length > 1 && (
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
							<IonTextarea
								placeholder="descrição da pergunta..."
								{...register(`questions.${index}.description`)}
							/>
							<Controller
								name={`questions.${index}.type`}
								control={control}
								render={({ field }) => (
									<IonSelect
										placeholder="Tipo de resposta"
										value={field.value}
										className="my-2"
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
										{/* <IonSelectOption value="SCALE">{`Escala`}</IonSelectOption> */}
									</IonSelect>
								)}
							/>

							{['MULTIPLE_CHOICE', 'SINGLE_CHOICE'].includes(
								watch(`questions.${index}.type`)
							) && (
								<MultipleChoiceFieldArray
									nestIndex={index}
									mode={watch(`questions.${index}.type`)}
									{...{ control, register }}
								/>
							)}
						</div>
					)
				})}
			</IonReorderGroup>
			<IonButton
				expand="full"
				shape="round"
				color="blue"
				onClick={() => {
					append({ title: '', type: 'TEXT', description: '' })
				}}
			>
				<IonText className="text-white font-medium">
					Adicionar pergunta
				</IonText>
			</IonButton>
			<IonButton color="purple" expand="full" shape="round" type="submit">
				<IonText className="text-white font-medium">
					{idForm ? 'Atualizar formulário' : 'Salvar Questionário'}
				</IonText>
			</IonButton>
		</form>
	)
}

export default FormProfessional
