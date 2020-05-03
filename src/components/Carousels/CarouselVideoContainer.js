import React from 'react'
import { css } from '@emotion/core'
import Carousel from 'react-multi-carousel'

import CarouselVideo from './CarouselVideo'

import { styles } from '../../css/css'

import 'react-multi-carousel/lib/styles.css'

const carouselCSS = css`
	background-color: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} 0 ${styles.scale.px25};
	overflow: hidden;
	position: relative;
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} 0 ${styles.scale.px35};
	}
	p {
		margin: 0 ${styles.scale.px24} ${styles.scale.px30};
		@media (min-width: ${styles.screens.mobile}px) {
			margin: 0 ${styles.scale.px50} ${styles.scale.px30};
		}
	}
`

const CarouselVideoContainer = ({ videos }) => {
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
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
							title={video.video.title}
							video={
								video.video.video
									? video.video.video.mp4Url
									: video.video.url
							}
							poster={video.poster.url}
						/>
					)
				})}
			</Carousel>
		</section>
	)
}

export default CarouselVideoContainer
