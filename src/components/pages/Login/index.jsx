import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ErrorMessage } from '@hookform/error-message'
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
	IonButton
} from '@ionic/react'
import * as Yup from 'yup'

import Facebook from '../../../assets/Facebook'
import Google from '../../../assets/Google'
import Lines from '../../../assets/Lines'
import { useAuth } from '../../../contexts/Auth'
import Button from '../../ui/Button'
import Input from '../../ui/Input'

const Login = () => {
	const { signIn } = useAuth()
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')

	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()

	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
		// validationSchema: Yup.object().shape({
		// 	email: Yup.string()
		// 		.email('Insira um e-mail válido')
		// 		.required('O e-mail é obrigatório'),
		// 	password: Yup.string()
		// 		.min(6, 'A senha deve ter no mínimo 6 caracteres')
		// 		.required('A senha é obrigatória'),
		// })
	})
	const handleLogin = async data => {
		await showLoading()
		try {
			await signIn(data)
			await showToast({ message: 'Check your email for the login link!' })
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
			<IonContent className="ion-padding" fullscreen>
				<div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
					<Lines className="absolute top-0 right-[28%] rotate-[100deg] z-[-1] w-full" />
					<div />
					<IonText className="text-6xl font-bold text-black-200">
						Bem vindo de volta!
					</IonText>
					<form onSubmit={handleSubmit(handleLogin)}>
						<IonList>
							<IonItem lines="none">
								<IonLabel position="stacked">Email</IonLabel>
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
								<IonLabel position="stacked">Senha</IonLabel>
								<IonInput
									placeholder="Senha"
									{...register('password', {
										required: 'Senha é obrigatória'
									})}
								/>
								<ErrorMessage
									errors={errors}
									name="password"
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
					<div className="flex justify-center items-center">
						<div className="w-full h-[1px] bg-black mr-2" />
						<IonText>ou</IonText>
						<div className="w-full h-[1px] bg-black ml-2" />
					</div>
					<div>
						<Button className="bg-white shadow-md">
							<Google />
							<IonText className="ml-2 text-lg">Google</IonText>
						</Button>
						<Button className="bg-blue-500 shadow-md mt-4">
							<Facebook />
							<IonText className="ml-2 text-white text-lg">
								Facebook
							</IonText>
						</Button>
					</div>
					<div className="flex justify-center">
						<IonText className="font-medium">
							Não tem cadastro?
							<Link to="#">
								<IonText className="text-purple">Registre-se</IonText>
							</Link>
						</IonText>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Login
