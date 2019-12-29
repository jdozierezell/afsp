import React, { useEffect } from 'react'
import Glide from '@glidejs/glide'
import { css } from '@emotion/core'

import Card from '../Cards/Card'

import { styles } from '../../css/css'

import '@glidejs/glide/dist/css/glide.core.min.css'

const carouselCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24} 0;
	overflow: hidden;
	background-color: ${styles.colors.lightGray};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} ${styles.scale.px35};
	}
	.glide__slides {
		margin: 0;
		white-space: break-spaces;
	}
`

const carouselHeaderTitleCSS = css`
	font-size: ${styles.scale.px36};
	margin-bottom: ${styles.scale.px45};
`

const carouselButtonsCSS = css`
	text-align: center;
	margin: ${styles.scale.px25} 0;
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

const StatisticsStatesFactsMobileContainer = ({
	title,
	selection,
	cardCSS,
}) => {
	useEffect(() => {
		new Glide('.glide', {
			breakpoints: {
				1080: {
					perView: 3,
				},
				768: {
					perView: 1,
					peek: { before: 0, after: 50 },
				},
			},
		}).mount()
	}, [selection])
	return (
		<div css={carouselCSS}>
			{title && <h2 css={carouselHeaderTitleCSS}>{title}</h2>}
			<div className="glide">
				<div data-glide-el="track">
					<ul className="glide__slides">
						{selection.map((state, index) => {
							const card = {
								cardHeading: 'foo',
								cardBodyNode: {
									internal: {
										content: 'foo',
									},
								},
								cardButtonCta: 'foo',
								cardButtonUrl: 'https://example.com',
							}
							return (
								<Card
									key={index}
									card={card}
									cardCSS={cardCSS}
								/>
							)
						})}
					</ul>
				</div>
				<div data-glide-el="controls[nav]" css={carouselButtonsCSS}>
					{selection.map((__, index) => {
						return (
							<button
								key={index}
								data-glide-dir={`=${index}`}
							></button>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default StatisticsStatesFactsMobileContainer
