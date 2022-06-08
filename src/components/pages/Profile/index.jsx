import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
	IonContent,
	IonPage,
	IonSlide,
	IonSlides,
	useIonLoading,
	useIonToast,
	IonText
} from '@ionic/react'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Button from '../../ui/Button'

const Profile = () => {
	const slideOpts = {
		slidesPerView: 2.8,
		spaceBetween: 5,
		speed: 400,
		autoHeight: true
	}

	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()
	const { user, loading } = useAuth()
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
		await showLoading()
		try {
			let { data, error, status } = await supabase
				.from('profiles')
				.select(
					`
				full_name,
				avatar_url,
				bio,
				nickname,
				matrial_status,
				gender,
				gender_identity,
				cpf,
				birth_date
			`
				)
				.eq('id', user?.id)
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
		if (user) getProfile()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	return (
		<IonPage>
			<IonContent>
				<div className="relative flex justify-center w-full h-[20vh] bg-gradient-to-r from-[#8abce8] to-[#a676cc] rounded-b-3xl">
					<div className="absolute top-[65%] border-[15px] border-white-100 border-solid bg-gray-900 w-[100px] h-[100px] rounded-full" />
				</div>
				<div className="mt-[6vh] ion-padding">
					<p className="text-center font-bold text-black text-xl capitalize">
						{profile.full_name}
					</p>
					{user.professeional ? (
						<p className="text-center text-gray-900 text-lg capitalize">
							Especialidades
						</p>
					) : (
						<p className="text-center text-gray-900 text-sm capitalize">
							But I must explain to you how all this mistaken idea of
							denouncing pleasure and praising pain was born this
							mistaken idea of denouncing pleasure
						</p>
					)}
					<p className="text-sm text-center">{profile.bio}</p>
					{user.professional ? (
						<div className="grid grid-cols-3 gap-3 justify-items-center text-center items-center text-sm">
							<IonText>Depressão</IonText>
							<IonText>Auto conhecimento</IonText>
							<IonText>Ansiedade</IonText>
						</div>
					) : (
						<div>
							<div className="flex items-center">
								<div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
								<p className="text-sm ml-2 leading-[1px]">
									Idade:{' '}
									{new Date().getFullYear() -
										profile.birth_date.split('-')[0]}{' '}
									anos
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
									Sexo:{' '}
									{profile.gender === 'm' ? 'Masculino' : 'Feminino'}
								</p>
							</div>
							<div className="flex items-center">
								<div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
								<p className="text-sm ml-2 leading-[1px]">
									Se identifica: {profile.gender_identity}
								</p>
							</div>
						</div>
					)}
					<Link to="/app/edit">
						<Button className="bg-blue-200 py-1 mt-8">
							<p className="text-white font-medium text-sm">
								Editar perfil
							</p>
						</Button>
					</Link>
					{!user.professional && (
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
					)}
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Profile
