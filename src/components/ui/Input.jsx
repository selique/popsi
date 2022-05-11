const Input = ({ label, name, classContent, ...props }) => {
	return (
		<div className={`w-full flex flex-col ${classContent}`}>
			<label
				htmlFor={name}
				className="text-sm text-black-300 font-medium mb-1"
			>
				{label}
			</label>
			<input
				id={name}
				className="rounded-xl py-4 px-3 border-none bg-gray-100 text-sm outline-none"
				{...props}
			/>
		</div>
	)
}

export default Input
