import React from 'react'
import { css } from '@emotion/core'

import RecommendationsVideoStories from '../Recommendations/RecommendationsVideoStories'
import Content from './Content'
import ContentEvent from './ContentEvent'
import ContentImage from './ContentImage'
import ContentVideo from './ContentVideo'
import ContentAudio from './ContentAudio'
import ContentHeading from './ContentHeading'
import ContentEmbed from './ContentEmbed'
import CardContainer from '../Cards/CardContainer'
import CarouselDetailContainer from '../Carousels/CarouselDetailContainer'

import { styles } from '../../css/css'

const storyContentCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
	.secondary-button {
		margin-right: ${styles.scale.px24};
	}
	> a:not(:last-of-type) {
		margin-bottom: ${styles.scale.px36};
	}
	p:last-of-type {
		margin-bottom: 0;
	}
`

const detailCarouselCSS = css`
	margin: ${styles.scale.px50} 0 ${styles.scale.px50} -${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} 0 ${styles.scale.px80} -${styles.scale.px50};
	}
`

const ContentGeneric = ({ setEvents, data, dataMedia }) => {
	const { details } = data
	const detailsMedia = dataMedia ? dataMedia.details : null

	return (
		<section
			css={css`
				${storyContentCSS};
				max-width: ${!data.overrideWidth ? `623px` : `auto`};
			`}
		>
			{details.map((detail, index) => {
				if (detail.__typename === 'DatoCmsEventList') {
					return (
						<ContentEvent
							key={index}
							setEvents={setEvents}
							programName={detail.programName}
						></ContentEvent>
					)
				} else if (detail.__typename === 'DatoCmsContent') {
					return (
						<Content
							key={index}
							contentHeading={detail.contentHeading}
							contentBody={detail.contentBody}
						/>
					)
				} else if (detail.__typename === 'DatoCmsRecommendation') {
					return (
						<RecommendationsVideoStories
							key={index}
							videoData={{
								title: detail.video.title,
								url: detail.video.video
									? detail.video.video.mp4Url
									: detail.video.url,
								poster: detail.poster.fluid.src,
							}}
							heading={detail.recommendationHeading}
							storyData={detail.storyRecommendation}
						/>
					)
				} else if (detail.__typename === 'DatoCmsCardContainer') {
					return (
						<CardContainer
							key={index}
							cards={detail.cardContainerList}
							heading={detail.cardContainerHeading}
						/>
					)
				} else if (detail.__typename === 'DatoCmsImage') {
					if (detailsMedia) {
						detailsMedia.forEach(media => {
							detail.id = detail.id
								.replace('DatoCmsImage-', '')
								.replace('-en', '')
							if (detail.id === media.id) {
								detail.images = media.images
							}
						})
					}
					return <ContentImage key={index} image={detail.images} />
				} else if (detail.__typename === 'DatoCmsVideo') {
					return (
						<ContentVideo
							key={index}
							video={
								detail.video.video
									? detail.video.video.mp4Url
									: detail.video.url
							}
							poster={detail.poster.url}
						/>
					)
				} else if (detail.__typename === 'DatoCmsDetailSquare') {
					return (
						<div
							css={css`
								${detailCarouselCSS};
								grid-column: 1 / 4;
							`}
							key={index}
						>
							<CarouselDetailContainer
								key={index}
								content={detail.detail}
							/>
						</div>
					)
				} else if (detail.__typename === 'DatoCmsAudio') {
					return <ContentAudio key={index} audio={detail.audio} />
				} else if (detail.__typename === 'DatoCmsHeading') {
					return (
						<ContentHeading
							key={index}
							heading={detail.heading}
							level={detail.headingLevel}
						/>
					)
				} else if (detail.__typename === 'DatoCmsEmbed') {
					return (
						<ContentEmbed
							key={index}
							embedCode={detail.embedCode}
						/>
					)
				} else if (detail.__typename === 'DatoCmsFeaturedStoryTag') {
					return null
				} else if (detail.__typename === 'DatoCmsActionButton') {
					return (
						<a
							key={index}
							className="secondary-button"
							href={detail.buttonLink}
						>
							{detail.buttonText}
						</a>
					)
				}
				return ''
			})}
		</section>
	)
}

export default ContentGeneric
