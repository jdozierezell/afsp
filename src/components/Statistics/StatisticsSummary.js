import React from 'react'
import { css } from '@emotion/core'

import { styles } from '../../css/css'

const containerCSS = css`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 7fr 5fr;
		align-items: stretch;
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const statisticsSummaryCSS = css`
	margin-bottom: ${styles.scale.px50};
	@media (min-width: ${styles.screens.mobile}px) {
		margin-bottom: 0;
		max-width: 623px;
	}
	h2 {
		font-size: ${styles.scale.px36};
		margin: 0 0 ${styles.scale.px35};
		@media (min-width: ${styles.screens.mobile}px) {
			font-size: ${styles.scale.px44};
			margin: 0 0 ${styles.scale.px40};
		}
	}
`

const summaryVideoCSS = css`
	position: relative;
	video {
		width: 100%;
	}
	> p {
		:first-of-type {
			margin-top: ${styles.scale.px25};
			@media (min-width: ${styles.screens.mobile}px) {
				margin-top: ${styles.scale.px30};
			}
		}
		:last-of-type {
			margin-bottom: ${styles.scale.px40};
			@media (min-width: ${styles.screens.mobile}px) {
				margin-bottom: ${styles.scale.px60};
			}
		}
	}
`

const videoTitleCSS = css`
	position: absolute;
	left: ${styles.scale.px24};
	top: ${styles.scale.px30};
	h3,
	p {
		color: ${styles.colors.white};
	}
	p {
		margin-bottom: ${styles.scale.px20};
	}
`

const StoriesReference = ({ videoURL, videoTitle }) => {
	return (
		<section css={containerCSS}>
			<div css={statisticsSummaryCSS}>
				<h2>Lorem ipsum hipsum</h2>
				<ul>
					<li>
						The age-adjusted suicide rate in 2017 was{' '}
						<strong>14.0 per 100,000 individuals</strong>.
					</li>
					<li>
						The rate of suicide is highest in{' '}
						<strong>middle-aged white men in particular</strong>.
					</li>
					<li>
						In 2017,{' '}
						<strong>
							men died by suicide 3.54x more often than women
						</strong>
						.
					</li>
					<li>
						On average, there are{' '}
						<strong>129 suicides per day</strong>.
					</li>
					<li>
						White males accounted for{' '}
						<strong>69.67% of suicide deaths in 2017</strong>.
					</li>
					<li>
						In 2017,{' '}
						<strong>
							firearms accounted for 50.57% of all suicide deaths
						</strong>
						.
					</li>
				</ul>
			</div>
			<aside css={summaryVideoCSS}>
				<video
					controls
					src="https://player.vimeo.com/external/284203921.hd.mp4?s=c7eff97604161ffc7b2094e9f741a3cadc622ef4&profile_id=175"
				></video>
				<div css={videoTitleCSS}>
					<p>More resources</p>
					<h3>Suicide Research Videos</h3>
				</div>
				<p>
					Short and easy-to-understand, these new research-themed
					videos make suicide prevention research accessible, and are
					perfect for sharing on social media, helping to spread the
					word that through research, we can #StopSuicide.
				</p>
				<a href="https://example.com" className="secondary-button">
					Watch videos
				</a>
			</aside>
		</section>
	)
}

export default StoriesReference
