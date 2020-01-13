import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroGrant from '../components/Hero/HeroGrant'

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
	const { grant } = data
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={grant.seoMetaTags} />
			<HeroGrant data={grant} />
			{/* <main
				css={biographyCSS}
				dangerouslySetInnerHTML={{ __html: bio.biography }}
			></main> */}
		</Layout>
	)
}

export default Bio

export const query = graphql`
	query($slug: String) {
		grant: datoCmsGrant(slug: { eq: $slug }) {
			title
			seoMetaTags {
				tags
			}
			grantInformation {
				__typename
				... on DatoCmsGrantee {
					granteeName
					granteeInstitution
					granteeImage {
						url
					}
				}
				... on DatoCmsYear {
					year
				}
				... on DatoCmsMentor {
					mentor
				}
				... on DatoCmsAmount {
					amount
				}
				... on DatoCmsArea {
					area
				}
				... on DatoCmsGrantType {
					grantType
				}
			}
			grantDetails {
				__typename
				... on DatoCmsContent {
					contentHeading
					contentBody
				}
				... on DatoCmsHeading {
					headingLevel
					heading
				}
				... on DatoCmsVideo {
					video {
						url
					}
					poster {
						url
					}
				}
			}
		}
	}
`
