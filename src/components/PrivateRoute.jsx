import { Route, Redirect } from 'react-router-dom'

import { useIonLoading } from '@ionic/react'

import { useAuth } from '../contexts/Auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { userSession, loading } = useAuth()

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={props =>
				userSession ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	)
}

export default PrivateRoute
