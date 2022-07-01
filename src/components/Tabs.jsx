import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import {
	IonRouterOutlet,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel
	// useIonLoading,
	// useIonToast
} from '@ionic/react'
import {
	home,
	list,
	// personOutline,
	notificationsOutline,
	fileTrayOutline,
	chatboxEllipsesOutline
} from 'ionicons/icons'
import { useRouter } from 'next/router'

import { useAuth } from '../contexts/Auth'
import { useChatNotifications } from './../contexts/chatNotifications'
import AllChats from './pages/AllChats'
import Chat from './pages/Chat'
import EditProfile from './pages/EditProfile'
import FormSurvey from './pages/FormSurvey'
import HomeClient from './pages/HomeClient'
import HomeProfessional from './pages/HomeProfessional'
import Notification from './pages/Notification'
import Patients from './pages/Patients'
import Profile from './pages/Profile'
import Quiz from './pages/Quiz'

const Tabs = () => {
	const { user, professional } = useAuth()

	const { isThereMessages } = useChatNotifications()

	const router = useRouter()
	const history = useHistory()

	const hideTabBarFor = ['/app/chat/']

	React.useEffect(() => {
		// Function to check if the url is in the hideTabBarFor array
		const hideTabBar = pathName => {
			if (!!hideTabBarFor.find(url => pathName.includes(url))) {
				document.querySelector('ion-tab-bar').style.display = 'none'
			} else {
				document.querySelector('ion-tab-bar').style.display = 'flex'
			}
		}

		// Check the first render of the component
		hideTabBar(router.asPath)

		// Listen to the url changes and hide the tab bar if the url is in the hideTabBarFor array
		return history.listen(location => hideTabBar(location.pathname))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [history])

	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route
					path="/app"
					render={() => <Redirect to="/app/home" />}
					exact={true}
				/>
				<Route
					path="/app/home"
					component={professional ? HomeProfessional : HomeClient}
					exact={true}
				/>
				<Route path="/app/patients" component={Patients} exact={true} />
				<Route path="/app/quiz" component={Quiz} exact={true} />
				<Route path="/app/chat/:id" component={Chat} exact={true} />
				<Route path="/app/all-chats" component={AllChats} exact={true} />
				<Route
					path="/app/notification"
					component={Notification}
					exact={true}
				/>
				<Route path="/app/profile" component={Profile} exact={true} />
				<Route path="/app/form" component={FormSurvey} exact={true} />
				<Route path="/app/edit" component={EditProfile} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="tab1" href="/app/home">
					<IonIcon icon={home} />
					<IonLabel>Home</IonLabel>
				</IonTabButton>
				{professional && (
					<IonTabButton tab="tab2" href="/app/patients">
						<IonIcon icon={list} />
						<IonLabel>Pacients</IonLabel>
					</IonTabButton>
				)}
				<IonTabButton tab="tab3" href="/app/quiz">
					<IonIcon icon={fileTrayOutline} />
					<IonLabel>Questionário</IonLabel>
				</IonTabButton>
				<IonTabButton
					tab="tab4"
					href={
						professional
							? '/app/all-chats'
							: `/app/chat/${user.user_metadata.medic_id}`
					}
				>
					<IonIcon
						className={
							isThereMessages
								? 'relative before:content-[attr(before)] before:absolute before:w-[9px] before:h-[9px] before:bg-red-500 before:top-0 before:right-0  before:rounded-full before:z-10'
								: ''
						}
						icon={chatboxEllipsesOutline}
					/>
					<IonLabel>{professional ? 'chats' : 'chat'}</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab5" href="/app/notification">
					<IonIcon icon={notificationsOutline} />
					<IonLabel>Notificações</IonLabel>
				</IonTabButton>
				{/* <IonTabButton tab="tab6" href={'/app/profile'}>
					<IonIcon icon={personOutline} />
					<IonLabel>Perfil</IonLabel>
				</IonTabButton> */}
			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs
