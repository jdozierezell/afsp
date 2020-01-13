import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
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

const Bio = ({ data }) => {
	const { bio } = data
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<SEO meta={bio} />
			<HeroBio data={bio} />
			<main
				css={biographyCSS}
				dangerouslySetInnerHTML={{ __html: bio.biography }}
			></main>
		</Layout>
	)
}

export default Bio

export const query = graphql`
	query($slug: String) {
		bio: datoCmsBio(slug: { eq: $slug }) {
			name
			slug
			title
			photo {
				url
				alt
			}
			biography
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
		}
	}
`
