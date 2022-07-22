import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import {
	IonContent,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonRadio,
	IonRadioGroup,
	IonText,
	IonSelect,
	IonSelectOption,
	IonInput
} from '@ionic/react'

import Button from '../../ui/Button'
import crpRegions from './crpRegions'

const YouAre = () => {
	const { handleSubmit, register, watch, setValue, unregister } = useForm({
		mode: 'onChange'
	})

	const [regionError, setRegionError] = React.useState('')
	const [crpNumberError, setCrpNumberError] = React.useState('')

	const history = useHistory()

	React.useEffect(() => {
		if (watch('type') === 'patient') {
			unregister('region')
			unregister('crpNumber')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch('type')])

	const handleSubmitForm = dataForm => {
		if (dataForm.type === 'medic') {
			if (!dataForm.region) {
				setRegionError('A região é obrigatória.')
			} else {
				setRegionError('')
			}

			if (!dataForm.crpNumber) {
				setCrpNumberError('O CRP é obrigatório.')
			} else {
				setCrpNumberError('')
			}

			if (!dataForm.region || !dataForm.crpNumber) return
		}

		console.log('user is', dataForm)
		history.push({
			pathname: '/sign-up',
			state: {
				userType: dataForm
			}
		})
	}

	return (
		<IonPage>
			<IonContent fullscreen>
				<form
					onSubmit={handleSubmit(handleSubmitForm)}
					className="w-full h-full flex items-center justify-center"
				>
					<div className="w-[80%] h-[90%] flex flex-col justify-between">
						<div />
						<div>
							<IonText className="text-6xl text-black font-bold mb-16">
								Você é:
							</IonText>
							<IonList>
								<IonRadioGroup
									onIonChange={e => {
										setValue('type', e.detail.value)
										setRegionError('')
										setCrpNumberError('')
									}}
									{...register('type')}
								>
									<IonItem lines="none">
										<IonLabel className="text-2xl">
											Sou Psicologo
										</IonLabel>
										<IonRadio value="medic" color="purple" />
									</IonItem>
									<IonItem lines="none">
										<IonLabel>Sou usuário</IonLabel>
										<IonRadio value="patient" color="purple" />
									</IonItem>
								</IonRadioGroup>
								{watch('type') === 'medic' && (
									<div className="mt-12">
										<IonText className="text-lg">
											Validação do formato CRP
										</IonText>
										<IonItem lines="none" className="mt-4">
											<IonSelect
												placeholder="Região"
												onIonChange={e => {
													setValue('region', e.detail.value)
													setRegionError('')
												}}
												interface="action-sheet"
												{...register('region')}
											>
												{crpRegions.map((region, index) => (
													<IonSelectOption
														key={index}
														value={region}
													>
														{region}
													</IonSelectOption>
												))}
											</IonSelect>
											<IonInput
												placeholder="Número de registro"
												className="ml-2"
												type="number"
												onIonChange={e =>
													e.detail.value !== ''
														? setCrpNumberError('')
														: setCrpNumberError(
																'O CRP é obrigatório.'
														  )
												}
												{...register('crpNumber')}
											/>
										</IonItem>
									</div>
								)}
							</IonList>
							<div className="flex flex-col items-center mt-2">
								{regionError && (
									<IonText className="text-red-500 text-sm font-bold">
										{regionError}
									</IonText>
								)}
								{crpNumberError && (
									<IonText className="text-red-500 text-sm font-bold">
										{crpNumberError}
									</IonText>
								)}
							</div>
						</div>
						<Button
							type="submit"
							className="bg-purple-100 text-white text-lg"
						>
							Continuar
						</Button>
					</div>
				</form>
			</IonContent>
		</IonPage>
	)
}

export default YouAre
