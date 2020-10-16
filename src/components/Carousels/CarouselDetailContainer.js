import React from 'react'
import { css } from '@emotion/core'
import Carousel from 'react-multi-carousel'

import { styles } from '../../css/css'
import createAnchor from '../../utils/createAnchor'

import 'react-multi-carousel/lib/styles.css'

import CarouselDetail from './CarouselDetail'
// import Loadable from '@loadable/component'

// const CarouselDetail = Loadable(() => import('./CarouselDetail'))

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
	.secondary-button {
		margin-bottom: ${styles.scale.px56};
	}
`

const CarouselDetailContainer = ({
	content: { details, title, slug },
	eventTitleSize,
	addCSS,
	id,
}) => {
	const carouselId = createAnchor(title)
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
	details = details.filter(
		section =>
			(section.contentHeading && section.contentHeading !== '') ||
			section.__typename === 'Event'
	)
	console.log(details)
	return (
		<div id={id} css={carouselCSS}>
			<h2>{title}</h2>
			<Carousel responsive={responsive}>
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
									type={section.__typename}
									content={section.date}
									title={section.title}
									externalAnchor={true}
									buttonText={section.buttonText}
									anchor={section.url}
									eventCode={section.eventCode}
									addCSS={addCSS}
									eventTitleSize={eventTitleSize}
								/>
							)
						}
						return ''
					}
				})}
			</Carousel>
		</div>
	)
}

export default CarouselDetailContainer
