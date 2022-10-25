import * as React from 'react'
import { useLocation } from 'react-router-dom'

import { IonPage, IonContent } from '@ionic/react'

import FormProfessional from './FormProfessional'

const FormSurvey = () => {
	const { search } = useLocation()
	const [idForm, setIdForm] = React.useState(null)

	React.useState(() => {
		if (search) {
			const params = new URLSearchParams(search)
			setIdForm(params.get('id'))
		}
	}, [search])

	return (
		<IonPage>
			<IonContent fullscreen>
				<FormProfessional idForm={idForm} />
			</IonContent>
		</IonPage>
	)
}

export default FormSurvey
