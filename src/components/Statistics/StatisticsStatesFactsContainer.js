import React from 'react'

import StatisticsStatesFactsMobileContainer from './StatisticsStatesFactsMobileContainer'
import StatisticsStatesFactsDesktopContainer from './StatisticsStatesFactsDesktopContainer'

import { styles } from '../../css/css'

const StatisticsStatesFactsContainer = ({ data, selection, cardCSS }) => {
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
