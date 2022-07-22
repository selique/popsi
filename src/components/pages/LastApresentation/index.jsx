import { Link } from 'react-router-dom'

import { IonPage, IonContent, IonText } from '@ionic/react'

import Lines from '../../../assets/Lines'
import SigninupImage from '../../../assets/Signinup'
import Button from '../../ui/Button'

const LastApresentation = () => {
	return (
		<IonPage>
			<IonContent className="ion-padding" fullscreen>
				<div className="relative w-full h-full flex flex-col justify-between items-center overflow-hidden">
					<Lines className="absolute top-0 right-[28%] rotate-[100deg] z-[-1] w-full" />
					<div />
					<div className="flex flex-col items-center w-full">
						<IonText className="text-lg w-max">
							Lorem ipsum dolors
						</IonText>
						<SigninupImage className="my-12" />
						<IonText className="text-sm text-black w-max text-center font-bold">
							But I must explain to you how all
						</IonText>
						<IonText className="text-xsm text-black text-center font-extralight mt-5">
							At vero eos et accusamus et iusto odio ignissimos ducimus
							qui blanditiis praesenti.
						</IonText>
					</div>
					<div className="w-1/2">
						<Link to="/signinup">
							<Button className="bg-blue-100 py-5">Proximo</Button>
						</Link>
					</div>
				</div>
				<Lines className="absolute bottom-0 z-[-1]" />
			</IonContent>
		</IonPage>
	)
}

export default LastApresentation
