import * as React from 'react'
import { Link } from 'react-router-dom'

import {
	IonPage,
	IonContent,
	IonText,
	IonAvatar,
	useIonRouter,
	IonGrid,
	IonRow,
	IonCol,
	IonImg
} from '@ionic/react'

import { useAuth } from '../../../contexts/Auth'
import Card from '../../ui/Card'
import QuizList from '../../ui/QuizList'
import ShortcutCard from '../../ui/ShortcutCard'
import UploadAvatar from '../../UploadAvatar'
import handlePronoun from './../../../utils/pronoun'

const HomeClient = () => {
	const router = useIonRouter()
	const { user, loading } = useAuth()

	return (
		<IonPage>
			<IonContent className="ion-padding">
				<IonGrid>
					<IonRow>
						<IonCol className="flex flex-col">
							<IonText className="text-sm text-gray-900 mb-1 font-light">
								{user?.pronoun
									? handlePronoun(user?.pronoun) === 'n'
										? 'Bem vindo(a)'
										: handlePronoun(user?.pronoun) === 'm'
										? 'Bem vindo'
										: 'Bem vinda'
									: 'Bem vindo(a)'}
							</IonText>
							<IonText className="text-black-200 text-2xl font-bold">
								{user?.nickname}
							</IonText>
						</IonCol>
						<IonCol className="ion-align-items-center ion-justify-content-end flex">
							<IonAvatar
								className="flex items-center w-[50px] h-[50px]"
								onClick={() => router.push('/app/profile')}
							>
								<UploadAvatar disabledUpload alt="Foto de perfil" />
							</IonAvatar>
						</IonCol>
					</IonRow>
				</IonGrid>
				<div className="grid grid-cols-[30%_1fr] gap-4 my-4">
					<Link to="/breathing">
						<ShortcutCard background="bg-purple-100 w-auto p-3 py-5">
							<div className="flex flex-col justify-center items-center h-full">
								<IonImg src={'/img/Yoga.png'} alt="Yoga image" />
								<p className="text-white text-sm text-center font-bold">
									Controle de respiração
								</p>
							</div>
						</ShortcutCard>
					</Link>
					{/* <div className="bg-white flex justify-between items-center shadow-md p-4 rounded-2xl">
						<div className="w-[50px] h-[50px] bg-gray-900 rounded-full" />
						<p className="w-[70%] font-bold">
							Como você esta se sentindo hoje?
						</p>
					</div> */}
				</div>
				{/* <Card classContainer="mb-2">
					<p className="font-bold text-xl leading-[1px]">Minhas metas</p>
					<p className="leading-[1px] text-xsm">Hoje, 27 abril,2022</p>
					<div className="grid grid-cols-4 grid-rows-[70px] gap-4 mt-6">
						<div className="flex justify-center items-center w-full h-full border-dashed border-2 border-gray-900 rounded-full">
							<IonImg src={'/img/Running.png'} alt="icone de corrida" />
						</div>
						<div className="flex justify-center items-center w-full h-full border-dashed border-2 border-gray-900 rounded-full">
							<IonImg src={'/img/Running.png'} alt="icone de corrida" />
						</div>
						<div className="flex justify-center items-center w-full h-full border-dashed border-2 border-gray-900 rounded-full">
							<IonImg src={'/img/Running.png'} alt="icone de corrida" />
						</div>
						<div className="flex justify-center items-center w-full h-full border-dashed border-2 border-gray-900 rounded-full">
							<IonImg src={'/img/Running.png'} alt="icone de corrida" />
						</div>
					</div>
				</Card> */}
				<IonText className="font-semibold">Questionários</IonText>
				<QuizList style={{ height: '350px' }} />
			</IonContent>
		</IonPage>
	)
}

export default HomeClient
