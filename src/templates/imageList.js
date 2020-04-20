import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import ImageListContainer from '../components/ImageList/ImageListContainer'

import { styles } from '../css/css'

const ImageList = ({ data }) => {
	const { imageList } = data
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={imageList.seoMetaTags}
		>
			<HeroSolid data={imageList} />
			<ImageListContainer images={imageList.images}></ImageListContainer>
		</Layout>
	)
}

export default ImageList

export const query = graphql`
	query($slug: String) {
		imageList: datoCmsImageList(slug: { eq: $slug }) {
			title
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			brief
			images {
				image {
					url
					crop: fluid(
						maxWidth: 600
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "600"
							h: "370"
						}
					) {
						...GatsbyDatoCmsFluid
					}
					original: fluid(
						maxWidth: 600
						imgixParams: { auto: "format" }
					) {
						...GatsbyDatoCmsFluid
					}
				}
				linkToOther
				otherUrl
				cropImage
			}
		}
	}
`
