import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import HeroBio from '../components/Hero/HeroBio'

import { styles } from '../css/css'

const biographyCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px80} auto;
		max-width: 623px;
	}
`

const Bio = ({ data: { bio } }) => {
	let metaImage,
		metaDescription = ''
	bio.seoMetaTags.tags.forEach(tag => {
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
		'@type': 'Person',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: bio.name,
		affiliation: 'American Foundation for Suicide Prevention',
		jobTitle: bio.title,
		url: `https://afsp.org/bio/${bio.slug}`,
	}
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={bio.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroBio name={bio.name} title={bio.title} image={bio.photo} />
			<main
				css={biographyCSS}
				dangerouslySetInnerHTML={{ __html: bio.biography }}
			></main>
		</Layout>
	)
}

export default Bio

export const query = graphql`
	query ($slug: String) {
		bio: datoCmsBio(slug: { eq: $slug }) {
			name
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			title
			photo {
				url
				alt
				gatsbyImageData(
					width: 768
					placeholder: NONE
					imgixParams: {
						fit: "crop"
						crop: "faces"
						w: "768"
						h: "768"
					}
				)
			}
			biography
		}
	}
`
