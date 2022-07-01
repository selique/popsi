export const compareDates = (a, b) => {
	const dateOne = new Date(a)
	const dateTwo = new Date(b)

	const dateA = new Date(
		dateOne.getFullYear(),
		dateOne.getMonth(),
		dateOne.getDay()
	).toDateString()

	const dateB = new Date(
		dateTwo.getFullYear(),
		dateTwo.getMonth(),
		dateTwo.getDay()
	).toDateString()

	return dateA === dateB
}

export const translateMonthsToPortuguese = month => {
	switch (month.toLowerCase()) {
		case 'jan':
			return 'Janeiro'
		case 'feb':
			return 'Fevereiro'
		case 'mar':
			return 'Março'
		case 'apr':
			return 'Abril'
		case 'may':
			return 'Maio'
		case 'jun':
			return 'Junho'
		case 'jul':
			return 'Julho'
		case 'aug':
			return 'Agosto'
		case 'sep':
			return 'Setembro'
		case 'oct':
			return 'Outubro'
		case 'nov':
			return 'Novembro'
		case 'dec':
			return 'Dezembro'
	}
}
