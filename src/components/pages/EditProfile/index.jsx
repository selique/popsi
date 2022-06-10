import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'

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
import styled from 'styled-components'
import * as Yup from 'yup'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import UploadAvatar from '../../UploadAvatar'

const EditProfile = () => {
	const { user } = useAuth()
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()
	const [cpfField, setCpfField] = useState()
	useEffect(() => {
		getProfile()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	const schema = Yup.object().shape({
		full_name: Yup.string().required('O nome é obrigatório'),
		email: Yup.string()
			.email('Insira um e-mail válido')
			.required('O e-mail é obrigatório'),
		password: Yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
		confirm_password: Yup.string().oneOf(
			[Yup.ref('password'), null],
			'As senhas não conferem'
		),
		matrial_status: Yup.string().required('O estado civil é obrigatório'),
		gender: Yup.string().required('O campo Sexo é obrigatorio'),
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
	})

	const {
		handleSubmit,
		control,
		setValue,
		register,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
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
				setValue('email', user.email)
				setValue('full_name', data.full_name)
				setValue('bio', data.bio)
				setValue('nickname', data.nickname)
				setValue('matrial_status', data.matrial_status)
				setValue('gender', data.gender)
				setValue('gender_identity', data.gender_identity)
				setValue('cpf', data.cpf)
				setValue('birth_date', data.birth_date)
			}
		} catch (error) {
			showToast({ message: error.message, duration: 5000 })
		} finally {
			await hideLoading()
		}
	}

	const updateProfile = async data => {
		await showLoading()

		try {
			const updates = {
				id: user.id,
				full_name: data.full_name,
				bio: data.bio,
				nickname: data.nickname,
				matrial_status: data.matrial_status,
				gender: data.gender,
				gender_identity: data.gender_identity,
				cpf: data.cpf,
				birth_date: data.birth_date
			}
			console.log('updates', updates)

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
			<IonHeader className="ion-no-border header-profile">
				<div className="relative flex justify-center w-screen h-[20vh] bg-gradient-to-r from-[#8abce8] to-[#a676cc] rounded-b-3xl" />
				<UploadAvatar disabledUpload />
			</IonHeader>
			<IonContent className="ion-padding mt-[6vh]">
				<form onSubmit={handleSubmit(updateProfile)}>
					<IonList>
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
							/>
							<ErrorMessage
								errors={errors}
								name="matrial_status"
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
								{...register('password')}
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
								{...register('confirm_password')}
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
						<IonText className="text-white">Salvar</IonText>
					</IonButton>
				</form>
			</IonContent>
		</IonPage>
	)
}

export default EditProfile
