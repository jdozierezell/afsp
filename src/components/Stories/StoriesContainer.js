import React, { useState } from 'react'
import { css } from '@emotion/core'

import Stories from './Stories'

import createAnchor from '../../utils/createAnchor'

import { styles } from '../../css/css'

const containerCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	z-index: 1;
	position: relative;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
	> h2 {
		margin-bottom: ${styles.scale.px35};
		font-size: ${styles.scale.px36};
		font-family: ${styles.fonts.paul};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: ${styles.scale.px60};
			font-size: ${styles.scale.px44};
		}
	}
`

const storiesCSS = css`
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: ${styles.scale.px50};
	grid-column-gap: ${styles.gridGap.desktop};
	@media (min-width: ${styles.screens.tablet}px) {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
	img {
		width: 100%;
	}
`

const moreButtonCSS = css`
	margin-top: ${styles.scale.px40};
	text-align: center;
	@media (min-width: ${styles.screens.tablet}px) {
		margin-top: ${styles.scale.px60};
	}
`

const StoriesContainer = ({ header, first, offset, more, intro, stories }) => {
	const [displayNumber, setDisplayNumber] = useState(3)
	return (
		<section css={containerCSS} id={header ? createAnchor(header) : null}>
			{header && <h2>{header}</h2>}
			{intro && (
				<div
					css={css`
						margin-top: -${styles.scale.px24};
						margin-bottom: ${styles.scale.px36};
					`}
					dangerouslySetInnerHTML={{ __html: intro }}
				></div>
			)}
			{first && (
				<div css={storiesCSS}>
					{stories.map(
						(story, index) =>
							index < displayNumber && (
								<Stories key={index} story={story} />
							)
					)}
				</div>
			)}
			{!first && (
				<div css={storiesCSS}>
					{stories
						.slice(offset)
						.map(
							(story, index) =>
								index < displayNumber && (
									<Stories key={index} story={story} />
								)
						)}
				</div>
			)}
			{more && stories.length > displayNumber && (
				<div css={moreButtonCSS}>
					<button
						className="secondary-button"
						onClick={() => setDisplayNumber(displayNumber + 6)}
					>
						Load more
					</button>
				</div>
			)}
		</section>
	)
}

export default StoriesContainer
