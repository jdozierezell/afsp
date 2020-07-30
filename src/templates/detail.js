import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import HeroSolid from '../components/Hero/HeroSolid'
import NavigationSide from '../components/Navigation/NavigationSide'
import ContentGeneric from '../components/Content/ContentGeneric'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

import { styles } from '../css/css'

const Detail = ({ data: { detail, afspMedia } }) => {
	const [hasEvents, setHasEvents] = useState(false)
	const setEvents = events => {
		if (events) {
			setHasEvents(true)
		}
	}
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={detail.seoMetaTags}
		>
			<HeroSolid
				data={detail}
				programLogo={
					afspMedia.detail ? afspMedia.detail.programLogo : null
				}
				draftProgramLogo={
					detail.programLogo ? detail.programLogo.url : ''
				}
			/>
			<NavigationSide hasEvents={hasEvents} data={detail} />
			<ContentGeneric
				setEvents={setEvents}
				data={detail}
				dataMedia={afspMedia.detail}
			/>
			<CarouselChapterContainer />
		</Layout>
	)
}

export default Detail

export const query = graphql`
	query($slug: String) {
		detail: datoCmsDetail(slug: { eq: $slug }) {
			title
			slug
			programLogo {
				url
			}
			brief
			parentPage {
				...ParentList
			}
			details {
				... on DatoCmsEventList {
					__typename
					programName
				}
				... on DatoCmsContent {
					__typename
					contentHeading
					contentBody
				}
				... on DatoCmsRecommendation {
					...Recommendation
				}
				... on DatoCmsCardContainer {
					__typename
					cardContainerHeading
					cardContainerList {
						cardCategory
						cardHeading
						cardBodyNode {
							internal {
								content
							}
						}
						cardButtonCta
						cardButtonUrl
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
								__typename
								... on DatoCmsContent {
									__typename
									id
									contentHeading
								}
							}
						}
					}
				}
				... on DatoCmsActionButton {
					__typename
					buttonText
					buttonLink
				}
				... on DatoCmsImage {
					__typename
					id
					images {
						url
					}
				}
				... on DatoCmsVideo {
					__typename
					video {
						url
						video {
							mp4Url(res: medium)
						}
					}
					poster {
						url
					}
				}
				... on DatoCmsHeading {
					__typename
					headingLevel
					heading
				}
				... on DatoCmsEmbed {
					__typename
					embedCode
				}
			}
			overrideWidth
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
		}
		afspMedia: afspMedia {
			detail(filter: { slug: { eq: $slug } }) {
				details {
					... on AFSPMedia_ImageRecord {
						id
						images {
							responsiveImage(
								imgixParams: {
									auto: format
									fit: fill
									fill: blur
									h: "384"
									w: "623"
								}
							) {
								alt
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
				programLogo {
					responsiveImage(imgixParams: { w: "623" }) {
						alt
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
`
