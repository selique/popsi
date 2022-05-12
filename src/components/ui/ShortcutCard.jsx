import LinesCurve from '../../assets/LinesCurve'

const ShortcutCard = ({ className, background = 'bg-white', children }) => (
	<div
		className={`relative rounded-2xl overflow-hidden w-full h-full shadow-md ${background} ${className}`}
	>
		<LinesCurve className="absolute top-0 left-0 h-full" />
		<div className="w-full h-full p-5 flex flex-col items-start">
			{children}
		</div>
	</div>
)

export default ShortcutCard
