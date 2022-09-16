import { Redirect } from 'react-router-dom'

import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Apresentation from './pages/Apresentation'
import Breathing from './pages/Breathing'
import ForgotPassword from './pages/ForgotPassword'
import FormAnswers from './pages/FormAnswers'
import FormSurvey from './pages/FormSurvey'
import FormSurveyView from './pages/FormSurveyView'
import LastApresentation from './pages/LastApresentation'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Scheduling from './pages/Scheduling'
import Signinup from './pages/Signinup'
import SignUp from './pages/SignUp'
import YouAre from './pages/YouAre'
import Route from './Route'
import Tabs from './Tabs'

const AppShell = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					{/* <Route.Public path="/" component={Apresentation} exact={true} /> */}
					<Route.Public path="/" redirectTo="/signinup" exact={true} />
					<Route.Public
						path="/last-apresentation"
						component={LastApresentation}
						exact={true}
					/>
					<Route.Public
						path="/signinup"
						component={Signinup}
						exact={true}
					/>
					<Route.Public path="/sign-up" component={SignUp} exact={true} />
					<Route.Public path="/login" component={Login} exact={true} />
					<Route.Hibrid
						path="/forgot-password"
						component={ForgotPassword}
						exact={true}
					/>
					<Route.Hibrid
						path="/reset-password"
						component={ResetPassword}
						exact={true}
					/>
					<Route.Public path="/you-are" component={YouAre} exact={true} />
					<Route.Private
						path="/scheduling"
						component={Scheduling}
						exact={true}
					/>
					<Route.Private
						path="/form/:id"
						component={FormSurvey}
						exact={true}
					/>
					<Route.Private
						path="/form/answers/:id"
						component={FormAnswers}
						exact={true}
					/>
					<Route.Private
						path="/form/view/:idForm"
						component={FormSurveyView}
						exact={true}
					/>
					<Route.Private path="/breathing" component={Breathing} />
					<Route.Private path="/app" component={Tabs} />
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
}

export default AppShell
