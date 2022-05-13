import { Route } from 'react-router-dom'

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Apresentation from '../components/pages/Apresentation'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Patients from '../components/pages/Patients'
import Profile from '../components/pages/Profile'
import Quiz from '../components/pages/Quiz'
import Scheduling from '../components/pages/Scheduling'
import Signinup from '../components/pages/Signinup'
// import Tabs from './Tabs'

const AppShell = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonSplitPane contentId="main">
					<IonRouterOutlet id="main">
						<Route
							path="/"
							component={() => <Apresentation />}
							exact={true}
						/>
						<Route
							path="/signinup"
							component={() => <Signinup />}
							exact={true}
						/>
						<Route
							path="/login"
							component={() => <Login />}
							exact={true}
						/>
						<Route path="/home" component={() => <Home />} exact={true} />
						<Route
							path="/scheduling"
							component={() => <Scheduling />}
							exact={true}
						/>
						<Route
							path="/patients"
							component={() => <Patients />}
							exact={true}
						/>
						<Route
							path="/profile"
							component={() => <Profile />}
							exact={true}
						/>
						<Route path="/quiz" component={() => <Quiz />} exact={true} />
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	)
}

export default AppShell
