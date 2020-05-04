import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { Image } from 'react-datocms'

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
		font-family: ${styles.fonts.avenirRegular};
	}
`

const FeaturedResources = ({ data }) => {
	let fluidImage, description, url

	if (!data.seo) {
		fluidImage = data.coverImage.responsiveImage
	} else if (data.seo && data.seo.image) {
		fluidImage = data.seo.image.responsiveImage
	}

	if (data.externalDescription) {
		description = data.externalDescription
	} else if (data.seo) {
		description = data.seo.description
	}

	if (data.resourceLink) {
		const resource = data.resourceLink[0]
		if (resource.__typename === 'DatoCmsExternalUrl') {
			url = resource.externalUrl
		} else if (resource.__typename === 'DatoCmsDownload') {
			url = resource.download.url
		}
	} else {
		url = data.slug
	}

	return (
		<div css={featuredCSS}>
			<Image data={fluidImage} />
			<h2 dangerouslySetInnerHTML={{ __html: data.title }}></h2>
			<p
				dangerouslySetInnerHTML={{
					__html: description,
				}}
			></p>
			{data.resourceLink && (
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
