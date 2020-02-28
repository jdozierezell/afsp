import React from 'react'
import { css } from '@emotion/core'

import Recommendations from './Recommendations'

import { styles } from '../../css/css'

const containerCSS = css`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 2fr 1fr;
		align-items: stretch;
	}
`

const storyContentCSS = css`
	margin: 0 ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: 0 ${styles.scale.px50};
		max-width: 623px;
	}
	h2 {
		font-size: ${styles.scale.px36};
		margin: ${styles.scale.px50} 0 ${styles.scale.px35};
		@media (min-width: ${styles.screens.mobile}px) {
			font-size: ${styles.scale.px44};
			margin: ${styles.scale.px80} 0 ${styles.scale.px40};
		}
	}
`

const RecommendationsContentStories = ({ data }) => {
	return (
		<section css={containerCSS}>
			<div css={storyContentCSS}>
				<h2>{data.contentHeading}</h2>
				<div dangerouslySetInnerHTML={{ __html: data.content }}></div>
			</div>
			<Recommendations
				data={data.storyLink}
				heading={data.storiesHeading}
			/>
		</section>
	)
}

export default RecommendationsContentStories
