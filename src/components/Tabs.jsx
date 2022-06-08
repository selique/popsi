import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'

import {
	IonRouterOutlet,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel,
	useIonLoading,
	useIonToast
} from '@ionic/react'
import {
	home,
	list,
	personOutline,
	notificationsOutline,
	fileTrayOutline
} from 'ionicons/icons'

import { useAuth } from '../contexts/Auth'
import EditProfile from './pages/EditProfile'
import Form from './pages/Form'
import HomeClient from './pages/HomeClient'
import HomeProfessional from './pages/HomeProfessional'
import Notification from './pages/Notification'
import Patients from './pages/Patients'
import Profile from './pages/Profile'
import Quiz from './pages/Quiz'

const Tabs = () => {
	const { user } = useAuth()

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
					component={user.professional ? HomeProfessional : HomeClient}
					exact={true}
				/>
				<Route path="/app/patients" component={Patients} exact={true} />
				<Route path="/app/quiz" component={Quiz} exact={true} />
				<Route
					path="/app/notification"
					component={Notification}
					exact={true}
				/>
				<Route path="/app/profile" component={Profile} exact={true} />
				<Route path="/app/form" component={Form} exact={true} />
				<Route path="/app/edit" component={EditProfile} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="tab1" href="/app/home">
					<IonIcon icon={home} />
					<IonLabel>Home</IonLabel>
				</IonTabButton>
				{user.professional && (
					<IonTabButton tab="tab2" href="/app/patients">
						<IonIcon icon={list} />
						<IonLabel>Pacients</IonLabel>
					</IonTabButton>
				)}
				<IonTabButton tab="tab3" href="/app/quiz">
					<IonIcon icon={fileTrayOutline} />
					<IonLabel>Questionário</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab4" href="/app/notification">
					<IonIcon icon={notificationsOutline} />
					<IonLabel>Notificações</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab5" href={'/app/profile'}>
					<IonIcon icon={personOutline} />
					<IonLabel>Perfil</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs
