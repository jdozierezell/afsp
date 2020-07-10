import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import { styles } from '../../css/css'

import buildUrl from '../../utils/buildUrl'

const recommendationsVideoCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: ${styles.scale.px36};
	h2 {
		margin-bottom: 0;
		color: ${styles.colors.white};
	}
	@media (min-width: ${styles.screens.mobile}px) {
		h2 {
			grid-column: 1 / 3;
		}
	}
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px36} ${styles.scale.px50} ${styles.scale.px36};
		${styles.scale.px24};
		h2 {
			font-family: ${styles.fonts.avenirBold};
			font-size: ${styles.scale.px36};
			grid-column: 1 / 3;
		}
	}
	@media (min-width: ${styles.screens.navigation}px) {
		h2 {
			grid-column: 1 / 2;
		}
	}
	@media (min-width: ${styles.screens.mobile}px) and (max-width: ${styles
			.screens.navigation}px) {
		grid-template-columns: repeat(2, 1fr);
	}
`

const recommendationsNoVideoCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: ${styles.scale.px36};
	h2 {
		margin-bottom: 0;
		color: ${styles.colors.white};
	}
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px36} ${styles.scale.px50} ${styles.scale.px36};
		${styles.scale.px24};
		h2 {
			font-family: ${styles.fonts.avenirBold};
			font-size: ${styles.scale.px36};
		}
	}
`

const storyCSS = css`
	:last-of-type {
		margin-bottom: 0;
	}
	h3 {
		margin: 0 0 ${styles.scale.px35};
		color: ${styles.colors.white};
		font-size: ${styles.scale.px24};
		font-family: ${styles.fonts.avenirBold};
	}
	h4 {
		font-size: ${styles.scale.px17};
		font-family: ${styles.fonts.avenirRegular};
		text-transform: uppercase;
		margin: 0;
		color: ${styles.colors.white};
	}
`

const Recommendations = ({ data, heading, video }) => {
	const cssStyle = video ? recommendationsVideoCSS : recommendationsNoVideoCSS
	console.log(data)
	return (
		<div css={cssStyle}>
			{heading && <h2>{heading}</h2>}
			{data.map((story, index) => (
				<div key={index} css={storyCSS}>
					<Link
						to={buildUrl(story.__typename, story.slug)}
						css={css`
							text-decoration: none;
						`}
					>
						<h3>{story.title}</h3>
					</Link>
					<h4>
						By{' '}
						{story.author.map((author, index) =>
							index + 1 < story.author.length
								? `${author.authorName}, `
								: author.authorName
						)}
					</h4>
				</div>
			))}
		</div>
	)
}

export default Recommendations
