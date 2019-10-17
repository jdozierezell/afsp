import React from 'react'
import { css } from '@emotion/core'

import Recommendations from './Recommendations'

import { styles } from '../../css/css'

const containerCSS = css`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 2fr 1fr;
		align-items: stretch;
	}
`

const videoCSS = css`
	width: 100%;
	min-height: 500px;
	object-fit: cover;
`

const videoTitleCSS = css`
	position: absolute;
	top: ${styles.scale.px50};
	left: ${styles.scale.px24};
	right: ${styles.scale.px24};
	color: ${styles.colors.white};
	font-size: ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		left: ${styles.scale.px50};
	}
`

const StoriesReference = ({ videoURL, videoTitle }) => {
	return (
		<section css={containerCSS}>
			<video
				controls
				preload="metadata"
				css={videoCSS}
				src={videoURL}
				poster="https://placekitten.com/720"
			></video>
			<h2 css={videoTitleCSS}>{videoTitle}</h2>
			<Recommendations />
		</section>
	)
}

export default StoriesReference
