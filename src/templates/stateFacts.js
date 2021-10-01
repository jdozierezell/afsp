import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import HeroFacts from '../components/Hero/HeroFacts'
import NavigationSideStateFacts from '../components/Navigation/NavigationSideStateFacts'

import { styles } from '../css/css'

const initiativesAndPlansCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	max-width: 623px;
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px50} ${styles.scale.px50} 0;
	}
	@media (min-width: ${styles.screens.video}px) {
		width: calc(100vw - 555px);
	}
`

const StateFacts = ({ data: { stateFacts } }) => {
	let metaImage,
		metaDescription = ''
	stateFacts.seoMetaTags.tags.forEach(tag => {
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
		about: 'suicide public policy',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: stateFacts.state,
		lastReviewed: stateFacts.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/facts/${stateFacts.slug}`,
	}
	stateFacts.factSections = [
		{
			display: 'Mental Health Parity',
			anchor: 'mental-health-parity',
		},
		{
			display: 'K – 12 School Suicide Prevention',
			anchor: 'k-12-school-suicide-prevention',
			public: { display: 'Public Schools' },
			private: { display: 'Private Schools' },
		},
		{
			display:
				'Health Professional training in suicide assessment, treatment and management',
			anchor: 'health-professional-training',
		},
		{
			display: 'Conversion therapy bans',
			anchor: 'conversion-therapy-bans',
		},
		{
			display: 'University and college campus suicide prevention',
			anchor: 'university-and-college',
			public: { display: 'Public Schools' },
			private: { display: 'Private Schools' },
		},
	]
	console.log(stateFacts)
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={stateFacts.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroFacts stateFacts={stateFacts}></HeroFacts>
			<NavigationSideStateFacts
				factSections={stateFacts.factSections}
				slug={stateFacts.slug}
			></NavigationSideStateFacts>
			<section css={initiativesAndPlansCSS}>
				<div
					dangerouslySetInnerHTML={{
						__html: stateFacts.initiativesAndPlans,
					}}
				></div>
			</section>
		</Layout>
	)
}

export default StateFacts

export const query = graphql`
	query ($slug: String) {
		stateFacts: datoCmsStateFact(slug: { eq: $slug }) {
			stateName
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
			stateFactSheetImage {
				url
				alt
				gatsbyImageData(width: 768)
			}
			stateFactSheetUrl
			initiativesAndPlans
			parityLawCodified
		}
	}
`
