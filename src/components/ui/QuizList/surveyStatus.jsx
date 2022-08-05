import { IonText } from '@ionic/react'

const SurveyStatus = ({ status }) => {
	const allStatus = {
		PENDING: {
			status: 'Pendente',
			element: <div className="w-4 h-4 bg-glossyGrape rounded-full" />
		},
		FINISHED: {
			status: 'Finalizado',
			element: <div className="w-4 h-4 bg-deYork rounded-full" />
		},
		EXPIRED: {
			status: 'Expirado',
			element: <div className="w-4 h-4 bg-danger rounded-full" />
		},
		FINISHED_LATE: {
			status: 'Finalizado com atraso',
			element: <div className="w-4 h-4 bg-texasRose rounded-full" />
		},
		LATE: {
			status: 'Atrasado',
			element: <div className="w-4 h-4 bg-texasRose rounded-full" />
		}
	}

	return allStatus[status] ? (
		<div className="flex gap-3 items-center">
			<IonText>{allStatus[status].status}</IonText>
			{allStatus[status].element}
		</div>
	) : (
		<></>
	)
}

export default SurveyStatus
