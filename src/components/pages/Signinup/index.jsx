import { Link } from 'react-router-dom'

import { IonContent, IonPage, IonText } from '@ionic/react'
import Image from 'next/image'

import Facebook from '../../../assets/Facebook'
import Google from '../../../assets/Google'
import Logo from '../../../assets/logo.png'
import Button from '../../ui/Button'

const Signinup = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="w-full h-full flex flex-col justify-center items-center">
					<div className="w-[80%] flex flex-col items-center">
						<Image src={Logo} alt="POPSI" />
						<div className="text-center w-full mt-12">
							<IonText>Não tem cadastro ainda ? </IonText>
							<Link to="/you-are">
								<Button className="bg-blue-200 text-white text-md mt-6 mb-3">
									Cadastre-se agora
								</Button>
							</Link>
							{/* <Button className="bg-white shadow-md">
								<Google />
								<IonText className="ml-2 text-md">Google</IonText>
							</Button>
							<Button className="bg-blue-500 shadow-md mt-3 mb-6">
								<Facebook />
								<IonText className="ml-2 text-white text-md">
									Facebook
								</IonText>
							</Button> */}
							<IonText>Já tenho cadastro</IonText>
							<Link to="/login">
								<Button className="bg-purple-100 mt-6 text-white text-md">
									Entrar
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Signinup
