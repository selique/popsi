const Lines = ({ color, ...props }) => (
	<svg
		width="335"
		height="268"
		viewBox="0 0 335 268"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M267 296C222.254 154.718 110 100.717 50.7644 89.7694C-8.47127 78.8213 -16.9318 61.8847 -34 34"
			stroke={color ?? '#DF83F9'}
			strokeOpacity="0.08"
			strokeWidth="2"
		/>
		<path
			d="M333.653 280.491C261.449 136.803 131.906 98.2226 66.5599 96.6647C1.2138 95.1068 -26.9244 81.4451 -50 54.5"
			stroke={color ?? '#DF83F9'}
			strokeOpacity="0.08"
			strokeWidth="2"
		/>
	</svg>
)

export default Lines
