import { Route } from 'react-router-dom'

import { IonRouterOutlet } from '@ionic/react'

import Apresentation from './Apresentation'
import Home from './Feed'
import ListDetail from './ListDetail'
import Lists from './Lists'
import Settings from './Settings'

const Stacks = () => {
	return (
		<IonRouterOutlet>
			<Route path="/tabs/feed" component={Home} exact={true} />
			<Route path="/tabs/lists" component={Lists} exact={true} />
			<Route
				path="/tabs/lists/:listId"
				component={ListDetail}
				exact={true}
			/>
			<Route path="/tabs/settings" component={Settings} exact={true} />
			<Route path="/" render={() => <Apresentation />} exact={true} />
		</IonRouterOutlet>
	)
}

export default Stacks
