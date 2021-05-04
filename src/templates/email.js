import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroImage from '../components/Hero/HeroImage'

import { styles } from '../css/css'

const Email = ({ data: { email } }) => {
	let metaImage,
		metaDescription = ''
	email.seoMetaTags.tags.forEach(tag => {
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
		name: email.title,
		lastReviewed: email.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${email.slug}`,
	}
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={email.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroImage title={email.title} heroImage={email.heroImage} />
			foo
		</Layout>
	)
}

export default Email

export const query = graphql`
	query($slug: String) {
		email: datoCmsEmail(slug: { eq: $slug }) {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
			heroImage {
				url
				gatsbyImageData(
					width: 769
					placeholder: NONE
					imgixParams: {
						auto: "format"
						fit: "crop"
						crop: "faces"
						w: "769"
						h: "475"
					}
				)
			}
			callToAction
			callToActionImage {
				alt
				url
				gatsbyImageData(
					width: 623
					placeholder: NONE
					imgixParams: {
						auto: "format"
						fill: "blur"
						fit: "fill"
						h: "384"
						w: "623"
					}
				)
			}
		}
	}
`
