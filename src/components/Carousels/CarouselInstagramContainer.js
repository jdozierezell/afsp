import React, { useEffect } from 'react'
import Glide from '@glidejs/glide'
import { css } from '@emotion/core'

import CarouselInstagram from './CarouselInstagram'
import IconInstagram from '../SVGs/IconInstagram'

import { styles } from '../../css/css'

import '@glidejs/glide/dist/css/glide.core.min.css'

const carouselCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24} ${styles.scale.px25};
	overflow: hidden;
	background-color: ${styles.colors.lightGray};
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} ${styles.scale.px35};
	}
	.glide__slides {
		margin: 0;
	}
	.secondary-button {
		margin-bottom: ${styles.scale.px56};
	}
`

const carouselHeaderWrapperCSS = css`
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: ${styles.scale.px35};
	@media (min-width: ${styles.screens.mobile}px) {
		margin-bottom: ${styles.scale.px60};
	}
	h2 {
		font-size: ${styles.scale.px24};
		margin: 0 0 0 ${styles.scale.px24};
		@media (min-width: ${styles.screens.mobile}px) {
			font-size: ${styles.scale.px36};
		}
	}
`

const carouselIconCSS = css`
	height: ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		height: ${styles.scale.px36};
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

const chapterTempData = [
	{
		title: 'foo',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'bar',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/316/516',
	},
	{
		title: 'yay',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'hip',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'hooray',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'hooray',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'hooray',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
]

const CarouselInstagramContainer = ({ location }) => {
	useEffect(() => {
		new Glide('.glide-instagram', {
			perView: 3,
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
	}, [])
	return (
		<div css={carouselCSS}>
			<div css={carouselHeaderWrapperCSS}>
				<IconInstagram
					color={styles.colors.darkGray}
					iconCSS={carouselIconCSS}
				/>
				<h2>@afspnational</h2>
			</div>
			<div className="glide-instagram">
				<div data-glide-el="track">
					<ul className="glide__slides">
						{chapterTempData.map((chapter, index) => {
							return (
								<CarouselInstagram
									key={index}
									src={chapter.src}
								/>
							)
						})}
					</ul>
				</div>
				<div data-glide-el="controls[nav]" css={carouselButtonsCSS}>
					{chapterTempData.map((__, index) => {
						return <button data-glide-dir={`=${index}`}></button>
					})}
				</div>
			</div>
		</div>
	)
}

export default CarouselInstagramContainer
