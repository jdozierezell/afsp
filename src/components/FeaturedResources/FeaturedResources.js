import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Img from 'gatsby-image'

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
	console.log(data)
	let fluidImage, description
	if (data.coverImage) {
		fluidImage = data.coverImage.fluid
	} else if (data.seo && data.seo.image) {
		fluidImage = data.seo.image.fluid
	}
	if (data.externalDescription) {
		description = data.externalDescription
	} else if (data.seo) {
		description = data.seo.description
	}
	return (
		<div css={featuredCSS}>
			<Img fluid={fluidImage} alt="" />
			<h2 dangerouslySetInnerHTML={{ __html: data.title }}></h2>
			<p
				dangerouslySetInnerHTML={{
					__html: description,
				}}
			></p>
			{data.externalUrl && (
				<a
					href={data.externalUrl}
					target="_blank"
					rel="noreferrer noopener"
				>
					Learn more
				</a>
			)}
			{!data.externalUrl && (
				<AniLink
					fade
					duration={styles.duration}
					to={buildUrl(data.__typename, data.slug)}
					className="featured-link"
				>
					Learn more
				</AniLink>
			)}
		</div>
	)
}

export default FeaturedResources
