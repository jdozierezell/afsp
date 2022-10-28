import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import HeroStatistics from '../components/Hero/HeroStatistics'
import StatisticsSummary from '../components/Statistics/StatisticsSummary'
import StatisticsContainer from '../components/Statistics/StatisticsContainer'

import { styles } from '../css/css'

import CTAContainer from '../components/CTAs/CTAContainer'
import RecommendationsContentStories from '../components/Recommendations/RecommendationsContentStories'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'

const SuicideStatistics = ({ data: { statistics } }) => {
	statistics.stateData = {
		url: 'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/2020-suicide-state.csv',
	}
	statistics.ageData = {
		url: 'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/2020-ratesbyage.csv',
	}
	statistics.raceData = {
		url: 'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/2020-ratesbyethnicity.csv',
	}
	statistics.methodData = {
		url: 'https://aws-fetch.s3.us-east-1.amazonaws.com/statistics/2020-ratesbymethod.csv',
	}

	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HeroStatistics data={statistics} />
			<StatisticsSummary data={statistics} />
			<StatisticsContainer data={statistics} />
			{statistics.callsToAction.map((action, index) => {
				if (action.__typename === 'DatoCmsCallToAction') {
					return (
						<CTAContainer
							key={index}
							number={index}
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

export const Head = ({ data: { statistics } }) => {
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

	return <SEO structuredData={structuredData} meta={statistics.seoMetaTags} />
}

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
					listHeading
					displayAsCarousel
					randomize
					resource {
						... on DatoCmsCustomShareable {
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
										placeholder: NONE
										imgixParams: {
											fit: "fill"
											fill: "blur"
											w: "600"
											h: "370"
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
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
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
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
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
								gatsbyImageData(
									width: 600
									placeholder: NONE
									imgixParams: {
										fill: "blur"
										fit: "fill"
										w: "600"
										h: "370"
									}
								)
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
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
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
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsRealStory {
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
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
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
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsStateFactsPage {
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
										placeholder: NONE
										imgixParams: {
											fit: "fill"
											fill: "blur"
											w: "600"
											h: "370"
										}
									)
								}
							}
						}
						... on DatoCmsStatistic {
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
										placeholder: NONE
										imgixParams: {
											fit: "fill"
											fill: "blur"
											w: "600"
											h: "370"
										}
									)
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
									gatsbyImageData(
										width: 600
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
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
										placeholder: NONE
										imgixParams: {
											fill: "blur"
											fit: "fill"
											w: "600"
											h: "370"
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
