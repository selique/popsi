import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'

import { ErrorMessage } from '@hookform/error-message'
import {
	IonPage,
	IonContent,
	IonText,
	useIonLoading,
	useIonToast,
	IonDatetime,
	IonLabel,
	IonInput,
	// IonRadioGroup,
	// IonRadio,
	// IonToggle,
	// IonRange,
	// IonCheckbox,
	IonItem,
	IonSelect,
	IonSelectOption,
	IonButton,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonList
} from '@ionic/react'
import { format, parseISO } from 'date-fns'
import { calendar } from 'ionicons/icons'
import * as Yup from 'yup'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
const SignUp = () => {
	const { signUp } = useAuth()

	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()

	const {
		handleSubmit,
		control,
		setValue,
		register,
		getValues,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
		// validationSchema: Yup.object().shape({
		// 	full_name: Yup.string().required('O nome é obrigatório'),
		// 	email: Yup.string()
		// 		.email('Insira um e-mail válido')
		// 		.required('O e-mail é obrigatório'),
		// 	password: Yup.string()
		// 		.min(6, 'A senha deve ter no mínimo 6 caracteres')
		// 		.required('A senha é obrigatória'),
		// 	confirm_password: Yup.string()
		// 		.oneOf([Yup.ref('password'), null], 'As senhas não conferem')
		// 		.required('A confirmação da senha é obrigatória'),
		// 	avatar_url: Yup.string().notRequired(),
		// 	cpf: Yup.string()
		// 		.min(11, 'O CPF deve ter no mínimo 11 caracteres')
		// 		.required('O CPF é obrigatório'),
		// 	nickname: Yup.string()
		// 		.min(3, 'O nickname deve ter no mínimo 3 caracteres')
		// 		.notRequired(),
		// 	birth_date: Yup.string().required('A data de nascimento é obrigatória')
		// })
	})

	const registerUser = async data => {
		await showLoading()

		try {
			await signUp({
				email: data.email,
				password: data.password
			})

			await showToast({
				message: 'Check your email for confirm register!',
				duration: 5000
			})
		} catch (e) {
			await showToast({
				message: e.error_description || e.message,
				duration: 5000
			})
		} finally {
			await hideLoading()
		}
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
					<IonTitle>Cadastro</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<form onSubmit={handleSubmit(registerUser)}>
					<IonList>
						<IonItem lines="none">
							{/* === ION INPUT === */}
							<IonLabel position="stacked">E-mail</IonLabel>
							<IonInput
								placeholder="Digite seu e-mail"
								{...register('email', {
									required: 'E-mail é obrigatório',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
										message: 'E-mail inválido'
									}
								})}
							/>
							<ErrorMessage
								errors={errors}
								name="email"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>

						<IonItem lines="none">
							{/* === ION INPUT === */}
							<IonLabel position="stacked">Nome</IonLabel>
							<IonInput
								placeholder="Nome completo"
								{...register('full_name', {
									required: 'Nome é obrigatório'
								})}
							/>
							<ErrorMessage
								errors={errors}
								name="full_name"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>
						<IonItem lines="none">
							{/* === ION INPUT === */}
							<IonLabel position="stacked">Confirmar senha</IonLabel>
							<IonInput
								type="password"
								placeholder="Confirmar senha"
								{...register('confirm_password', {
									// required: 'Confirmar senha é obrigatório'
								})}
							/>
							<ErrorMessage
								errors={errors}
								name="confirm_password"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>
					</IonList>
					<IonButton
						color="purple"
						expand="full"
						shape="round"
						type="submit"
					>
						<IonText className="text-white">Cadastrar</IonText>
					</IonButton>
				</form>
			</IonContent>
		</IonPage>
	)
}

export default SignUp
