import { Route } from 'react-router-dom'

import {
	IonRouterOutlet,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel
} from '@ionic/react'
import { globeOutline, flagOutline, personOutline } from 'ionicons/icons'

import Home from '../components/pages/Home'

const Tabs = () => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route path="/home" component={() => <Home />} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="tab1" href="/home">
					<IonIcon icon={globeOutline} />
					<IonLabel>Home</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab2" href="/">
					<IonIcon icon={flagOutline} />
					<IonLabel>Planos</IonLabel>
				</IonTabButton>
				<IonTabButton tab="tab3" href="/">
					<IonIcon icon={personOutline} />
					<IonLabel>Perfil</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs
