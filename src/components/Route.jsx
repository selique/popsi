import { Route as RouteDom, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'

const Public = ({
	component: Component,
	hibrid = false,
	redirectTo,
	...rest
}) => {
	const { userSession } = useAuth()

	return redirectTo ? (
		<RouteDom
			{...rest}
			render={() =>
				userSession ? (
					<Redirect to="/app/home" />
				) : (
					<Redirect to={redirectTo} />
				)
			}
		/>
	) : (
		<RouteDom
			{...rest}
			render={props =>
				userSession ? <Redirect to="/app/home" /> : <Component {...props} />
			}
		/>
	)
}

const Private = ({ component: Component, redirectTo, ...rest }) => {
	const { userSession } = useAuth()

	return redirectTo ? (
		userSession ? (
			<Component {...props} />
		) : (
			<RouteDom {...rest} render={() => <Redirect to={redirectTo} />} />
		)
	) : (
		<RouteDom
			{...rest}
			render={props =>
				userSession ? <Component {...props} /> : <Redirect to="/signinup" />
			}
		/>
	)
}

const Hibrid = ({ component: Component, redirectTo, ...rest }) => {
	return redirectTo ? (
		<RouteDom {...rest} render={() => <Redirect to={redirectTo} />} />
	) : (
		<RouteDom {...rest} render={props => <Component {...props} />} />
	)
}

const Route = {
	Public,
	Private,
	Hibrid
}

export default Route
