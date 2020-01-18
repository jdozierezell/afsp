import React from 'react'
import { css } from '@emotion/core'

import Card from './Card'

import { styles } from '../../css/css'

const cardContainerCSS = css`
	display: none;
	@media (min-width: ${styles.screens.tablet}px) {
		display: block;
		padding: ${styles.scale.px80} ${styles.scale.px50};
		background-color: ${styles.colors.lightGray};
		position: relative;
		z-index: 500;
		width: 100vw;
		margin-left: -${styles.scale.px50};
	}
`

const cardListCSS = css`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: ${styles.gridGap.desktop};
	margin: 0;
`

const CardContainer = ({ cards, heading }) => {
	return (
		<section css={cardContainerCSS}>
			<h2>{heading}</h2>
			<ul css={cardListCSS}>
				{cards.map((card, index) => {
					return <Card key={index} card={card} />
				})}
			</ul>
		</section>
	)
}

export default CardContainer
