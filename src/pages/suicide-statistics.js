import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import HeroStatistics from '../components/Hero/HeroStatistics'
import StatisticsSummary from '../components/Statistics/StatisticsSummary'
import StatisticsContainer from '../components/Statistics/StatisticsContainer'

import { styles } from '../css/css'

import CTAContainer from '../components/CTAs/CTAContainer'
import RecommendationsContentStories from '../components/Recommendations/RecommendationsContentStories'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
// import Loadable from '@loadable/component'

// const CTAContainer = Loadable(() => import('../components/CTAs/CTAContainer'))
// const RecommendationsContentStories = Loadable(() =>
// 	import('../components/Recommendations/RecommendationsContentStories')
// )
// const FeaturedResourcesContainer = Loadable(() =>
// 	import('../components/FeaturedResources/FeaturedResourcesContainer')
// )

const SuicideStatistics = ({ data: { statistics } }) => {
	let metaImage,
		metaDescription = ''
	statistics.seoMetaTags.tags.forEach(tag => {
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
		specialty: 'suicide',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: statistics.title,
		lastReviewed: statistics.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${statistics.slug}`,
	}
	statistics.stateData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/2019-suicide-state.csv',
	}
	statistics.ageData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/2019-ratesbyage.csv',
	}
	statistics.raceData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/2019-ratesbyethnicity.csv',
	}
	statistics.methodData = {
		url:
			'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/2019-ratesbymethod.csv',
	}

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={statistics.seoMetaTags}
			structuredData={structuredData}
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
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
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
			videoId
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
								alt
								gatsbyImageData(
									width: 600
									imgixParams: {
										auto: "format"
										fill: "blur"
										fit: "fill"
										h: "370"
										w: "600"
									}
								)
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
								alt
								gatsbyImageData(
									width: 600
									imgixParams: {
										auto: "format"
										fill: "blur"
										fit: "fill"
										h: "370"
										w: "600"
									}
								)
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
									gatsbyImageData(
										width: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									)
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
									gatsbyImageData(
										width: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									)
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
									gatsbyImageData(
										width: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									)
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
									gatsbyImageData(
										width: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									)
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
									gatsbyImageData(
										width: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									)
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
									gatsbyImageData(
										width: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									)
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
									gatsbyImageData(
										width: 600
										imgixParams: {
											auto: "format"
											fill: "blur"
											fit: "fill"
											h: "370"
											w: "600"
										}
									)
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
	}
`
