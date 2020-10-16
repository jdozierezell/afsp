import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

import background1 from '../SVGs/BackgroundOneBlueGreen.svg'
import background2 from '../SVGs/BackgroundOneFuchsiaDarkBlue.svg'
import background3 from '../SVGs/BackgroundOneBlueYellow.svg'
import background4 from '../SVGs/BackgroundOneWhiteGreen.svg'
import background5 from '../SVGs/BackgroundOneGreenYellow.svg'

import CTABackground from './CTABackground'
import CTAWithDescription from './CTAWithDescription'
import CTANoDescription from './CTANoDescription'
// import Loadable from '@loadable/component'

// const CTABackground = Loadable(() => import('./CTABackground'))
// const CTAWithDescription = Loadable(() => import('./CTAWithDescription'))
// const CTANoDescription = Loadable(() => import('./CTANoDescription'))

const CTAContainer = ({ cta, number, id }) => {
	let background
	let color
	const ctaId = `CTA-${number}`
	switch (number + 1) {
		case 1:
		case 6:
			background = background2
			color = styles.colors.white
			break
		case 2:
		case 7:
			background = background1
			color = styles.colors.white
			break
		case 3:
		case 8:
			background = background3
			color = styles.colors.white
			break
		case 4:
		case 9:
			background = background4
			color = styles.colors.darkGray
			break
		case 5:
		case 10:
			background = background5
			color = styles.colors.darkGray
			break
		default:
			background = background2
			color = styles.colors.white
	}

	const CTACSS = css`
		background-image: url(${background});
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		padding: ${styles.scale.px50} ${styles.scale.px24};
		h2,
		p {
			color: ${color};
		}
	`

	return (
		<>
			{cta.__typename === 'DatoCmsCtaBackground' && (
				<CTABackground
					cta={cta}
					number={number}
					id={id}
					describedby={ctaId}
				/>
			)}
			{cta.__typename === 'DatoCmsCtaWithDescription' && (
				<div
					id={id}
					css={css`
						${CTACSS};
						text-align: center;
						@media (min-width: ${styles.screens.tablet}px) {
							padding: ${styles.scale.px80} ${styles.scale.px50};
						}
					`}
				>
					<CTAWithDescription cta={cta} describedby={ctaId} />
				</div>
			)}
			{cta.__typename === 'DatoCmsCtaNoDescription' && (
				<div
					id={id}
					css={css`
						${CTACSS};
						display: flex;
						flex-flow: row wrap;
						justify-content: space-around;
						align-items: center;
					`}
				>
					<CTANoDescription cta={cta} describedby={ctaId} />
				</div>
			)}
		</>
	)
}

export default CTAContainer
