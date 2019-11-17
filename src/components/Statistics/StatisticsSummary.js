import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import buildUrl from '../../utils/buildUrl'

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

const StoriesReference = ({ data }) => {
	const {
		additionalFacts,
		videoHeader,
		videoDescription,
		videoUrl,
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
				<video controls src={videoUrl}></video>
				<div css={videoTitleCSS}>
					<p>More resources</p>
					<h3>{videoHeader}</h3>
				</div>
				<p>{videoDescription}</p>
				<AniLink
					fade
					duration={styles.duration}
					to={buildUrl(videoLink.__typename, videoLink.slug)}
					className="secondary-button"
				>
					{videoLinkText}
				</AniLink>
			</aside>
		</section>
	)
}

export default StoriesReference
