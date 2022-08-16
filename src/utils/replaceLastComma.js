const replaceLastComma = string => {
	if (!string.includes(',')) {
		return string
	}
	const lastComma = string.lastIndexOf(',')
	return (
		string.substring(0, lastComma) + ' e' + string.substring(lastComma + 1)
	)
}

export default replaceLastComma
