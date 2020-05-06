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

const CustomShareable = ({ data: { customShareables, afspMedia } }) => {
	customShareables.shareableOverlays.forEach(overlay => {
		overlay.id = overlay.id
			.replace('DatoCmsOverlay-', '')
			.replace('-en', '')
		afspMedia.customShareable.shareableOverlays.forEach(media => {
			if (overlay.id === media.id) {
				overlay.image.responsiveImage = media.image.responsiveImage
			}
		})
	})
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={customShareables.seoMetaTags}
		>
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
				}
			}
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
		}
		afspMedia: afspMedia {
			customShareable(filter: { slug: { eq: $slug } }) {
				shareableOverlays {
					id
					image {
						responsiveImage(
							imgixParams: { auto: format, w: "1080" }
						) {
							alt
							aspectRatio
							height
							sizes
							src
							title
							srcSet
							webpSrcSet
							width
						}
					}
				}
			}
		}
	}
`
