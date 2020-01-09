import React from 'react'

import StatisticsStatesFactsMobileContainer from './StatisticsStatesFactsMobileContainer'
import StatisticsStatesFactsDesktopContainer from './StatisticsStatesFactsDesktopContainer'

const StatisticsStatesFactsContainer = ({ data, selection, cardCSS }) => {
	console.log(selection)
	return (
		<section>
			<StatisticsStatesFactsMobileContainer
				data={data}
				selection={selection}
				cardCSS={cardCSS}
			/>
			<StatisticsStatesFactsDesktopContainer
				data={data}
				selection={selection}
				cardCSS={cardCSS}
			/>
		</section>
	)
}

export default StatisticsStatesFactsContainer
