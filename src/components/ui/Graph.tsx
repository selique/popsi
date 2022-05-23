import { Line as LineGraph } from 'react-chartjs-2'

import { ChartData, ScatterDataPoint } from 'chart.js'

interface IChart {
	data: ChartData<'line', (number | ScatterDataPoint | null)[], unknown>
}

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

const Graph = ({ data }: IChart) => (
	<LineGraph
		data={data}
		options={{
			maintainAspectRatio: true,
			scales: {
				y: {
					stacked: true,
					beginAtZero: true
				}
			}
		}}
	/>
)

export default Graph
