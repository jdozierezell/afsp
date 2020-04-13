import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import { Link } from 'gatsby'

import { styles } from '../../css/css'

import buildUrl from '../../utils/buildUrl'

const h2 = css`
	text-align: center;
	font-size: ${styles.scale.px36};
	margin-bottom: ${styles.scale.px40};
	@media (min-width: ${styles.screens.tablet}px) {
		width: 70%;
		text-align: left;
		font-size: ${styles.scale.px56};
		margin-bottom: 0;
	}
`

const CTANoDescription = ({ cta }) => {
	const { heading, linkText, file, fileAsset, linkUrl, link, external } = cta
	return (
		<>
			<h2 css={h2}>{heading}</h2>
			{file && (
				<a href={fileAsset.url} className="secondary-button">
					{linkText}
				</a>
			)}
			{!file && external && (
				<a href={linkUrl} className="secondary-button">
					{linkText}
				</a>
			)}
			{!file && !external && (
				<Link
					className="secondary-button"
					to={buildUrl(link.__typename, link.slug)}
				>
					{linkText}
				</Link>
				// <AniLink
				// 	fade
				// 	duration={styles.duration}
				// 	to={buildUrl(link.__typename, link.slug)}
				// >
				// 	{linkText}
				// </AniLink>
			)}
		</>
	)
}

export default CTANoDescription
