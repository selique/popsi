import LinesCurve from '../../assets/LinesCurve'

const ShortcutCard = ({ className, background = 'bg-white', children }) => (
	<div
		className={`relative rounded-2xl p-5 overflow-hidden w-full h-max shadow-md ${background} ${className}`}
	>
		<LinesCurve className="absolute top-0 left-0 h-full" />
		<div className="w-full h-full flex flex-col items-start">{children}</div>
	</div>
)

export default ShortcutCard
