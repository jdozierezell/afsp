import React, { useEffect } from 'react'
import Glide from '@glidejs/glide'
import { css } from '@emotion/core'

import VideoComponent from './VideoComponent'

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

const videoTempData = [
	{
		title: 'foo',
		src:
			'https://player.vimeo.com/external/290669663.hd.mp4?s=61350a37b7d8d9ce2c9a2af02008afcf59136d34&profile_id=175',
	},
	{
		title: 'bar',
		src:
			'https://player.vimeo.com/external/290669663.hd.mp4?s=61350a37b7d8d9ce2c9a2af02008afcf59136d34&profile_id=175',
	},
	{
		title: 'yay',
		src:
			'https://player.vimeo.com/external/290669663.hd.mp4?s=61350a37b7d8d9ce2c9a2af02008afcf59136d34&profile_id=175',
	},
	{
		title: 'hip',
		src:
			'https://player.vimeo.com/external/290669663.hd.mp4?s=61350a37b7d8d9ce2c9a2af02008afcf59136d34&profile_id=175',
	},
	{
		title: 'hooray',
		src:
			'https://player.vimeo.com/external/290669663.hd.mp4?s=61350a37b7d8d9ce2c9a2af02008afcf59136d34&profile_id=175',
	},
	{
		title: 'hooray',
		src:
			'https://player.vimeo.com/external/290669663.hd.mp4?s=61350a37b7d8d9ce2c9a2af02008afcf59136d34&profile_id=175',
	},
	{
		title: 'hooray',
		src:
			'https://player.vimeo.com/external/290669663.hd.mp4?s=61350a37b7d8d9ce2c9a2af02008afcf59136d34&profile_id=175',
	},
]

const VideoCarousel = () => {
	useEffect(() => {
		new Glide('.glide', {
			perView: 3,
			peek: { before: 0, after: styles.scale.px126 },
			breakpoints: {
				1080: {
					perView: 2,
					peek: { before: 0, after: styles.scale.px126 },
				},
				768: {
					perView: 1,
					peek: { before: 0, after: styles.scale.px126 },
				},
			},
		}).mount()
	}, [])

	return (
		<section css={carouselCSS}>
			<p>Cronut pabst whatever artisan vape banh</p>
			<div className="glide">
				<div data-glide-el="track">
					<ul className="glide__slides">
						{videoTempData.map((video, index) => {
							return (
								<VideoComponent
									key={index}
									title={video.title}
									src={video.src}
								/>
							)
						})}
					</ul>
				</div>
				<div data-glide-el="controls[nav]" css={carouselButtonsCSS}>
					{videoTempData.map((video, index) => {
						return <button data-glide-dir={`=${index}`}></button>
					})}
				</div>
			</div>
		</section>
	)
}

export default VideoCarousel
