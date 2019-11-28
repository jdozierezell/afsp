import React from 'react'

import StatisticsStatesFactsMobileContainer from './StatisticsStatesFactsMobileContainer'
import StatisticsStatesFactsDesktopContainer from './StatisticsStatesFactsDesktopContainer'
import { useWindowDimensions } from '../../components/WindowDimensionsProvider'

import { styles } from '../../css/css'

const StatisticsStatesFactsContainer = ({ data, selection, cardCSS }) => {
	const { width } = useWindowDimensions()
	return (
		<section>
			{width <= styles.screens.tablet && (
				<StatisticsStatesFactsMobileContainer
					data={data}
					selection={selection}
					cardCSS={cardCSS}
				/>
			)}
			{width > styles.screens.tablet && (
				<StatisticsStatesFactsDesktopContainer
					data={data}
					selection={selection}
					cardCSS={cardCSS}
				/>
			)}
		</section>
	)
}

export default StatisticsStatesFactsContainer
