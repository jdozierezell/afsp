import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { styles } from '../../css/css'

import buildUrl from '../../utils/buildUrl'

const h2 = css`
	text-align: center;
	font-size: ${styles.scale.px36};
	margin-bottom: ${styles.scale.px30};
	@media (min-width: ${styles.screens.tablet}px) {
		font-size: ${styles.scale.px56};
	}
`
const p = css`
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
	:last-of-type {
		margin-bottom: ${styles.scale.px40};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-bottom: ${styles.scale.px80};
		}
	}
`

const CTAWithDescription = ({ cta }) => {
	const { heading, brief, linkText, linkUrl, link, external } = cta
	return (
		<>
			<h2 css={h2}>{heading}</h2>
			<p
				css={p}
				dangerouslySetInnerHTML={{
					__html: brief,
				}}
			></p>
			{external && (
				<a href={linkUrl} className="secondary-button">
					{linkText}
				</a>
			)}
			{!external && (
				<AniLink
					className="secondary-button"
					fade
					duration={styles.duration}
					to={buildUrl(link.__typename, link.slug)}
				>
					{linkText}
				</AniLink>
			)}
		</>
	)
}

export default CTAWithDescription
