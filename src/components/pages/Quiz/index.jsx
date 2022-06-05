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
	IonButtons
} from '@ionic/react'
import {
	searchOutline,
	documentOutline,
	shareSocialOutline,
	addOutline
} from 'ionicons/icons'

import Avatar from '../../ui/Avatar'
import Input from '../../ui/Input'

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const imageTemp2 =
	'https://pm1.narvii.com/6583/13022a93a381cddb0c98d4e0a813635bd1215d89_hq.jpg'

const Quiz = () => {
	const professional = false

	const quiz = [
		{
			id: 'ajbdajsbdpijug2398y4',
			title: 'Questionário 1',
			description: professional ? '6 pessoas' : '6 páginas',
			peaples: [
				{
					image: imageTemp
				},
				{
					image: imageTemp
				},
				{
					image: imageTemp2
				}
			]
		},
		{
			id: 'ajosbdjbockvníopr09324',
			title: 'Questionário 2',
			description: professional ? '4 pessoas' : '4 páginas',
			peaples: [
				{
					image: imageTemp
				},
				{
					image: imageTemp2
				},
				{
					image: imageTemp
				}
			]
		}
	]

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/app/homeclient" />
					</IonButtons>
					<IonTitle className="text-lg font-semibold">
						Questionários
					</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<Input
					icon={<IonIcon src={searchOutline} />}
					placeholder="Pesquisar"
					background="bg-white"
					classContent="mb-6"
				/>
				<div>
					<IonText>Recentes</IonText>
					{quiz.map((item, index) => (
						<Link to={`/form/${item.id}`} key={index}>
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
									{professional && (
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
									)}
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
											<IonText className="ml-1">Dr° Adriana</IonText>
										</div>
									)}
								</div>
								{professional && (
									<div className="text-purple-100 text-2xl">
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
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton href="/app/form">
						<IonIcon icon={addOutline} color="#fff" />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	)
}

export default Quiz
