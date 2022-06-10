import React from 'react'
import { Line } from 'react-chartjs-2'

import { Chart as ChartJS, registerables } from 'chart.js'

const ChartCustom = ({ data, options }) => {
	ChartJS.register(...registerables)

	return <Line data={data} options={options} />
}

export default ChartCustom
