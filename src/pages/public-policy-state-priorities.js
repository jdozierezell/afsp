import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'

import { styles } from '../css/css'

const actionCenterCSS = css`
	margin: 0;
	display: block;
	border-radius: 4px;
	border: 1px solid #3928bd;
	width: 100%;
	height: 1200px;
`

const ActionCenter = () => {
	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopDark}
			overrideAbsolute={true}
		>
			{/* <iframe
				src="https://www.quorum.us/spreadsheet/external/vMxUSCqQJkdlhddKyKBl/"
				css={actionCenterCSS}
				class="sc-dkQkyq gwrVbT"
			></iframe> */}
			<iframe
				id="quorum"
				src="https://afsp.quorum.us/statepriorities/?embedded=true"
				css={actionCenterCSS}
			></iframe>
		</Layout>
	)
}

export default ActionCenter

export const Head = ({ data: { actionCenter } }) => {
	let metaImage,
		metaDescription = ''

	actionCenter.seoMetaTags.tags.forEach(tag => {
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
		about: 'advocacy and public policy',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: actionCenter.title,
		author: 'American Foundation for Suicide Prevention',
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${actionCenter.slug}`,
	}

	return (
		<SEO structuredData={structuredData} meta={actionCenter.seoMetaTags} />
	)
}

export const query = graphql`
	query {
		actionCenter: datoCmsActionCenter {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			brief
		}
	}
`
