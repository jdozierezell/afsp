import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import ShareableContainer from '../components/Shareable/ShareableContainer'

import { styles } from '../css/css'

const addCSS = css`
	h1,
	div {
		@media (min-width: ${styles.screens.tablet}px) {
			width: calc(100vw / 2);
		}
		@media (min-width: 1200px) {
			width: calc(100vw / 2.5);
		}
	}
`

const CustomShareable = ({ data: { customShareables } }) => {
	let metaImage,
		metaDescription = ''
	let fontLink
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
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={customShareables.seoMetaTags}
			structuredData={structuredData}
		>
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

export const query = graphql`
	query($slug: String) {
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
					fluid(
						maxWidth: 1080
						imgixParams: { auto: "format", w: "1080" }
					) {
						...GatsbyDatoCmsFluid_noBase64
					}
				}
				useDarkText
			}
		}
	}
`
