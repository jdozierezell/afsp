import React from 'react'
import { css } from '@emotion/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { styles } from '../../css/css'

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
	let slug = ''
	if (data.__typename) {
		switch (data.__typename) {
			case 'DatoCmsDetail':
				slug = `detail/${data.slug}`
				break
			case 'DatoCmsLanding':
				slug = `landing/${data.slug}`
				break
			case 'DatoCmsChapterPage':
				slug = `chapter/${data.slug}`
				break
			default:
				break
		}
	} else {
		// right now the only single model option is for detail pages; this will need to be adjusted if that changes
		slug = `detail/${data.slug}`
	}

	return (
		<div css={featuredCSS}>
			<img src={data.seo.image.fluid.src} alt="" />
			<h2>{data.title}</h2>
			<p
				dangerouslySetInnerHTML={{
					__html: data.seo.description,
				}}
			></p>
			<AniLink
				fade
				duration={styles.duration}
				to={`/${slug}`}
				className="featured-link"
			>
				Learn more
			</AniLink>
		</div>
	)
}

export default FeaturedResources
