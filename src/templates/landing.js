import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import ChannelContainer from '../components/Channel/ChannelContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import CarouselResourceContainer from '../components/Carousels/CarouselResourceContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'

import { styles } from '../css/css'

const landingTitle = css`
	margin: 150px 24px 0;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 180px 50px 40px;
	}
	+ div {
		margin: ${styles.scale.px36} 0 -${styles.scale.px24};
	}
`

const landingBriefCSS = css`
	padding: 0 24px;
	margin: 0;
	dfn {
		color: ${styles.colors.poppy};
		text-decoration: underline;
		cursor: pointer;
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

const Landing = ({ data: { landing } }) => {
	let adjacent = 0

	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopDark}
			seo={landing.seoMetaTags}
		>
			<h1 css={landingTitle}>{landing.title}</h1>
			<p
				css={css`
					${landingBriefCSS};
					@media (min-width: ${styles.screens.tablet}px) {
						padding: 0 ${styles.scale.px50}
							${landing.channelList.length !== 0
								? 0
								: styles.scale.px50};
					}
				`}
				dangerouslySetInnerHTML={{
					__html: landing.introCopy
						? landing.introCopy
						: landing.seo.description,
				}}
			></p>
			{landing.channelList.length !== 0 && (
				<ChannelContainer
					slug={landing.slug}
					channelList={landing.channelList}
					addCSS={channelCSS}
				/>
			)}
			{landing.ctaChapterResourceDetailList.map((item, index) => {
				const prevIndex = index > 0 ? index - 1 : null
				if (
					prevIndex !== null &&
					landing.ctaChapterResourceDetailList[index].__typename ===
						landing.ctaChapterResourceDetailList[prevIndex]
							.__typename
				) {
					adjacent++
				} else {
					adjacent = 0
				}
				if (item.__typename === 'DatoCmsCallToAction') {
					return (
						<CTAContainer
							key={index}
							number={index}
							cta={item.cta.callToAction[0]}
						/>
					)
				} else if (item.__typename === 'DatoCmsChapterConnection') {
					if (item.showChapterConnection === true) {
						return <CarouselChapterContainer key={index} />
					}
				} else if (item.__typename === 'DatoCmsResourceList') {
					if (item.displayAsCarousel) {
						return (
							<CarouselResourceContainer
								key={index}
								listHeading={item.listHeading}
								resources={item.resource}
								addCSS={css`
									background-color: ${adjacent % 2 === 1
										? styles.colors.lightGray
										: styles.colors.white};
								`}
							/>
						)
					} else {
						return (
							<FeaturedResourcesContainer
								key={index}
								heading={item.listHeading}
								resources={item.resource}
								addCSS={css`
									background-color: ${adjacent % 2 === 1
										? styles.colors.lightGray
										: styles.colors.white};
								`}
							/>
						)
					}
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
		</Layout>
	)
}

export default Landing

export const query = graphql`
	query($slug: String) {
		landing: datoCmsLanding(slug: { eq: $slug }) {
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			title
			slug
			seo {
				description
			}
			channelList {
				id
				image {
					url
					alt
					fluid(
						maxWidth: 200
						imgixParams: {
							auto: "format"
							fit: "crop"
							crop: "faces"
							w: "200"
							h: "200"
						}
					) {
						...GatsbyDatoCmsFluid_noBase64
					}
				}
				heading
				channelLink {
					...ChannelLink
				}
			}
			introCopy
			ctaChapterResourceDetailList {
				... on DatoCmsResourceList {
					__typename
					id
					listHeading
					displayAsCarousel
					resource {
						... on DatoCmsDetail {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsDetailTagged {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsLanding {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsCampaignLanding {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsSearchPage {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsImageList {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsStory {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
						... on DatoCmsExternalResource {
							__typename
							id
							title
							externalDescription
							coverImage {
								url
								alt
								fluid(
									maxWidth: 600
									imgixParams: {
										auto: "format"
										fill: "blur"
										fit: "fill"
										w: "600"
										h: "370"
									}
								) {
									...GatsbyDatoCmsFluid_noBase64
								}
							}
							resourceLink {
								... on DatoCmsExternalUrl {
									__typename
									id
									externalUrl
								}
								... on DatoCmsDownload {
									__typename
									id
									download {
										url
									}
								}
							}
						}
						... on DatoCmsQuilt {
							__typename
							id
							title
							slug
							seo {
								description
								image {
									url
									fluid(
										maxWidth: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									) {
										...GatsbyDatoCmsFluid_noBase64
									}
								}
							}
						}
					}
				}
				... on DatoCmsCallToAction {
					... on DatoCmsCallToAction {
						__typename
						...CTAs
					}
				}
				... on DatoCmsDetailSquare {
					__typename
					detail {
						__typename
						... on DatoCmsDetail {
							title
							slug
							details {
								... on DatoCmsContent {
									__typename
									id
									contentHeading
								}
							}
						}
						... on DatoCmsDetailTagged {
							title
							slug
							details {
								... on DatoCmsContent {
									__typename
									id
									contentHeading
								}
							}
						}
					}
				}
				... on DatoCmsChapterConnection {
					__typename
					showChapterConnection
				}
			}
		}
	}
`
