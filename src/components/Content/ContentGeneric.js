import React from 'react'
import { css } from '@emotion/core'

import RecommendationsVideoStories from '../Recommendations/RecommendationsVideoStories'
import Content from './Content'
import CardContainer from '../Cards/CardContainer'

import { styles } from '../../css/css'
import createAnchor from '../../utils/createAnchor'

const storyContentCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
		max-width: 623px;
	}
`

const contentHeadingCSS = css`
	font-size: ${styles.scale.px36};
	margin: ${styles.scale.px50} 0 ${styles.scale.px35};
	@media (min-width: ${styles.screens.mobile}px) {
		${styles.scale.px44};
		margin: ${styles.scale.px80} 0 ${styles.scale.px40};
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
					// } else if (detail.__typename === 'DatoCmsTable') {
					// 	return (
					// 		<Table
					// 			key={index}
					// 			tableHeading={detail.tableHeading}
					// 			tableBody={
					// 				detail.tableBodyNode.childMarkdownRemark.html
					// 			}
					// 		/>
					// 	)
				} else if (detail.__typename === 'DatoCmsCardContainer') {
					return (
						<CardContainer
							key={index}
							cards={detail.cardContainerList}
							heading={detail.cardContainerHeading}
						/>
					)
				}
				return ''
			})}
		</section>
	)
}

export default ContentGeneric
