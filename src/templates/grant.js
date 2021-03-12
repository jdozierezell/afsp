import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import HeroGrant from '../components/Hero/HeroGrant'

import { styles } from '../css/css'

import Content from '../components/Content/Content'
import ContentHeading from '../components/Content/ContentHeading'
import ContentVideo from '../components/Content/ContentVideo'
// import Loadable from '@loadable/component'

// const Content = Loadable(() => import('../components/Content/Content'))
// const ContentHeading = Loadable(() =>
// 	import('../components/Content/ContentHeading')
// )
// const ContentVideo = Loadable(() =>
// 	import('../components/Content/ContentVideo')
// )

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

const Grant = ({ data: { grant } }) => {
	let metaImage,
		metaDescription = ''
	grant.seoMetaTags.tags.forEach(tag => {
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
		name: grant.title,
		lastReviewed: grant.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${grant.slug}`,
	}

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={grant.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroGrant grant={grant} />
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
								video={
									detail.video.video
										? detail.video.video.mp4Url
										: detail.video.url
								}
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

export default Grant

export const query = graphql`
	query($slug: String) {
		grant: datoCmsGrant(slug: { eq: $slug }) {
			title
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
			grantInformation {
				__typename
				... on DatoCmsGrantee {
					id
					granteeName
					granteeInstitution
					granteeImage {
						url
						gatsbyImageData(
							width: 768
							imgixParams: {
								auto: "format"
								fit: "crop"
								crop: "faces"
								w: "768"
								h: "768"
							}
						)
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
						video {
							mp4Url(res: medium)
						}
					}
					poster {
						url
					}
				}
			}
		}
	}
`
