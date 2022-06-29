import * as React from 'react'

import { IonIcon, IonModal, IonText } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import styled from 'styled-components'

const CustomModal = styled(IonModal)`
	.modal-wrapper {
		background: transparent !important;
	}
`

const Modal = ({
	isOpen,
	onDidDismiss,
	children,
	height = 100,
	title,
	swipeToClose = true
}) => {
	const heightBackdrop = 100 - height

	React.useEffect(() => {
		if (typeof height !== 'number') {
			throw new Error('Prop "height" must be type of number.')
		} else if (height > 100 || height < 0) {
			throw new Error('Prop "height" must be between 0 to 100.')
		}
	}, [height])

	return (
		<CustomModal
			isOpen={isOpen}
			onDidDismiss={onDidDismiss}
			swipeToClose={swipeToClose}
			backdropDismiss={true}
		>
			<div className="h-[100vh]">
				<div
					className={`w-full`}
					style={{ height: heightBackdrop + 'vh' }}
					onClick={onDidDismiss}
				/>
				<div
					className={`bg-white rounded-t-2xl p-4`}
					style={{ height: height + 'vh' }}
				>
					{title && (
						<div className="w-full flex justify-between items-center mb-3">
							<IonText className="text-xl font-bold">{title}</IonText>
							<IonIcon
								icon={closeOutline}
								className="text-2xl"
								onClick={onDidDismiss}
							/>
						</div>
					)}
					{children}
				</div>
			</div>
		</CustomModal>
	)
}

export default Modal
