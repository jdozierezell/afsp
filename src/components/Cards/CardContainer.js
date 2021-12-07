import React from 'react'
import Carousel from 'react-multi-carousel'
import { css } from '@emotion/react'

import Card from './Card'

import { styles } from '../../css/css'
import createAnchor from '../../utils/createAnchor'

const cardContainerCSS = css`
	overflow: hidden;
	padding: ${styles.scale.px50} ${styles.scale.px24} 0;
	background-color: ${styles.colors.lightGray};
	width: 100vw;
	margin-left: -${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} ${styles.scale.px35};
		margin-left: -${styles.scale.px50};
	}
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50};
		position: relative;
		z-index: 500;
		margin-left: -${styles.scale.px50};
	}
	.secondary-button + & {
		margin-top: ${styles.scale.px36};
	}
	> h2 {
		font-size: ${styles.scale.px36};
		margin-bottom: ${styles.scale.px45};
		@media (min-width: ${styles.screens.tablet}px) {
			font-size: ${styles.scale.px28};
			margin-bottom: ${styles.scale.px24};
		}
	}
	.react-multi-carousel-list {
		@media (min-width: ${styles.screens.tablet}px) {
			display: none;
		}
	}
	.react-multiple-carousel__arrow--left {
		left: ${styles.scale.px5};
	}
	.react-multiple-carousel__arrow--right {
		right: ${styles.scale.px5};
	}
`

const CardContainer = ({ cards, heading, addCSS, cardCSS }) => {
	const responsive = {
		mobile: {
			breakpoint: { max: 769, min: 0 },
			items: 1,
		},
	}
	const cardListCSS = css`
		display: none;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: ${styles.gridGap.desktop};
		margin: 0;
		@media (min-width: ${styles.screens.tablet}px) {
			display: grid;
		}
	`
	return (
		<section
			css={css`
				${cardContainerCSS};
				${addCSS};
			`}
		>
			{heading && <h2 id={createAnchor(heading)}>{heading}</h2>}
			<Carousel responsive={responsive}>
				{cards.map((card, index) => {
					return <Card key={index} card={card} cardCSS={cardCSS} />
				})}
			</Carousel>
			<ul css={cardListCSS}>
				{cards.map((card, index) => {
					return <Card key={index} card={card} cardCSS={cardCSS} />
				})}
			</ul>
		</section>
	)
}

export default CardContainer
