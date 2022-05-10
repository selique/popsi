import { Link } from 'react-router-dom'

import { IonPage, IonContent, IonIcon, IonText } from '@ionic/react'
import { chevronForward } from 'ionicons/icons'

import ApresentationImage from '../../assets/Apresentation'
import Lines from '../../assets/Lines'
import Button from '../../ui/Button'

const Apresentation = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="relative w-full h-full p-8 flex flex-col justify-between items-center overflow-hidden">
					<Lines className="absolute top-0 right-[28%] rotate-[100deg] z-[-1]" />
					<div className="w-full flex justify-end">
						<Link to="/tabs">
							<div className="flex items-center">
								<IonText className="capitalize text-medium">
									Pular
								</IonText>
								<IonIcon
									icon={chevronForward}
									className="text-2xl text-black-100"
								/>
							</div>
						</Link>
					</div>
					<div className="flex flex-col items-center w-full">
						<IonText className="text-lg w-max">
							Lorem ipsum dolors
						</IonText>
						<ApresentationImage className="my-12" />
						<IonText className="text-sm text-black w-max text-center">
							But I must explain to you how all this mistaken
						</IonText>
						<IonText className="text-xsm text-black text-center font-extralight mt-2">
							At vero eos et accusamus et iusto odio ignissimos ducimus
							qui blanditiis praesenti.
						</IonText>
					</div>
					<div className="w-2/3">
						<Link to="#">
							<Button className="bg-blue-100">Proximo</Button>
						</Link>
					</div>
				</div>
				<Lines className="absolute bottom-0 z-[-1]" />
			</IonContent>
		</IonPage>
	)
}

export default Apresentation
