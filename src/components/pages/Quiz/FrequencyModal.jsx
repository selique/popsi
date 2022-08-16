import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
	IonCheckbox,
	IonDatetime,
	IonItem,
	IonLabel,
	IonRadio,
	IonRadioGroup,
	IonSelect,
	IonSelectOption,
	IonText,
	useIonToast
} from '@ionic/react'
import { format, parseISO } from 'date-fns'

import Button from './../../ui/Button'
import Modal from './../../ui/Modal/SheetBottom'

const FrequencyModal = ({ isOpen, setIsOpen, setSchedule, daysOfTheWeek }) => {
	const { control, handleSubmit, watch, unregister, reset } = useForm({
		mode: 'onChange'
	})

	const [showToast] = useIonToast()

	React.useEffect(() => {
		switch (watch('frequency')) {
			case 'daily':
				unregister('singleWeekDay')
				unregister('monthDays')
				break
			case 'weekly':
				unregister('multWeekDays')
				unregister('monthDays')
				break
			case 'custom':
				unregister('singleWeekDay')
				unregister('multWeekDays')
				break
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch('frequency')])

	const handleCancel = () => {
		reset()
		setIsOpen(false)
	}

	const handleSurveySubmit = async dataForm => {
		const generateSchedule = (minutes, hours, monthDays, month, weekDay) => {
			const clearString = string => {
				return string ? (string[0] == 0 ? string[1] : string) : '*'
			}

			return `${clearString(minutes) ?? '*'} ${clearString(hours) ?? '*'} ${
				monthDays ?? '*'
			} ${month ?? '*'} ${weekDay ?? '*'}`
		}

		const getHours = format(parseISO(dataForm.hours), 'HH')
		const getMinutes = format(parseISO(dataForm.hours), 'mm')

		const multWeekDays = dataForm.multWeekDays?.filter(
			item => item !== undefined
		)

		if (dataForm.frequency === 'custom' && !dataForm.monthDays) {
			showToast({
				header: 'Erro',
				message: 'Selecione pelo menos um dia do mês.',
				position: 'top',
				color: 'danger',
				duration: 5000,
				animated: true
			})
			return
		}

		switch (dataForm.frequency) {
			case 'daily':
				setSchedule(
					generateSchedule(
						getMinutes,
						getHours,
						'*',
						'*',
						multWeekDays.length === 7 ? '*' : multWeekDays.join()
					)
				)
				break
			case 'weekly':
				setSchedule(
					generateSchedule(
						getMinutes,
						getHours,
						'*',
						'*',
						dataForm.singleWeekDay
					)
				)
				break
			case 'custom':
				setSchedule(
					generateSchedule(
						getMinutes,
						getHours,
						dataForm.monthDays.filter(item => item).join(),
						'*',
						'*'
					)
				)
				break
		}

		setIsOpen(false)
	}

	return (
		<Modal isOpen={isOpen} onDidDismiss={handleCancel} title="Frequência">
			<form onSubmit={handleSubmit(handleSurveySubmit)}>
				<Controller
					control={control}
					name={`frequency`}
					defaultValue="daily"
					render={({ field: { value, onChange } }) => (
						<IonRadioGroup
							value={value}
							onIonChange={e => onChange(e.detail.value)}
						>
							<IonItem lines="none">
								<IonRadio slot="start" value="daily" />
								<IonLabel>Diariamente</IonLabel>
							</IonItem>

							<IonItem lines="none">
								<IonLabel>Semanalmente</IonLabel>
								<IonRadio slot="start" value="weekly" />
							</IonItem>

							<IonItem lines="none">
								<IonLabel>Custumizar</IonLabel>
								<IonRadio slot="start" value="custom" />
							</IonItem>
						</IonRadioGroup>
					)}
				/>

				<div className="w-full h-[1px] bg-gray-300 my-5" />

				{watch('frequency') === 'daily' &&
					daysOfTheWeek.map((dayName, index) => (
						<IonItem lines="none" key={index}>
							<Controller
								control={control}
								name={`multWeekDays[${index}]`}
								defaultValue={index}
								render={({ field: { value, onChange } }) => (
									<IonCheckbox
										slot="start"
										checked={value !== undefined}
										onIonChange={e =>
											onChange(e.target.checked ? index : undefined)
										}
									/>
								)}
							/>
							<IonText>{dayName}</IonText>
						</IonItem>
					))}

				{watch('frequency') === 'weekly' && (
					<Controller
						control={control}
						name={`singleWeekDay`}
						defaultValue={1}
						render={({ field: { value, onChange } }) => (
							<IonRadioGroup
								value={value}
								onIonChange={e => onChange(e.detail.value)}
							>
								{daysOfTheWeek.map((dayName, index) => (
									<IonItem lines="none" key={index}>
										<IonLabel>{dayName}</IonLabel>
										<IonRadio slot="start" value={index} />
									</IonItem>
								))}
							</IonRadioGroup>
						)}
					/>
				)}

				{watch('frequency') === 'custom' && (
					<Controller
						control={control}
						name={`monthDays`}
						render={({ field: { onChange } }) => (
							<IonSelect
								okText="Pronto"
								cancelText="Cancelar"
								multiple={true}
								placeholder="Selecione o(s) dia(s)"
								onIonChange={e => onChange(e.detail.value)}
							>
								{[...Array(31)].map((_, index) => (
									<IonSelectOption key={index + 1} value={index + 1}>
										{index + 1}
									</IonSelectOption>
								))}
							</IonSelect>
						)}
					/>
				)}

				<div className="w-full h-[1px] bg-gray-300 my-5" />

				<Controller
					control={control}
					name={`hours`}
					defaultValue="2022-08-01T12:00:13.858-03:00"
					render={({ field: { value, onChange } }) => (
						<>
							<IonText className="text-lg">Horario de envio:</IonText>
							<IonDatetime
								value={value}
								displayFormat="HH:mm"
								className="my-3"
								onIonChange={e => onChange(e.detail.value)}
							/>
						</>
					)}
				/>

				<div className="flex w-full justify-around gap-3">
					<Button onClick={handleCancel} className="bg-red-400" type="">
						<IonText className="text-white text-lg">Cancelar</IonText>
					</Button>
					<Button className="bg-purple-100" type="submit">
						<IonText className="text-white text-lg">Continuar</IonText>
					</Button>
				</div>
			</form>
		</Modal>
	)
}

export default FrequencyModal
