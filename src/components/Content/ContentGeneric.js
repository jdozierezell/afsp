import React from 'react'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

import Content from './Content'
import RecommendationsVideoStories from '../Recommendations/RecommendationsVideoStories'
import CardContainer from '../Cards/CardContainer'
import ContentImage from './ContentImage'
import ContentVideo from './ContentVideo'
import CarouselDetailContainer from '../Carousels/CarouselDetailContainer'
import ContentAudio from './ContentAudio'
import ContentHeading from './ContentHeading'
import ContentEmbed from './ContentEmbed'
import ContentTweet from './ContentTweet'

const storyContentCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px50} ${styles.scale.px50} 0;
	}
	.secondary-button {
		margin-right: ${styles.scale.px24};
		:not(:last-child) {
			margin-bottom: 0;
		}
	}
	> a:not(:last-of-type) {
		margin-bottom: ${styles.scale.px36};
	}
`

const detailCarouselCSS = css`
	margin: ${styles.scale.px50} 0 ${styles.scale.px50} -${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: 0 0 0 -${styles.scale.px50};
	}
`

const ContentGeneric = ({ setEvents, data, navigation }) => {
	const { details } = data
	const sectionWidth = !data.overrideWidth ? `calc(100vw - 555px)` : `auto`
	let adjacent = 0
	return (
		<section
			css={css`
				${storyContentCSS};
				max-width: ${!data.overrideWidth ? `623px` : `auto`};
				@media (min-width: ${styles.screens.video}px) {
					width: ${!data.overrideWidth ? sectionWidth : `auto`};
				}
			`}
		>
			{details.map((detail, index) => {
				const itemsToCheck = ['DatoCmsCardContainer']
				const prevIndex = index > 0 ? index - 1 : null
				if (
					prevIndex !== null &&
					itemsToCheck.includes(detail.__typename)
				) {
					adjacent++
				} else {
					adjacent = 0
				}
				if (detail.__typename === 'DatoCmsContent') {
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
								poster: detail.poster.gatsbyImageData.src,
							}}
							heading={detail.recommendationHeading}
							storyData={detail.storyRecommendation}
						/>
					)
				} else if (detail.__typename === 'DatoCmsCardContainer') {
					console.log(detail.__typename)
					console.log(adjacent)
					return (
						<CardContainer
							key={index}
							cards={detail.cardContainerList}
							heading={detail.cardContainerHeading}
							addCSS={css`
								background-color: ${adjacent % 2 === 1
									? styles.colors.lightGray
									: styles.colors.white};
							`}
							cardCSS={css`
								background-color: ${adjacent % 2 === 1
									? styles.colors.white
									: styles.colors.lightGray};
							`}
						/>
					)
				} else if (detail.__typename === 'DatoCmsImage') {
					return (
						<ContentImage
							key={index}
							image={detail.images}
							imagesToShow={detail.imagesToShow}
						/>
					)
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
				} else if (detail.__typename === 'DatoCmsTweet') {
					return (
						<ContentTweet
							key={index}
							tweet={detail.tweet}
							navigation={navigation}
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
