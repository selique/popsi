import React from 'react'
import { useForm } from 'react-hook-form'

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
	IonInput,
	useIonRouter
} from '@ionic/react'

import Button from '../../ui/Button'

const YouAre = () => {
	const { handleSubmit, register, watch, setValue, unregister } = useForm({
		mode: 'onChange'
	})
	const router = useIonRouter()

	React.useEffect(() => {
		if (watch('type') === 'patient') {
			unregister('region')
			unregister('crpNumber')
		}
	}, [watch('type')])

	const handleSubmitForm = dataForm => {
		console.log(dataForm)
		router.push('/sign-up')
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
									onIonChange={e => setValue('type', e.detail.value)}
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
												}}
												interface="action-sheet"
												{...register('region')}
											>
												<IonSelectOption value="SP">
													SP
												</IonSelectOption>
												<IonSelectOption value="MG">
													MG
												</IonSelectOption>
											</IonSelect>
											<IonInput
												placeholder="Número de registro"
												className="ml-2"
												{...register('crpNumber')}
											/>
										</IonItem>
									</div>
								)}
							</IonList>
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
