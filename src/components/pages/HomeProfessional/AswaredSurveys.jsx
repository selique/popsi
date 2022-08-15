import * as React from 'react'

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
					survey_generate_invite:survey_generate_invite_id (
						surveys:survey_id ( * )
					),
					profiles:patient_id ( * )
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
						updated_at
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
				{!surveys ? (
					<IonText>Nenhum questionário encontrado</IonText>
				) : (
					surveys.map(({ survey, updated_at, user }, index) => (
						<IonList key={index}>
							<IonItem lines={index + 1 === surveys.length && 'none'}>
								<IonAvatar className="flex items-center w-[50px] h-[50px] mr-5">
									<UploadAvatar
										_avatarUrl={user.avatar}
										disabledUpload
										alt="Foto de perfil"
									/>
								</IonAvatar>
								<div className="flex flex-col">
									<IonText className="font-semibold">
										{user.name}
									</IonText>
									<IonText className="text-gray-900">
										{survey.title}
									</IonText>
								</div>
								<IonNote slot="end">
									{dayjs(updated_at).format('HH:mm')}
								</IonNote>
							</IonItem>
						</IonList>
					))
				)}
			</div>
		</Card>
	)
}

export default AnswaredSurveys
