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
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 2fr 1fr;
		align-items: stretch;
		margin-left: -${styles.scale.px50};
	}
`

const videoCSS = css`
	width: 100%;
	min-height: 500px;
	max-height: 800px;
	object-fit: cover;
`

const videoTitleCSS = css`
	position: absolute;
	top: ${styles.scale.px36};
	left: ${styles.scale.px24};
	right: ${styles.scale.px24};
	color: ${styles.colors.white};
	font-size: ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		left: ${styles.scale.px50};
	}
`

const RecommendationsVideoStories = ({ videoData, storyData }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	return (
		<div css={containerCSS}>
			<video
				controls
				preload="metadata"
				css={videoCSS}
				src={videoData.url}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onEnded={() => setIsPlaying(false)}
			>
				<track default kind="captions" srcLang="en" src="#" />
			</video>
			{!isPlaying && <h2 css={videoTitleCSS}>{videoData.title}</h2>}
			<Recommendations data={storyData} />
		</div>
	)
}

export default RecommendationsVideoStories
