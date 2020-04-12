import React, { useEffect } from 'react'
import Glide from '@glidejs/glide'
import { css } from '@emotion/core'

import CarouselDetail from './CarouselDetail'

import { styles } from '../../css/css'
import createAnchor from '../../utils/createAnchor'

import '@glidejs/glide/dist/css/glide.core.min.css'

const carouselCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24} ${styles.scale.px25};
	overflow: hidden;
	width: 100vw;
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} ${styles.scale.px35};
	}
	> h2 {
		font-size: ${styles.scale.px36};
		line-height: ${styles.scale.px42};
		margin-bottom: ${styles.scale.px35};
		color: ${styles.colors.white};
		@media (min-width: ${styles.screens.mobile}px) {
			margin-bottom: ${styles.scale.px60};
		}
	}
	p {
		margin-bottom: ${styles.scale.px30};
		@media (min-width: ${styles.screens.mobile}px) {
			margin: 0 0 ${styles.scale.px30};
		}
	}
	.glide__slides {
		margin: 0;
		white-space: initial;
	}
	.secondary-button {
		margin-bottom: ${styles.scale.px56};
	}
`

const carouselButtonsCSS = css`
	text-align: center;
	margin: ${styles.scale.px45} 0 0;
	padding: 0;
	line-height: 0;
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px35} 0 0;
	}
	button {
		background: hsla(0, 0%, 100%, 0.5);
		border: none;
		margin: 0 5px;
		padding: 0;
		font-size: ${styles.scale.px28};
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.glide__bullet--active {
		background: hsla(0, 0%, 100%, 1);
	}
`

const CarouselDetailContainer = ({
	content: { details, title, slug },
	addCSS,
}) => {
	let count = 0
	const id = createAnchor(title)
	useEffect(() => {
		new Glide(`.glide-story-${id}`, {
			perView: 4,
			peek: { before: 0, after: styles.scale.px24 },
			breakpoints: {
				1080: {
					perView: 2,
					peek: { before: 0, after: styles.scale.px35 },
				},
				768: {
					perView: 1,
					peek: { before: 0, after: styles.scale.px35 },
				},
			},
		}).mount()
	}, [details])
	return (
		<div css={carouselCSS}>
			<h2>{title}</h2>
			<div className={`glide-story-${id}`}>
				<div data-glide-el="track">
					<ul className="glide__slides">
						{details.map((section, index) => {
							if (!section) {
								return ''
							} else {
								if (
									section.__typename === 'DatoCmsContent' &&
									section.contentHeading
								) {
									const anchor = `/${slug}/#${createAnchor(
										section.contentHeading
									)}`
									return (
										<CarouselDetail
											key={index}
											content={section.contentHeading}
											anchor={anchor}
											addCSS={addCSS}
										/>
									)
								} else if (section.__typename === 'Event') {
									return (
										<CarouselDetail
											key={index}
											content={section.date}
											title={section.title}
											externalAnchor={true}
											anchor={section.url}
											addCSS={addCSS}
										/>
									)
								}
								return ''
							}
						})}
					</ul>
				</div>
				<div data-glide-el="controls[nav]" css={carouselButtonsCSS}>
					{details.map((section, index) => {
						if (!section) {
							return ''
						} else {
							if (section.__typename === 'DatoCmsContent') {
								count++
								return (
									<button
										key={index}
										data-glide-dir={`=${count - 1}`}
									></button>
								)
							} else if (section.__typename === 'Event') {
								count++
								return (
									<button
										key={index}
										data-glide-dir={`=${count - 1}`}
									></button>
								)
							}
							return ''
						}
					})}
				</div>
			</div>
		</div>
	)
}

export default CarouselDetailContainer
