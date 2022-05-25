import * as React from 'react'
import { Link } from 'react-router-dom'

import {
	IonPage,
	IonContent,
	IonText,
	useIonLoading,
	useIonToast
} from '@ionic/react'

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
	const handleLogin = async event => {
		event.preventDefault()
		await showLoading()
		try {
			await signIn({ email })
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
					<form onSubmit={handleLogin}>
						<Input
							label="Usuário ou e-mail"
							placeholder="usuario@usuario.com"
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<Input
							label="Senha"
							placeholder="*********"
							classContent="mt-3 mb-8"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
						<Button className="bg-purple-100" type="submit">
							<IonText className="text-white">Entrar</IonText>
						</Button>
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
								<IonText className="text-purple"> Registre-se</IonText>
							</Link>
						</IonText>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Login
