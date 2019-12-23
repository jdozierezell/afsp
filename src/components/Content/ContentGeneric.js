import React from 'react'
import { css } from '@emotion/core'

import RecommendationsVideoStories from '../Recommendations/RecommendationsVideoStories'
import Content from './Content'
import ContentVideo from './ContentVideo'
import ContentAudio from './ContentAudio'
import CardContainer from '../Cards/CardContainer'

import { styles } from '../../css/css'

const storyContentCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
		max-width: 623px;
	}
`

const ContentGeneric = ({ data }) => {
	const { details } = data
	return (
		<section css={storyContentCSS}>
			{details.map((detail, index) => {
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
								title: detail.videoTitle,
								url: detail.videoUrl,
							}}
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
				} else if (detail.__typename === 'DatoCmsVideo') {
					return <ContentVideo video={detail} />
				} else if (detail.__typename === 'DatoCmsAudio') {
					console.log(detail)
					return <ContentAudio audio={detail} />
				} else if (detail.__typename === 'DatoCmsActionButton') {
					return (
						<a
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
