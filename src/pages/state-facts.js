import React from 'react'
import { graphql } from 'gatsby'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import FactsListContainer from '../components/StateFacts/FactsListContainer'

import { styles } from '../css/css'
import { sitewide } from '../utils/sitewideVariables'

const StateFacts = ({ data: { stateFactsPage, stateFacts } }) => {
	let metaImage,
		metaDescription = ''
	stateFactsPage.seoMetaTags.tags.forEach(tag => {
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
		name: stateFactsPage.title,
		lastReviewed: stateFactsPage.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${stateFactsPage.slug}`,
	}

	stateFactsPage.brief = `${stateFactsPage.brief} Updated: ${sitewide.stateFactsUpdate}.`

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={stateFactsPage.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroSolid data={stateFactsPage} />
			<FactsListContainer stateFacts={stateFacts.edges} />
		</Layout>
	)
}

export default StateFacts

export const Head = ({ data: { stateFactsPage } }) => {
	let metaImage,
		metaDescription = ''

	stateFactsPage.seoMetaTags.tags.forEach(tag => {
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
		'@type': 'Blog',
		about: 'suicide',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: stateFactsPage.title,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${stateFactsPage.slug}`,
	}

	return (
		<SEO
			structuredData={structuredData}
			meta={stateFactsPage.seoMetaTags}
		/>
	)
}

export const query = graphql`
	query {
		stateFactsPage: datoCmsStateFactsPage {
			title
			brief
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
		}
		stateFacts: allDatoCmsStateFact(
			limit: 66
			sort: { fields: stateName, order: ASC }
		) {
			totalCount
			edges {
				node {
					__typename
					slug
					stateName
					stateFactSheetImage {
						url
						alt
						gatsbyImageData(
							width: 623
							placeholder: NONE
							imgixParams: { w: "623" }
						)
					}
				}
			}
		}
	}
`
