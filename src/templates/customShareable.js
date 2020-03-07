import React, { useState, useRef, useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'
import ShareableContainer from '../components/Shareable/ShareableContainer'

import { styles } from '../css/css'

const CustomShareable = ({ data }) => {
	const { customShareables } = data
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={customShareables.seoMetaTags} />
			<HeroSolid data={customShareables} />
			<ShareableContainer instructions={customShareables.instructions} />
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
			backgroundImage {
				url
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
