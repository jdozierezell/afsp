import React, { useState } from 'react'
import { css } from '@emotion/core'

import Recommendations from './Recommendations'

import { styles } from '../../css/css'

const containerCSS = css`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	width: 100vw;
	margin-left: -${styles.scale.px24};
	background-color: ${styles.colors.blue};
	@media (min-width: ${styles.screens.mobile}px) {
		margin-left: -${styles.scale.px50};
	}
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 2fr 1fr;
		align-items: stretch;
		margin-left: -${styles.scale.px50};
	}
`

const videoCSS = css`
	width: 100vw;
	height: calc(100vw / 1.78);
	object-fit: cover;
	align-self: center;
	@media (min-width: ${styles.screens.tablet}px) {
		width: calc((100vw * 2) / 3);
		height: calc((100vw * 2) / (3 * 1.78));
	}
`

const videoTitleCSS = css`
	position: absolute;
	top: ${styles.scale.px36};
	left: ${styles.scale.px24};
	right: ${styles.scale.px24};
	color: ${styles.colors.white};
	font-size: ${styles.scale.px24};
	width: calc(100vw - 48px);
	@media (min-width: ${styles.screens.tablet}px) {
		left: ${styles.scale.px50};
		width: calc(100vw * 2 / 3 - 100px);
	}
`

const RecommendationsVideoStories = ({ videoData, storyData }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	return (
		<div css={containerCSS}>
			<div>
				<video
					controls
					preload="metadata"
					css={videoCSS}
					src={videoData.url}
					poster={videoData.poster}
					onPlay={() => setIsPlaying(true)}
					onPause={() => setIsPlaying(false)}
					onEnded={() => setIsPlaying(false)}
				>
					<track default kind="captions" srcLang="en" src="#" />
				</video>
				{!isPlaying && <h2 css={videoTitleCSS}>{videoData.title}</h2>}
			</div>
			<Recommendations data={storyData} />
		</div>
	)
}

export default RecommendationsVideoStories
