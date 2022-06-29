import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

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
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonList
} from '@ionic/react'
import { format, parseISO } from 'date-fns'
import * as Yup from 'yup'

import { useAuth } from '../../../contexts/Auth'
const SignUp = () => {
	const { signUp } = useAuth()
	const [cpfField, setCpfField] = React.useState()
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()

	const location = useLocation()
	const [medicIdQuery, setMedicIdQuery] = React.useState('')

	React.useEffect(() => {
		const params = new URLSearchParams(location.search)
		setMedicIdQuery(params.get('medic') || null)
	}, [])

	const schema = Yup.object().shape({
		full_name: Yup.string().required('O nome é obrigatório'),
		email: Yup.string()
			.email('Insira um e-mail válido')
			.required('O e-mail é obrigatório'),
		password: Yup.string()
			.min(6, 'A senha deve ter no mínimo 6 caracteres')
			.required('A senha é obrigatória'),
		confirm_password: Yup.string()
			.oneOf([Yup.ref('password'), null], 'As senhas não conferem')
			.required('A confirmação da senha é obrigatória'),
		avatar_url: Yup.string().notRequired(),
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

	const registerUser = async data => {
		await showLoading()

		try {
			// console.log(
			// 	'creating a new user account with: ',
			// 	{
			// 		email: data.email,
			// 		password: data.password
			// 	},
			// 	{
			// 		data: {
			// 			full_name: data.full_name,
			// 			avatar_url: '',
			// 			nickname: data.nickname,
			// 			cpf: data.cpf,
			// 			matrial_status: data.matrial_status,
			// 			birth_date: format(parseISO(data.birth_date), 'yyyy-MM-dd'),
			// 			gender: data.gender,
			// 			gender_identity: data.gender_identity,
			// 			medic_id: medicIdQuery
			// 		}
			// 	}
			// )

			await signUp(
				{
					email: data.email,
					password: data.password
				},
				{
					data: {
						full_name: data.full_name,
						avatar_url: '',
						nickname: data.nickname,
						cpf: data.cpf,
						gender_identity: data.gender_identity,
						birth_date: format(parseISO(data.birth_date), 'yyyy-MM-dd'),
						pronoun: data.pronoun,
						medic_id: medicIdQuery
					},
					redirectTo: 'http://localhost:3000/login'
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
						<IonBackButton defaultHref="/you-are" />
					</IonButtons>
					<IonTitle className="font-bold">Cadastro</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent className="ion-padding">
				<form onSubmit={handleSubmit(registerUser)}>
					<IonList>
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
								Como você se identifica
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
							<IonLabel position="stacked">Pronome</IonLabel>
							<Controller
								render={({ field }) => (
									<IonSelect
										placeholder="Ele/ela/dele/dela"
										value={field.value}
										onIonChange={e =>
											setValue('pronoun', e.detail.value)
										}
									>
										<IonSelectOption value="ele">{`Ele`}</IonSelectOption>
										<IonSelectOption value="ela">{`Ela`}</IonSelectOption>
										<IonSelectOption value="dele">{`Dele`}</IonSelectOption>
										<IonSelectOption value="dela">{`Dela`}</IonSelectOption>
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
						<IonItem lines="none">
							<IonButton
								color="purple"
								expand="full"
								shape="round"
								type="submit"
							>
								<IonText className="text-white">
									Finalizar Cadastro
								</IonText>
							</IonButton>
						</IonItem>
					</IonList>
				</form>
			</IonContent>
		</IonPage>
	)
}

export default SignUp
null
