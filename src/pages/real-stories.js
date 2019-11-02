import React from 'react'
import { css } from '@emotion/core'
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
	return (
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO meta={real.seoMetaTags} />
			<HeroVideo
				videoUrl={real.heroVideoUrl}
				heading={real.heroHeading}
				brief={real.heroBrief}
				buttonCta={real.heroButtonCta}
				buttonUrl={real.heroButtonLink}
			/>
			<CarouselVideoContainer />
			<StoriesContainer
				header="Stories"
				first={true}
				stories={stories.edges}
			/>
			<CTAContainer cta={real.callToAction1.callToAction[0]} />
			<StoriesContainer
				offset={3}
				more="stories"
				stories={stories.edges}
			/>
			<CTAContainer cta={real.callToAction2.callToAction[0]} />
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
			heroVideoUrl
			heroImage {
				url
			}
			heroBrief
			heroHeading
			heroButtonCta
			heroButtonLink
			callToAction1 {
				callToAction {
					... on DatoCmsCtaVideo {
						videoUrl
						heading
						brief
						linkText
						linkUrl
					}
					... on DatoCmsCtaWithDescription {
						heading
						brief
						linkText
						linkUrl
					}
					... on DatoCmsCtaNoDescription {
						heading
						linkText
						linkUrl
					}
				}
			}
			callToAction2 {
				callToAction {
					... on DatoCmsCtaVideo {
						videoUrl
						heading
						brief
						linkText
						linkUrl
					}
					... on DatoCmsCtaWithDescription {
						heading
						brief
						linkText
						linkUrl
					}
					... on DatoCmsCtaNoDescription {
						heading
						linkText
						linkUrl
					}
				}
			}
		}
		stories: allDatoCmsStory {
			totalCount
			edges {
				node {
					title
					slug
					coverImage {
						fluid(
							maxWidth: 600
							imgixParams: {
								fm: "jpg"
								fit: "crop"
								crop: "faces"
								w: "600"
								h: "370"
							}
						) {
							...GatsbyDatoCmsFluid_tracedSVG
						}
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
