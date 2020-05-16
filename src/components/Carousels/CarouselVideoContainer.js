import React from 'react'
import { css } from '@emotion/core'
import Carousel from 'react-multi-carousel'
import Script from 'react-load-script'

import CarouselVideo from './CarouselVideo'

import { styles } from '../../css/css'

import 'react-multi-carousel/lib/styles.css'

const carouselCSS = css`
	background-color: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} ${styles.scale.px24} ${styles.scale.px25};
	overflow: hidden;
	position: relative;
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px30} ${styles.scale.px35};
	}
	p {
		margin: 0 ${styles.scale.px24} ${styles.scale.px30} 0;
		@media (min-width: ${styles.screens.mobile}px) {
			margin: 0 ${styles.scale.px50} ${styles.scale.px30} 0;
		}
	}
	.react-multiple-carousel__arrow {
		top: 33%;
	}
`

const CarouselVideoContainer = ({ videos }) => {
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
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	}
	return (
		<section css={carouselCSS}>
			<p>Watch real stories of hope</p>
			<Carousel responsive={responsive}>
				{videos.map((video, index) => {
					return (
						<CarouselVideo
							key={index}
							title={video.title}
							vimeoId={video.vimeoId}
						/>
					)
				})}
			</Carousel>
			<Script url="https://player.vimeo.com/api/player.js" />
		</section>
	)
}

export default CarouselVideoContainer
