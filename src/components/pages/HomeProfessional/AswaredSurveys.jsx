import * as React from 'react'
import { Link } from 'react-router-dom'

import {
	IonAvatar,
	IonImg,
	IonItem,
	IonList,
	IonNote,
	IonText,
	useIonToast
} from '@ionic/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { supabase } from '../../../utils/supabaseClient'
import Card from '../../ui/Card'
import UploadAvatar from '../../UploadAvatar'
import { useAuth } from './../../../contexts/Auth'

import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

const AnswaredSurveys = () => {
	const { userSession } = useAuth()

	const [showToast] = useIonToast()

	const [surveys, setSurveys] = React.useState([])

	React.useEffect(() => {
		const getAnsweredSurveys = async () => {
			const { data, error } = await supabase
				.from('_survey_invited')
				.select(
					`
					id,
					status,
					updated_at,
					survey_generate_invite!inner(
						id,
						surveys!inner(*)
					),
					profiles:patient_id(*)
				`
				)
				.eq('survey_generate_invite.surveys.owner_id', userSession.id)
				.neq('status', 'PENDING')
				.neq('status', 'LATE')
				.neq('status', 'EXPIRED')

			if (data) {
				const _surveys = data.map(
					({ profiles, survey_generate_invite, updated_at }) => ({
						user: {
							name: profiles.full_name,
							avatar: profiles.avatar_url
						},
						survey: survey_generate_invite.surveys,
						updated_at,
						survey_generate_invite_id: survey_generate_invite.id
					})
				)
				setSurveys(_surveys)
			}

			if (error) {
				showToast({
					header: 'Erro',
					message: error.message,
					position: 'top',
					color: 'danger',
					cssClass: 'text-white',
					duration: 5000,
					animated: true
				})
			}
		}
		getAnsweredSurveys()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Card>
			<IonText className="font-semibold text-gray-900 text-xl leading-5">
				Questionários respondidos recentemente
			</IonText>
			<div className="my-4">
				{surveys.length === 0 ? (
					<IonText>Nenhum questionário encontrado</IonText>
				) : (
					surveys.map(
						(
							{
								id,
								survey,
								updated_at,
								survey_generate_invite_id,
								user
							},
							index
						) => (
							<IonList key={index}>
								<Link
									to={`/form/view/${survey.id}?inviteId=${survey_generate_invite_id}`}
									className="flex items-center h-full w-full justify-between"
								>
									<IonItem
										lines={index + 1 === surveys.length && 'none'}
									>
										<IonAvatar className="flex items-center w-[50px] h-[50px] mr-5">
											<UploadAvatar
												_avatarUrl={user?.avatar}
												disabledUpload
												alt="Foto de perfil"
											/>
										</IonAvatar>
										<div className="flex flex-col">
											<IonText className="font-semibold">
												{user?.name}
											</IonText>
											<IonText className="text-gray-900">
												{survey?.title}
											</IonText>
										</div>
										<IonNote slot="end">
											{dayjs(updated_at).format('HH:mm')}
										</IonNote>
									</IonItem>
								</Link>
							</IonList>
						)
					)
				)}
			</div>
		</Card>
	)
}

export default AnswaredSurveys
