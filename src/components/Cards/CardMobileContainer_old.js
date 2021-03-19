import React from 'react'
import Carousel from 'react-multi-carousel'
import { css } from '@emotion/react'

import Card from './Card'

import { styles } from '../../css/css'

import 'react-multi-carousel/lib/styles.css'

const carouselCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24} 0;
	overflow: hidden;
	background-color: ${styles.colors.lightGray};
	width: 100vw;
	margin-left: -${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} ${styles.scale.px35};
		margin-left: -${styles.scale.px50};
	}
	@media (min-width: ${styles.screens.tablet}px) {
		display: none;
	}
	.react-multiple-carousel__arrow--left {
		left: ${styles.scale.px5};
	}
	.react-multiple-carousel__arrow--right {
		right: ${styles.scale.px5};
	}
`

const carouselHeaderTitleCSS = css`
	font-size: ${styles.scale.px36};
	margin-bottom: ${styles.scale.px45};
`

const CardMobileContainer = ({ cards, heading }) => {
	const responsive = {
		mobile: {
			breakpoint: { max: 769, min: 0 },
			items: 1,
		},
	}

	return (
		<div css={carouselCSS}>
			<h2 css={carouselHeaderTitleCSS}>{heading}</h2>
			<Carousel responsive={responsive}>
				{cards.map((card, index) => {
					return <Card key={index} card={card} />
				})}
			</Carousel>
		</div>
	)
}

export default CardMobileContainer
