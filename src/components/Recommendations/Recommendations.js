import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { styles } from '../../css/css'

import buildUrl from '../../utils/buildUrl'

const recommendationsCSS = css`
	background-color: ${styles.colors.blue};
	padding: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.tablet}px) {
		padding: ${styles.scale.px36} ${styles.scale.px50} ${styles.scale.px36};
		${styles.scale.px24};
	}
	h2 {
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px17};
		color: ${styles.colors.white};
	}
`

const storyCSS = css`
	margin-bottom: ${styles.scale.px60};
	:last-of-type {
		margin-bottom: 0;
	}
	h3 {
		margin: ${styles.scale.px45} 0 ${styles.scale.px35};
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

const Recommendations = ({ data, heading }) => {
	return (
		<div css={recommendationsCSS}>
			{heading && <h2>{heading}</h2>}
			{data.map((story, index) => (
				<div key={index} css={storyCSS}>
					<AniLink
						fade
						duration={styles.duration}
						to={buildUrl(story.__typename, story.slug)}
						css={css`
							text-decoration: none;
						`}
					>
						<h3>{story.title}</h3>
					</AniLink>
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
