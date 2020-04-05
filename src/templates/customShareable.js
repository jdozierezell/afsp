import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'
import ShareableContainer from '../components/Shareable/ShareableContainer'

import { styles } from '../css/css'

const CustomShareable = ({ data }) => {
	const { customShareables } = data
	console.log(customShareables.customText)
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={customShareables.seoMetaTags} />
			<HeroSolid data={customShareables} />
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
						maxWidth: 600
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "600"
							h: "600"
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
