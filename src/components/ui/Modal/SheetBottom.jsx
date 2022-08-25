import * as React from 'react'

import { IonIcon, IonModal, IonText } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'

const Modal = ({
	isOpen,
	onDidDismiss,
	children,
	title,
	swipeToClose = true
}) => {
	return (
		<IonModal
			cssClass={'modal-sheet-bottom'}
			isOpen={isOpen}
			onDidDismiss={onDidDismiss}
			swipeToClose={swipeToClose}
			backdropDismiss={true}
		>
			{title && (
				<div className="w-full flex justify-between items-center">
					<IonText className="text-xl font-bold">{title}</IonText>
					<IonIcon
						icon={closeOutline}
						className="text-2xl"
						onClick={onDidDismiss}
					/>
				</div>
			)}
			{children}
		</IonModal>
	)
}

export default Modal
