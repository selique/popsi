const Input = ({ label, name, classContent, ...props }) => {
	return (
		<div className={`w-full flex flex-col ${classContent}`}>
			<label htmlFor={name} className="text-sm text-black-300 font-medium">
				{label}
			</label>
			<input
				id={name}
				className="rounded-xl py-4 px-3 border-none bg-gray-100 text-sm"
				{...props}
			/>
		</div>
	)
}

export default Input
