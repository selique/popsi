import {
	IonContent,
	IonIcon,
	IonPage,
	IonText,
	IonFab,
	IonFabButton
} from '@ionic/react'
import {
	searchOutline,
	documentOutline,
	shareSocialOutline,
	addOutline
} from 'ionicons/icons'

import Avatar from '../../components/ui/Avatar'
import Input from '../../components/ui/Input'

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const imageTemp2 =
	'https://pm1.narvii.com/6583/13022a93a381cddb0c98d4e0a813635bd1215d89_hq.jpg'

const quiz = [
	{
		title: 'Questionário 1',
		description: '6 pessoas',
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
		title: 'Questionário 2',
		description: '4 pessoas',
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

const Quiz = () => {
	return (
		<IonPage>
			<IonContent className="ion-padding">
				<div className="flex justify-center">
					<IonText className="text-black font-semibold">
						Questionários
					</IonText>
				</div>
				<Input
					icon={<IonIcon src={searchOutline} />}
					placeholder="Pesquisar"
					background="bg-white"
					classContent="my-6"
				/>
				<div>
					<IonText>Recentes</IonText>
					{quiz.map((item, index) => (
						<div
							className="grid grid-cols-[auto_1fr_auto] mt-5 items-center gap-4"
							key={index}
						>
							<div className="relative">
								<div className="bg-purple-opacity-100 text-white flex justify-center items-center text-3xl p-5 rounded-2xl">
									<IonIcon src={documentOutline} color="white" />
								</div>
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
							</div>
							<div className="flex flex-col">
								<IonText className="text-black">{item.title}</IonText>
								<IonText className="text-gray-900 text-xsm mt-1">
									{item.description}
								</IonText>
							</div>
							<div className="text-purple-100 text-2xl">
								<IonIcon src={shareSocialOutline} color="#AC8FBF" />
							</div>
						</div>
					))}
				</div>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton href="/form">
						<IonIcon icon={addOutline} color="#fff" />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	)
}

export default Quiz
