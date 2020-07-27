import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import HeroStatistics from '../components/Hero/HeroStatistics'
import StatisticsSummary from '../components/Statistics/StatisticsSummary'
import StatisticsContainer from '../components/Statistics/StatisticsContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import RecommendationsContentStories from '../components/Recommendations/RecommendationsContentStories'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'

import { styles } from '../css/css'

const SuicideStatistics = ({ data: { statistics, afspMedia } }) => {
	statistics.callsToAction.forEach(action => {
		if (action.__typename === 'DatoCmsResourceList') {
			action.resource.forEach(resource => {
				resource.id = resource.id
					.replace('DatoCmsDetail-', '')
					.replace('-en', '')
				afspMedia.statistics.callsToAction.forEach(media => {
					if (media.__typename === 'AFSPMedia_ResourceListRecord') {
						media.resource.forEach(mediaResource => {
							if (resource.id === mediaResource.id) {
								if (resource.seo) {
									resource.seo.image.responsiveImage =
										mediaResource.seo.image.responsiveImage
								} else if (resource.coverImage) {
									resource.coverImage.responsiveImage =
										mediaResource.coverImage.responsiveImage
								}
							}
						})
					}
				})
			})
		}
	})
	statistics.stateData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/suicide-state-2018.csv',
	}
	statistics.ageData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/ratesbyage.csv',
	}
	statistics.raceData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/ratesbyethnicity.csv',
	}
	statistics.methodData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/ratesbymethod.csv',
	}
	console.log(statistics)

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={statistics.seoMetaTags}
		>
			<HeroStatistics data={statistics} />
			<StatisticsSummary data={statistics} />
			<StatisticsContainer data={statistics} />
			{statistics.callsToAction.map((action, index) => {
				if (action.__typename === 'DatoCmsCallToAction') {
					return (
						<CTAContainer
							key={index}
							cta={action.cta.callToAction[0]}
						/>
					)
				} else if (action.__typename === 'DatoCmsContentStory') {
					return (
						<RecommendationsContentStories
							key={index}
							data={action}
						/>
					)
				} else if (action.__typename === 'DatoCmsResourceList') {
					return (
						<FeaturedResourcesContainer
							key={index}
							resources={action.resource}
							addCSS={css`
								background-color: ${styles.colors.lightGray};
							`}
						/>
					)
				} else {
					return ''
				}
			})}
		</Layout>
	)
}

export default SuicideStatistics

export const query = graphql`
	query {
		statistics: datoCmsStatistic {
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			title
			brief
			stateFactsYear
			statisticsCallouts {
				__typename
				... on DatoCmsStatisticsCallout {
					callout
				}
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
			}
			additionalFacts {
				fact
			}
			video {
				url
				video {
					mp4Url(res: medium)
				}
			}
			videoPoster {
				url
			}
			videoHeader
			videoDescription
			videoLinkText
			videoLink {
				... on DatoCmsLanding {
					__typename
					slug
				}
				... on DatoCmsDetail {
					__typename
					slug
				}
			}
			ageBrief
			raceBrief
			methodBrief
			callsToAction {
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
				... on DatoCmsResourceList {
					__typename
					id
					resource {
						... on DatoCmsStory {
							__typename
							id
							title
							slug
							id
							coverImage {
								url
							}
						}
						... on DatoCmsExternalResource {
							__typename
							id
							title
							resourceLink {
								... on DatoCmsExternalUrl {
									externalUrl
								}
								... on DatoCmsDownload {
									download {
										url
									}
								}
							}
							coverImage {
								url
							}
						}
						... on DatoCmsCustomShareable {
							__typename
							id
							title
							slug
							id
							seo {
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
					}
				}
				... on DatoCmsContentStory {
					__typename
					contentHeading
					content
					storiesHeading
					storyLink {
						__typename
						title
						slug
						author {
							authorName
						}
					}
				}
			}
		}
		afspMedia: afspMedia {
			statistics: statistic {
				callsToAction {
					... on AFSPMedia_ResourceListRecord {
						id
						resource {
							... on AFSPMedia_StoryRecord {
								id
								coverImage {
									responsiveImage(
										imgixParams: {
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
							... on AFSPMedia_ExternalResourceRecord {
								id
								coverImage {
									responsiveImage(
										imgixParams: {
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
