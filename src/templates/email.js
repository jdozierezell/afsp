import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/Layout'
import HeroImage from '../components/Hero/HeroImage'
import EmailLanding from '../components/EmailSignup/EmailLanding'

import { styles } from '../css/css'

const ctaImageCSS = css`
	display: none;
	@media (min-width: ${styles.screens.tablet}px) {
		display: flex;
		align-content: top;
	}
	img {
		width: 100%;
		height: auto !important;
	}
`

const embedCSS = css`
	margin-left: 0 !important;
`

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

	const emailBodyCSS = css`
		display: grid;
		grid-template-columns: 1fr;
		margin: 0 ${styles.scale.px24};
		@media (min-width: ${styles.screens.tablet}px) {
			margin: ${styles.scale.px50} ${styles.scale.px50}
				${styles.scale.px80};
		}
		@media (min-width: ${styles.screens.tablet}px) {
			grid-template-columns: ${email.callToActionImage
				? `1fr 1fr`
				: `1fr`};
		}
	`

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={email.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroImage title={email.title} heroImage={email.heroImage} />
			<EmailLanding
				callToAction={email.callToAction}
				callToActionImage={email.callToActionImage}
			/>
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
				alt
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
			embedHtml
		}
	}
`
