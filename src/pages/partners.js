import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { SEO } from '../components/SEO/SEO'
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
	display: grid;
	grid-template-columns: 1fr;
	margin-bottom: ${styles.scale.px60};
	justify-content: start;
	align-items: start;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: 400px 1fr;
	}
`

const partnerImageCSS = css`
	@media (min-width: ${styles.screens.tablet}px) {
		width: 255px;
	}
`

const partnerInfoCSS = css`
	grid-column-start: 1;
	max-width: 623px;
	@media (min-width: ${styles.screens.tablet}px) {
		margin-left: ${styles.scale.px36};
		grid-column-start: 2;
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
		'@type': 'WebPage',
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
							{partner.partnerLogo && (
								<GatsbyImage
									image={partner.partnerLogo.gatsbyImageData}
									css={partnerImageCSS}
									style={{
										display: 'block',
									}}
									alt={partner.partnerLogo.alt}
								/>
							)}
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

export const Head = ({ data: { partners } }) => {
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
		'@type': 'WebPage',
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

	return <SEO structuredData={structuredData} meta={partners.seoMetaTags} />
}

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
					gatsbyImageData(
						width: 600
						placeholder: NONE
						imgixParams: {
							fit: "fill"
							fill: "solid"
							fillColor: "#ffffff"
							w: "600"
							h: "200"
						}
					)
				}
				partnerDescription
				partnerLink
			}
		}
	}
`
