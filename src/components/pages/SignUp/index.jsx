import * as React from 'react'
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
import { format, parseISO, formatISO } from 'date-fns'
import { calendar } from 'ionicons/icons'
import * as Yup from 'yup'

import { useAuth } from '../../../contexts/Auth'
import { supabase } from '../../../utils/supabaseClient'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
const SignUp = () => {
	const { signUp } = useAuth()

	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()

	const {
		handleSubmit,
		control,
		setValue,
		register,
		getValues,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
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

	const registerUser = async data => {
		await showLoading()

		try {
			console.log(
				'creating a new user account with: ',
				{
					email: data.email,
					password: data.password
				},
				{
					data: {
						full_name: data.full_name,
						avatar_url: data.avatar_url,
						nickname: data.nickname,
						cpf: data.cpf,
						matrial_status: data.matrial_status,
						birth_date: format(parseISO(data.birth_date), 'yyyy-MM-dd'),
						gender: data.gender,
						gender_identity: data.gender_indentity
					}
				}
			)

			await signUp(
				{
					email: data.email,
					password: data.password
				},
				{
					data: {
						full_name: data.full_name,
						avatar_url: 'teste',
						nickname: data.nickname,
						cpf: data.cpf,
						matrial_status: data.matrial_status,
						birth_date: format(parseISO(data.birth_date), 'yyyy-MM-dd'),
						gender: data.gender,
						gender_identity: data.gender_indentity
					}
				}
			)

			await showToast({
				message: 'Check your email for confirm register!',
				duration: 1000
			})
		} catch (e) {
			await showToast({
				message: e.error_description || e.message,
				duration: 1000
			})
		} finally {
			await hideLoading()
		}
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/" />
					</IonButtons>
					<IonTitle>Cadastro</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<form onSubmit={handleSubmit(registerUser)}>
					<IonList>
						<IonItem lines="none">
							{/* === ION INPUT === */}
							<IonLabel position="stacked">E-mail</IonLabel>
							<IonInput
								placeholder="Digite seu e-mail"
								type="email"
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
								type="text"
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
								type="text"
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
								type="text"
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
							<IonLabel position="stacked">Data de nascimento</IonLabel>
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
											setValue('gender_indentity', e.detail.value)
										}
									>
										<IonSelectOption value="cisgenero">{`Cisgênero`}</IonSelectOption>
										<IonSelectOption value="transgenero">{`Transgênero`}</IonSelectOption>
										<IonSelectOption value="nao_binanrio">{`Não-binário`}</IonSelectOption>
									</IonSelect>
								)}
								control={control}
								name="gender_indentity"
								rules={{
									required: 'Identidade de Gênero é obrigatório'
								}}
							/>
							<ErrorMessage
								errors={errors}
								name="gender_indentity"
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
						{/* === ION RADIO === */}
						{/* <IonText>
						<IonLabel position="stacked">Sexo</IonLabel>
						<IonRadioGroup
							className="radio-group"
							{...register('radioGrp', { required: true })}
							defaultValue={getValues('radioGrp')}
							onIonChange={e => setValue('radioGrp', e.detail.value)}
						>
							<IonItem lines="none">
								<IonLabel position="fixed">Feminino</IonLabel>
								<IonRadio slot="end" value="M" />
							</IonItem>

							<IonItem lines="none">
								<IonLabel position="fixed">Masculino</IonLabel>
								<IonRadio slot="end" value="F" />
							</IonItem>
						</IonRadioGroup>
					</IonText>
					{errors.radioGrp && (
						<span className="error-msg">This field is required</span>
					)} */}
					</IonList>
					<IonButton
						color="purple"
						expand="full"
						shape="round"
						type="submit"
					>
						<IonText className="text-white">Cadastrar</IonText>
					</IonButton>
					{/* <Input
						name="full_name"
						label="Nome"
						placeholder="Nome completo"
						type="text"
						register={register}
						error={errors.full_name}
					/>
					<Input
						name="nickname"
						label="Nome Social"
						placeholder="Como você gostaria de ser chamado"
						type="text"
						register={register}
						error={errors.nickname}
					/>
					<Input
						name="email"
						label="E-mail"
						placeholder="exemplo@email.com"
						type="email"
						register={register}
						error={errors.email}
					/>
					<Input
						name="cpf"
						label="CPF"
						placeholder="000.000.000-00"
						type="string"
						register={register}
						error={errors.cpf}
					/>
					<Input
						name="birth_date"
						label="Data de Nascimento"
						placeholder="00/00/0000"
						// pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
						type="datetime"
						register={register}
						error={errors.birth_date}
					/>
					<Input
						name="password"
						label="Senha"
						placeholder=""
						type="password"
						register={register}
						error={errors.password}
					/>
					<Input
						name="confirm_password"
						label="Confirmar Senha"
						placeholder=""
						type="password"
						register={register}
						error={errors.confirm_password}
					/>
					<Button className="bg-purple-100" type="submit">
						<IonText className="text-white">Cadastrar</IonText>
					</Button> */}
				</form>
			</IonContent>
		</IonPage>
	)
}

export default SignUp
