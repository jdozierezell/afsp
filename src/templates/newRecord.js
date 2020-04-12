import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'
import FormDisclaimer from '../components/Forms/FormDisclaimer'
import FormQuilt from '../components/Forms/FormQuilt'
import FormSupportGroup from '../components/Forms/FormSupportGroup'

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
			<HelmetDatoCms seo={newRecord.seoMetaTags}>
				<html lang="en" />
			</HelmetDatoCms>
			<HeroSolid data={newRecord} />
			<main css={mainCSS}>
				{newRecord.disclaimer && (
					<FormDisclaimer disclaimer={newRecord.disclaimer} />
				)}
				{newRecord.recordType === 'Quilt' && <FormQuilt />}
				{newRecord.recordType === 'Support Group' && (
					<FormSupportGroup />
				)}
			</main>
		</Layout>
	)
}

export default NewRecord

export const query = graphql`
	query($slug: String) {
		newRecord: datoCmsNewRecord(slug: { eq: $slug }) {
			title
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			recordType
			brief
			disclaimer
		}
	}
`
