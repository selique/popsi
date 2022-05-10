import dynamic from 'next/dynamic'

const App = dynamic(() => import('../routes'), {
	ssr: false
})

export default function Index() {
	return <App />
}
