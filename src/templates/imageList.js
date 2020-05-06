import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import ImageListContainer from '../components/ImageList/ImageListContainer'

import { styles } from '../css/css'

const ImageList = ({ data: { imageList, afspMedia } }) => {
	imageList.images.forEach(image => {
		image.id = image.id.replace('DatoCmsListImage-', '').replace('-en', '')
		afspMedia.imageList.images.forEach(media => {
			if (image.id === media.id) {
				image.image.responsiveCrop = media.image.responsiveCrop
				image.image.responsiveOriginal = media.image.responsiveOriginal
			}
		})
	})

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
				id
				image {
					url
				}
				linkToOther
				otherUrl
				cropImage
			}
		}
		afspMedia: afspMedia {
			imageList(filter: { slug: { eq: $slug } }) {
				images {
					id
					image {
						responsiveCrop: responsiveImage(
							imgixParams: {
								auto: format
								crop: faces
								fit: crop
								h: "370"
								w: "600"
							}
						) {
							alt
							height
							sizes
							src
							srcSet
							title
							webpSrcSet
							width
						}
						responsiveOriginal: responsiveImage(
							imgixParams: { auto: format, w: "600" }
						) {
							alt
							height
							sizes
							src
							srcSet
							title
							webpSrcSet
							width
						}
					}
				}
			}
		}
	}
`
