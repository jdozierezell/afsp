import React, { useEffect } from 'react'
import Glide, {
	Anchors,
	Controls,
	Breakpoints,
} from '@glidejs/glide/dist/glide.modular.esm'
import { css } from '@emotion/core'

import CarouselDetail from './CarouselDetail'
import IconArrowCircle from '../SVGs/IconArrowCircle'

import { styles } from '../../css/css'
import createAnchor from '../../utils/createAnchor'

import '@glidejs/glide/dist/css/glide.core.min.css'

const carouselCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24} ${styles.scale.px25};
	overflow: hidden;
	width: 100vw;
	position: relative;
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
		background: hsla(0, 0%, 100%, 1);
	}
`

const CarouselDetailContainer = ({
	content: { details, title, slug },
	addCSS,
	id,
}) => {
	const carouselId = createAnchor(title)
	useEffect(() => {
		new Glide(`.glide-story-${carouselId}`, {
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
	}, [details])
	return (
		<div id={id} css={carouselCSS}>
			<h2>{title}</h2>
			<div className={`glide-story-${carouselId}`}>
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
		</div>
	)
}

export default CarouselDetailContainer
