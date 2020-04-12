import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
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

const CustomShareable = ({ data }) => {
	const { customShareables } = data
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={customShareables.seoMetaTags}>
				<html lang="en" />
			</HelmetDatoCms>
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
				image {
					url
					alt
					fluid(
						maxWidth: 1080
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "1080"
							h: "1080"
						}
					) {
						...GatsbyDatoCmsFluid
					}
				}
			}
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
		}
	}
`
