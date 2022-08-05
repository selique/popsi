import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
	IonContent,
	IonPage,
	IonSlide,
	IonSlides,
	useIonLoading,
	useIonToast,
	IonButtons,
	IonBackButton,
	IonAvatar,
	useIonRouter
} from '@ionic/react'
import Image from 'next/image'
import styled from 'styled-components'

import ProfileIcon from '../../../assets/Profile.png'
import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Button from '../../ui/Button'

const ContainerAvatar = styled.div`
	::before {
		content: '';
		position: absolute;
		bottom: calc(50% - 5px);
		left: -51px;
		background-color: transparent;
		width: 55px;
		height: 50px;
		border-bottom-right-radius: 50%;
		box-shadow: 10px 1px 0 0 rgb(244 244 244 / 1),
			20px 1px 0 0 rgb(244 244 244 / 1);
		clip-path: polygon(0 40%, 100% 40%, 100% 100%, 0 100%);
	}
	::after {
		content: '';
		position: absolute;
		bottom: calc(50% - 5px);
		right: -51px;
		background-color: transparent;
		width: 55px;
		height: 50px;
		border-bottom-left-radius: 50%;
		box-shadow: -10px 1px 0 0 rgb(244 244 244 / 1),
			-20px 1px 0 0 rgb(244 244 244 / 1);
		clip-path: polygon(0 40%, 100% 40%, 100% 100%, 0 100%);
	}
`

const Profile = () => {
	const router = useIonRouter()

	const { user, loading, signOut } = useAuth()

	const [profile, setProfile] = useState({
		full_name: '',
		avatar_url: '',
		bio: '',
		nickname: '',
		gender_identity: '',
		cpf: '',
		birth_date: ''
	})

	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()

	const slideOpts = {
		slidesPerView: 2.8,
		spaceBetween: 5,
		speed: 400,
		autoHeight: true
	}

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
					gender_identity: data.gender_identity,
					cpf: data.cpf,
					birth_date: data.birth_date
				})
			}
		} catch (error) {
			showToast({
				header: 'Erro',
				message: error.message,
				position: 'top',
				color: 'purple',
				cssClass: 'text-white',
				duration: 5000,
				animated: true
			})
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
				<div
					className={`
					relative
					flex
					z-10
					justify-center
					w-full
					h-[150px]
					bg-gradient-to-r
					from-[#8abce8]
					to-[#a676cc]
					rounded-b-3xl
				`}
				>
					<div
						className={`
						fixed
						top-0
						left-0
					`}
					>
						<IonButtons slot="start">
							<IonBackButton
								defaultHref="/app/home"
								className="text-white"
							/>
						</IonButtons>
					</div>
					<ContainerAvatar
						className={`
								absolute
								top-[80px]
								flex
								items-center
								justify-center
					`}
					>
						{/* <div className="absolute top-[65%] border-[15px] border-white-100 border-solid rounded-full" /> */}
						<IonAvatar className="flex items-center w-[100px] h-max border-[15px] border-white-100 border-solid rounded-full">
							<Image src={ProfileIcon} alt="Foto de perfil" />
						</IonAvatar>
					</ContainerAvatar>
				</div>
				<div className="mt-[6vh] ion-padding">
					<p className="text-center font-bold text-black text-xl capitalize">
						{profile.full_name}
					</p>
					<p className="text-center font-bold text-black text-md capitalize">
						Biografia:
					</p>
					<p className="text-sm text-center">{profile.bio}</p>
					{/* {professional ? (
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
					{professional ? (
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
									Se identifica: {profile.gender_identity}
								</p>
							</div>
						</div>
					)} */}
					<Link to="/app/edit">
						<Button className="bg-blue-200 py-1 mt-8">
							<p className="text-white font-medium text-sm">
								Editar perfil
							</p>
						</Button>
					</Link>
					<Button className="bg-red-500 py-1 mt-3" onClick={signOut}>
						<p className="text-white font-medium text-sm">Sair</p>
					</Button>
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
