import { Route, Redirect } from 'react-router-dom'

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import { useAuth } from '../contexts/Auth'
import Apresentation from './pages/Apresentation'
import Form from './pages/Form'
import Login from './pages/Login'
import ProfessionalProfile from './pages/ProfessionalProfile'
import Scheduling from './pages/Scheduling'
import Signinup from './pages/Signinup'
import Tabs from './pages/Tabs'
import PrivateRoute from './PrivateRoute'
const AppShell = () => {
	const { user } = useAuth()
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route
						path="/"
						render={() => {
							return user ? (
								<Redirect to="/app/homeclient" />
							) : (
								<Apresentation />
							)
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
						path="/scheduling"
						component={() => <Scheduling />}
						exact={true}
					/>
					<PrivateRoute
						path="/form"
						component={() => <Form />}
						exact={true}
					/>
					<PrivateRoute
						path="/professional"
						component={() => <ProfessionalProfile />}
						exact={true}
					/>
					<Route path="/app" render={() => <Tabs />} />
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
}

export default AppShell
