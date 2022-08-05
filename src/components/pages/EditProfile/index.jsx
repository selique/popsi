import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'

import formatCpf from '@brazilian-utils/format-cpf'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	IonPage,
	IonContent,
	IonText,
	useIonLoading,
	useIonToast,
	IonDatetime,
	IonLabel,
	IonInput,
	IonItem,
	IonSelect,
	IonSelectOption,
	IonButton,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonList,
	IonTextarea,
	IonAvatar
} from '@ionic/react'
import Image from 'next/image'
import styled from 'styled-components'
import * as Yup from 'yup'

import Profile from '../../../assets/Profile.png'
import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'

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

const EditProfile = () => {
	const { user } = useAuth()
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()

	const [profile, setProfile] = useState()
	const [cpfField, setCpfField] = useState()

	useEffect(() => {
		getProfile()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	const schema = Yup.object().shape(
		{
			full_name: Yup.string().required('O nome é obrigatório'),
			email: Yup.string()
				.email('Insira um e-mail válido')
				.required('O e-mail é obrigatório'),
			pronoun: Yup.string().required('O estado civil é obrigatório'),
			gender_identity: Yup.string().required(
				'O campo Indetidade de Gênero é obrigatorio'
			),
			cpf: Yup.string()
				.min(11, 'O CPF deve ter no mínimo 11 caracteres')
				.required('O CPF é obrigatório'),
			nickname: Yup.string()
				.min(3, 'O nickname deve ter no mínimo 3 caracteres')
				.notRequired(),
			birth_date: Yup.string().required('A data de nascimento é obrigatória')
		},
		[
			['password', 'confirm_password'],
			['password', 'password'],
			['confirm_password', 'password'],
			['confirm_password', 'confirm_password']
		]
	)

	const {
		handleSubmit,
		control,
		setValue,
		register,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: yupResolver(schema)
	})

	const getProfile = async () => {
		await showLoading()
		try {
			let { data, error, status } = await supabase
				.from('profiles')
				.select(
					`
				full_name,
				bio,
				nickname,
				pronoun,
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
				setProfile(data)
				setValue('email', user.email)
				setValue('full_name', data.full_name || undefined)
				setValue('bio', data.bio || undefined)
				setValue('nickname', data.nickname || undefined)
				setValue('pronoun', data.pronoun || undefined)
				setValue('gender_identity', data.gender_identity || undefined)
				setValue('cpf', data.cpf || undefined)
				setValue('birth_date', data.birth_date || undefined)
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

	const updateProfile = async data => {
		await showLoading()

		try {
			if (data.email !== user?.email) {
				const { error } = await supabase.auth.update({
					email: data.email
				})

				if (error) {
					showToast({
						header: 'Erro',
						message: error.message,
						position: 'top',
						color: 'purple',
						cssClass: 'text-white',
						duration: 5000,
						animated: true
					})
				} else {
					showToast({
						header: 'Sucesso',
						message:
							'Foi enviado um e-mail de confirmação para o novo endereço.',
						position: 'top',
						color: 'purple',
						cssClass: 'text-white',
						duration: 5000,
						animated: true
					})
				}
			}

			const updates = {
				full_name: data.full_name,
				bio: data.bio,
				nickname: data.nickname,
				pronoun: data.pronoun,
				gender_identity: data.gender_identity,
				cpf: data.cpf,
				birth_date: data.birth_date
			}

			const checkIfSomeFieldUpdate = Object.entries(updates).filter(
				([key, value]) => value !== profile[key]
			)

			if (checkIfSomeFieldUpdate.length > 0) {
				const fieldsToUpdate = Object.fromEntries(checkIfSomeFieldUpdate)

				let { error } = await supabase
					.from('profiles')
					.update(fieldsToUpdate, {
						returning: 'minimal' // Don't return the value after inserting
					})
					.eq('id', user?.id)

				if (error) {
					throw error
				} else {
					showToast({
						header: 'Sucesso',
						message: 'Perfil atualizado com sucesso.',
						position: 'top',
						color: 'purple',
						cssClass: 'text-white',
						duration: 5000,
						animated: true
					})
				}
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

	return (
		<IonPage>
			<IonContent>
				<div
					className={`
					fixed
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
							<Image src={Profile} alt="Foto de perfil" />
						</IonAvatar>
					</ContainerAvatar>
				</div>
				<form
					className="ion-padding mt-[25vh]"
					onSubmit={handleSubmit(updateProfile)}
				>
					<IonList className="z-0">
						<IonItem lines="none">
							{/* === ION INPUT === */}
							<IonLabel position="stacked">E-mail</IonLabel>
							<IonInput
								inputmode="email"
								placeholder="Digite seu e-mail"
								type="email"
								{...register('email')}
							/>
							<ErrorMessage
								errors={errors}
								name="email"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>

						<IonItem lines="none">
							{/* === ION INPUT === */}
							<IonLabel position="stacked">Biografia</IonLabel>
							<IonTextarea
								placeholder="Escreva um pouco sobre você"
								type="text"
								{...register('bio')}
							/>
							<ErrorMessage
								errors={errors}
								name="bio"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>

						<IonItem lines="none">
							{/* === ION INPUT === */}
							<IonLabel position="stacked">Nome</IonLabel>
							<IonInput
								placeholder="Nome completo"
								type="text"
								{...register('full_name')}
							/>
							<ErrorMessage
								errors={errors}
								name="full_name"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>

						<IonItem lines="none">
							{/* === ION INPUT === */}
							<IonLabel position="stacked">Nome Social</IonLabel>
							<IonInput
								placeholder="Nome Social"
								type="text"
								{...register('nickname')}
							/>
							<ErrorMessage
								errors={errors}
								name="nickname"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>

						<IonItem lines="none">
							{/* === ION INPUT === */}
							<IonLabel position="stacked">CPF</IonLabel>
							<IonInput
								placeholder="000.000.000-00"
								inputmode="numeric"
								type="text"
								onIonChange={e => setCpfField(e.detail.value || '')}
								value={formatCpf(cpfField)}
								{...register('cpf')}
							/>
							<ErrorMessage
								errors={errors}
								name="cpf"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>

						<IonItem lines="none">
							{/* === ION DATE TIME === */}
							<IonLabel position="stacked">Data de nascimento</IonLabel>
							<IonDatetime
								locale="pt-BR"
								displayFormat="DD/MM/YYYY"
								placeholder="Selecione a data de nascimento"
								{...register('birth_date')}
							/>
							<ErrorMessage
								errors={errors}
								name="birth_date"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>

						<IonItem lines="none">
							{/* === ION SELECT === */}
							<IonLabel position="stacked">
								Identidade de Gênero
							</IonLabel>
							<Controller
								render={({ field }) => (
									<IonSelect
										placeholder="como você se reconhece"
										value={field.value}
										onIonChange={e =>
											setValue('gender_identity', e.detail.value)
										}
									>
										<IonSelectOption value="cisgenero">{`Cisgênero`}</IonSelectOption>
										<IonSelectOption value="transgenero">{`Transgênero`}</IonSelectOption>
										<IonSelectOption value="nao_binanrio">{`Não-binário`}</IonSelectOption>
									</IonSelect>
								)}
								control={control}
								name="gender_identity"
							/>
							<ErrorMessage
								errors={errors}
								name="gender_identity"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>

						<IonItem lines="none">
							{/* === ION SELECT === */}
							<IonLabel position="stacked">Pronomes</IonLabel>
							<Controller
								render={({ field }) => (
									<IonSelect
										placeholder="Qual pronome você usa?"
										value={field.value}
										onIonChange={e =>
											setValue('pronoun', e.detail.value)
										}
									>
										<IonSelectOption value="ele/dele">{`Ele/Dele`}</IonSelectOption>
										<IonSelectOption value="ela/dela">{`Ela/Dela`}</IonSelectOption>
										<IonSelectOption value="elu/delu">{`Elu/Delu`}</IonSelectOption>
									</IonSelect>
								)}
								control={control}
								name="pronoun"
							/>
							<ErrorMessage
								errors={errors}
								name="pronoun"
								as={<div style={{ color: 'red' }} />}
							/>
						</IonItem>

						<IonItem lines="none">
							{/* === ION LINK TO /forgot-password === */}
							<Link
								to="/forgot-password"
								className="w-full text-center font-semibold text-blue-600"
							>
								Redefinir senha
							</Link>
						</IonItem>
					</IonList>

					<IonButton
						color="purple"
						expand="full"
						shape="round"
						type="submit"
					>
						<IonText className="text-white">Salvar</IonText>
					</IonButton>
				</form>
			</IonContent>
		</IonPage>
	)
}

export default EditProfile
