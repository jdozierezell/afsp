import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import { Image } from 'react-datocms'

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

const Partners = ({ data: { partners, afspMedia } }) => {
	partners.partnerList.forEach(partner => {
		afspMedia.partnerPage.partnerList.forEach(media => {
			if (partner.partnerLogo.originalId === media.partnerLogo.id) {
				partner.partnerLogo.responsiveImage =
					media.partnerLogo.responsiveImage
			}
		})
	})
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
							{partner.partnerLogo.responsiveImage && (
								<Image
									css={partnerImageCSS}
									data={partner.partnerLogo.responsiveImage}
								/>
							)}
							{!partner.partnerLogo.responsiveImage && (
								<img
									css={partnerImageCSS}
									src={partner.partnerLogo.url}
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
					originalId
					url
				}
				partnerDescription
				partnerLink
			}
		}
		afspMedia: afspMedia {
			partnerPage {
				partnerList {
					partnerLogo {
						id
						responsiveImage(
							imgixParams: {
								auto: format
								fit: fill
								w: "600"
								fill: solid
								fillColor: "#ffffff"
							}
						) {
							alt
							aspectRatio
							height
							sizes
							src
							srcSet
							title
							webpSrcSet
							width
						}
					}
				}
			}
		}
	}
`
