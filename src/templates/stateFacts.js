import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import HeroFacts from '../components/Hero/HeroFacts'
import NavigationSideStateFacts from '../components/Navigation/NavigationSideStateFacts'
import ContentFacts from '../components/Content/ContentFacts'

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
	const [factsTop, setFactsTop] = useState(null)
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
	stateFacts.facts = [
		{
			display: 'Mental Health Parity',
			anchor: 'mental-health-parity',
			facts: [
				{
					display: 'Federal parity law codified in state statute',
					value: stateFacts.enforceParityLaws,
				},
				{
					display: 'State regulators must enforce parity law(s)',
					value: stateFacts.parityLawCodified,
				},
				{
					display:
						'Public health plans (e.g., Medicaid) regularly submit parity compliance analyses to state regulators',
					value: stateFacts.privateHealthPlans,
				},
				{
					display:
						'Private health plans (individual and group) regularly submit parity compliance analyses to state regulators',
					value: stateFacts.publicHealthPlans,
				},
			],
		},
		{
			display: 'K – 12 School Suicide Prevention',
			anchor: 'k-12-school-suicide-prevention',
			public: { display: 'Public Schools', facts: ['foo'] },
			private: { display: 'Private Schools', facts: ['foo'] },
		},
		{
			display:
				'Health Professional training in suicide assessment, treatment and management',
			anchor: 'health-professional-training',
			facts: ['foo'],
		},
		{
			display: 'Conversion therapy bans',
			anchor: 'conversion-therapy-bans',
			facts: ['foo'],
		},
		{
			display: 'University and college campus suicide prevention',
			anchor: 'university-and-college',
			public: { display: 'Public Schools', facts: ['foo'] },
			private: { display: 'Private Schools', facts: ['foo'] },
		},
	]
	useEffect(() => {
		setFactsTop(
			document.getElementById('factsContainer').getBoundingClientRect()
				.height +
				document
					.getElementById('crisisResources')
					.getBoundingClientRect().height
		)
	}, [factsTop])
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={stateFacts.seoMetaTags}
			structuredData={structuredData}
		>
			<div id="factsContainer">
				<HeroFacts stateFacts={stateFacts}></HeroFacts>
			</div>
			{factsTop !== null && (
				<NavigationSideStateFacts
					facts={stateFacts.facts}
					slug={stateFacts.slug}
					topStart={factsTop}
				></NavigationSideStateFacts>
			)}
			<section css={initiativesAndPlansCSS}>
				<div
					dangerouslySetInnerHTML={{
						__html: stateFacts.initiativesAndPlans,
					}}
				></div>
				<ContentFacts
					state={stateFacts.stateName}
					facts={stateFacts.facts}
				></ContentFacts>
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
			enforceParityLaws
			parityLawCodified
			privateHealthPlans
			publicHealthPlans
		}
	}
`
