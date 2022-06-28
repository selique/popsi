import * as React from 'react'

import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonContent,
	IonIcon,
	IonList,
	IonItem,
	IonAvatar,
	IonText,
	IonFab,
	IonFabButton,
	IonGrid,
	IonRow,
	IonCol,
	IonNote
} from '@ionic/react'
import { addOutline } from 'ionicons/icons'
import { searchOutline } from 'ionicons/icons'
import Image from 'next/image'

import Profile from '../../../assets/Profile.png'
import Card from '../../ui/Card'
import Input from '../../ui/Input'

const Chat = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/app/home" />
					</IonButtons>
					<IonTitle className="text-lg font-semibold">
						Anderson Silva
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding flex" fullscreen>
				<div className="flex">
					<span className="scale-x-[-1]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 10 13"
							width="15"
							height="20"
						>
							<path
								opacity=".13"
								d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
							></path>
							<path
								fill="#858585"
								d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
							></path>
						</svg>
					</span>
					<div className="flex flex-col single-message rounded-tr-lg bg-gray-800 rounded-bl-lg rounded-br-lg mb-4 px-4 py-2">
						<IonText className="text-white-100">
							Hey Pal! Im doing good, how have you been? Cold at the
							moment aye!
						</IonText>
						<IonText className="text-white-100 text-xs self-end">
							10:00
						</IonText>
					</div>
				</div>
				<div className="flex">
					<div className="flex flex-col single-message rounded-tl-lg bg-glossyGrape rounded-bl-lg rounded-br-lg mb-4 px-4 py-2">
						<IonText className="text-white-100">
							Hey Pal! Im doing good, how have you been? Cold at the
							moment aye!
						</IonText>
						<IonText className="text-white-100 text-xs self-end">
							10:00
						</IonText>
					</div>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 10 13"
							width="15"
							height="20"
						>
							<path
								opacity=".13"
								d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
							></path>
							<path
								fill="#AC8FBF"
								d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
							></path>
						</svg>
					</span>
				</div>
				{/* <IonGrid>
					<IonRow>
						<IonCol className="p-5 mb-b bg-gray-200 rounded-xl whitespace-pre-wrap">
							<span>Olá, Bom dia !</span>
							<span>10:30 am</span>
						</IonCol>
						<IonCol>
							<span>Olá, Bom dia !</span>
							<span>10:35 am</span>
						</IonCol>
					</IonRow>
				</IonGrid> */}
			</IonContent>
		</IonPage>
	)
}

export default Chat
