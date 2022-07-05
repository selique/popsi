import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	IonBackButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar,
	useIonLoading,
	useIonRouter,
	useIonToast
} from '@ionic/react'
import { eyeOffOutline, eyeOutline } from 'ionicons/icons'
import * as Yup from 'yup'

import { supabase } from '../../../utils/supabaseClient'
import Button from '../../ui/Button'

const RedefinePassword = () => {
	const [showNewPassword, setShowNewPassword] = React.useState(false)
	const [showRepeatNewPassword, setShowRepeatNewPassword] =
		React.useState(false)

	const router = useIonRouter()
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()

	const getAcessToken = JSON.parse(
		window.localStorage.getItem('supabase.auth.token')
	)?.currentSession?.access_token

	const schema = Yup.object().shape({
		password: Yup.string()
			.min(6, 'A senha deve ter no mínimo 6 caracteres')
			.required('A senha é obrigatória'),
		confirmPassword: Yup.string()
			.required('Confirmação da senha é obrigatória')
			.oneOf([Yup.ref('password')], 'As senhas não conferem')
	})

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema)
	})

	const handleNewPassword = async data => {
		await showLoading()
		try {
			const { data: updateUserData, error } =
				await supabase.auth.api.updateUser(getAcessToken, {
					password: data.password
				})
			if (updateUserData) {
				await showToast({
					message: 'Senha alterada com sucesso',
					duration: 2000
				})
				router.push('/login')
			}

			if (error) {
				await showToast({
					message: error.message,
					duration: 2000
				})
			}
		} catch (e) {
			await showToast({
				message: e.error_description || e.message,
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
					<IonTitle className="font-bold">Redefinir senha</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<div className="mt-10">
					<IonLabel>
						Para redefinir sua senha, informe o e-mail cadastrado na sua
						conta e enviaremos um link com instruções.
					</IonLabel>
				</div>
				<form onSubmit={handleSubmit(handleNewPassword)}>
					<IonItem className="mt-16" lines="none">
						<IonLabel position="stacked">Digite sua nova senha</IonLabel>
						<IonInput
							id="password"
							name="password"
							placeholder="*********"
							type={showNewPassword ? 'text' : 'password'}
							{...register('password')}
						/>
						<ErrorMessage
							errors={errors}
							name="password"
							as={<div style={{ color: 'red' }} />}
						/>
						<Button
							className="absolute top-[35px] right-2 w-max z-[3] text-2xl bg-transparent"
							type="button"
							onClick={() => {
								showNewPassword
									? setShowNewPassword(false)
									: setShowNewPassword(true)
							}}
						>
							<IonIcon
								icon={showNewPassword ? eyeOffOutline : eyeOutline}
								className="text-[#AC8FBF]"
							/>
						</Button>
					</IonItem>

					<IonItem lines="none">
						<IonLabel position="stacked">Repita sua nova senha</IonLabel>
						<IonInput
							id="confirmPassword"
							name="confirmPassword"
							placeholder="*********"
							type={showRepeatNewPassword ? 'text' : 'password'}
							{...register('confirmPassword')}
						/>
						<ErrorMessage
							errors={errors}
							name="confirmPassword"
							as={<div style={{ color: 'red' }} />}
						/>
						<Button
							className="absolute top-[35px] right-2 w-max z-[3] text-2xl bg-transparent"
							type="button"
							onClick={() => {
								showRepeatNewPassword
									? setShowRepeatNewPassword(false)
									: setShowRepeatNewPassword(true)
							}}
						>
							<IonIcon
								icon={
									showRepeatNewPassword ? eyeOffOutline : eyeOutline
								}
								className="text-[#AC8FBF]"
							/>
						</Button>
					</IonItem>

					<Button className="bg-purple-100 py-5 my-6 mt-16">
						<IonText className="text-white text-lg">Redefinir</IonText>
					</Button>
					<Button className="bg-danger py-5 my-6">
						<IonText className="text-white text-lg">Cancelar</IonText>
					</Button>
				</form>
			</IonContent>
		</IonPage>
	)
}

export default RedefinePassword
