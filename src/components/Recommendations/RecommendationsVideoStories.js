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
	@media (min-width: ${styles.screens.navigation}px) {
		grid-template-columns: repeat(3, 1fr);
		align-items: stretch;
		margin-left: -${styles.scale.px50};
	}
`

const videoContainerCSS = css`
	grid-column: 1 / 2;
	@media (min-width: ${styles.screens.navigation}px) {
		grid-column: 1 / 3;
	}
`

const videoCSS = css`
	width: 100%;
	object-fit: cover;
	align-self: center;
	@media (min-width: ${styles.screens.navigation}px) {
		width: calc((100vw * 2) / 3);
		height: calc((100vw * 2) / (3 * 1.78));
	}
`

const videoTitleCSS = css`
	display: none;
	@media (min-width: ${styles.screens.mobile}px) {
		display: block;
		position: absolute;
		top: ${styles.scale.px36};
		left: ${styles.scale.px24};
		right: ${styles.scale.px24};
		color: ${styles.colors.white};
		font-size: ${styles.scale.px36};
		width: calc(100vw - 48px);
	}
	@media (min-width: ${styles.screens.tablet}px) {
		left: ${styles.scale.px50};
		width: calc(100vw * 2 / 3 - 100px);
	}
`

const RecommendationsVideoStories = ({ videoData, storyData, heading }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	return (
		<div css={containerCSS}>
			<div css={videoContainerCSS}>
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
			<Recommendations data={storyData} heading={heading} video={true} />
		</div>
	)
}

export default RecommendationsVideoStories
