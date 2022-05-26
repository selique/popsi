const Input = ({
	label,
	name,
	classContent,
	background,
	className,
	icon,
	...props
}) => {
	return (
		<div className={`w-full flex flex-col ${classContent}`}>
			<label
				htmlFor={name}
				className="text-sm text-black-300 font-medium mb-1"
			>
				{label}
			</label>
			<div className="relative w-full">
				<div className="absolute top-4 left-4">{icon}</div>
				<input
					id={name}
					className={`rounded-xl flex-1 py-4 w-full px-3 border-none ${
						background ?? 'bg-gray-100'
					}  text-sm outline-none ${icon && 'pl-12'} ${className}`}
					{...props}
				/>
			</div>
		</div>
	)
}

export default Input
