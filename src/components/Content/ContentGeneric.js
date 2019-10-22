import React from 'react'
import { css } from '@emotion/core'

import RecommendationsVideoStories from '../Recommendations/RecommendationsVideoStories'
import Table from '../Table/Table'

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
	const [page, markdown] = data
	const { details } = page
	let markdownIndex = 0
	return (
		<section css={storyContentCSS}>
			{details.map((detail, index) => {
				if (detail.__typename === 'DatoCmsContent') {
					return (
						<div
							key={index}
							id={createAnchor(detail.contentHeading)}
						>
							<h2 css={contentHeadingCSS}>
								{detail.contentHeading}
							</h2>
							<div
								dangerouslySetInnerHTML={{
									__html: detail.contentBody,
								}}
							></div>
						</div>
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
				} else if (detail.__typename === 'DatoCmsTable') {
					markdownIndex += 1
					return (
						<Table
							table={markdown.edges[markdownIndex - 1].node.html}
						/>
					)
				}
			})}
		</section>
	)
}

export default ContentGeneric
