import { IonCard, IonCardContent } from '@ionic/react'

const Card = ({ children, className, classContainer, ...props }) => (
	<IonCard className={`rounded-2xl shadow ${classContainer}`}>
		<IonCardContent className={`${className}`} {...props}>
			{children}
		</IonCardContent>
	</IonCard>
)

export default Card
