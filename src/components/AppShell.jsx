import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Apresentation from './pages/Apresentation'
import Breathing from './pages/Breathing'
import ForgotPassword from './pages/ForgotPassword'
import FormAnswers from './pages/FormAnswers'
import FormSurvey from './pages/FormSurvey'
import LastApresentation from './pages/LastApresentation'
import Login from './pages/Login'
import RedefinePassword from './pages/RedefinePassword'
import Scheduling from './pages/Scheduling'
import Signinup from './pages/Signinup'
import SignUp from './pages/SignUp'
import YouAre from './pages/YouAre'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Tabs from './Tabs'

const AppShell = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<PublicRoute path="/" component={Apresentation} exact={true} />
					<PublicRoute
						path="/last-apresentation"
						component={LastApresentation}
						exact={true}
					/>
					<PublicRoute
						path="/signinup"
						component={Signinup}
						exact={true}
					/>
					<PublicRoute path="/sign-up" component={SignUp} exact={true} />
					<PublicRoute path="/login" component={Login} exact={true} />
					<PublicRoute
						path="/forgot-password"
						component={ForgotPassword}
						exact={true}
					/>
					<PublicRoute
						path="/redefine-password"
						component={RedefinePassword}
						exact={true}
					/>
					<PublicRoute path="/you-are" component={YouAre} exact={true} />
					<PublicRoute
						path="/scheduling"
						component={Scheduling}
						exact={true}
					/>
					<PublicRoute
						path="/form/:id"
						component={FormSurvey}
						exact={true}
					/>
					<PublicRoute
						path="/form/answers/:id"
						component={FormAnswers}
						exact={true}
					/>
					<PrivateRoute path="/breathing" component={Breathing} />
					<PrivateRoute path="/app" component={Tabs} />
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
}

export default AppShell
