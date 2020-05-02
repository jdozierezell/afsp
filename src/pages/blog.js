import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'

import Layout from '../components/Layout'
import HeroVideo from '../components/Hero/HeroVideo'
import CarouselVideoContainer from '../components/Carousels/CarouselVideoContainer'
import StoriesContainer from '../components/Stories/StoriesContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

import { styles } from '../css/css'

const RealStories = ({ data: { real, stories, afspMedia } }) => {
	stories.edges.forEach(story => {
		story.node.type = 'story'
	})
	const currentStories = stories.edges.filter(story => {
		if (story.node.publicationDate) {
			const today = moment()
			const pubDate = moment(story.node.publicationDate, 'YYYY-MM-DD')
			return pubDate <= today
		} else {
			return false
		}
	})

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={real.seoMetaTags}
		>
			<HeroVideo
				videoUrl={
					real.heroVideo.video
						? real.heroVideo.video.mp4Url
						: real.heroVideo.url
				}
				posterUrl={real.heroPoster.url}
				heading={real.heroHeading}
				brief={real.heroBrief}
				buttonCta={real.heroButtonCta}
				buttonExternal={real.heroButtonExternal}
				buttonUrl={
					real.heroButtonExternal
						? real.heroButtonExternalLink
						: real.heroButtonInternalLink.slug
				}
			/>
			<CarouselVideoContainer videos={real.featuredVideo} />
			<StoriesContainer
				header="Stories"
				first={true}
				stories={currentStories}
				storiesMedia={afspMedia.allStories}
			/>
			<CTAContainer
				number={1}
				cta={real.callsToAction[0].cta.callToAction[0]}
			/>
			<StoriesContainer
				offset={3}
				more="stories"
				stories={currentStories}
				storiesMedia={afspMedia.allStories}
			/>
			<CTAContainer
				number={2}
				cta={real.callsToAction[1].cta.callToAction[0]}
			/>
			<CarouselChapterContainer />
		</Layout>
	)
}

export default RealStories

export const query = graphql`
	query {
		real: datoCmsRealStory {
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
			heroBrief
			heroHeading
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
			featuredVideo {
				... on DatoCmsFeaturedVideo {
					video {
						url
						video {
							mp4Url(res: medium)
						}
						title
					}
					poster {
						url
					}
				}
			}
			callsToAction {
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
			}
		}
		stories: allDatoCmsStory(
			limit: 66
			sort: { fields: publicationDate, order: DESC }
		) {
			totalCount
			edges {
				node {
					id
					title
					slug
					publicationDate
					seo {
						description
					}
					author {
						authorName
						slug
					}
				}
			}
		}
		afspMedia: afspMedia {
			allStories(first: "66", orderBy: publicationDate_DESC) {
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
`
