import { Route } from 'react-router-dom'

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Apresentation from '../components/pages/Apresentation'
import Login from '../components/pages/Login'
import Signinup from '../components/pages/Signinup'
import Tabs from './Tabs'

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
						<Route path="/home" component={() => <Tabs />} exact={true} />
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	)
}

export default AppShell
