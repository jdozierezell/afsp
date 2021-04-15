import React from 'react'
import Carousel from 'react-multi-carousel'
import { css } from '@emotion/react'

import CarouselResource from './CarouselResource'

import createAnchor from '../../utils/createAnchor'

import { styles } from '../../css/css'

import 'react-multi-carousel/lib/styles.css'

const carouselCSS = css`
	background-color: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} ${styles.scale.px24} ${styles.scale.px25};
	overflow: hidden;
	position: relative;
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} ${styles.scale.px35};
	}
	p {
		margin: 0 ${styles.scale.px24} ${styles.scale.px30} 0;
		@media (min-width: ${styles.screens.mobile}px) {
			margin: 0 ${styles.scale.px50} ${styles.scale.px30} 0;
		}
	}
	@media (max-width: ${styles.screens.tablet}px) {
		.react-multiple-carousel__arrow--left {
			left: ${styles.gridGap.mobile};
		}
		.react-multiple-carousel__arrow--right {
			right: ${styles.gridGap.mobile};
		}
	}
`

const CarouselResourceContainer = ({
	listHeading,
	resources,
	randomize,
	addCSS,
}) => {
	const id = createAnchor(listHeading)
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
	if (randomize) {
		resources = resources.sort(() => Math.random() - 0.5)
	}
	return (
		<section
			id={id}
			css={css`
				${carouselCSS};
				${addCSS};
			`}
		>
			<p>{listHeading}</p>
			<Carousel responsive={responsive}>
				{resources.map((resource, index) => {
					let title, image, imageFallback, link, linkText, external
					title = resource.title
					if (resource.__typename === 'DatoCmsStory') {
						image = resource.seo.image
						link = `/story/${resource.slug}`
						linkText = 'Learn more'
						external = false
					} else if (
						resource.__typename === 'DatoCmsDetail' ||
						resource.__typename === 'DatoCmsDetailTagged' ||
						resource.__typename === 'DatoCmsLanding' ||
						resource.__typename === 'DatoCmsCustomShareable' ||
						resource.__typename === 'DatoCmsStatistic' ||
						resource.__typename === 'DatoCmsImageList'
					) {
						image = resource.seo.image
						link = `/${resource.slug}`
						linkText = 'Learn more'
						external = false
					} else if (
						resource.__typename === 'DatoCmsExternalResource'
					) {
						if (
							resource.resourceLink[0].__typename ===
							'DatoCmsDownload'
						) {
							image = resource.coverImage
							link = resource.resourceLink[0].download.url.replace(
								'?auto=format',
								''
							)
							linkText = 'Download and share'
							external = false
						} else if (
							resource.resourceLink[0].__typename ===
							'DatoCmsExternalUrl'
						) {
							image = resource.coverImage
							link = resource.resourceLink[0].externalUrl
							linkText = 'Learn more'
							external = true
						}
					}
					return (
						<CarouselResource
							key={index}
							title={title}
							image={image}
							imageFallback={imageFallback}
							link={link}
							linkText={linkText}
							external={external}
						/>
					)
				})}
			</Carousel>
		</section>
	)
}

export default CarouselResourceContainer
