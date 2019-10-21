import React from 'react'
import { css } from '@emotion/core'

import RecommendationsVideoStories from '../Recommendations/RecommendationsVideoStories'

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
				}
			})}
		</section>
	)
}

export default ContentGeneric
