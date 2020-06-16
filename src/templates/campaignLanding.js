import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import ChannelContainer from '../components/Channel/ChannelContainer'
import ConvoContainer from '../components/Convo/ConvoContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import CarouselResourceContainer from '../components/Carousels/CarouselResourceContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
import Calendar from '../components/Calendar/Calendar'

import { styles } from '../css/css'

const landingTitle = css`
	margin: 150px 24px 35px;
	@media (min-width: ${styles.screens.tablet}px) {
		margin: 180px 50px 40px;
	}
`

const landingBriefCSS = css`
	padding: 0 24px;
	margin: 0;
	max-width: 920px;
`

const introCopyCSS = css`
	background-color: ${styles.colors.lightGray};
	margin: -${styles.scale.px36} 0 -${styles.scale.px24};
	div {
		padding: ${styles.scale.px24};
		font-family: ${styles.fonts.avenirRegular};
		@media (min-width: ${styles.screens.mobile}px) {
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

const CampaignLanding = ({ data: { campaignLanding, afspMedia } }) => {
	let adjacent = 0
	const campaignMedia = afspMedia.campaignLanding
	console.log(afspMedia)
	campaignLanding.channelList.forEach(channel => {
		channel.id = channel.id
			.replace('DatoCmsChannel-', '')
			.replace('-en', '')
		campaignMedia.channelList.forEach(media => {
			if (channel.id === media.id) {
				channel.image = media.image
			}
		})
	})
	campaignLanding.convoLinks.forEach(convo => {
		convo.id = convo.id.replace('DatoCmsConvoLink-', '').replace('-en', '')
		afspMedia.campaignLanding.convoLinks.forEach(media => {
			if (convo.id === media.id) {
				convo.convoImage = media.convoImage
			}
		})
	})
	campaignLanding.ctaChapterResourceDetailList.forEach(resource => {
		if (resource.resource) {
			resource.resource.forEach(childResource => {
				childResource.id = childResource.id
					.replace('DatoCmsExternalResource-', '')
					.replace('DatoCmsStory-', '')
					.replace('DatoCmsLanding-', '')
					.replace('DatoCmsDetailTagged-', '')
					.replace('DatoCmsDetail-', '')
					.replace('DatoCmsCustomShareable-', '')
					.replace('-en', '')
				campaignMedia.ctaChapterResourceDetailList.forEach(media => {
					if (media.resource) {
						media.resource.forEach(childMedia => {
							if (childResource.id === childMedia.id) {
								if (
									childResource.__typename ===
									'DatoCmsExternalResource'
								) {
									childResource.coverImage =
										childMedia.coverImage
								} else {
									childResource.seo.image =
										childMedia.seo.image
								}
							}
						})
					}
				})
			})
		}
	})

	return (
		<Layout
			theme={styles.logo.mobileDarkDesktopDark}
			seo={campaignLanding.seoMetaTags}
		>
			<h1 css={landingTitle}>{campaignLanding.title}</h1>
			{campaignLanding.brief && (
				<div
					css={css`
						${landingBriefCSS};
						@media (min-width: ${styles.screens.tablet}px) {
							padding: 0 ${styles.scale.px50}
								${campaignLanding.channelList.length !== 0
									? 0
									: styles.scale.px50};
						}
					`}
					dangerouslySetInnerHTML={{ __html: campaignLanding.brief }}
				></div>
			)}
			{campaignLanding.channelList.length !== 0 && (
				<ChannelContainer
					slug={campaignLanding.slug}
					channelList={campaignLanding.channelList}
					channelListMedia={afspMedia.campaignLanding.channelList}
					addCSS={channelCSS}
				/>
			)}
			{campaignLanding.introCopy && (
				<div css={introCopyCSS}>
					<div
						dangerouslySetInnerHTML={{
							__html: campaignLanding.introCopy,
						}}
					></div>
				</div>
			)}
			{campaignLanding.convoLinks.length > 0 && (
				<ConvoContainer convos={campaignLanding.convoLinks} />
			)}
			{campaignLanding.ctaChapterResourceDetailList.map((item, index) => {
				const prevIndex = index > 0 ? index - 1 : null
				if (
					prevIndex !== null &&
					campaignLanding.ctaChapterResourceDetailList[index]
						.__typename ===
						campaignLanding.ctaChapterResourceDetailList[prevIndex]
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
			{campaignLanding.eventCalendar.length > 0 && (
				<Calendar events={campaignLanding.eventCalendar} />
			)}
			<CarouselChapterContainer
				carouselCSS={css`
					@media (min-width: ${styles.screens.mobile}px) {
						background-color: ${styles.colors.white};
						.glide__slides > div {
							border: 1px solid ${styles.colors.lightGray};
						}
					}
				`}
			/>
		</Layout>
	)
}

export default CampaignLanding

export const query = graphql`
	query($slug: String) {
		campaignLanding: datoCmsCampaignLanding(slug: { eq: $slug }) {
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			title
			slug
			brief
			seo {
				description
			}
			eventCalendar {
				... on DatoCmsCampaignName {
					campaignName
				}
				... on DatoCmsEvent {
					eventTitle
					eventDateAndTime
					url
					brief
				}
			}
			channelList {
				id
				image {
					url
				}
				# image imported in afspMedia
				heading
				channelLink {
					...ChannelLink
				}
			}
			introCopy
			convoLinks {
				id
				convoTitle
				draftConvoImage: convoImage {
					url
				}
				convoFile {
					url
				}
			}
			ctaChapterResourceDetailList {
				... on DatoCmsResourceList {
					__typename
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
						... on DatoCmsCustomShareable {
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
						... on DatoCmsStory {
							__typename
							id
							title
							slug
							coverImage {
								url
							}
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
											fit: "fill"
											fill: "blur"
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
			}
		}
		afspMedia: afspMedia {
			campaignLanding(filter: { slug: { eq: $slug } }) {
				channelList {
					id
					image {
						responsiveImage(
							imgixParams: {
								auto: format
								crop: faces
								fit: crop
								h: "200"
								w: "200"
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
				convoLinks {
					id
					convoImage {
						responsiveImage(
							imgixParams: {
								auto: format
								crop: faces
								fit: crop
								h: "200"
								w: "200"
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
