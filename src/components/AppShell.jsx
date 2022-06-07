import { Route, Redirect } from 'react-router-dom'

import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import { useAuth } from '../contexts/Auth'
import Apresentation from './pages/Apresentation'
import Breathing from './pages/Breathing'
import Form from './pages/Form'
import FormAnswers from './pages/FormAnswers'
import Login from './pages/Login'
import ProfessionalProfile from './pages/ProfessionalProfile'
import Scheduling from './pages/Scheduling'
import Signinup from './pages/Signinup'
import SignUp from './pages/SignUp'
import PrivateRoute from './PrivateRoute'
import Tabs from './Tabs'

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
					<Route
						path="/sign-up"
						component={() => <SignUp />}
						exact={true}
					/>
					<Route path="/login" component={() => <Login />} exact={true} />
					<PrivateRoute
						path="/scheduling"
						component={() => <Scheduling />}
						exact={true}
					/>
					<PrivateRoute
						path="/form/:id"
						component={() => <Form />}
						exact={true}
					/>
					<PrivateRoute
						path="/form/answers/:id"
						component={() => <FormAnswers />}
						exact={true}
					/>
					<PrivateRoute
						path="/professional"
						component={() => <ProfessionalProfile />}
						exact={true}
					/>
					<PrivateRoute path="/app" render={() => <Tabs />} />
					<PrivateRoute path="/breathing" render={() => <Breathing />} />
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
}

export default AppShell
