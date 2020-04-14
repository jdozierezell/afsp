import React, { useEffect } from 'react'
import Glide, { Anchors } from '@glidejs/glide/dist/glide.modular.esm'
import { css } from '@emotion/core'

import CarouselVideo from './CarouselVideo'

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

const CarouselVideoContainer = ({ videos }) => {
	useEffect(() => {
		new Glide('.glide-video', {
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
		}).mount({ Anchors })
	}, [])
	return (
		<section css={carouselCSS}>
			<p>Watch real stories of hope</p>
			<div className="glide-video">
				<div data-glide-el="track">
					<ul className="glide__slides">
						{videos.map((video, index) => {
							return (
								<CarouselVideo
									key={index}
									title={video.video.title}
									video={video.video.url}
									poster={video.poster.url}
								/>
							)
						})}
					</ul>
				</div>
				<div data-glide-el="controls[nav]" css={carouselButtonsCSS}>
					{videos.map((__, index) => {
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

export default CarouselVideoContainer
