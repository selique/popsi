import { Route } from 'react-router-dom'

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Apresentation from '../components/pages/Apresentation'
import Login from '../components/pages/Login'
import Signinup from '../components/pages/Signinup'

const Stacks = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonSplitPane contentId="main">
					<IonRouterOutlet id="main">
						<Route
							path="/"
							render={() => <Apresentation />}
							exact={true}
						/>
						<Route
							path="/signinup"
							render={() => <Signinup />}
							exact={true}
						/>
						<Route path="/login" render={() => <Login />} exact={true} />
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	)
}

export default Stacks
