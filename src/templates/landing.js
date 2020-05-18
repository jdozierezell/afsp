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
`

const introCopyCSS = css`
	background-color: ${styles.colors.lightGray};
	margin: -${styles.scale.px36} 0 -${styles.scale.px24};
	div {
		padding: ${styles.scale.px24};
		font-family: ${styles.fonts.avenirRegular};
		@media (min-width: ${styles.screens.mobile}px) {
			max-width: calc(623px * 2);
			columns: 2;
			padding: ${styles.scale.px50};
		}
		@media (min-width: ${styles.screens.navigation}px) {
			max-width: calc(623px * 3);
			columns: 3;
			padding: ${styles.scale.px50};
		}
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

const Landing = ({ data: { landing, afspMedia } }) => {
	let adjacent = 0

	landing.channelList.forEach(channel => {
		afspMedia.landing.channelList.forEach(media => {
			channel.id = channel.id
				.replace('DatoCmsChannel-', '')
				.replace('-en', '')
			if (channel.id === media.id) {
				channel.image.responsiveImage = media.image.responsiveImage
			}
		})
	})
	landing.ctaChapterResourceDetailList.forEach(resource => {
		if (resource.resource) {
			resource.resource.forEach(childResource => {
				childResource.id = childResource.id
					.replace('DatoCmsExternalResource-', '')
					.replace('DatoCmsStory-', '')
					.replace('DatoCmsLanding-', '')
					.replace('DatoCmsDetailTagged-', '')
					.replace('DatoCmsDetail-', '')
					.replace('DatoCmsCustomShareable-', '')
					.replace('DatoCmsQuilt-', '')
					.replace('DatoCmsSearchPage-', '')
					.replace('DatoCmsImageList-', '')
					.replace('-en', '')
				afspMedia.landing.ctaChapterResourceDetailList.forEach(
					media => {
						if (media.resource) {
							media.resource.forEach(childMedia => {
								if (childResource.id === childMedia.id) {
									if (
										childResource.__typename ===
										'DatoCmsExternalResource'
									) {
										childResource.coverImage.responsiveImage =
											childMedia.coverImage.responsiveImage
									} else {
										childResource.seo.image.responsiveImage =
											childMedia.seo.image.responsiveImage
									}
								}
							})
						}
					}
				)
			})
		}
	})

	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopDark}
			seo={landing.seoMetaTags}
		>
			<h1 css={landingTitle}>{landing.title}</h1>
			{!landing.introCopy && (
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
				>
					{landing.seo.description}
				</p>
			)}
			{landing.channelList.length !== 0 && (
				<ChannelContainer
					slug={landing.slug}
					channelList={landing.channelList}
					addCSS={channelCSS}
				/>
			)}
			{landing.introCopy && (
				<div css={introCopyCSS}>
					<div
						dangerouslySetInnerHTML={{ __html: landing.introCopy }}
					></div>
				</div>
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
		afspMedia: afspMedia {
			landing(filter: { slug: { eq: $slug } }) {
				channelList {
					id
					heading
					image {
						responsiveImage(
							imgixParams: {
								auto: format
								w: "200"
								h: "200"
								crop: faces
								fit: crop
							}
						) {
							alt
							srcSet
							src
							sizes
							webpSrcSet
							title
							width
							height
							aspectRatio
						}
					}
				}
				ctaChapterResourceDetailList {
					... on AFSPMedia_ResourceListRecord {
						id
						resource {
							... on AFSPMedia_ExternalResourceRecord {
								id
								coverImage {
									responsiveImage(
										imgixParams: {
											auto: format
											fill: blur
											fit: fill
											h: "370"
											w: "600"
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
							... on AFSPMedia_CustomShareableRecord {
								id
								seo {
									image {
										responsiveImage(
											imgixParams: {
												auto: format
												fill: blur
												fit: fill
												h: "370"
												w: "600"
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
							... on AFSPMedia_ImageListRecord {
								id
								seo {
									image {
										responsiveImage(
											imgixParams: {
												auto: format
												fill: blur
												fit: fill
												h: "370"
												w: "600"
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
							... on AFSPMedia_DetailTaggedRecord {
								id
								seo {
									image {
										responsiveImage(
											imgixParams: {
												auto: format
												fill: blur
												fit: fill
												h: "370"
												w: "600"
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
							... on AFSPMedia_DetailRecord {
								id
								seo {
									image {
										responsiveImage(
											imgixParams: {
												auto: format
												fill: blur
												fit: fill
												h: "370"
												w: "600"
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
							... on AFSPMedia_QuiltRecord {
								id
								seo {
									image {
										responsiveImage(
											imgixParams: {
												auto: format
												fill: blur
												fit: fill
												h: "370"
												w: "600"
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
							... on AFSPMedia_SearchPageRecord {
								id
								seo {
									image {
										responsiveImage(
											imgixParams: {
												auto: format
												fill: blur
												fit: fill
												h: "370"
												w: "600"
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
							... on AFSPMedia_LandingRecord {
								id
								seo {
									image {
										responsiveImage(
											imgixParams: {
												auto: format
												fill: blur
												fit: fill
												h: "370"
												w: "600"
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
							... on AFSPMedia_StoryRecord {
								id
								seo {
									image {
										responsiveImage(
											imgixParams: {
												auto: format
												fill: blur
												fit: fill
												h: "370"
												w: "600"
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
				}
			}
		}
	}
`
