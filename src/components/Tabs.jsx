import * as React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import {
	IonRouterOutlet,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel,
	useIonRouter
	// useIonLoading,
	// useIonToast
} from '@ionic/react'
import {
	home,
	list,
	notificationsOutline,
	fileTrayOutline,
	chatboxEllipsesOutline,
	peopleOutline
} from 'ionicons/icons'
import { useRouter } from 'next/router'

import { useAuth } from '../contexts/Auth'
import { useChatNotifications } from '../contexts/chatNotifications'
import AllChats from './pages/AllChats'
import Chat from './pages/Chat'
import EditProfile from './pages/EditProfile'
import FormSurvey from './pages/FormSurvey'
import HomeClient from './pages/HomeClient'
import HomeProfessional from './pages/HomeProfessional'
import Notification from './pages/Notification'
import Patients from './pages/Patients'
import PatientHistoric from './pages/Patients/Historic'
import PatientOptions from './pages/Patients/Options'
import PatientQuiz from './pages/Patients/Quiz'
import Profile from './pages/Profile'
import Quiz from './pages/Quiz'

const Tabs = () => {
	const { user, professional } = useAuth()

	const { isThereMessages } = useChatNotifications()

	const router = useRouter()
	const history = useHistory()

	const { pathname } = useLocation()

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

	const tabButtons = [
		{
			path: '/app/home',
			icon: home,
			label: 'Home'
		},
		{
			path: '/app/patients',
			icon: list,
			isProfessionalOnly: true,
			label: 'Patients'
		},
		{
			path: '/app/quiz',
			icon: fileTrayOutline,
			label: 'Questionário'
		},
		{
			component: (
				<IonTabButton
					tab="tab4"
					href={
						professional ? '/app/all-chats' : `/app/chat/${user.medic_id}`
					}
				>
					<IonIcon
						className={`${
							isThereMessages
								? 'relative after:content-[attr(after)] after:absolute after:w-[9px] after:h-[9px] after:bg-red-500 after:top-0 after:right-0  after:rounded-full after:z-10 after:animate-ping before:content-[attr(before)] before:absolute before:w-[6px] before:h-[6px] before:bg-red-500 before:top-0 before:right-0 before:rounded-full before:z-10 '
								: ''
						} ${pathname === '/app/all-chats' ? 'text-glossyGrape' : ''}`}
						icon={chatboxEllipsesOutline}
					/>
					<IonLabel
						className={
							pathname === '/app/all-chats' ? 'text-glossyGrape' : ''
						}
					>
						{professional ? 'chats' : 'chat'}
					</IonLabel>
					{pathname === '/app/all-chats' && (
						<div className="h-[3px] w-full bg-glossyGrape rounded-xl" />
					)}
				</IonTabButton>
			)
		},
		// {
		// 	path: professional
		// 		? '/app/all-chats'
		// 		: `/app/chat/${user.medic_id}`,
		// 	icon: chatboxEllipsesOutline,
		// 	iconStyle: isThereMessages
		// 		? 'relative before:content-[attr(before)] before:absolute before:w-[9px] before:h-[9px] before:bg-red-500 before:top-0 before:right-0  before:rounded-full before:z-10 before:animate-ping'
		// 		: '',
		// 	label: professional ? 'Chats' : 'Chat'
		// },
		{
			path: '/app/notification',
			icon: notificationsOutline,
			label: 'Notifications'
		}
	]

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
				<Route
					path="/app/patients/quiz/:id"
					component={PatientQuiz}
					exact={true}
				/>
				<Route
					path="/app/patients/quiz/options/:id"
					component={PatientOptions}
					exact={true}
				/>
				<Route
					path="/app/patients/quiz/options/historic/:id"
					component={PatientHistoric}
					exact={true}
				/>
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
				{tabButtons.map(
					(
						{
							path,
							icon,
							label,
							isProfessionalOnly = false,
							iconStyle,
							component
						},
						index
					) => {
						if (isProfessionalOnly) {
							if (professional) {
								return component ? (
									React.cloneElement(component, { key: index })
								) : (
									<IonTabButton key={index} tab={label} href={path}>
										<IonIcon
											className={
												iconStyle + pathname === path
													? 'text-glossyGrape'
													: ''
											}
											icon={icon}
										/>
										<IonLabel
											className={
												pathname === path ? 'text-glossyGrape' : ''
											}
										>
											{label}
										</IonLabel>
										{pathname === path && (
											<div className="h-[3px] w-full bg-glossyGrape rounded-xl" />
										)}
									</IonTabButton>
								)
							} else {
								return <React.Fragment key={index}></React.Fragment>
							}
						} else {
							return component ? (
								React.cloneElement(component, { key: index })
							) : (
								<IonTabButton key={index} tab={label} href={path}>
									<IonIcon
										className={
											pathname === path ? 'text-glossyGrape' : ''
										}
										icon={icon}
									/>
									<IonLabel
										className={
											pathname === path ? 'text-glossyGrape' : ''
										}
									>
										{label}
									</IonLabel>
									{pathname === path && (
										<div className="h-[3px] w-full bg-glossyGrape rounded-xl" />
									)}
								</IonTabButton>
							)
						}
					}
				)}
			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs
