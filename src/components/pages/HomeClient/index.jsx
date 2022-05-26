import { IonPage, IonContent, IonText, IonIcon } from '@ionic/react'
import { shareSocialOutline, documentTextOutline } from 'ionicons/icons'
import Image from 'next/image'

import Profile from '../../../assets/profile.png'
import Running from '../../../assets/Running.png'
import Yoga from '../../../assets/Yoga.png'
import Card from '../../ui/Card'
import ShortcutCard from '../../ui/ShortcutCard'

const HomeClient = () => {
	return (
		<IonPage>
			<IonContent className="ion-padding">
				<div className="flex justify-between mb-5">
					<div className="flex flex-col">
						<IonText className="text-sm text-gray-900 mb-1 font-light">
							Bem vindo
						</IonText>
						<IonText className="text-black-200 text-3xl font-bold">
							Sabrina
						</IonText>
					</div>
					<Image src={Profile} alt="Foto de perfil" />
				</div>
				<div className="grid grid-cols-[30%_1fr] gap-4 my-4">
					<ShortcutCard background="bg-purple-100 w-auto p-3 py-5">
						<div className="flex flex-col justify-center items-center h-full">
							<Image src={Yoga} alt="Yoga image" />
							<p className="text-white text-sm text-center font-bold">
								Controle de respiração
							</p>
						</div>
					</ShortcutCard>
					<div className="bg-white flex justify-between items-center shadow-md p-4 rounded-2xl">
						<div className="w-[50px] h-[50px] bg-gray-900 rounded-full" />
						<p className="w-[70%]">Como você esta se sentindo hoje?</p>
					</div>
				</div>
				<Card>
					<p className="font-bold text-xl leading-[1px]">Minhas metas</p>
					<p className="leading-[1px] text-xsm">Hoje, 27 abril,2022</p>
					<div className="grid grid-cols-4 grid-rows-[70px] gap-4 mt-6">
						<div className="flex justify-center items-center w-full h-full border-dashed border-2 border-gray-900 rounded-full">
							<Image src={Running} alt="icone de corrida" />
						</div>
						<div className="flex justify-center items-center w-full h-full border-dashed border-2 border-gray-900 rounded-full">
							<Image src={Running} alt="icone de corrida" />
						</div>
						<div className="flex justify-center items-center w-full h-full border-dashed border-2 border-gray-900 rounded-full">
							<Image src={Running} alt="icone de corrida" />
						</div>
						<div className="flex justify-center items-center w-full h-full border-dashed border-2 border-gray-900 rounded-full">
							<Image src={Running} alt="icone de corrida" />
						</div>
					</div>
				</Card>
				<div className="mt-4">
					<p className="font-bold text-lg text-black leading-1">
						Questionários
					</p>
					{[1, 2, 3, 4].map((_, index) => (
						<div
							key={index}
							className="bg-gray-200 p-4 rounded-2xl grid grid-cols-[auto_1fr_auto] gap-4 items-center mb-2"
						>
							<div className="bg-purple-200 p-3 rounded-xl">
								<IonIcon
									src={documentTextOutline}
									className="w-[30px] h-[30px] text-white"
								/>
							</div>
							<div>
								<p className="leading-[1px] font-medium text-black">
									Questionario 1
								</p>
								<p className="leading-[1px] text-sm">6 paginas</p>
							</div>
							<IonIcon
								src={shareSocialOutline}
								className="w-[25px] h-[25px]"
							/>
						</div>
					))}
				</div>
			</IonContent>
		</IonPage>
	)
}

export default HomeClient