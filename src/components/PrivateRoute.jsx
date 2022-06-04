import { Route, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'

const PrivateRoute = ({ ...props }) => {
	const { user } = useAuth()
	return user ? <Route {...props} /> : <Redirect to="/signinup" />
}

export default PrivateRoute
