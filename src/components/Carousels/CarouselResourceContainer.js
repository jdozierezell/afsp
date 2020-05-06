import React, { useEffect } from 'react'
import Glide, {
	Anchors,
	Controls,
	Breakpoints,
} from '@glidejs/glide/dist/glide.modular.esm'
import { css } from '@emotion/core'

import CarouselResource from './CarouselResource'
import IconArrowCircle from '../SVGs/IconArrowCircle'

import createAnchor from '../../utils/createAnchor'

import { styles } from '../../css/css'

import '@glidejs/glide/dist/css/glide.core.min.css'

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
	.glide__slides {
		margin: 0 0 0 ${styles.scale.px24};
		white-space: initial;
		@media (min-width: ${styles.screens.mobile}px) {
			margin: 0 0 0 ${styles.scale.px50};
		}
	}
`

const carouselButtonsCSS = css`
	position: absolute;
	width: ${styles.scale.px64};
	height: ${styles.scale.px64};
	top: 40%;
	margin-top: -${styles.scale.px126 / 2};
	cursor: pointer;
	@media (min-width: ${styles.screens.tablet}px) {
		width: ${styles.scale.px80};
		height: ${styles.scale.px80};
	}
	:first-of-type {
		left: ${styles.scale.px24};
	}
	:last-of-type {
		right: ${styles.scale.px24};
	}
	.glide__bullet--active {
		background: hsla(0, 0%, 14.9%, 1);
	}
`

const CarouselResourceContainer = ({ listHeading, resources, addCSS }) => {
	const id = createAnchor(listHeading)
	useEffect(() => {
		new Glide(`.glide-resource-${id}`, {
			perView: 2,
			perTouch: 1,
			breakpoints: {
				1920: {
					perView: 4,
					peek: { before: 0, after: styles.scale.px35 },
				},
				1400: {
					perView: 3,
					peek: { before: 0, after: styles.scale.px35 },
				},
				1080: {
					perView: 2,
					peek: { before: 0, after: styles.scale.px35 },
				},
				768: {
					perView: 2,
					peek: { before: 0, after: styles.scale.px35 },
				},
			},
		}).mount({
			Anchors,
			Controls,
			Breakpoints,
		})
	}, [])
	return (
		<section
			id={id}
			css={css`
				${carouselCSS};
				${addCSS};
			`}
		>
			<p>{listHeading}</p>
			<div className={`glide-resource-${id}`}>
				<div data-glide-el="track">
					<ul className="glide__slides">
						{resources.map((resource, index) => {
							let title,
								image,
								imageFallback,
								link,
								linkText,
								external
							title = resource.title
							if (resource.__typename === 'DatoCmsStory') {
								image = resource.seo.image.responsiveImage
								imageFallback = resource.seo.image.url
								link = `/story/${resource.slug}`
								linkText = 'Learn more'
								external = false
							} else if (
								resource.__typename === 'DatoCmsDetail' ||
								resource.__typename === 'DatoCmsDetailTagged' ||
								resource.__typename === 'DatoCmsLanding' ||
								resource.__typename === 'DatoCmsCustomShareable'
							) {
								image = resource.seo.image.responsiveImage
								imageFallback = resource.seo.image.url
								link = `/${resource.slug}`
								linkText = 'Learn more'
								external = false
							} else if (
								resource.__typename ===
								'DatoCmsExternalResource'
							) {
								if (
									resource.resourceLink[0].__typename ===
									'DatoCmsDownload'
								) {
									image = resource.coverImage.responsiveImage
									imageFallback = resource.coverImage.url
									link = resource.resourceLink[0].download.url
									linkText = 'Download and share'
									external = false
								} else if (
									resource.resourceLink[0].__typename ===
									'DatoCmsExternalUrl'
								) {
									image = resource.coverImage.responsiveImage

									imageFallback = resource.coverImage.url
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
					</ul>
				</div>
				<div data-glide-el="controls">
					<div css={carouselButtonsCSS} data-glide-dir="<">
						<IconArrowCircle
							color="hsla(0, 0%, 14.9%, 0.2)"
							direction="left"
						/>
					</div>
					<div css={carouselButtonsCSS} data-glide-dir=">">
						<IconArrowCircle
							color="hsla(0, 0%, 14.9%, 0.2)"
							direction="right"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CarouselResourceContainer
