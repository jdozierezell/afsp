import React from 'react'
import { graphql } from 'gatsby'
import dayjs from 'dayjs'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
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
	const currentStories = stories.edges.filter(story => {
		if (story.node.publicationDate) {
			const today = dayjs()
			const pubDate = dayjs(story.node.publicationDate, 'YYYY-MM-DD')
			return pubDate <= today
		} else {
			return false
		}
	})

	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
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
				initialDisplay="3"
			/>
			<CTAContainer
				number={1}
				cta={real.callsToAction[0].cta.callToAction[0]}
			/>
			<StoriesContainer
				offset={3}
				more="stories"
				stories={currentStories}
				initialDisplay="3"
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

export const Head = ({ data: { real } }) => {
	let metaImage,
		metaDescription = ''

	real.seoMetaTags.tags.forEach(tag => {
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
		'@type': 'Blog',
		about: 'suicide',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: real.title,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${real.slug}`,
	}

	return <SEO structuredData={structuredData} meta={real.seoMetaTags} />
}

export const query = graphql`
	query {
		real: datoCmsRealStory {
			title
			slug
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
				... on DatoCmsVimeoVideo {
					vimeoId
					title
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
					__typename
					id
					title
					slug
					publicationDate
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
									h: "370"
									w: "600"
								}
							)
						}
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
