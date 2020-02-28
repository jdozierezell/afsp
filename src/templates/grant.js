import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroGrant from '../components/Hero/HeroGrant'
import Content from '../components/Content/Content'
import ContentHeading from '../components/Content/ContentHeading'
import ContentVideo from '../components/Content/ContentVideo'

import { styles } from '../css/css'

const grantCSS = css`
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
			<main css={grantCSS}>
				{grant.grantDetails.map((detail, index) => {
					if (detail.__typename === 'DatoCmsContent') {
						return (
							<Content
								key={index}
								contentHeading={detail.contentHeading}
								contentBody={detail.contentBody}
							/>
						)
					} else if (detail.__typename === 'DatoCmsHeading') {
						return (
							<ContentHeading
								key={index}
								heading={detail.heading}
								level={detail.headingLevel}
							/>
						)
					} else if (detail.__typename === 'DatoCmsVideo') {
						return (
							<ContentVideo
								key={index}
								video={detail.video.url}
								poster={detail.poster.url}
							/>
						)
					} else {
						return ''
					}
				})}
			</main>
		</Layout>
	)
}

export default Bio

export const query = graphql`
	query($slug: String) {
		grant: datoCmsGrant(slug: { eq: $slug }) {
			title
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			grantInformation {
				__typename
				... on DatoCmsGrantee {
					granteeName
					granteeInstitution
					granteeImage {
						url
						fluid(
							maxWidth: 768
							imgixParams: {
								auto: "format"
								fit: "crop"
								crop: "faces"
								w: "768"
								h: "768"
							}
						) {
							...GatsbyDatoCmsFluid
						}
						alt
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
