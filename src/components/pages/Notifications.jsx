import {
	IonModal,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonButton,
	IonIcon,
	IonList,
	IonItem,
	IonNote,
	IonLabel
} from '@ionic/react'
import { close } from 'ionicons/icons'

import Store from '../../store'
import { getNotifications } from '../../store/selectors'

const NotificationItem = ({ notification }) => (
	<IonItem>
		<IonLabel>{notification.title}</IonLabel>
		<IonNote slot="end">{notification.when}</IonNote>
		<IonButton slot="end" fill="clear" color="dark">
			<IonIcon icon={close} />
		</IonButton>
	</IonItem>
)

const Notifications = ({ open, onDidDismiss }) => {
	const notifications = Store.useState(getNotifications)

	return (
		<IonModal isOpen={open} onDidDismiss={onDidDismiss}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Notifications</IonTitle>
					<IonButton
						slot="end"
						fill="clear"
						color="dark"
						onClick={onDidDismiss}
					>
						<IonIcon icon={close} />
					</IonButton>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Notifications</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonList>
					{notifications.map((notification, i) => (
						<NotificationItem notification={notification} key={i} />
					))}
				</IonList>
			</IonContent>
		</IonModal>
	)
}

export default Notifications
