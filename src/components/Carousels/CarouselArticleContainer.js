import React, { useEffect } from 'react'
import Glide from '@glidejs/glide'
import { css } from '@emotion/core'

import CarouselArticle from './CarouselArticle'

import { styles } from '../../css/css'

import '@glidejs/glide/dist/css/glide.core.min.css'

const carouselCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24} ${styles.scale.px25};
	overflow: hidden;
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50} ${styles.scale.px35};
	}
	h2 {
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

const chapterTempData = [
	{
		title: 'foo',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
	},
	{
		title: 'bar',
		titleHref: 'https://example.com',
		src: 'https://placekitten.com/516/316',
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

const CarouselArticleContainer = ({ title }) => {
	useEffect(() => {
		new Glide('.glide-article', {
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
			<h2>{title}</h2>
			<div className="glide-article">
				<div data-glide-el="track">
					<ul className="glide__slides">
						{chapterTempData.map((chapter, index) => (
							<CarouselArticle
								key={index}
								title={chapter.title}
								titleHref={chapter.titleHref}
								src={chapter.src}
							/>
						))}
					</ul>
				</div>
				<div data-glide-el="controls[nav]" css={carouselButtonsCSS}>
					{chapterTempData.map((__, index) => {
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

export default CarouselArticleContainer
