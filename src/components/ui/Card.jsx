const Card = ({ children, className, ...props }) => (
	<div className={`w-full ${className}`} {...props}>
		<div className="bg-white shadow-md rounded-xl p-4">{children}</div>
	</div>
)

export default Card
