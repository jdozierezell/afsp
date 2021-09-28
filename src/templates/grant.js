import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import HeroGrant from '../components/Hero/HeroGrant'

import { styles } from '../css/css'

import NavigationSide from '../components/Navigation/NavigationSide'
import Content from '../components/Content/Content'
import ContentHeading from '../components/Content/ContentHeading'
import ContentModal from '../components/Content/ContentModal'

const grantCSS = css`
	@media (min-width: ${styles.screens.mobile}px) {
		display: grid;
		grid-template-columns: 1fr 500px;
	}
`

const heroCSS = css`
	grid-column: 1/3;
`

const grantDetailsCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	grid-column: 1/3;
	@media (min-width: ${styles.screens.video}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
		max-width: 623px;
		grid-column: 1/2;
	}
`

const Grant = ({ data: { grant } }) => {
	const [grantTop, setGrantTop] = useState(null)
	const [modalIsOpen, setIsOpen] = useState(false)
	const openModal = () => {
		setIsOpen(true)
	}
	const closeModal = () => {
		setIsOpen(false)
	}
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
	grant.details = grant.grantDetails
	useEffect(() => {
		setGrantTop(
			document.getElementById('grantContainer').getBoundingClientRect()
				.height +
				document
					.getElementById('crisisResources')
					.getBoundingClientRect().height
		)
	}, [grantTop])
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={grant.seoMetaTags}
			structuredData={structuredData}
		>
			<section css={grantCSS}>
				<div id="grantContainer" css={heroCSS}>
					<HeroGrant grant={grant} />
				</div>
				{grantTop !== null && (
					<NavigationSide
						data={grant}
						topStart={grantTop}
					></NavigationSide>
				)}
				<div css={grantDetailsCSS}>
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
						} else if (
							detail.__typename === 'DatoCmsGrantAbstract'
						) {
							return (
								<>
									<button
										key={index}
										className="secondary-button"
										onClick={openModal}
									>
										Full Scientific Abstract
									</button>
									<ContentModal
										modalIsOpen={modalIsOpen}
										closeModal={closeModal}
										heading="Full Scientific Abstract"
										content={detail.grantAbstract}
									></ContentModal>
								</>
							)
						} else {
							return ''
						}
					})}
				</div>
			</section>
		</Layout>
	)
}

export default Grant

export const query = graphql`
	query ($slug: String) {
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
				... on DatoCmsGrantAbstract {
					grantAbstract
				}
			}
		}
	}
`
