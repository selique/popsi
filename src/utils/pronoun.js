export default function handlePronoun(pronoun) {
	switch (pronoun) {
		case 'ele/dele':
			return 'm'
		case 'ela/dela':
			return 'f'
		case 'elu/delu':
			return 'n'
		default:
			return 'n'
	}
}
