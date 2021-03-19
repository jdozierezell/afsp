import React from 'react'
import { css } from '@emotion/react'

import Card from '../Cards/Card'

import formatStatisticsCard from '../../utils/formatStatisticsCard'

import { styles } from '../../css/css'

const cardContainerCSS = css`
	display: none;
	@media (min-width: ${styles.screens.video}px) {
		display: block;
		padding: ${styles.scale.px60} 0 ${styles.scale.px80};
		background-color: ${styles.colors.lightGray};
		position: relative;
		z-index: 500;
	}
`

const cardListCSS = css`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: ${styles.gridGap.desktop};
	margin: 0;
`

const StatisticsStatesFactsDesktopContainer = ({
	data,
	selection,
	cardCSS,
}) => {
	return (
		<section css={cardContainerCSS}>
			<ul css={cardListCSS}>
				{selection.map((state, index) => {
					const card = formatStatisticsCard(data, state)
					return <Card key={index} card={card} cardCSS={cardCSS} />
				})}
			</ul>
		</section>
	)
}

export default StatisticsStatesFactsDesktopContainer
