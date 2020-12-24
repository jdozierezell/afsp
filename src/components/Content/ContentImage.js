import React from 'react'
import Carousel from 'react-multi-carousel'
import { css } from '@emotion/core'
import Img from 'gatsby-image'

import { styles } from '../../css/css'

import 'react-multi-carousel/lib/styles.css'

const singleCSS = css`
	margin-bottom: ${styles.scale.px24};
`

const carouselCSS = css`
	@media (min-width: ${styles.screens.tablet}px) {
		.react-multiple-carousel__arrow--left {
			left: ${styles.gridGap.mobile};
		}
		.react-multiple-carousel__arrow--right {
			right: calc(${styles.gridGap.mobile} * 2);
		}
	}
`

const carouselImageCSS = css`
	@media (min-width: ${styles.screens.mobile}px) {
		margin: 0 ${styles.gridGap.mobile} 0 0;
	}
`

const ContentImage = ({ image, imagesToShow }) => {
	const responsive = {
		tablet: {
			breakpoint: { max: 4000, min: 464 },
			items: imagesToShow ? imagesToShow : 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	}
	return (
		<div className="storyContent">
			{image.length === 1 && (
				<Img
					css={singleCSS}
					fluid={image[0].fluid}
					alt={image[0].alt}
				/>
			)}
			{image.length > 1 && (
				<Carousel css={carouselCSS} responsive={responsive}>
					{image.map((image, index) => (
						<Img
							css={carouselImageCSS}
							key={index}
							fluid={image.fluid}
							alt={image.alt}
						/>
					))}
				</Carousel>
			)}
		</div>
	)
}

export default ContentImage
