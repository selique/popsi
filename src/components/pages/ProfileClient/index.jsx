import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
	IonContent,
	IonPage,
	IonSlide,
	IonSlides,
	useIonLoading,
	useIonRouter,
	useIonToast
} from '@ionic/react'

import { supabase } from '../../../utils/supabaseClient'
import Button from '../../ui/Button'
const ProfileClient = () => {
	const slideOpts = {
		slidesPerView: 2.8,
		spaceBetween: 5,
		speed: 400,
		autoHeight: true
	}

	const [showLoading, hideLoading] = useIonLoading()
	const router = useIonRouter()
	const [showToast] = useIonToast()
	const [session] = useState(() => supabase.auth.session())
	const [profile, setProfile] = useState({
		full_name: '',
		avatar_url: '',
		bio: '',
		nickname: '',
		matrial_status: '',
		gender: '',
		gender_identity: '',
		cpf: '',
		birth_date: ''
	})
	const getProfile = async () => {
		console.log('get')

		await showLoading()
		try {
			const user = supabase.auth.user()
			let { data, error, status } = await supabase
				.from('profiles')
				.select(
					`full_name,avatar_url,bio,nickname,matrial_status,gender,gender_identity,cpf,birth_date
					`
				)
				.eq('id', user.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setProfile({
					full_name: data.full_name,
					avatar_url: data.avatar_url,
					bio: data.bio,
					nickname: data.nickname,
					matrial_status: data.matrial_status,
					gender: data.gender,
					gender_identity: data.gender_identity,
					cpf: data.cpf,
					birth_date: data.birth_date
				})
			}
		} catch (error) {
			showToast({ message: error.message, duration: 5000 })
		} finally {
			await hideLoading()
		}
	}

	useEffect(() => {
		getProfile()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [session])

	return (
		<IonPage>
			<IonContent>
				<div className="relative flex justify-center w-full h-[20vh] bg-gradient-to-r from-[#8abce8] to-[#a676cc] rounded-b-3xl">
					<div className="absolute top-[65%] border-[15px] border-white-100 border-solid bg-gray-900 w-[100px] h-[100px] rounded-full" />
				</div>
				<div className="mt-[6vh] ion-padding">
					<p className="text-center font-bold text-black text-xl">
						{profile.full_name}
					</p>
					<p className="text-center font-bold text-black text-lg">
						{profile.nickname}
					</p>
					<p className="text-sm text-center">{profile.bio}</p>
					<div>
						<div className="flex items-center">
							<div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
							<p className="text-sm ml-2 leading-[1px]">
								Idade: {profile.birth_date} anos
							</p>
						</div>
						<div className="flex items-center">
							<div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
							<p className="text-sm ml-2 leading-[1px]">
								Estado Civil: {profile.matrial_status}
							</p>
						</div>
						<div className="flex items-center">
							<div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
							<p className="text-sm ml-2 leading-[1px]">
								Sexo: {profile.gender}
							</p>
						</div>
						<div className="flex items-center">
							<div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
							<p className="text-sm ml-2 leading-[1px]">
								Se identifica: {profile.gender_identity}
							</p>
						</div>
						<div className="flex items-center">
							<div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
							<p className="text-sm ml-2 leading-[1px]">
								CPF: {profile.cpf}
							</p>
						</div>
						<div className="flex items-center">
							<div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
							<p className="text-sm ml-2 leading-[1px]">
								role: {profile.role}
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
