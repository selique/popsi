import { IonContent, IonPage, IonBackButton, IonText } from '@ionic/react'

import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const schedules = [
	{
		busy: true,
		active: true,
		time: '10:00'
	},
	{
		busy: true,
		active: true,
		time: '10:30'
	},
	{
		busy: false,
		active: true,
		time: '11:00'
	},
	{
		busy: true,
		active: false,
		time: '11:30'
	},
	{
		busy: true,
		active: true,
		time: '12:00'
	},
	{
		busy: true,
		active: false,
		time: '13:00'
	},
	{
		busy: true,
		active: true,
		time: '13:30'
	},
	{
		busy: false,
		active: true,
		time: '14:00'
	},
	{
		busy: false,
		active: true,
		time: '14:30'
	}
]

const Scheduling = () => {
	return (
		<IonPage>
			<IonContent className="ion-padding">
				<div className="flex items-center h-[calc(15vh-16px)]">
					<IonBackButton defaultHref="/home" />
					<IonText>Agendamento</IonText>
				</div>
				<div className="h-[calc(85vh-16px)] flex flex-col justify-between">
					<div>
						<Input
							label="Data"
							placeholder="ex: Quarta-feira, 12 de março 2022"
						/>
						<Input label="Descrição" classContent="mt-6" />
					</div>
					<div className="my-auto">
						<IonText className="text-black font-semibold">
							Horarios disponiveis
						</IonText>
						<div className="grid grid-cols-3 gap-3 mt-4">
							{schedules.map((item, index) => (
								<div
									key={index}
									className={`flex justify-center items-center ${
										item.active
											? item.busy
												? 'bg-purple-100'
												: 'bg-white'
											: 'bg-gray-100'
									} rounded-2xl shadow-md py-5`}
								>
									<IonText
										className={`text-black font-semibold ${
											item.active
												? item.busy
													? 'text-white'
													: 'text-black'
												: 'text-gray-900'
										}`}
									>
										{item.time}
									</IonText>
								</div>
							))}
						</div>
					</div>
					<Button className="bg-gray-900">
						<IonText className="text-white font-semibold">
							Agendar
						</IonText>
					</Button>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Scheduling
