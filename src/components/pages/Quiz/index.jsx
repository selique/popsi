import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'

import {
	IonContent,
	IonIcon,
	IonPage,
	IonText,
	IonFab,
	IonFabButton,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonBackButton,
	IonButtons,
	IonSearchbar,
	IonSlides,
	IonSlide,
	IonCheckbox
} from '@ionic/react'
import {
	searchOutline,
	documentOutline,
	shareSocialOutline,
	addOutline
} from 'ionicons/icons'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Avatar from '../../ui/Avatar'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
import Modal from '../../ui/Modal'

const imageTemp2 =
	'https://pm1.narvii.com/6583/13022a93a381cddb0c98d4e0a813635bd1215d89_hq.jpg'

const Quiz = () => {
	const [surveys, setSurveys] = React.useState([])
	const [modalInviteUserOpen, setModalInviteUserOpen] = React.useState(false)
	const { user, professional } = useAuth()
	const { register, control, handleSubmit, setValue, getValues, reset } =
		useForm({
			mode: 'onChange'
		})

	React.useEffect(() => {
		const getSurveys = async () => {
			const { data: dataSurveys } = await supabase
				.from('surveys')
				.select(
					`
					id,
					owner_id,
					title,
					description
				`
				)
				.eq('owner_id', user.id)

			if (dataSurveys) {
				dataSurveys.map(async survey => {
					const { data } = await supabase
						.from('profiles')
						.select('nickname')
						.eq('id', survey.owner_id)
						.single()

					if (data) {
						setSurveys([...surveys, { ...survey, author: data.nickname }])
					}
				})
			}
		}

		getSurveys()
	}, [])

	const handleInvited = dataForm => {
		let usersInvited = []
		Object.values(dataForm).map(value => {
			if (value) {
				usersInvited.push(value)
			}
		})

		console.log(usersInvited)
	}

	const users = [
		{
			id: 1,
			name: 'John Doe',
			avatar: imageTemp2
		},
		{
			id: 2,
			name: 'John Doe',
			avatar: imageTemp2
		},
		{
			id: 3,
			name: 'John Doe',
			avatar: imageTemp2
		},
		{
			id: 4,
			name: 'John Doe',
			avatar: imageTemp2
		},
		{
			id: 5,
			name: 'John Doe',
			avatar: imageTemp2
		},
		{
			id: 6,
			name: 'John Doe',
			avatar: imageTemp2
		},
		{
			id: 7,
			name: 'John Doe',
			avatar: imageTemp2
		},
		{
			id: 8,
			name: 'John Doe',
			avatar: imageTemp2
		}
	]

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/app/home" />
					</IonButtons>
					<IonTitle className="text-lg font-semibold">
						Questionários
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding" fullscreen>
				<Input
					icon={<IonIcon src={searchOutline} />}
					placeholder="Pesquisar"
					background="bg-white"
					classContent="mb-6"
				/>
				<div>
					<IonText>Recentes</IonText>
					{surveys.map((item, index) => (
						<Link to={`/form/answers/${item.id}`} key={index}>
							<div
								className={`grid ${
									professional
										? 'grid-cols-[auto_1fr_auto]'
										: 'grid-cols-[auto_1fr]'
								} mt-5 items-center gap-4 ${
									!professional && 'bg-gray-200 p-3 rounded-2xl'
								}`}
							>
								<div className="relative">
									<div className="bg-purple-opacity-100 text-white flex justify-center items-center text-3xl p-5 rounded-2xl">
										<IonIcon src={documentOutline} color="white" />
									</div>
									{/* {professional && (
										<div className="absolute bottom-0 right-0">
											<Avatar
												background={item.peaples[0].image}
												width={'20px'}
												height={'20px'}
												style={{ border: '1px solid #ffffff' }}
												className={`absolute bottom-0 right-0`}
											/>
											<Avatar
												background={item.peaples[1].image}
												width={'20px'}
												height={'20px'}
												style={{ border: '1px solid #ffffff' }}
												className={`absolute bottom-0 right-2`}
											/>
											<Avatar
												background={item.peaples[2].image}
												width={'20px'}
												height={'20px'}
												style={{ border: '1px solid #ffffff' }}
												className={`absolute bottom-0 right-4`}
											/>
										</div>
									)} */}
								</div>
								<div className="flex flex-col">
									<IonText className="text-black">
										{item.title}
									</IonText>
									<IonText className="text-gray-900 text-xsm">
										{item.description}
									</IonText>
									{!professional && (
										<div className="flex items-center mt-3">
											<Avatar
												background={imageTemp2}
												width={'20px'}
												height={'20px'}
												style={{ border: '1px solid #ffffff' }}
											/>
											<IonText className="ml-1 capitalize">
												{item.author}
											</IonText>
										</div>
									)}
								</div>
								{professional && (
									<div
										className="text-purple-100 text-2xl"
										onClick={e => {
											e.preventDefault()
											setModalInviteUserOpen(true)
										}}
									>
										<IonIcon
											src={shareSocialOutline}
											color="#AC8FBF"
										/>
									</div>
								)}
							</div>
						</Link>
					))}
				</div>
				{professional && (
					<IonFab vertical="bottom" horizontal="end" slot="fixed">
						<IonFabButton href="/app/form">
							<IonIcon icon={addOutline} color="#fff" />
						</IonFabButton>
					</IonFab>
				)}
				<Modal
					isOpen={modalInviteUserOpen}
					onDidDismiss={() => {
						reset()
						setModalInviteUserOpen(false)
					}}
					height={80}
					title="Enviar para"
					swipeToClose={false}
				>
					<form onSubmit={handleSubmit(handleInvited)}>
						<IonSearchbar className="mb-4" />
						<div>
							<IonText className="font-bold">Ultimos envios</IonText>
							<IonSlides
								options={{
									slidesPerView: 5.2,
									spaceBetween: 5,
									speed: 400,
									autoHeight: true
								}}
							>
								{[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
									<IonSlide key={index}>
										<Avatar
											background={imageTemp2}
											hasBorder={false}
											width="70px"
											height="70px"
										/>
									</IonSlide>
								))}
							</IonSlides>
						</div>
						<div className="mt-7">
							<IonText className="font-bold">Lista de Pacientes</IonText>
							<div className="overflow-scroll h-[32vh]">
								{users.map((item, index) => (
									<div
										key={index}
										className="grid grid-cols-[auto_1fr_auto] gap-4 items-center mt-4"
									>
										<Avatar
											background={item.avatar}
											hasBorder={false}
											width="70px"
											height="70px"
										/>
										<IonText className="font-bold">
											{item.name}
										</IonText>
										<Controller
											control={control}
											name={`envited${index}`}
											render={({ field: { onChange } }) => (
												<IonCheckbox
													value={item.id}
													onIonChange={() => onChange(item.id)}
												/>
											)}
										/>
									</div>
								))}
							</div>
						</div>
						<Button className="bg-purple-100 mt-2 py-4" type="submit">
							<IonText className="text-white text-lg">Enviar</IonText>
						</Button>
					</form>
				</Modal>
			</IonContent>
		</IonPage>
	)
}

export default Quiz
