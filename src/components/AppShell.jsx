import { Route } from 'react-router-dom'

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Stacks from './pages/Stacks'
import Tabs from './pages/Tabs'

const AppShell = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonSplitPane contentId="main">
					<IonRouterOutlet id="main">
						<Route exact path="/" component={() => <Stacks />} />
						<Route exact path="/tabs" component={() => <Tabs />} />
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	)
}

export default AppShell
