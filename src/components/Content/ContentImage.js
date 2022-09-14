import React from 'react'
import Carousel from 'react-multi-carousel'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'

import 'react-multi-carousel/lib/styles.css'

const singleCSS = css`
	margin-top: ${styles.scale.px24};
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
				<GatsbyImage
					css={singleCSS}
					image={image[0].gatsbyImageData}
					alt={image[0].alt}
				/>
			)}
			{image.length > 1 && (
				<Carousel css={carouselCSS} responsive={responsive}>
					{image.map((image, index) => (
						<GatsbyImage
							css={carouselImageCSS}
							key={index}
							image={image.gatsbyImageData}
							alt={image.alt}
						/>
					))}
				</Carousel>
			)}
		</div>
	)
}

export default ContentImage
