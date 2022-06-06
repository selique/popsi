import * as React from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

import {
	IonPage,
	IonContent,
	IonBackButton,
	IonIcon,
	IonCheckbox,
	IonText,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonList,
	IonRadioGroup,
	IonItem,
	IonLabel,
	IonRadio,
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
	trashOutline,
	addOutline,
	closeOutline
} from 'ionicons/icons'
import Router from 'next/router'
import { uuid } from 'uuidv4'

import Button from '../../ui/Button'

const MultipleChoiceFieldArray = ({ nestIndex, control, register }) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `questions[${nestIndex}].multiple_choice`
	})

	return (
		<div>
			{fields.map((item, k) => {
				return (
					<div key={item.id} className="flex flow-collum">
						<IonInput
							placeholder="Titulo da Pergunta"
							className="mb-2"
							{...register(
								`questions[${nestIndex}].multiple_choice[${k}]`
							)}
						/>
						<IonButton
							onClick={() => remove(k)}
							size="small"
							color="danger"
							slot="end"
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

const FormProfessional = () => {
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

	const onSubmit = data => console.log('data', data)

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
											e.detail.value !== 'MULTIPLE_CHOICE'
												? setValue(
														`questions.${index}.multiple_choice`,
														[]
												  )
												: setValue(
														`questions.${index}.type`,
														e.detail.value
												  )
										}}
									>
										<IonSelectOption value="TEXT">{`Texto`}</IonSelectOption>
										<IonSelectOption value="BOOLEAN">{`Verdadeiro ou Falso`}</IonSelectOption>
										<IonSelectOption value="MULTIPLE_CHOICE">{`Multipla escolha`}</IonSelectOption>
										<IonSelectOption value="SCALE">{`Escala`}</IonSelectOption>
									</IonSelect>
								)}
							/>

							{watch(`questions.${index}.type`) === 'TEXT' && (
								<IonInput
									placeholder="Pergunta"
									className="mb-2"
									{...register(`questions.${index}.title`)}
								/>
							)}

							{watch(`questions.${index}.type`) ===
								'MULTIPLE_CHOICE' && (
								// add options dinamicly with useFieldArray
								<MultipleChoiceFieldArray
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

const FormClient = () => {
	const [idQuiz, setIdQuiz] = React.useState(0)

	const quiz = [
		{
			ask: 'Pergunta 1'
		},
		{
			ask: 'Pergunta 2'
		},
		{
			ask: 'Pergunta 3'
		}
	]

	return (
		<>
			<div className="h-[75vh] p-4">
				<div className="bg-white shadow-lg p-4 rounded-2xl flex flex-col">
					<IonText>
						{idQuiz + 1}/{quiz.length}
					</IonText>
					<IonText className="text-3xl mt-5">{quiz[idQuiz].ask}</IonText>
					<IonList className="my-10">
						<IonRadioGroup>
							<IonItem>
								<IonLabel>Alternative 1</IonLabel>
								<IonRadio slot="start" value="alternativa 1" />
							</IonItem>
							<IonItem>
								<IonLabel>Alternative 2</IonLabel>
								<IonRadio slot="start" value="alternativa 2" />
							</IonItem>
							<IonItem>
								<IonLabel>Alternative 3</IonLabel>
								<IonRadio slot="start" value="alternativa 3" />
							</IonItem>
							<IonItem>
								<IonLabel>Alternative 4</IonLabel>
								<IonRadio slot="start" value="alternativa 4" />
							</IonItem>
						</IonRadioGroup>
					</IonList>
					<Button
						onClick={() => {
							if (idQuiz + 1 < quiz.length) {
								setIdQuiz(idQuiz + 1)
							} else {
								Router.back()
							}
						}}
						className="bg-purple-100"
					>
						<IonText className="text-xl text-white">
							{quiz.length === idQuiz + 1 ? 'Acabou' : 'Próximo'}
						</IonText>
					</Button>
				</div>
			</div>
		</>
	)
}

const Form = () => {
	const professional = true

	return (
		<IonPage>
			{!professional && (
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonBackButton defaultHref="/app/homeclient" />
						</IonButtons>
						<IonTitle className="text-lg font-semibold">
							Questionários
						</IonTitle>
					</IonToolbar>
				</IonHeader>
			)}
			<IonContent fullscreen>
				{professional ? <FormProfessional /> : <FormClient />}
			</IonContent>
		</IonPage>
	)
}

export default Form
