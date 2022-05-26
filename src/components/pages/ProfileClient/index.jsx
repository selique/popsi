import { Link } from 'react-router-dom'

import { IonContent, IonPage, IonSlide, IonSlides } from '@ionic/react'

import Button from '../../ui/Button'

const ProfileClient = () => {
	const slideOpts = {
		slidesPerView: 2.8,
		spaceBetween: 5,
		speed: 400,
		autoHeight: true
	}

	return (
		<IonPage>
			<IonContent>
				<div className="relative flex justify-center w-full h-[20vh] bg-gradient-to-r from-[#8abce8] to-[#a676cc] rounded-b-3xl">
					<div className="absolute top-[65%] border-[15px] border-white-100 border-solid bg-gray-900 w-[100px] h-[100px] rounded-full" />
				</div>
				<div className="mt-[6vh] ion-padding">
					<p className="text-center font-bold text-black text-xl">
						Geovane
					</p>
					<p className="text-sm text-center">
						But I must explain to you how all this mistaken idea of
						denouncing pleasure and praising pain was born this mistaken
						idea of denouncing pleasure
					</p>
					<div>
						<div className="flex items-center">
							<div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
							<p className="text-sm ml-2 leading-[1px]">
								Idade: 24 anos
							</p>
						</div>
						<div className="flex items-center">
							<div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
							<p className="text-sm ml-2 leading-[1px]">
								Estado Civil: Solteira
							</p>
						</div>
						<div className="flex items-center">
							<div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
							<p className="text-sm ml-2 leading-[1px]">
								Se identifica: Heterosexual
							</p>
						</div>
					</div>
					<Link to="/app/edit">
						<Button className="bg-blue-200 py-1 mt-8">
							<p className="text-white font-medium text-sm">
								Editar perfil
							</p>
						</Button>
					</Link>
					<div>
						<p className="font-bold text-black text-lg">Conquistas</p>
						<IonSlides options={slideOpts} className="w-full">
							<IonSlide>
								<div className="w-full flex flex-col justify-center items-center px-4 bg-white rounded-2xl shadow">
									<p className="text-xsm">lv 01</p>
									<div className="bg-gray-900 w-[70px] h-[70px] rounded-full" />
									<p className="text-sm">Eletrizante!</p>
								</div>
							</IonSlide>
							<IonSlide>
								<div className="w-full flex flex-col justify-center items-center px-4 bg-white rounded-2xl shadow">
									<p className="text-xsm">lv 01</p>
									<div className="bg-gray-900 w-[70px] h-[70px] rounded-full" />
									<p className="text-sm">Eletrizante!</p>
								</div>
							</IonSlide>
							<IonSlide>
								<div className="w-full flex flex-col justify-center items-center px-4 bg-white rounded-2xl shadow">
									<p className="text-xsm">lv 01</p>
									<div className="bg-gray-900 w-[70px] h-[70px] rounded-full" />
									<p className="text-sm">Eletrizante!</p>
								</div>
							</IonSlide>
						</IonSlides>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default ProfileClient
