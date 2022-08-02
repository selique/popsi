export const showTabBar = () => {
	const tabBar = document.getElementById('app-tab-bar')
	if (tabBar !== null) {
		tabBar.style.display = 'flex'
	}
}

export const hideTabBar = () => {
	const tabBar = document.getElementById('app-tab-bar')
	if (tabBar !== null) {
		tabBar.style.display = 'none'
	}
}
