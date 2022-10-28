import React from 'react'
import { graphql } from 'gatsby'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import EmailLanding from '../components/EmailSignup/EmailLanding'

import { styles } from '../css/css'

const Email = ({ data: { email } }) => {
	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopDark}
			hideEmailLayout={true}
		>
			<EmailLanding
				callToAction={email.callToAction}
				callToActionImage={email.callToActionImage}
				embedHtml={email.embedHtml}
			/>
		</Layout>
	)
}

export default Email

export const Head = ({ data: { email } }) => {
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

	return <SEO structuredData={structuredData} meta={email.seoMetaTags} />
}

export const query = graphql`
	query ($slug: String) {
		email: datoCmsEmail(slug: { eq: $slug }) {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
			callToAction
			callToActionImage {
				alt
				url
				gatsbyImageData(
					width: 1080
					placeholder: NONE
					imgixParams: { w: "1080" }
				)
			}
			embedHtml
		}
	}
`
