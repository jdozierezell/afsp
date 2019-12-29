import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { styles } from '../../css/css'
import buildUrl from '../../utils/buildUrl'

const featuredCSS = css`
	position: relative;
	img {
		margin: 0;
	}
	h2 {
		font-family: ${styles.fonts.avenirBold};
		font-size: ${styles.scale.px24};
		margin: ${styles.scale.px30} 0;
	}
	p {
		margin-bottom: ${styles.scale.px50};
	}
	.featured-link {
		position: absolute;
		bottom: 0;
	}
`

const FeaturedResources = ({ data }) => {
	return (
		<div css={featuredCSS}>
			<img
				src={`${data.seo.image.url}?w=600&h=370&fit=crop&crop=faces`}
				alt=""
			/>
			<h2>{data.title}</h2>
			<p
				dangerouslySetInnerHTML={{
					__html: data.seo.description,
				}}
			></p>
			<AniLink
				fade
				duration={styles.duration}
				to={buildUrl(data.__typename, data.slug)}
				className="featured-link"
			>
				Learn more
			</AniLink>
		</div>
	)
}

export default FeaturedResources
