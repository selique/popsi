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
	IonFabButton
} from '@ionic/react'
import { addOutline } from 'ionicons/icons'
import { searchOutline } from 'ionicons/icons'
import Image from 'next/image'

import Profile from '../../../assets/Profile.png'
import { supabase } from '../../../utils/supabaseClient'
import Card from '../../ui/Card'
import Input from '../../ui/Input'
import { useAuth } from './../../../contexts/Auth'

const AllChats = () => {
	const { user } = useAuth()
	const [patients, setPatients] = React.useState([])
	const [filteredPatients, setFilteredPatients] = React.useState([])
	const [search, setSearch] = React.useState('')

	React.useEffect(() => {
		const getPatients = async () => {
			const { data } = await supabase
				.from('profiles')
				.select(
					`
					id,
					full_name,
					avatar_url
				`
				)
				.eq('medic_id', user.id)

			if (data) setPatients(data)
		}
		getPatients()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	React.useEffect(() => {
		if (search !== '') {
			const filteredPatients = patients.filter(patient => {
				return patient.full_name
					.toLowerCase()
					.includes(search.toLowerCase())
			})
			setFilteredPatients(filteredPatients)
		} else {
			setFilteredPatients(patients)
		}
	}, [patients, search])

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/app/home" />
					</IonButtons>
					<IonTitle className="text-lg font-semibold">Mensagens</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding" fullscreen>
				<IonFab horizontal="end" vertical="bottom" slot="fixed">
					<IonFabButton>
						<IonIcon color={'white'} icon={addOutline} />
					</IonFabButton>
				</IonFab>
				<Input
					icon={<IonIcon src={searchOutline} />}
					placeholder="Pesquisar"
					background="bg-white"
					classContent="mb-6"
					onChange={e => setSearch(e.target.value)}
				/>
				{patients && patients.length > 0 && filteredPatients.length > 0 ? (
					<Card>
						<IonList>
							{filteredPatients.map(({ id, full_name }) => (
								<IonItem className="mb-2" key={id}>
									<IonAvatar slot="start">
										<Image src={Profile} alt="Foto de perfil" />
									</IonAvatar>
									<div className="flex flex-col">
										<IonText className="font-semibold">
											{full_name}
										</IonText>
									</div>
								</IonItem>
							))}
						</IonList>
					</Card>
				) : (
					<Card>
						<IonText className="text-center">
							Nenhum paciente encontrado
						</IonText>
					</Card>
				)}
			</IonContent>
		</IonPage>
	)
}

export default AllChats
