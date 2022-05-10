import { Route } from 'react-router-dom'

import {
	IonRouterOutlet,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel
} from '@ionic/react'
import { cog, flash, list } from 'ionicons/icons'

import Home from '../components/pages/Apresentation'

const Tabs = () => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route path="/tabs/feed" component={Home} exact={true} />
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
