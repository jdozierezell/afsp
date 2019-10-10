import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const videoHeroCSS = css`
	overflow: hidden;
	margin-bottom: ${styles.scale.px50};
	position: relative;
	max-height: 600px;
	@media (min-width: ${styles.screens.tablet}px) {
		margin-bottom: 0;
	}
`

const videoCoverCSS = css`
	position: relative;
	line-height: 0;
	height: calc(100vw / 1.78);
	min-height: 275px;
	max-height: 600px;
	width: 100%;
	object-fit: cover;
	@media (min-width: ${styles.screens.tablet}px) {
		height: calc(100vw);
	}
`

const videoDescriptionCSS = css`
	margin: ${styles.scale.px40} ${styles.scale.px24} 0;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0;
		padding: 0 ${styles.scale.px50};
		position: absolute;
		width: 70vw;
		max-width: 600px;
		bottom: 195px;
		width: 50vw;
		top: 0;
		left: 0;
		bottom: 0;
		background: linear-gradient(
			90deg,
			rgba(38, 38, 38, 0.7) 0%,
			rgba(38, 38, 38, 0) 100%
		);
	}
	p {
		:last-of-type {
			margin-bottom: ${styles.scale.px40};
			@media (min-width: ${styles.screens.tablet}px) {
				margin-bottom: ${styles.scale.px60};
				color: ${styles.colors.white};
			}
		}
	}
	h2 {
		font-size: ${styles.scale.px46};
		color: ${styles.colors.white};
		width: 220px;
		position: absolute;
		top: 125px;
		@media (min-width: ${styles.screens.tablet}px) {
			position: initial;
		}
		span {
			box-shadow: 0 0 0 10px ${styles.colors.blue};
			background-color: ${styles.colors.blue};
			box-decoration-break: clone;
		}
	}
`

const descriptionWrapperCSS = css`
	@media (min-width: ${styles.screens.tablet}px) {
		position: absolute;
		bottom: ${styles.scale.px80};
	}
`

const HeroVideo = () => {
	return (
		<section css={videoHeroCSS}>
			<video
				autoPlay
				muted
				loop
				css={videoCoverCSS}
				src="https://player.vimeo.com/external/364075680.hd.mp4?s=9f70c5f518934c9aea34dc6b49045d7977fd7ac1&profile_id=175"
			></video>
			<div css={videoDescriptionCSS}>
				<div css={descriptionWrapperCSS}>
					<h2>
						<span>You're not alone</span>
					</h2>
					<p>
						Banjo franzen palo santo pour-over artisan organic.
						Fashion axe brunch messenger bag chartreuse jianbing
						poutine. Organic hammock hashtag bespoke meggings.
						Keffiyeh banh mi raclette hella thundercats next level.
					</p>
					<button className="secondary-button">
						View all stories
					</button>
				</div>
			</div>
		</section>
	)
}

export default HeroVideo
