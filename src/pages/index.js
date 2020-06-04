import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import BreakingNews from '../components/BreakingNews/BreakingNews'
import HeroVideo from '../components/Hero/HeroVideo'
import ChannelContainer from '../components/Channel/ChannelContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
import InstagramFeed from '../components/Social/InstagramFeed'
import Ticker from '../components/Ticker/Ticker'

import { styles } from '../css/css'

const walkBar = css`
	background-color: ${styles.colors.blue};
	text-align: center;
	padding: ${styles.scale.px5} ${styles.scale.px50};
	span,
	a {
		color: ${styles.colors.white};
		font-family: ${styles.fonts.avenirDemi};
		font-size: ${styles.scale.px20};
		line-height: ${styles.scale.px30};
		display: block;
		@media (min-width: ${styles.screens.tablet}px) {
			display: inline;
			margin: 0 ${styles.scale.px14};
			line-height: initial;
		}
	}
`

const App = ({ data: { home, afspMedia } }) => {
	home.ctaChapterResourceList.forEach(resource => {
		if (resource.channels) {
			resource.channels.forEach(channel => {
				channel.id = channel.id
					.replace('DatoCmsChannel-', '')
					.replace('-en', '')
				afspMedia.home.channelList.forEach(media => {
					if (channel.id === media.id) {
						channel.image.responsiveImage =
							media.image.responsiveImage
					}
				})
			})
		}
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
					.replace('-en', '')
				afspMedia.home.ctaChapterResourceList.forEach(media => {
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
				})
			})
		}
	})

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={home.seoMetaTags}
		>
			{home.breakingNews && <BreakingNews news={home.breakingNews} />}
			<HeroVideo
				videoUrl={
					home.heroVideo.video
						? home.heroVideo.video.mp4Url
						: home.heroVideo.url
				}
				posterUrl={home.heroPoster.url}
				heading={home.heroHeading}
				brief={home.heroBrief}
				buttonCta={home.heroButtonCta}
				buttonExternal={home.heroButtonExternal}
				buttonUrl={
					home.heroButtonExternal
						? home.heroButtonExternalLink
						: home.heroButtonInternalLink.slug
				}
			/>
			<div css={walkBar}>
				<span>Want to walk with us?</span>{' '}
				<a href="https://afsp.donordrive.com/index.cfm?fuseaction=cms.page&id=1370">
					Find a walk near you
				</a>
			</div>
			{home.ctaChapterResourceList.map((item, index) => {
				if (item.__typename === 'DatoCmsChannelList') {
					return (
						<ChannelContainer
							key={index}
							channelList={item.channels}
							channelListMedia={afspMedia.home.channelList}
						/>
					)
				} else if (item.__typename === 'DatoCmsCallToAction') {
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
					return (
						<FeaturedResourcesContainer
							key={index}
							heading={item.listHeading}
							resources={item.resource}
						/>
					)
				}
				return ''
			})}
			<InstagramFeed instaClass={home.instagramClass} />
			{home.ticker && home.ticker.length > 0 && (
				<Ticker ticker={home.ticker} />
			)}
		</Layout>
	)
}

export default App

export const query = graphql`
	query {
		# gatsby-source-datocms
		home: datoCmsHome {
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			heroVideo {
				url
				video {
					mp4Url(res: medium)
				}
			}
			heroPoster {
				url
			}
			heroHeading
			heroBrief
			heroButtonCta
			heroButtonExternal
			heroButtonExternalLink
			heroButtonInternalLink {
				... on DatoCmsRealStory {
					slug
				}
				... on DatoCmsLanding {
					slug
				}
				... on DatoCmsDetail {
					slug
				}
				... on DatoCmsDetailTagged {
					slug
				}
			}
			ticker {
				tickerItem
			}
			ctaChapterResourceList {
				... on DatoCmsChannelList {
					__typename
					channels {
						id
						image {
							url
						}
						# image imported in afspMedia
						heading
						brief
						channelLink {
							...ChannelLink
						}
					}
				}
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
				... on DatoCmsChapterConnection {
					__typename
					showChapterConnection
				}
				... on DatoCmsResourceList {
					__typename
					listHeading
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
			}
			instagramClass
		}
		# gatsby-source-graphql
		afspMedia: afspMedia {
			home {
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
							srcSet
							webpSrcSet
							sizes
							src
							width
							height
							aspectRatio
							alt
							title
						}
					}
				}
				ctaChapterResourceList {
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
