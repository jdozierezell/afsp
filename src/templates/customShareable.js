import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import ShareableContainer from '../components/Shareable/ShareableContainer'

import { styles } from '../css/css'

const addCSS = css`
	h1,
	div {
		@media (min-width: ${styles.screens.tablet}px) {
			width: calc(100vw / 2.25);
		}
	}
`

const CustomShareable = ({ data: { customShareables } }) => {
	let fontLink
	if (customShareables.textBoxValues) {
		if (customShareables.textBoxValues.fontFamily) {
			if (
				customShareables.textBoxValues.fontFamily ===
				"'Marck Script', cursive"
			) {
				fontLink =
					'https://fonts.googleapis.com/css2?family=Marck+Script&display=swap'
			} else if (
				customShareables.textBoxValues.fontFamily !==
				'AvenirNextLTPro-Regular, Arial, sans-serif'
			) {
				customShareables.textBoxValues.fontFamily =
					'AvenirNextLTPro-Regular, Arial, sans-serif'
			}
		}
	}
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			{fontLink && <link href={fontLink} rel="stylesheet" />}
			<HeroSolid data={customShareables} addCSS={addCSS} />
			<ShareableContainer
				instructions={customShareables.instructions}
				fileName={customShareables.fileName}
				customText={{
					isCustom: customShareables.customText,
					customValues: customShareables.textBoxValues,
				}}
				overlays={customShareables.shareableOverlays}
				backgroundImage={customShareables.backgroundImage.url}
			/>
		</Layout>
	)
}

export default CustomShareable

export const Head = ({ data: { customShareables } }) => {
	let metaImage,
		metaDescription = ''
	customShareables.seoMetaTags.tags.forEach(tag => {
		if (tag.attributes) {
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:image'
			) {
				metaImage = tag.attributes.content
			}
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:description'
			) {
				metaDescription = tag.attributes.content
			}
		}
	})
	const structuredData = {
		'@content': 'https://schema.org',
		'@type': 'WebPage',
		about: 'suicide',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: customShareables.title,
		lastReviewed: customShareables.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${customShareables.slug}`,
	}

	return (
		<SEO
			structuredData={structuredData}
			meta={customShareables.seoMetaTags}
		/>
	)
}

export const query = graphql`
	query ($slug: String) {
		customShareables: datoCmsCustomShareable(slug: { eq: $slug }) {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
			brief
			instructions
			customText
			textBoxValues
			fileName
			backgroundImage {
				url
			}
			shareableOverlays {
				id
				image {
					url
					alt
					gatsbyImageData(
						width: 1080
						placeholder: NONE
						imgixParams: { w: "1080" }
					)
				}
				useDarkText
			}
		}
	}
`
