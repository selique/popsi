import * as React from 'react'
import { Link } from 'react-router-dom'

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
import { useChatNotifications } from './../../../contexts/chatNotifications'

const AllChats = () => {
	const { patients } = useChatNotifications()
	const [filteredPatients, setFilteredPatients] = React.useState([])
	const [search, setSearch] = React.useState('')

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
					icon={<IonIcon icon={searchOutline} />}
					placeholder="Pesquisar"
					background="bg-white"
					classContent="mb-6"
					onChange={e => setSearch(e.target.value)}
				/>
				{patients && patients.length > 0 && filteredPatients.length > 0 ? (
					<Card>
						<IonList>
							{filteredPatients.map(({ id, full_name, messages }) => (
								<Link
									key={id}
									to={`/app/chat/${id}`}
									className="flex items-center justify-between"
								>
									<div className="flex items-center">
										<IonAvatar slot="start">
											<Image src={Profile} alt="Foto de perfil" />
										</IonAvatar>
										<IonText className="font-semibold">
											{full_name}
										</IonText>
									</div>
									{messages &&
										messages.length > 0 &&
										messages.filter(
											message => message.status === 'SENT'
										).length > 0 && (
											<div className="flex items-center justify-center h-7 w-7 bg-glossyGrape rounded-full">
												<IonText className="text-white">
													{
														messages.filter(
															message =>
																message.status === 'SENT'
														).length
													}
												</IonText>
											</div>
										)}
								</Link>
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
