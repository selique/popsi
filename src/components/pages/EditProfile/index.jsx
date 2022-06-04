import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { ErrorMessage } from '@hookform/error-message'
import {
	IonPage,
	IonContent,
	IonText,
	useIonLoading,
	useIonToast,
	IonDatetime,
	IonLabel,
	IonInput,
	// IonRadioGroup,
	// IonRadio,
	// IonToggle,
	// IonRange,
	// IonCheckbox,
	IonItem,
	IonSelect,
	IonSelectOption,
	IonButton,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonList
} from '@ionic/react'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { calendar } from 'ionicons/icons'
import * as Yup from 'yup'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import UploadAvatar from '../../UploadAvatar'

const EditProfile = () => {
	const { user } = useAuth()
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()
	const [profile, setProfile] = useState({
		avatar_url: '',
		full_name: '',
		bio: '',
		nickname: '',
		matrial_status: '',
		gender: '',
		gender_identity: '',
		cpf: '',
		birth_date: ''
	})

	const {
		handleSubmit,
		control,
		setValue,
		register,
		getValues,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			full_name: 'Teste'
		}
		// validationSchema: Yup.object().shape({
		// 	full_name: Yup.string().required('O nome é obrigatório'),
		// 	email: Yup.string()
		// 		.email('Insira um e-mail válido')
		// 		.required('O e-mail é obrigatório'),
		// 	password: Yup.string()
		// 		.min(6, 'A senha deve ter no mínimo 6 caracteres')
		// 		.required('A senha é obrigatória'),
		// 	confirm_password: Yup.string()
		// 		.oneOf([Yup.ref('password'), null], 'As senhas não conferem')
		// 		.required('A confirmação da senha é obrigatória'),
		// 	avatar_url: Yup.string().notRequired(),
		// 	cpf: Yup.string()
		// 		.min(11, 'O CPF deve ter no mínimo 11 caracteres')
		// 		.required('O CPF é obrigatório'),
		// 	nickname: Yup.string()
		// 		.min(3, 'O nickname deve ter no mínimo 3 caracteres')
		// 		.notRequired(),
		// 	birth_date: Yup.string().required('A data de nascimento é obrigatória')
		// })
	})

	const getProfile = async () => {
		await showLoading()
		try {
			let { data, error, status } = await supabase
				.from('profiles')
				.select(
					`
						avatar_url,
						full_name,
						bio,
						nickname,
						matrial_status,
						gender,
						gender_identity,
						cpf,
						birth_date
					`
				)
				.eq(id, user?.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setProfile({
					avatar_url: data.avatar_url,
					full_name: data.full_name,
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
	}, [user])

	const updateProfile = async data => {
		console.log('update ')
		await showLoading()

		try {
			const user = supabase.auth.user()

			const updates = {
				id: user.id,
				avatar_url: data.avatar_url,
				full_name: data.full_name,
				bio: data.bio,
				nickname: data.nickname,
				matrial_status: data.matrial_status,
				gender: data.gender,
				gender_identity: data.gender_identity,
				cpf: data.cpf,
				birth_date: data.birth_date
			}

			let { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal' // Don't return the value after inserting
			})

			if (error) {
				throw error
			}
		} catch (error) {
			showToast({ message: error.message, duration: 5000 })
		} finally {
			await hideLoading()
		}
	}

	return (
		<IonPage>
			<IonContent>
				<div className="relative flex justify-center w-full h-[20vh] bg-gradient-to-r from-[#8abce8] to-[#a676cc] rounded-b-3xl">
					{/* <UploadAvatar
						url={profile.avatar_url}
						onUpload={updateProfile}
						className="absolute top-[65%] border-[15px] border-white-100 border-solid bg-gray-900 w-[100px] h-[100px] rounded-full"
					/> */}
				</div>
				<div className="ion-padding mt-[6vh]">
					<p className="text-blue-900 text-center">
						Alterar foto de perfil
					</p>
					<form onSubmit={handleSubmit(updateProfile)}>
						<IonList>
							<IonItem lines="none">
								{/* === ION INPUT === */}
								<IonLabel position="stacked">E-mail</IonLabel>
								<IonInput
									placeholder="Digite seu e-mail"
									{...register('email', {
										required: 'E-mail é obrigatório',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message: 'E-mail inválido'
										}
									})}
								/>
								<ErrorMessage
									errors={errors}
									name="email"
									as={<div style={{ color: 'red' }} />}
								/>
							</IonItem>

							<IonItem lines="none">
								{/* === ION INPUT === */}
								<IonLabel position="stacked">Nome</IonLabel>
								<IonInput
									placeholder="Nome completo"
									{...register('full_name', {
										required: 'Nome é obrigatório'
									})}
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
									{...register('nickname', {
										required: 'Nome Social é obrigatório'
									})}
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
									{...register('cpf', {
										required: 'CPF é obrigatório'
									})}
								/>
								<ErrorMessage
									errors={errors}
									name="cpf"
									as={<div style={{ color: 'red' }} />}
								/>
							</IonItem>
							<IonItem lines="none">
								{/* === ION SELECT === */}
								<IonLabel position="stacked">Estado Civil</IonLabel>
								<Controller
									render={({ field }) => (
										<IonSelect
											placeholder="Estado Civil"
											value={field.value}
											onIonChange={e =>
												setValue('matrial_status', e.detail.value)
											}
										>
											<IonSelectOption value="married">{`Casado (a)`}</IonSelectOption>
											<IonSelectOption value="single">{`Solteiro (a)`}</IonSelectOption>
											<IonSelectOption value="stable_union">{`União Estavel`}</IonSelectOption>
											<IonSelectOption value="widower">{`Viúvo (a)`}</IonSelectOption>
											<IonSelectOption value="divorced">{`Divorciado (a)`}</IonSelectOption>
										</IonSelect>
									)}
									control={control}
									name="matrial_status"
									rules={{
										required: 'Estado Civil é obrigatório'
									}}
								/>
								<ErrorMessage
									errors={errors}
									name="matrial_status"
									as={<div style={{ color: 'red' }} />}
								/>
							</IonItem>

							<IonItem lines="none">
								{/* === ION DATE TIME === */}
								<IonLabel position="stacked">
									Data de nascimento
								</IonLabel>
								<IonDatetime
									locale="pt-BR"
									displayFormat="DD/MM/YYYY"
									placeholder="Selecione a data de nascimento"
									{...register('birth_date', {
										required: 'Data de nascimento é obrigatória'
									})}
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
									rules={{
										required: 'Identidade de Gênero é obrigatório'
									}}
								/>
								<ErrorMessage
									errors={errors}
									name="gender_identity"
									as={<div style={{ color: 'red' }} />}
								/>
							</IonItem>
							<IonItem lines="none">
								{/* === ION SELECT === */}
								<IonLabel position="stacked">Sexo</IonLabel>
								<Controller
									render={({ field }) => (
										<IonSelect
											placeholder="Selecione o sexo"
											value={field.value}
											onIonChange={e =>
												setValue('gender', e.detail.value)
											}
										>
											<IonSelectOption value="m">{`Masculino`}</IonSelectOption>
											<IonSelectOption value="f">{`Feminino`}</IonSelectOption>
										</IonSelect>
									)}
									control={control}
									name="gender"
									rules={{ required: 'Sexo é obrigatório' }}
								/>
								<ErrorMessage
									errors={errors}
									name="gender"
									as={<div style={{ color: 'red' }} />}
								/>
							</IonItem>
							<IonItem lines="none">
								{/* === ION INPUT === */}
								<IonLabel position="stacked">Senha</IonLabel>
								<IonInput
									type="password"
									placeholder="Senha"
									{...register('password', {
										required: 'Senha é obrigatório'
									})}
								/>
								<ErrorMessage
									errors={errors}
									name="password"
									as={<div style={{ color: 'red' }} />}
								/>
							</IonItem>
							<IonItem lines="none">
								{/* === ION INPUT === */}
								<IonLabel position="stacked">Confirmar senha</IonLabel>
								<IonInput
									type="password"
									placeholder="Confirmar senha"
									{...register('confirm_password', {
										// required: 'Confirmar senha é obrigatório'
									})}
								/>
								<ErrorMessage
									errors={errors}
									name="confirm_password"
									as={<div style={{ color: 'red' }} />}
								/>
							</IonItem>
						</IonList>
						<IonButton
							color="purple"
							expand="full"
							shape="round"
							type="submit"
						>
							<IonText className="text-white">Cadastrar</IonText>
						</IonButton>
					</form>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default EditProfile
