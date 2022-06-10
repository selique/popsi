import * as React from 'react'

import { IonModal } from '@ionic/react'
import styled from 'styled-components'

const CustomModal = styled(IonModal)`
	.modal-wrapper {
		background: transparent;
	}
`

const Modal = ({ isOpen, onDidDismiss, children, height = 100 }) => {
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
			swipeToClose={true}
			backdropDismiss={true}
		>
			<div className="h-[100vh]">
				<div
					className={`h-[${heightBackdrop}vh] w-full`}
					onClick={onDidDismiss}
				/>
				<div className={`h-[${height}vh]`}>{children}</div>
			</div>
		</CustomModal>
	)
}

export default Modal
