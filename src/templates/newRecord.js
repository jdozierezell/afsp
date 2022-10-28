import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import FormDisclaimer from '../components/Forms/FormDisclaimer'
import FormQuilt from '../components/Forms/FormQuilt'
import FormSupportGroup from '../components/Forms/FormSupportGroup'
import FormSBTClinician from '../components/Forms/FormSBTClinician'

import { styles } from '../css/css'

const mainCSS = css`
	padding: ${styles.scale.px50} ${styles.scale.px24};
	max-width: 960px;
	margin: 0 auto;
	@media (min-width: ${styles.screens.mobile}px) {
		padding: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const NewRecord = ({ data: { newRecord } }) => {
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HeroSolid data={newRecord} />
			<main css={mainCSS}>
				{newRecord.disclaimer && (
					<FormDisclaimer disclaimer={newRecord.disclaimer} />
				)}
				{newRecord.recordType === 'Quilt' && <FormQuilt />}
				{newRecord.recordType === 'Support Group' && (
					<FormSupportGroup />
				)}
				{newRecord.recordType ===
					'Suicide Bereavement Trained Clinician' && (
					<FormSBTClinician />
				)}
			</main>
		</Layout>
	)
}

export default NewRecord

export const Head = ({ data: { newRecord } }) => {
	let metaImage,
		metaDescription = ''
	newRecord.seoMetaTags.tags.forEach(tag => {
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
		name: newRecord.title,
		lastReviewed: newRecord.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${newRecord.slug}`,
	}

	return <SEO structuredData={structuredData} meta={newRecord.seoMetaTags} />
}

export const query = graphql`
	query ($slug: String) {
		newRecord: datoCmsNewRecord(slug: { eq: $slug }) {
			title
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
			recordType
			brief
			disclaimer
		}
	}
`
