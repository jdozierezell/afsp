import React from 'react'
import { css } from '@emotion/react'
import Script from 'react-load-script'

import FacebookShare from '../Social/FacebookShare'
import TwitterShare from '../Social/TwitterShare'
import EmailShare from '../Social/EmailShare'

import { styles } from '../../css/css'

import ContentImage from './ContentImage'
import ContentAudio from './ContentAudio'
import ContentHeading from './ContentHeading'
import ContentEmbed from './ContentEmbed'
import ContentTweet from './ContentTweet'
import CarouselDetailContainer from '../Carousels/CarouselDetailContainer'

const storyContentCSS = css`
	margin: ${styles.scale.px50} 0;
	@media (min-width: ${styles.screens.tablet}px) {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		grid-column-gap: ${styles.gridGap.desktop};
	}
	.storyContent {
		margin: ${styles.scale.px24} ${styles.scale.px24} 0;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 2 / 3;
			max-width: 623px;
			margin: ${styles.scale.px50} auto 0;
		}
		:first-of-type {
			margin-top: 0;
		}
		:last-of-type {
			margin-bottom: ${styles.scale.px24};
			@media (min-width: ${styles.screens.tablet}px) {
				margin-bottom: ${styles.scale.px50};
			}
		}
		p:last-of-type {
			margin-bottom: 0;
		}
		blockquote {
			border-left: ${styles.scale.px12} solid ${styles.colors.lightGray};
			margin-left: 0;
			padding-left: ${styles.scale.px20};
		}
	}
`

const socialButtonsCSS = css`
	margin: 0 ${styles.scale.px24} ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		grid-column: 1 / 2;
		margin: 0 0 0 ${styles.scale.px50};
	}
	div {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
		@media (min-width: ${styles.screens.tablet}px) {
			max-width: ${styles.scale.px30};
		}
		svg {
			height: ${styles.scale.px30};
			max-width: ${styles.scale.px30};
			margin-bottom: ${styles.scale.px16};
		}
	}
	h3 {
		font-size: ${styles.scale.px18};
		text-align: center;
		@media (min-width: ${styles.screens.tablet}px) {
			text-align: left;
		}
	}
`

const commentCSS = css`
	grid-column: 1 / 4;
	background: ${styles.colors.lightGray};
	padding: ${styles.scale.px50} 0;
	@media (min-width: ${styles.screens.tablet}px) {
		padding: 0;
	}
	h2 {
		margin: 0 ${styles.scale.px24} ${styles.scale.px35};
		@media (min-width: ${styles.screens.tablet}px) {
			max-width: 960px;
			margin: ${styles.scale.px80} auto ${styles.scale.px60};
		}
	}
	.fb-comments {
		margin: ${styles.scale.px50} ${styles.scale.px24} 0;
		width: calc(100% - 48px);
		display: block;
		@media (min-width: ${styles.screens.tablet}px) {
			width: 100%;
			max-width: 960px;
			margin: ${styles.scale.px60} auto ${styles.scale.px80};
		}
		span,
		iframe {
			width: 100% !important;
		}
	}
`

const ContentStory = ({ data, pageUrl }) => {
	return (
		<section css={storyContentCSS}>
			<aside css={socialButtonsCSS} aria-labelledby="storyShare">
				<h3 id="storyShare">Share this Story</h3>
				<div>
					<FacebookShare pageUrl={pageUrl} />
					<TwitterShare pageUrl={pageUrl} />
					<EmailShare pageUrl={pageUrl} />
				</div>
			</aside>
			<div className="storyContent">
				{data.article.map((article, index) => {
					if (article.__typename === 'DatoCmsBody') {
						return (
							<div
								key={index}
								dangerouslySetInnerHTML={{
									__html: article.copy,
								}}
							></div>
						)
					} else if (article.__typename === 'DatoCmsEmbed') {
						return (
							<ContentEmbed
								key={index}
								embedCode={article.embedCode}
							/>
						)
					} else if (article.__typename === 'DatoCmsImage') {
						return (
							<ContentImage
								key={index}
								index={index}
								image={article.images}
							/>
						)
					} else if (article.__typename === 'DatoCmsDetailSquare') {
						return (
							<div
								css={css`
									grid-column: 1 / 4;
								`}
								key={index}
							>
								<CarouselDetailContainer
									key={index}
									content={article.detail}
								/>
							</div>
						)
					} else if (article.__typename === 'DatoCmsAudio') {
						return (
							<ContentAudio key={index} audio={article.audio} />
						)
					} else if (article.__typename === 'DatoCmsHeading') {
						return (
							<ContentHeading
								key={index}
								heading={article.heading}
								level={article.headingLevel}
							/>
						)
					} else if (article.__typename === 'DatoCmsTweet') {
						return (
							<ContentTweet
								key={index}
								tweet={article.tweet}
								story={true}
							/>
						)
					} else if (article.__typename === 'DatoCmsActionButton') {
						return (
							<a
								key={index}
								className="secondary-button"
								href={article.buttonLink}
							>
								{article.buttonText}
							</a>
						)
					}
					return ''
				})}
			</div>
			<Script url="https://apps.elfsight.com/p/platform.js" defer />
			<aside css={commentCSS} aria-labelledby="commentLabel">
				<h2 id="commentLabel">Comments</h2>
				<div className="elfsight-app-009de5eb-b07f-41f5-9d7e-26c5c9f96d27 fb-comments"></div>
			</aside>
		</section>
	)
}

export default ContentStory
