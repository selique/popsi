import { Redirect, Route } from 'react-router-dom'

import {
	IonRouterOutlet,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel
} from '@ionic/react'
import {
	flash,
	list,
	personOutline,
	notificationsOutline,
	fileTrayOutline
} from 'ionicons/icons'

import Form from './Form'
import Home from './Home'
import HomeClient from './HomeClient'
import Notification from './Notification'
import Patients from './Patients'
import Profile from './Profile'
import ProfileClient from './ProfileClient'
import Quiz from './Quiz'

const Tabs = () => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route path="/app/home" component={Home} exact={true} />
				<Route path="/app/patients" component={Patients} exact={true} />
				<Route path="/app/quiz" component={Quiz} exact={true} />
				<Route
					path="/app/notification"
					component={Notification}
					exact={true}
				/>
				<Route path="/app/profile" component={Profile} exact={true} />
				<Route path="/app/form" component={Form} exact={true} />
				<Route
					path="/app"
					render={() => <Redirect to="/app/homeclient" />}
					exact={true}
				/>

				{/* Routes do clientes */}
				<Route path="/app/homeclient" component={HomeClient} exact={true} />
				<Route
					path="/app/profileclient"
					component={ProfileClient}
					exact={true}
				/>
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="tab1" href="/app/homeclient">
					<IonIcon icon={flash} />
					<IonLabel>Home</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab2" href="/app/patients">
					<IonIcon icon={list} />
					<IonLabel>Pacients</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab3" href="/app/quiz">
					<IonIcon icon={fileTrayOutline} />
					<IonLabel>Questionário</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab4" href="/app/notification">
					<IonIcon icon={notificationsOutline} />
					<IonLabel>Notificação</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab5" href="/app/profileclient">
					<IonIcon icon={personOutline} />
					<IonLabel>Perfil</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs
