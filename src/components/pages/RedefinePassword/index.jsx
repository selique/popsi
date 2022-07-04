import React from 'react'

import {
	IonBackButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonText,
	IonTitle,
	IonToolbar
} from '@ionic/react'
import { eyeOffOutline, eyeOutline } from 'ionicons/icons'

import Button from '../../ui/Button'

const RedefinePassword = () => {
	const [showNewPassword, setShowNewPassword] = React.useState(false)
	const [showRepeatNewPassword, setShowRepeatNewPassword] =
		React.useState(false)

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/login" />
					</IonButtons>
					<IonTitle className="font-bold">Redefinir senha</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<div className="mt-10">
					<IonLabel>
						Para redefinir sua senha, informe o e-mail cadastrado na sua
						conta e enviaremos um link com instruções.
					</IonLabel>
				</div>

				<IonItem className="mt-16" lines="none">
					<IonLabel position="stacked">Digite sua nova senha</IonLabel>
					<IonInput
						placeholder="*********"
						type={showNewPassword ? 'text' : 'password'}
					/>
					<Button
						className="absolute top-[35px] right-2 w-max z-[3] text-2xl bg-transparent"
						type="button"
						onClick={() => {
							showNewPassword
								? setShowNewPassword(false)
								: setShowNewPassword(true)
						}}
					>
						<IonIcon
							icon={showNewPassword ? eyeOffOutline : eyeOutline}
							className="text-[#AC8FBF]"
						/>
					</Button>
				</IonItem>

				<IonItem lines="none">
					<IonLabel position="stacked">Repita sua nova senha</IonLabel>
					<IonInput
						placeholder="*********"
						type={showRepeatNewPassword ? 'text' : 'password'}
					/>
					<Button
						className="absolute top-[35px] right-2 w-max z-[3] text-2xl bg-transparent"
						type="button"
						onClick={() => {
							showRepeatNewPassword
								? setShowRepeatNewPassword(false)
								: setShowRepeatNewPassword(true)
						}}
					>
						<IonIcon
							icon={showRepeatNewPassword ? eyeOffOutline : eyeOutline}
							className="text-[#AC8FBF]"
						/>
					</Button>
				</IonItem>

				<Button className="bg-purple-100 py-5 my-6 mt-16">
					<IonText className="text-white text-lg">Redefinir</IonText>
				</Button>
				<Button className="bg-danger py-5 my-6">
					<IonText className="text-white text-lg">Cancelar</IonText>
				</Button>
			</IonContent>
		</IonPage>
	)
}

export default RedefinePassword
