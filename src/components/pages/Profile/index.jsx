import { IonPage, IonContent, IonText, IonIcon } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import Router from 'next/router'

import Avatar from '../../ui/Avatar'

const imageTemp =
	'https://i0.wp.com/www.kailagarcia.com/wp-content/uploads/2019/05/46846414_205184383758304_7255555943408505199_n.jpg?fit=1080%2C1350&ssl=1'

const Profile = () => {
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()
	const [session] = useState(() => supabase.auth.session())
	const router = useIonRouter()
	const [profile, setProfile] = useState({
		full_name: '',
		bio: '',
		avatar_url: '',
		age: '',
		matrial_status: '',
		gender_indentity: ''
	})
	const getProfile = async () => {
		console.log('get')
		await showLoading()
		try {
			const user = supabase.auth.user()
			let { data, error, status } = await supabase
				.from('profiles')
				.select(
					`full_name, bio, avatar_url, age, matrial_status, gender_indentity`
				)
				.eq('id', user.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setProfile({
					full_name: data.full_name,
					bio: data.bio,
					avatar_url: data.avatar_url,
					age: data.age,
					matrial_status: data.matrial_status,
					gender_indentity: data.gender_indentity
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
			<IonContent className="ion-padding" fullscreen>
				<div className="relative">
					<div
						className="absolute top-4 left-4 text-white text-2xl"
						onClick={() => Router.back()}
					>
						<IonIcon src={arrowBack} color="#fff" />
					</div>
					<div className="bg-gradient-to-r from-[#87C6EB] to-[#883DB9B2] w-full h-[20vh] rounded-b-[40px]"></div>
					<div className="absolute top-[70%] left-[39%]">
						<Avatar
							width={'100px'}
							height={'100px'}
							url={profile.avatar_url}
							onUpload={updateProfile}
							style={{ outline: '20px solid #fafafa', border: 0 }}
						/>
					</div>
				</div>
				<div className="mt-[7vh] ion-padding">
					<div className="flex flex-col items-center">
						<IonText className="w-full font-bold text-black text-lg text-center">
							{profile.full_name}
						</IonText>
						<IonText className="text-gray-900 mt-4 text-sm text-center">
							{profile.bio}
						</IonText>
					</div>
					<div>
						<ul className="pl-4 text-gray-900">
							<li className="text-gray-900 text-sm">
								Idade: {profile.age} anos
							</li>
							<li className="text-gray-900 text-sm">
								Estado Civil: {profile.matrial_status}
							</li>
							<li className="text-gray-900 text-sm">
								Se identifica: {profile.gender_indentity}
							</li>
						</ul>
					</div>
					<div>
						<IonText className="font-bold text-black text-lg">
							Relatório
						</IonText>
					</div>
					<div>
						<IonText className="font-bold text-black text-lg">
							Conquistas
						</IonText>
					</div>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Profile
