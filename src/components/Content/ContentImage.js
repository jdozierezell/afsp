import React from 'react'
import Carousel from 'react-multi-carousel'
import { css } from '@emotion/core'
import { Image } from 'react-datocms'

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

const ContentImage = ({ image, index }) => {
	const responsive = {
		tablet: {
			breakpoint: { max: 4000, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	}
	return (
		<div className="storyContent">
			{image.length === 1 && image[0].responsiveImage && (
				<Image css={singleCSS} data={image[0].responsiveImage} />
			)}
			{image.length === 1 && !image[0].responsiveImage && (
				<img css={singleCSS} src={image[0].url} />
			)}
			{image.length > 1 && (
				<Carousel css={carouselCSS} responsive={responsive}>
					{image.map((image, index) => (
						<>
							{image.responsiveImage && (
								<Image
									css={carouselImageCSS}
									key={index}
									data={image.responsiveImage}
								/>
							)}
							{!image.responsiveImage && (
								<img
									css={carouselImageCSS}
									key={index}
									src={image.url}
								/>
							)}
						</>
					))}
				</Carousel>
			)}
		</div>
	)
}

export default ContentImage
