import { Route } from 'react-router-dom'

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Apresentation from './pages/Apresentation'
import Home from './pages/Home'
import Login from './pages/Login'
import Signinup from './pages/Signinup'
import Tabs from './pages/Tabs'

const AppShell = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonSplitPane contentId="main">
					<IonRouterOutlet id="main">
						<Route path="/" component={() => <Apresentation />} exact />
						<Route
							path="/signinup"
							component={() => <Signinup />}
							exact
						/>
						<Route path="/login" component={() => <Login />} exact />
						<Route path="/app" render={() => <Tabs />} />
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	)
}

export default AppShell
