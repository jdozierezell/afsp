import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroVideo from '../components/Hero/HeroVideo'
import CarouselVideoContainer from '../components/Carousels/CarouselVideoContainer'
import StoriesContainer from '../components/Stories/StoriesContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

import { styles } from '../css/css'

const RealStories = ({ data: { real, stories } }) => {
	stories.edges.forEach(story => {
		story.node.type = 'story'
	})
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<SEO meta={real} />
			<HeroVideo
				videoUrl={real.heroVideo.url}
				posterUrl={real.heroPoster.url}
				heading={real.heroHeading}
				brief={real.heroBrief}
				buttonCta={real.heroButtonCta}
				buttonUrl={real.heroButtonLink}
			/>
			<CarouselVideoContainer videos={real.featuredVideo} />
			<StoriesContainer
				header="Stories"
				first={true}
				stories={stories.edges}
			/>
			<CTAContainer
				number={1}
				cta={real.callsToAction[0].cta.callToAction[0]}
			/>
			<StoriesContainer
				offset={3}
				more="stories"
				stories={stories.edges}
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
				tags
			}
			heroVideo {
				url
			}
			heroPoster {
				url
			}
			heroBrief
			heroHeading
			heroButtonCta
			heroButtonLink
			featuredVideo {
				... on DatoCmsFeaturedVideo {
					video {
						url
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
					title
					slug
					coverImage {
						url
						# fluid(
						# 	maxWidth: 600
						# 	imgixParams: {
						# 		fm: "jpg"
						# 		fit: "crop"
						# 		crop: "faces"
						# 		w: "600"
						# 		h: "370"
						# 	}
						# ) {
						# 	...GatsbyDatoCmsFluid_tracedSVG
						# }
					}
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
	}
`
