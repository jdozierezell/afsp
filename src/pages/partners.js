import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'

import { styles } from '../css/css'

const partnerContainerCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const partnerCSS = css`
	display: flex;
	flex-flow: row wrap;
	margin-bottom: ${styles.scale.px60};
	justify-content: flex-start;
	align-items: flex-start;
`

const partnerImageCSS = css`
	@media (min-width: ${styles.screens.tablet}px) {
		width: 255px;
	}
`

const partnerInfoCSS = css`
	flex: 1 1 300px;
	max-width: 623px;
	@media (min-width: ${styles.screens.tablet}px) {
		margin-left: ${styles.scale.px36};
	}
	h3 {
		margin-top: ${styles.scale.px24};
		@media (min-width: ${styles.screens.tablet}px) {
			margin-top: 0;
		}
	}
`

const Partners = ({ data: { partners } }) => {
	let metaImage,
		metaDescription = ''
	partners.seoMetaTags.tags.forEach(tag => {
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
		'@type': 'Blog',
		about: 'partnerships',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: partners.title,
		author: 'American Foundation for Suicide Prevention',
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${partners.slug}`,
	}

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={partners.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroSolid data={partners} />
			<section css={partnerContainerCSS}>
				{partners.partnerList.map((partner, index) => {
					return (
						<div key={index} css={partnerCSS}>
							<Img
								fluid={partner.partnerLogo.fluid}
								css={partnerImageCSS}
								style={{
									display: 'block',
								}}
							/>
							<div css={partnerInfoCSS}>
								<h3>{partner.partnerName}</h3>
								<div
									dangerouslySetInnerHTML={{
										__html: partner.partnerDescription,
									}}
								></div>
								<a
									href={partner.partnerLink}
									target="_blank"
									rel="noreferrer noopener"
									className="secondary-button"
								>
									Learn more
								</a>
							</div>
						</div>
					)
				})}
			</section>
		</Layout>
	)
}

export default Partners

export const query = graphql`
	query {
		partners: datoCmsPartnerPage {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			partnerList {
				partnerName
				partnerLogo {
					originalId
					url
					alt
					fluid(
						maxWidth: 600
						imgixParams: {
							auto: "format"
							fit: "fill"
							fill: "solid"
							fillColor: "#ffffff"
							w: "600"
							h: "200"
						}
					) {
						...GatsbyDatoCmsFluid_noBase64
					}
				}
				partnerDescription
				partnerLink
			}
		}
	}
`
