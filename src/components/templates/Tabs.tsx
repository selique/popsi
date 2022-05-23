import * as React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import IconCardPersonOutline from '../../assets/icons/CardPersonOutline'
import IconCardPersonSolid from '../../assets/icons/CardPersonSolid'
import IconHomeOutline from '../../assets/icons/HomeOutline'
import IconHomeSolid from '../../assets/icons/HomeSolid'
import IconQuestionOutline from '../../assets/icons/NoteOutline'
import IconQuestionSolid from '../../assets/icons/NoteSolid'
import IconPersonOutline from '../../assets/icons/PersonOutline'
import IconPersonSolid from '../../assets/icons/PersonSolid'
import IconSignalOutline from '../../assets/icons/SignalOutline'
import IconSignalSolid from '../../assets/icons/SignalSolid'

const Tabs: React.FC = ({ children, ...props }) => {
	const router = useRouter()
	const origin = location.origin

	const tabsData = [
		{
			href: '/home',
			outline: <IconHomeOutline />,
			solid: <IconHomeSolid color="#AC8FBF" />
		},
		{
			href: '/patients',
			outline: <IconCardPersonOutline />,
			solid: <IconCardPersonSolid color="#AC8FBF" />
		},
		{
			href: '/quiz',
			outline: <IconQuestionOutline />,
			solid: <IconQuestionSolid color="#AC8FBF" />
		},
		{
			href: '/notification',
			outline: <IconSignalOutline />,
			solid: <IconSignalSolid color="#AC8FBF" />
		},
		{
			href: '/profile',
			outline: <IconPersonOutline />,
			solid: <IconPersonSolid color="#AC8FBF" />
		}
	]

	return (
		<div className="w-full relative mb-[10vh] h-full" {...props}>
			{children}
			<div className="fixed grid grid-cols-5 bottom-0 left-0 w-full bg-white py-8 h-[10vh] px-6 justify-items-center z-[9999]">
				{tabsData.map((tab, index) => (
					<Link href={tab.href} key={index} passHref>
						<div className="relative w-max flex flex-col justify-center items-center">
							{router.pathname === tab.href ? (
								<>
									{tab.solid}
									<div className="absolute top-[100%] left-0 w-full h-[4px] bg-purple-100" />
								</>
							) : (
								tab.outline
							)}
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default Tabs
