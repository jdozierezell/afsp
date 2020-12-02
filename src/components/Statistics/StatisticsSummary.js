import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import buildUrl from '../../utils/buildUrl'

import { styles } from '../../css/css'

const containerCSS = css`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: repeat(12, 1fr);
		align-items: stretch;
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const statisticsSummaryCSS = css`
	margin-bottom: ${styles.scale.px50};
	@media (min-width: ${styles.screens.tablet}px) {
		margin-bottom: 0;
		max-width: 623px;
		grid-column: 1 / 7;
	}
	h2 {
		font-size: ${styles.scale.px36};
		margin: 0 0 ${styles.scale.px35};
		@media (min-width: ${styles.screens.tablet}px) {
			font-size: ${styles.scale.px44};
			margin: 0 0 ${styles.scale.px40};
		}
	}
`

const summaryVideoCSS = css`
	position: relative;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-column: 8 / 13;
		width: 100%;
	}
	video {
		width: calc(100vw - 48px);
		height: calc((100vw - 48px) / 1.5);
		border-radius: ${styles.scale.px5};
		object-fit: cover;
		@media (min-width: ${styles.screens.tablet}px) {
			width: 100%;
			height: initial;
		}
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
				margin: ${styles.scale.px20} 0 0;
			}
		}
	}
`
const videoWrapperCSS = css`
	background-size: cover;
	background-position: center;
	border-radius: ${styles.scale.px7} / ${styles.scale.px5};
	padding: 56.25% 0 0 0;
	position: relative;
	iframe {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 5px;
	}
`

const videoTitleCSS = css`
	@media (mim-width: ${styles.screens.tablet}px) {
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
	}
`

const StoriesReference = ({ data }) => {
	const {
		additionalFacts,
		videoHeader,
		videoDescription,
		videoId,
		video,
		videoPoster,
		videoLinkText,
		videoLink,
	} = data
	return (
		<section css={containerCSS}>
			<div css={statisticsSummaryCSS}>
				<h2>Additional facts about suicide in the US</h2>
				<ul>
					{additionalFacts.map((fact, index) => (
						<li
							key={index}
							dangerouslySetInnerHTML={{ __html: fact.fact }}
						></li>
					))}
				</ul>
			</div>
			<aside css={summaryVideoCSS}>
				<div css={videoTitleCSS}>
					<p>More resources</p>
					<h3>{videoHeader}</h3>
				</div>

				<div css={videoWrapperCSS}>
					<iframe
						title={`video-${videoId}`}
						src={`https://player.vimeo.com/video/${videoId}`}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
						}}
						frameBorder="0"
						allow="fullscreen"
						allowFullScreen
					></iframe>
				</div>
				<p>{videoDescription}</p>
				<Link
					to={buildUrl(videoLink.__typename, videoLink.slug)}
					className="secondary-button"
				>
					{videoLinkText}
				</Link>
			</aside>
		</section>
	)
}

export default StoriesReference
