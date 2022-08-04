import { Route as RouteDom, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'

const Public = ({ component: Component, hibrid = false, ...rest }) => {
	const { userSession } = useAuth()

	return (
		<RouteDom
			{...rest}
			render={props =>
				userSession ? <Redirect to="/app/home" /> : <Component {...props} />
			}
		/>
	)
}

const Private = ({ component: Component, ...rest }) => {
	const { userSession } = useAuth()

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signinup page
		<RouteDom
			{...rest}
			render={props =>
				userSession ? <Component {...props} /> : <Redirect to="/signinup" />
			}
		/>
	)
}

const Hibrid = ({ component: Component, ...rest }) => (
	<RouteDom {...rest} render={props => <Component {...props} />} />
)

const Route = {
	Public,
	Private,
	Hibrid
}

export default Route
