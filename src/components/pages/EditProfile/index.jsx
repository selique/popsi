import { IonContent, IonPage } from '@ionic/react'

import Button from '../../ui/Button'
import Input from '../../ui/Input'

const EditProfile = () => {
	return (
		<IonPage>
			<IonContent>
				<div className="relative flex justify-center w-full h-[20vh] bg-gradient-to-r from-[#8abce8] to-[#a676cc] rounded-b-3xl">
					<div className="absolute top-[65%] border-[15px] border-white-100 border-solid bg-gray-900 w-[100px] h-[100px] rounded-full" />
				</div>
				<div className="ion-padding mt-[6vh]">
					<p className="text-blue-900 text-center">
						Alterar foto de perfil
					</p>
					<form className="w-full">
						<Input
							label="Apelido"
							placeholder="Doutora Adriana Nogister"
						/>
						<Input
							label="Telefone"
							placeholder="016 98765-4321"
							classContent="my-6"
						/>
						<Input
							label="E-mail"
							placeholder="adri******@consultas.com"
						/>
						<Button className="bg-purple-100 py-1 mt-8">
							<p className="text-white font-medium text-lg">
								Salvar alterações
							</p>
						</Button>
					</form>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default EditProfile
