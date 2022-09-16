import * as React from 'react'
import { useFieldArray } from 'react-hook-form'

import { IonIcon, IonText, IonButton, IonInput, IonSelect } from '@ionic/react'
import { trashOutline } from 'ionicons/icons'
import _ from 'lodash'

const MultipleChoiceFieldArray = ({ nestIndex, control, register, mode }) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `questions[${nestIndex}].${mode.toLowerCase()}`
	})

	React.useEffect(() => {
		if (fields.length === 0) {
			append('')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fields])

	return (
		<div>
			{fields.map((item, index) => {
				return (
					<div
						key={item.id}
						className="grid grid-cols-[1fr_auto] items-center"
					>
						<IonInput
							placeholder={`Alternativa ${index + 1}`}
							className="mb-2 h-max"
							{...register(
								`questions[${nestIndex}].${mode.toLowerCase()}[${index}]`
							)}
						/>
						{fields.length > 1 && (
							<IonButton
								onClick={() => remove(index)}
								size="small"
								color="danger"
								slot="end"
								className="p-0"
							>
								<IonIcon icon={trashOutline} />
							</IonButton>
						)}
					</div>
				)
			})}
			<IonButton color="blue" onClick={() => append('')}>
				<IonText className="text-white font-medium">
					Adicionar escolha
				</IonText>
			</IonButton>
		</div>
	)
}

export default MultipleChoiceFieldArray
