import React from 'react'
import { graphql } from 'gatsby'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ImageListContainer from '../components/ImageList/ImageListContainer'

import { styles } from '../css/css'

const ImageList = ({ data: { imageList } }) => {
	imageList.details = imageList.images
	let navigation = false
	imageList.details.forEach(detail => {
		if (detail.__typename === 'DatoCmsImageSectionHeader' && !navigation) {
			navigation = true
		}
	})
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HeroSolid data={imageList} />
			{navigation && <NavigationSide data={imageList} />}
			<ImageListContainer
				images={imageList.images}
				crop={imageList.croppedImage}
				navigation={navigation}
			/>
		</Layout>
	)
}

export default ImageList

export const Head = ({ data: { imageList } }) => {
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

	return <SEO structuredData={structuredData} meta={imageList.seoMetaTags} />
}

export const query = graphql`
	query ($slug: String) {
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
					__typename
					header
				}
				... on DatoCmsListImage {
					__typename
					id
					croppedImage: image {
						url
						alt
						gatsbyImageData(
							width: 600
							placeholder: NONE
							imgixParams: {
								fit: "crop"
								crop: "faces"
								w: "600"
								h: "370"
							}
						)
					}
					originalImage: image {
						url
						alt
						gatsbyImageData(
							width: 600
							placeholder: NONE
							imgixParams: { w: "600", fm: "png" }
						)
					}
					linkToOther
					otherUrl
					cropImage
				}
			}
		}
	}
`
