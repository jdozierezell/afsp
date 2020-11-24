import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ImageListContainer from '../components/ImageList/ImageListContainer'

import { styles } from '../css/css'

const ImageList = ({ data: { imageList } }) => {
	let metaImage,
		metaDescription = ''
	imageList.seoMetaTags.tags.forEach(tag => {
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
		name: imageList.title,
		lastReviewed: imageList.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${imageList.slug}`,
	}
	imageList.details = imageList.images
	let navigation = false
	imageList.details.forEach(detail => {
		if (detail.__typename === 'DatoCmsImageSectionHeader') {
			navigation = true
		}
	})
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={imageList.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroSolid data={imageList} />
			{navigation && <NavigationSide data={imageList} />}
			<ImageListContainer
				images={imageList.images}
				crop={imageList.cropImage}
				navigation={navigation}
			/>
		</Layout>
	)
}

export default ImageList

export const query = graphql`
	query($slug: String) {
		imageList: datoCmsImageList(slug: { eq: $slug }) {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
			brief
			images {
				... on DatoCmsImageSectionHeader {
					header
				}
				... on DatoCmsListImage {
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
	}
`
