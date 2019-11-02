import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ChannelContainer from '../components/Channel/ChannelContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import FeaturedResourcesContainer from '../components/FeaturedProgramsResources/FeaturedResourcesContainer'

import { styles } from '../css/css'

const landingTitle = css`
	margin: 150px 24px 35px;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 180px 50px 40px;
	}
`

const landingBrief = css`
	margin: 0 24px;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 0 50px;
	}
`

const channelCSS = css`
	background-color: ${styles.colors.white};
	grid-template-columns: repeat(2, 1fr);
	@media (min-width: ${styles.screens.tablet}px) {
		div {
			text-align: center;
		}
	}
`

const resourcesCSS = css`
	background-color: ${styles.colors.lightGray};
	@media (min-width: ${styles.screens.tablet}px) {
		background-color: ${styles.colors.white};
	}
`

const Landing = ({ data: { landing } }) => {
	return (
		<Layout logo={styles.logo.mobileDarkDesktopDark}>
			<SEO meta={landing.seoMetaTags} />
			<h1 css={landingTitle}>{landing.title}</h1>
			<p css={landingBrief}>{landing.seo.description}</p>
			<ChannelContainer
				channelList={landing.channelList}
				addCSS={channelCSS}
			/>
			{landing.ctaChapterResourceDetailList.map((item, index) => {
				if (item.__typename === 'DatoCmsCallToAction') {
					return (
						<CTAContainer
							key={index}
							cta={item.cta.callToAction[0]}
						/>
					)
				} else if (item.__typename === 'DatoCmsChapterConnection') {
					if (item.showChapterConnection === true) {
						return <CarouselChapterContainer key={index} />
					}
				} else if (item.__typename === 'DatoCmsResourceList') {
					return (
						<FeaturedResourcesContainer
							key={index}
							resources={item.resource}
							addCSS={resourcesCSS}
						/>
					)
				} else if (item.__typename === 'DatoCmsDetailSquare') {
					return (
						<CarouselDetailContainer
							key={index}
							content={item.detail}
						/>
					)
				}
				return ''
			})}
			<ChannelContainer
				channelList={landing.channelList}
				addCSS={channelCSS}
			/>
		</Layout>
	)
}

export default Landing

export const query = graphql`
	query($slug: String) {
		landing: datoCmsLanding(slug: { eq: $slug }) {
			seoMetaTags {
				tags
			}
			title
			seo {
				description
			}
			channelList {
				image {
					fluid(
						maxWidth: 200
						imgixParams: {
							fm: "jpg"
							fit: "crop"
							crop: "faces"
							w: "200"
							h: "200"
						}
					) {
						...GatsbyDatoCmsFluid_tracedSVG
					}
				}
				heading
				link {
					... on DatoCmsDetail {
						slug
					}
					... on DatoCmsLanding {
						slug
					}
				}
			}
			ctaChapterResourceDetailList {
				... on DatoCmsResourceList {
					resource {
						... on DatoCmsDetail {
							title
							slug
							seo {
								description
								image {
									fluid(
										maxWidth: 600
										imgixParams: {
											fm: "jpg"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_tracedSVG
									}
								}
							}
						}
						... on DatoCmsLanding {
							title
							slug
							seo {
								description
								image {
									fluid(
										maxWidth: 600
										imgixParams: {
											fm: "jpg"
											fit: "crop"
											crop: "faces"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_tracedSVG
									}
								}
							}
						}
					}
				}
				... on DatoCmsCallToAction {
					cta {
						title
						callToAction {
							... on DatoCmsCtaVideo {
								videoUrl
								heading
								brief
								linkText
								linkUrl
							}
							... on DatoCmsCtaWithDescription {
								heading
								brief
								linkText
								linkUrl
							}
							... on DatoCmsCtaNoDescription {
								heading
								linkText
								linkUrl
							}
						}
					}
				}
				... on DatoCmsDetailSquare {
					detail {
						details {
							... on DatoCmsContent {
								id
								contentHeading
							}
						}
						title
						slug
					}
				}
				... on DatoCmsChapterConnection {
					showChapterConnection
				}
			}
		}
	}
`
