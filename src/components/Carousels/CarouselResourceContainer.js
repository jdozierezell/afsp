import React, { useEffect } from 'react'
import Glide from '@glidejs/glide'
import { css } from '@emotion/core'

import CarouselResource from './CarouselResource'

import createAnchor from '../../utils/createAnchor'

import { styles } from '../../css/css'

import '@glidejs/glide/dist/css/glide.core.min.css'

const carouselCSS = css`
	background-color: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} 0 ${styles.scale.px25};
	overflow: hidden;
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
		@media (min-width: ${styles.screens.mobile}px) {
			margin: 0 0 0 ${styles.scale.px50};
		}
	}
`

const carouselButtonsCSS = css`
	text-align: center;
	margin: ${styles.scale.px30} 0 0;
	padding: 0;
	line-height: 0;
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px35} 0 0;
	}
	button {
		background: hsla(0, 0%, 14.9%, 0.5);
		border: none;
		margin: 0 5px;
		padding: 0;
		font-size: ${styles.scale.px28};
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.glide__bullet--active {
		background: hsla(0, 0%, 14.9%, 1);
	}
`

const CarouselResourceContainer = ({ listHeading, resources }) => {
	useEffect(() => {
		new Glide('.glide-resource', {
			perView: 3,
			peek: { before: 0, after: styles.scale.px126 },
			breakpoints: {
				1080: {
					perView: 2,
					peek: { before: 0, after: styles.scale.px126 },
				},
				768: {
					perView: 1,
					peek: { before: 0, after: styles.scale.px70 },
				},
			},
		}).mount()
	}, [])
	return (
		<section css={carouselCSS}>
			<p id={createAnchor(listHeading)}>{listHeading}</p>
			<div className="glide-resource">
				<div data-glide-el="track">
					<ul className="glide__slides">
						{resources.map((resource, index) => {
							let title, image, link, linkText, external
							title = resource.title
							image = resource.coverImage.fluid
							if (resource.__typename === 'DatoCmsStory') {
								link = `/story/${resource.slug}`
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
									link = resource.resourceLink[0].download.url
									linkText = 'Download and share'
									external = false
								} else if (
									resource.resourceLink[0].__typename ===
									'DatoCmsExternalUrl'
								) {
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
									link={link}
									linkText={linkText}
									external={external}
								/>
							)
						})}
					</ul>
				</div>
				<div data-glide-el="controls[nav]" css={carouselButtonsCSS}>
					{resources.map((__, index) => {
						return (
							<button
								key={index}
								data-glide-dir={`=${index}`}
							></button>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default CarouselResourceContainer
