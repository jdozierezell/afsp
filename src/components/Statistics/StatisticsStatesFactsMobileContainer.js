import React from 'react'
import Carousel from 'react-multi-carousel'
import { css } from '@emotion/react'

import Card from '../Cards/Card'

import formatStatisticsCard from '../../utils/formatStatisticsCard'

import { styles } from '../../css/css'

import 'react-multi-carousel/lib/styles.css'

const carouselCSS = css`
	padding: ${styles.scale.px50} 0 0;
	overflow: hidden;
	background-color: ${styles.colors.lightGray};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} ${styles.scale.px35};
	}
	@media (min-width: ${styles.screens.video}px) {
		display: none;
	}
	.react-multiple-carousel__arrow--left {
		left: 0;
	}
	.react-multiple-carousel__arrow--right {
		right: ${styles.gridGap.mobile};
	}
`

const carouselHeaderTitleCSS = css`
	font-size: ${styles.scale.px36};
	margin-bottom: ${styles.scale.px45};
`

const StatisticsStatesFactsMobileContainer = ({
	title,
	data,
	selection,
	cardCSS,
}) => {
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		largeDesktop: {
			breakpoint: { max: 4000, min: 1200 },
			items: 4,
		},
		desktop: {
			breakpoint: { max: 1200, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 768 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 768, min: 0 },
			items: 1,
		},
	}
	return (
		<div css={carouselCSS}>
			{title && <h2 css={carouselHeaderTitleCSS}>{title}</h2>}
			<Carousel responsive={responsive}>
				{selection.map((state, index) => {
					const card = formatStatisticsCard(data, state)
					return <Card key={index} card={card} cardCSS={cardCSS} />
				})}
			</Carousel>
		</div>
	)
}

export default StatisticsStatesFactsMobileContainer
