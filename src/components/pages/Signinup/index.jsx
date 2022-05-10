import { Link } from 'react-router-dom'

import { IonPage, IonContent, IonText } from '@ionic/react'

import Lines from '../../../assets/Lines'
import SigninupImage from '../../../assets/Signinup'
import Button from '../../ui/Button'

const Signinup = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="relative w-full h-full p-8 flex flex-col justify-between items-center overflow-hidden">
					<Lines className="absolute top-0 right-[28%] rotate-[100deg] z-[-1] w-full" />
					<div />
					<div className="flex flex-col items-center w-full">
						<IonText className="text-lg w-max">
							Lorem ipsum dolors
						</IonText>
						<SigninupImage className="my-12" />
						<IonText className="text-sm text-black w-max text-center">
							But I must explain to you how all this mistaken
						</IonText>
						<IonText className="text-xsm text-black text-center font-extralight mt-2">
							At vero eos et accusamus et iusto odio ignissimos ducimus
							qui blanditiis praesenti.
						</IonText>
					</div>
					<div className="w-full bg-blue-100 grid grid-cols-2">
						<Link to="#">
							<Button className="bg-black w-full bg-blue-200 text-white">
								Entrar
							</Button>
						</Link>
						<Link to="#">
							<Button className="bg-blue-100 w-full">Cadastrar</Button>
						</Link>
					</div>
				</div>
				<Lines className="absolute bottom-0 z-[-1]" />
			</IonContent>
		</IonPage>
	)
}

export default Signinup
