import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Menu from '../components/Menu'
import Apresentation from '../components/pages/Apresentation'
import Form from '../components/pages/Form'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Notification from '../components/pages/Notification'
import Patients from '../components/pages/Patients'
import ProfessionalProfile from '../components/pages/ProfessionalProfile'
import Profile from '../components/pages/Profile'
import Quiz from '../components/pages/Quiz'
import Scheduling from '../components/pages/Scheduling'
import Signinup from '../components/pages/Signinup'
// import Tabs from './Tabs'
import { useAuth } from '../contexts/Auth'
import PrivateRoute from './PrivateRoute'
const AppShell = () => {
	const { user } = useAuth
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route
						path="/"
						render={() => {
							return user ? <Redirect to="/home" /> : <Apresentation />
						}}
						exact={true}
					/>
					<Route
						path="/signinup"
						component={() => <Signinup />}
						exact={true}
					/>
					<Route path="/login" component={() => <Login />} exact={true} />
					<PrivateRoute
						path="/home"
						component={() => <Home />}
						exact={true}
					/>
					<PrivateRoute
						path="/scheduling"
						component={() => <Scheduling />}
						exact={true}
					/>
					<PrivateRoute
						path="/patients"
						component={() => <Patients />}
						exact={true}
					/>
					<PrivateRoute
						path="/profile"
						component={() => <Profile />}
						exact={true}
					/>
					<PrivateRoute
						path="/quiz"
						component={() => <Quiz />}
						exact={true}
					/>
					<PrivateRoute
						path="/form"
						component={() => <Form />}
						exact={true}
					/>
					<PrivateRoute
						path="/notification"
						component={() => <Notification />}
						exact={true}
					/>
					<PrivateRoute
						path="/professional"
						component={() => <ProfessionalProfile />}
						exact={true}
					/>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
}

export default AppShell
