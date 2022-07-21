import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { styles } from '../../css/css'
import buildUrl from '../../utils/buildUrl'

const featuredCSS = css`
	position: relative;
	background-color: ${styles.colors.white};
	padding: ${styles.scale.px16};
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
		font-family: ${styles.fonts.avenirRegular};
	}
`

const FeaturedResources = ({ data }) => {
	let description, url
	const image = data.seo ? data.seo.image : data.coverImage
	if (data.externalDescription) {
		description = data.externalDescription
	} else if (data.seo) {
		description = data.seo.description
	}

	if (data.resourceLink) {
		const resource = data.resourceLink[0]
		console.log(data.resourceLink)
		if (typeof resource !== 'undefined') {
			console.log(resource)
			if (resource.__typename === 'DatoCmsExternalUrl') {
				url = resource.externalUrl
			} else if (resource.__typename === 'DatoCmsDownload') {
				url = resource.download.url
			}
		}
	} else {
		url = data.slug
	}
	return (
		<div css={featuredCSS}>
			<GatsbyImage image={image.gatsbyImageData} alt="" />
			<h2 dangerouslySetInnerHTML={{ __html: data.title }}></h2>
			<p
				dangerouslySetInnerHTML={{
					__html: description,
				}}
			></p>
			{data.resourceLink && typeof resource !== 'undefined' && (
				<a
					className="featured-link"
					href={url}
					target="_blank"
					rel="noreferrer noopener"
				>
					{data.resourceLink[0].__typename === 'DatoCmsDownload'
						? 'Download and share'
						: 'Learn more'}
				</a>
			)}
			{!data.resourceLink && (
				<Link
					to={buildUrl(data.__typename, url)}
					className="featured-link"
				>
					Learn more
				</Link>
			)}
		</div>
	)
}

export default FeaturedResources
