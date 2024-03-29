import _ from 'lodash'

const formatStatisticsCard = (data, state) => {
	const usIndex = data.findIndex(x => x.id.toLowerCase() === 'us average')
	const stateIndex = data.findIndex(x => x.id.toLowerCase() === state.state)
	const rate = data[stateIndex].rate
	const rank = data[stateIndex].rank
	const factSheetYear = data[stateIndex].factSheetYear
	const factSheetState = data[stateIndex].factSheetState
	const place =
		data[stateIndex].rank > data[usIndex].rank ? 'higher' : 'lower'
	let formattedState = _.startCase(state.state).replace('Of', 'of')
	let ordinal = ''
	switch (rank) {
		case '1':
		case '21':
		case '31':
		case '41':
		case '51':
			ordinal = 'st'
			break
		case '2':
		case '22':
		case '32':
		case '42':
			ordinal = 'nd'
			break
		case '3':
		case '23':
		case '33':
		case '43':
			ordinal = 'rd'
			break
		default:
			ordinal = 'th'
			break
	}
	const card = {
		cardHeading: formattedState,
		cardBodyNode: {
			internal: {
				content: `<p>The age adjusted suicide rate in ${formattedState} is <strong>${rate}</strong> per <strong>100,000 individuals</strong>, which is ${place} than the national average.</p>
								<p><strong>${formattedState} ranks ${rank}${ordinal}</strong> among U.S. states and the District of Columbia.</p>`,
			},
		},
		cardButtonCta: 'View fact sheet',
		cardButtonUrl: `/facts/${factSheetState}`,
	}
	return card
}

export default formatStatisticsCard
