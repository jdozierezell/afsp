import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
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
	.gatsby-image-wrapper {
		width: 100%;
		@media (min-width: ${styles.screens.tablet}px) {
			width: 255px;
		}
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
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={partners.seoMetaTags}
		>
			<HeroSolid data={partners} />
			<section css={partnerContainerCSS}>
				{partners.partnerList.map(partner => {
					return (
						<div css={partnerCSS}>
							<Img
								fluid={partner.partnerLogo.fluid}
								alt={`${partner.partnerName} logo`}
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
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			partnerList {
				partnerName
				partnerLogo {
					url
					fluid(
						maxWidth: 600
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "600"
						}
					) {
						...GatsbyDatoCmsFluid
					}
				}
				partnerDescription
				partnerLink
			}
		}
	}
`
