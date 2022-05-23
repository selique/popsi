import { IonPage, IonContent, IonText } from '@ionic/react'
import Link from 'next/link'

import Facebook from '../../assets/Facebook'
import Google from '../../assets/Google'
import Lines from '../../assets/Lines'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const SignIn = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="relative w-full h-full p-8 flex flex-col justify-between overflow-hidden">
					<Lines className="absolute top-0 right-[28%] rotate-[100deg] z-[-1] w-full" />
					<div />
					<IonText className="text-6xl font-bold text-black-200">
						Bem vindo de volta!
					</IonText>
					<div>
						<Input
							label="Usuário ou e-mail"
							placeholder="usuario@usuario.com"
							type="email"
						/>
						<Input
							label="Senha"
							placeholder="*********"
							classContent="mt-3 mb-8"
							type="password"
						/>
						<Link passHref href="/app">
							<Button className="bg-purple-100">
								<IonText className="text-white">Entrar</IonText>
							</Button>
						</Link>
					</div>
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
							<Link passHref href="/sign-up">
								<IonText className="text-purple"> Registre-se</IonText>
							</Link>
						</IonText>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default SignIn
