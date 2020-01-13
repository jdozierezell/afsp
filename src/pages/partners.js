import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroSolid from '../components/Hero/HeroSolid'

import { styles } from '../css/css'

const partnerContainerCSS = css`
	display: flex;
	flex-flow: column nowrap;
	margin: ${styles.scale.px50} ${styles.scale.px24} 0;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50} 0;
	}
	> div {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		margin-bottom: ${styles.scale.px80};
		@media (min-width: ${styles.screens.tablet}px) {
			flex-flow: row nowrap;
		}
		img {
			display: block;
			flex: 0 0 244px;
			@media (min-width: ${styles.screens.tablet}px) {
				max-width: 200px;
			}
		}
		> div {
			flex: 1 1 0;
			max-width: 623px;
			@media (min-width: ${styles.screens.tablet}px) {
				margin-left: ${styles.scale.px50};
			}
			p:first-of-type {
				margin-top: 0;
			}
			p:last-of-type {
				margin-bottom: 0;
			}
		}
	}
`

const Partners = ({ data: { partners } }) => {
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={partners.seoMetaTags} />
			<HeroSolid data={partners} />
			<section css={partnerContainerCSS}>
				{partners.partnerList.map(partner => {
					return (
						<div>
							<img
								src={`${partner.partnerLogo.url}?w=600`}
								alt={`${partner.partnerName} logo`}
							/>
							<div>
								<h3>{partner.partnerName}</h3>
								<div
									dangerouslySetInnerHTML={{
										__html: partner.partnerDescription,
									}}
								></div>
								<a
									href={partner.partnerLink}
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
				}
				partnerDescription
				partnerLink
			}
		}
	}
`
