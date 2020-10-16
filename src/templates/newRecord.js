import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'

import { styles } from '../css/css'

import FormDisclaimer from '../components/Forms/FormDisclaimer'
import FormQuilt from '../components/Forms/FormQuilt'
import FormSupportGroup from '../components/Forms/FormSupportGroup'
// import Loadable from '@loadable/component'

// const FormDisclaimer = Loadable(() =>
// 	import('../components/Forms/FormDisclaimer')
// )
// const FormQuilt = Loadable(() => import('../components/Forms/FormQuilt'))
// const FormSupportGroup = Loadable(() =>
// 	import('../components/Forms/FormSupportGroup')
// )

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
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={newRecord.seoMetaTags}
		>
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
