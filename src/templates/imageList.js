import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import ImageListContainer from '../components/ImageList/ImageListContainer'

import { styles } from '../css/css'

const ImageList = ({ data: { imageList } }) => {
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={imageList.seoMetaTags}
		>
			<HeroSolid data={imageList} />
			<ImageListContainer
				images={imageList.images}
				crop={imageList.cropImage}
			/>
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
				id
				croppedImage: image {
					url
					alt
					fluid(
						maxWidth: 600
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "600"
							h: "370"
						}
					) {
						...GatsbyDatoCmsFluid_noBase64
					}
				}
				originalImage: image {
					url
					alt
					fluid(maxWidth: 600, imgixParams: { w: "600" }) {
						...GatsbyDatoCmsFluid_noBase64
					}
				}
				linkToOther
				otherUrl
				cropImage
			}
		}
	}
`
