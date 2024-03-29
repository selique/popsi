const Input = ({
	label,
	name,
	classContent,
	background,
	className,
	icon,
	error,
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
					className={`rounded-xl w-full py-4 px-3 border-none ${
						background ?? 'bg-gray-100'
					}  text-sm outline-none ${icon && 'pl-12'} ${className}`}
					{...props}
				/>
				{error && <span>{error.message}</span>}
			</div>
		</div>
	)
}

export default Input
