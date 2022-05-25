const Button = ({ children, className, ...props }) => (
	<button
		className={`flex border-0 justify-center outline-none items-center py-5 rounded-2xl w-full ${className}`}
		{...props}
	>
		{children}
	</button>
)

export default Button
