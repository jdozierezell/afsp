import React, { useEffect } from 'react'
import Glide, {
	Anchors,
	Controls,
	Breakpoints,
} from '@glidejs/glide/dist/glide.modular.esm'
import { css } from '@emotion/core'

import CarouselVideo from './CarouselVideo'
import IconArrowCircle from '../SVGs/IconArrowCircle'

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
	width: ${styles.scale.px126};
	height: ${styles.scale.px126};
	top: 45%;
	margin-top: -${styles.scale.px126 / 2};
	cursor: pointer;
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

const CarouselVideoContainer = ({ videos }) => {
	useEffect(() => {
		new Glide('.glide-video', {
			perView: 2,
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
					perView: 1,
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

export default CarouselVideoContainer
