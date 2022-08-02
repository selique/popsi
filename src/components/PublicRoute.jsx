import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'

const PublicRoute = ({ component: Component, ...rest }) => {
	const { userSession } = useAuth()

	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route
			{...rest}
			render={props =>
				userSession ? <Redirect to="/app/home" /> : <Component {...props} />
			}
		/>
	)
}

export default PublicRoute
