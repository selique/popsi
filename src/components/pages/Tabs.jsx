import { Redirect, Route } from 'react-router-dom'

import {
	IonRouterOutlet,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { cog, flash, list } from 'ionicons/icons'

import Home from './Home'
import Notification from './Notification'

const Tabs = () => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route path="/tabs/feed" component={Home} exact={true} />
				<Route path="/tabs/lists" component={Notification} exact={true} />
				<Route
					path="/tabs"
					render={() => <Redirect to="/tabs/feed" />}
					exact={true}
				/>
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="tab1" href="/tabs/feed">
					<IonIcon icon={flash} />
					<IonLabel>Feed</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab2" href="/tabs/lists">
					<IonIcon icon={list} />
					<IonLabel>Lists</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab3" href="/tabs/settings">
					<IonIcon icon={cog} />
					<IonLabel>Settings</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs
