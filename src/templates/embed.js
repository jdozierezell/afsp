import React from 'react'
import { graphql } from 'gatsby'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import Embed from '../components/Embed/Embed'

import { styles } from '../css/css'

const EmbedPage = ({ data: { embed } }) => {
	embed.brief = embed.seo.description
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HeroSolid data={embed} />
			<Embed embed={embed.embed} />
		</Layout>
	)
}

export default EmbedPage

export const Head = ({ data: { embed } }) => {
	let metaImage,
		metaDescription = ''
	embed.seoMetaTags.tags.forEach(tag => {
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
		name: embed.title,
		lastReviewed: embed.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${embed.slug}`,
	}

	return <SEO structuredData={structuredData} meta={embed.seoMetaTags} />
}

export const query = graphql`
	query ($slug: String) {
		embed: datoCmsEmbedPage(slug: { eq: $slug }) {
			title
			slug
			embed
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			seo {
				description
			}
			meta {
				publishedAt
			}
		}
	}
`
