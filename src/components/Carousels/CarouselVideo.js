import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const videoComponentCSS = css`
	margin: 0 ${styles.gridGap.mobile} 0 0;
	flex-shrink: 0;
	div {
		background-size: cover;
		background-position: center;
		border-radius: ${styles.scale.px7} / ${styles.scale.px5};
	}
	video {
		object-fit: cover;
		width: 100%;
		display: block;
		border-radius: ${styles.scale.px7} / ${styles.scale.px5};
	}
	h2 {
		margin: ${styles.scale.px30} 0 0;
		font-size: ${styles.scale.px20};
	}
`

const CarouselVideo = ({ video, poster, title }) => {
	return (
		<div
			css={css`
				${videoComponentCSS};
			`}
			draggable
		>
			<div>
				<video
					controls
					src={video}
					poster={`${poster}?w=1280&h=720&fit=crop&crop=faces`}
				>
					<track default kind="captions" srcLang="en" src="#" />
				</video>
			</div>
			<h2>{title}</h2>
		</div>
	)
}

export default CarouselVideo
