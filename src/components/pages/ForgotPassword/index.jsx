import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

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
	useIonToast
} from '@ionic/react'
import * as Yup from 'yup'

import { supabase } from '../../../utils/supabaseClient'
import Button from '../../ui/Button'

const ForgotPassword = () => {
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()

	const schema = Yup.object().shape({
		email: Yup.string()
			.email('Insira um e-mail válido')
			.required('O e-mail é obrigatório')
	})

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema)
	})

	const handleForgotPass = async data => {
		await showLoading()
		try {
			let { data: passwordResetData, error } =
				await supabase.auth.api.resetPasswordForEmail(data.email, {
					redirectTo: `${process.env.SITE_URL}/redefine-password`
				})

			if (passwordResetData) {
				await showToast({
					message: 'E-mail de recuperação enviado',
					duration: 2000
				})
			}

			if (error && error.status === 404) {
				await showToast({
					message: 'E-mail não cadastrado',
					duration: 2000
				})
			} else if (error && error.status === 422) {
				await showToast({
					message: 'E-mail inválido',
					duration: 2000
				})
			} else if (error && error.status === 429) {
				await showToast({
					message:
						'E-mail de recuperação já enviado, aguarde 60 segundos para solicitar outro',
					duration: 2000
				})
			} else if (error) {
				await showToast({
					message: error.message,
					duration: 2000
				})
			}
		} catch (error) {
			await showToast({
				message: error.message,
				duration: 2000
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

						<Button
							type="submit"
							className="bg-purple-100 py-5 my-6 mt-16"
						>
							<IonText className="text-white text-lg">Próximo</IonText>
						</Button>

						<Button className="bg-danger py-5 my-6">
							<IonText className="text-white text-lg">Cancelar</IonText>
						</Button>
					</IonList>
				</form>
			</IonContent>
		</IonPage>
	)
}

export default ForgotPassword
