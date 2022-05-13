import { IonPage, IonContent, IonText, IonIcon } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import Router from 'next/router'

import Avatar from '../../ui/Avatar'

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const Profile = () => {
	return (
		<IonPage>
			<IonContent>
				<div className="relative">
					<div
						className="absolute top-4 left-4 text-white text-2xl"
						onClick={() => Router.back()}
					>
						<IonIcon src={arrowBack} color="#fff" />
					</div>
					<div className="bg-gradient-to-r from-[#87C6EB] to-[#883DB9B2] w-full h-[20vh] rounded-b-[40px]"></div>
					<div className="absolute top-[70%] left-[39%]">
						<Avatar
							width={'100px'}
							height={'100px'}
							background={imageTemp}
							style={{ outline: '20px solid #fafafa', border: 0 }}
						/>
					</div>
				</div>
				<div className="mt-[7vh] ion-padding">
					<div className="flex flex-col items-center">
						<IonText className="w-full font-bold text-black text-lg text-center">
							Cintia S. Amaro
						</IonText>
						<IonText className="text-gray-900 mt-4 text-sm text-center">
							But I must explain to you how all this mistaken idea of
							denouncing pleasure and praising pain was born this
							mistaken idea of denouncing pleasure
						</IonText>
					</div>
					<div>
						<ul className="pl-4 text-gray-900">
							<li className="text-gray-900 text-sm">Idade: 36 anos</li>
							<li className="text-gray-900 text-sm">
								Estado Civil: Solteira
							</li>
							<li className="text-gray-900 text-sm">
								Se identifica: Heterosexual
							</li>
						</ul>
					</div>
					<div>
						<IonText className="font-bold text-black text-lg">
							Relatório
						</IonText>
					</div>
					<div>
						<IonText className="font-bold text-black text-lg">
							Conquistas
						</IonText>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Profile
