import { Route } from 'react-router-dom'

import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Apresentation from '../components/pages/Apresentation'
import Signinup from '../components/pages/Signinup'

const Stacks = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route path="/" render={() => <Apresentation />} exact={true} />
					<Route
						path="/signinup"
						render={() => <Signinup />}
						exact={true}
					/>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
}

export default Stacks
