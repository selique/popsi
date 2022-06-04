import { useState, useEffect } from 'react'
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
	flash,
	list,
	personOutline,
	notificationsOutline,
	fileTrayOutline
} from 'ionicons/icons'

import { useAuth } from '../contexts/Auth'
import EditProfile from './pages/EditProfile'
import Form from './pages/Form'
import Home from './pages/Home'
import HomeClient from './pages/HomeClient'
import Notification from './pages/Notification'
import Patients from './pages/Patients'
import Profile from './pages/Profile'
import Quiz from './pages/Quiz'

const Tabs = () => {
	const [professional, setProfessional] = useState(false)
	const { user } = useAuth()
	const [showLoading, hideLoading] = useIonLoading()
	const [showToast] = useIonToast()

	const getRole = async () => {
		await showLoading()
		try {
			let { data, error, status } = await supabase
				.from('profiles')
				.select(`role`)
				.eq('id', user?.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setProfessional(data.role === 'MEDIC')
			}
		} catch (error) {
			showToast({ message: error.message, duration: 1000 })
		} finally {
			await hideLoading()
		}
	}
	useEffect(() => {
		getRole()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

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
				<Route path="/app/edit" component={EditProfile} exact={true} />
				{/* Routes do clientes */}
				<Route path="/app/homeclient" component={HomeClient} exact={true} />
				<Route path="/app/profile" component={Profile} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="tab1" href="/app/homeclient">
					<IonIcon icon={flash} />
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
				<IonTabButton tab="tab4" href="/app/notification">
					<IonIcon icon={notificationsOutline} />
					<IonLabel>Notificações</IonLabel>
				</IonTabButton>
				<IonTabButton
					tab="tab5"
					href={professional ? '/app/profileclient' : '/app/profile'}
				>
					<IonIcon icon={personOutline} />
					<IonLabel>Perfil</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs
