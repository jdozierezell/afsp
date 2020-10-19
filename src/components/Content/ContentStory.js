import React from 'react'
import { css } from '@emotion/core'
import Loadable from '@loadable/component'

import FacebookShare from '../Social/FacebookShare'
import TwitterShare from '../Social/TwitterShare'
import EmailShare from '../Social/EmailShare'
import FacebookComments from '../Social/FacebookComments'

import { styles } from '../../css/css'

import ContentImage from './ContentImage'
import ContentAudio from './ContentAudio'
import ContentVideo from './ContentVideo'
import ContentHeading from './ContentHeading'
import ContentEmbed from './ContentEmbed'
import CarouselDetailContainer from '../Carousels/CarouselDetailContainer'
// import Loadable from '@loadable/component'

// const ContentImage = Loadable(() => import('./ContentImage'))
// const ContentAudio = Loadable(() => import('./ContentAudio'))
// const ContentVideo = Loadable(() => import('./ContentVideo'))
// const ContentHeading = Loadable(() => import('./ContentHeading'))
// const ContentEmbed = Loadable(() => import('./ContentEmbed'))
// const CarouselDetailContainer = Loadable(() =>
// 	import('../Carousels/CarouselDetailContainer')
// )

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
			border-left: ${styles.scale.px7} solid ${styles.colors.lightGray};
			margin-left: 0;
			padding-left: ${styles.scale.px24};
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

const ContentStory = ({ data, pageUrl }) => {
	return (
		<section css={storyContentCSS}>
			<aside css={socialButtonsCSS}>
				<h3>Share this Story</h3>
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
					} else if (article.__typename === 'DatoCmsVideo') {
						return (
							<ContentVideo
								video={article.video.video.mp4Url}
								poster={article.poster.url}
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
						return <ContentAudio audio={article.audio} />
					} else if (article.__typename === 'DatoCmsHeading') {
						return (
							<ContentHeading
								heading={article.heading}
								level={article.headingLevel}
							/>
						)
					}
					return ''
				})}
			</div>
			<FacebookComments pageUrl={pageUrl} />
		</section>
	)
}

export default ContentStory
