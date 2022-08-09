import * as React from 'react'
import { useForm } from 'react-hook-form'

import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	IonBackButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar,
	useIonLoading,
	useIonRouter,
	useIonToast
} from '@ionic/react'
import * as Yup from 'yup'

import { supabase } from '../../../utils/supabaseClient'
import Button from '../../ui/Button'
const ForgotPassword = () => {
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()

	const router = useIonRouter()

	const schema = Yup.object().shape({
		email: Yup.string()
			.email('Insira um e-mail válido')
			.required('O e-mail é obrigatório')
	})

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema)
	})

	const handleForgotPass = async data => {
		await showLoading()
		let { data: passwordResetData, error } =
			await supabase.auth.api.resetPasswordForEmail(data.email, {
				redirectTo: `${process.env.SITE_URL}/reset-password`
			})

		if (passwordResetData) {
			showToast({
				header: 'Erro',
				message: 'E-mail de recuperação enviado',
				position: 'top',
				color: 'purple',
				cssClass: 'text-white',
				duration: 5000,
				animated: true
			})
		}

		if (error) {
			const getErrorByStatus = status => {
				switch (status) {
					case 404:
						return 'E-mail não cadastrado'
					case 422:
						return 'E-mail inválido'
					case 429:
						return 'E-mail de recuperação já enviado, aguarde 60 segundos para solicitar outro'
					default:
						return 'Algo deu errado, tente novamente mais tarde! Caso o erro persistir contate o suporte.'
				}
			}

			showToast({
				header: 'Erro',
				message: getErrorByStatus(error.status),
				position: 'top',
				color: 'purple',
				cssClass: 'text-white',
				duration: 5000,
				animated: true
			})
		}
		await hideLoading()
	}

	const handleCancel = () => {
		reset()
		router.push('/')
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/login" />
					</IonButtons>
					<IonTitle className="font-bold">Esqueci senha</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<div className="mt-10">
					<IonLabel>Preencha os campos abaixo</IonLabel>
				</div>
				<form onSubmit={handleSubmit(handleForgotPass)}>
					<IonList>
						<IonItem className="mt-10" lines="none">
							<IonLabel position="stacked">E-mail</IonLabel>
							<IonInput
								name="email"
								placeholder="exemplo@exemplo.com"
								type="email"
								{...register('email')}
							/>
							<ErrorMessage
								errors={errors}
								name="email"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>

						<Button type="submit" className="bg-purple-100 py-5 mt-16">
							<IonText className="text-white text-lg">Próximo</IonText>
						</Button>
					</IonList>
				</form>
				<Button className="bg-danger py-5 my-6" onClick={handleCancel}>
					<IonText className="text-white text-lg">Cancelar</IonText>
				</Button>
			</IonContent>
		</IonPage>
	)
}

export default ForgotPassword
