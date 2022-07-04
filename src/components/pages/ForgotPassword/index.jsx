import { Link } from 'react-router-dom'

import {
	IonBackButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar
} from '@ionic/react'

import Button from '../../ui/Button'

const ForgotPassword = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/login" />
					</IonButtons>
					<IonTitle className="font-bold">Esqueci senha</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<div className="mt-10">
					<IonLabel>Preencha os campos abaixo</IonLabel>
				</div>

				<IonItem className="mt-10" lines="none">
					<IonLabel position="stacked">E-mail</IonLabel>
					<IonInput placeholder="exemplo@exemplo.com" type="email" />
				</IonItem>

				<Link to="/redefine-password">
					<Button className="bg-purple-100 py-5 my-6 mt-16">
						<IonText className="text-white text-lg">Próximo</IonText>
					</Button>
				</Link>
				<Button className="bg-danger py-5 my-6">
					<IonText className="text-white text-lg">Cancelar</IonText>
				</Button>
			</IonContent>
		</IonPage>
	)
}

export default ForgotPassword
