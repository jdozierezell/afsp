import React from 'react'
import { css } from '@emotion/core'
import _ from 'lodash'

import Card from '../Cards/Card'

import { styles } from '../../css/css'

const cardContainerCSS = css`
	display: none;
	@media (min-width: ${styles.screens.tablet}px) {
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
					const usIndex = data.findIndex(
						x => x.id.toLowerCase() === 'us average'
					)
					const stateIndex = data.findIndex(
						x => x.id.toLowerCase() === state.state
					)
					const formattedState = _.startCase(state.state)
					const rate = data[stateIndex].rate
					const rank = data[stateIndex].rank
					const place =
						data[stateIndex].rank > data[usIndex].rank
							? 'higher'
							: 'lower'
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
						cardButtonCta: 'View state fact sheet',
						cardButtonUrl: 'https://example.com',
					}
					return <Card key={index} card={card} cardCSS={cardCSS} />
				})}
			</ul>
		</section>
	)
}

export default StatisticsStatesFactsDesktopContainer
