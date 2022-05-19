import {
	IonPage,
	IonContent,
	IonBackButton,
	IonIcon,
	IonCheckbox,
	IonText
} from '@ionic/react'
import {
	shareSocialOutline,
	settingsOutline,
	trashOutline
} from 'ionicons/icons'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const Form = () => {
	return (
		<IonPage>
			<IonContent>
				<div className="bg-purple-100 p-4">
					<div className="flex justify-between items-center">
						<IonBackButton defaultHref="/quiz" className="text-white" />
						<div className="flex text-2xl text-white">
							<IonIcon
								src={shareSocialOutline}
								color="#ffffff"
								className="mr-3"
							/>
							<IonIcon src={settingsOutline} color="#ffffff" />
						</div>
					</div>
					<input
						placeholder="Título"
						className="bg-transparent border-t-0 border-l-0 border-r-0 border-2 border-white text-white font-semibold text-3xl w-full my-6 placeholder:text-white outline-none"
					/>
				</div>
				<div className="p-4 w-full flex flex-col items-center">
					<div className="p-3 w-full border-dashed border-gray-900 rounded-lg bg-gray-100">
						<Input placeholder="Pergunta 1" background="bg-white" />
						<div className="py-4 flex flex-col items-center">
							<div className="flex item-center mb-3 w-full">
								<IonCheckbox id="alternative1" />
								<label
									htmlFor="alternative1"
									className="m-0 ml-3 font-light"
								>
									Alternative 1
								</label>
							</div>
							<div className="w-1/2">
								<Button className="bg-blue-200 py-3">
									<IonText className="text-white font-medium">
										Mais opções
									</IonText>
								</Button>
							</div>
						</div>
						<div className="flex justify-between text-2xl mt-2">
							<div />
							<IonIcon src={trashOutline} />
						</div>
					</div>
					<div className="w-1/2 mt-6">
						<Button className="bg-purple-100">
							<IonText className="text-white font-medium">
								Mais pergunta?
							</IonText>
						</Button>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Form
