import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	IonPage,
	IonContent,
	IonText,
	useIonLoading,
	useIonToast,
	IonInput,
	IonLabel,
	IonList,
	IonItem,
	useIonRouter,
	IonIcon
} from '@ionic/react'
import { eyeOutline, eyeOffOutline } from 'ionicons/icons'
import * as Yup from 'yup'

import Lines from '../../../assets/Lines'
import { useAuth } from '../../../contexts/Auth'
import Button from '../../ui/Button'

const Login = () => {
	const { user, signIn } = useAuth()
	const router = useIonRouter()
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()
	const [showPassword, setShowPassword] = React.useState(false)

	const schema = Yup.object().shape({
		email: Yup.string()
			.email('Insira um e-mail válido')
			.required('O e-mail é obrigatório'),
		password: Yup.string()
			.min(6, 'A senha deve ter no mínimo 6 caracteres')
			.required('A senha é obrigatória')
	})

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema)
	})

	const handleLogin = async data => {
		await showLoading()
		try {
			await signIn(data)
			return user?.id && router.push('/app/home')
		} catch (e) {
			await showToast({
				message: e.error_description || e.message,
				duration: 1000
			})
		} finally {
			await hideLoading()
		}
	}

	return (
		<IonPage>
			<IonContent className="ion-padding">
				<div className="relative w-full h-full flex flex-col justify-center overflow-hidden">
					<Lines className="absolute top-0 right-[28%] rotate-[100deg] z-[-1] w-full" />
					<div />
					<IonText className="text-6xl font-bold text-black-200 mb-16">
						Bem vindo <br /> de volta!
					</IonText>
					<form onSubmit={handleSubmit(handleLogin)}>
						<IonList>
							<IonItem lines="none">
								<IonLabel position="stacked">
									Usuário ou e-mail
								</IonLabel>
								<IonInput
									placeholder="usuario@usuario.com"
									type="email"
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
								<IonLabel position="stacked">Senha</IonLabel>
								<IonInput
									placeholder="*********"
									type={showPassword ? 'text' : 'password'}
									{...register('password', {
										required: 'Senha é obrigatória'
									})}
								/>
								<Button
									className="absolute top-[35px] right-2 w-max z-[3] text-2xl bg-transparent"
									type="button"
									onClick={() => {
										showPassword
											? setShowPassword(false)
											: setShowPassword(true)
									}}
								>
									<IonIcon
										icon={showPassword ? eyeOffOutline : eyeOutline}
										className="text-[#AC8FBF]"
									/>
								</Button>
								<ErrorMessage
									errors={errors}
									name="password"
									as={<div style={{ color: 'red' }} />}
								/>
							</IonItem>
							<Button type="submit" className="bg-purple-100 py-5 my-6">
								<IonText className="text-white text-lg">Entrar</IonText>
							</Button>
						</IonList>
					</form>
					<div className="flex justify-center">
						<IonText className="font-medium">
							Esqueceu a sua senha?
							<Link to="/forgot-password">
								<IonText className="text-purple-100 ml-2">
									Vamos lá
								</IonText>
							</Link>
						</IonText>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Login
