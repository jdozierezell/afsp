import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import fetch from 'isomorphic-fetch'
import moment from 'moment'

import LayoutChapter from '../components/LayoutChapter'
import SEO from '../components/SEO'
import HeroChapter from '../components/Hero/HeroChapter'
import ChapterAboutContact from '../components/Chapter/ChapterAboutContact'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import FeaturedProgramsContainer from '../components/FeaturedProgramsResources/FeaturedProgramsContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const eventCarouselCSS = css``

const Chapter = ({ data: { chapter, realStories, chapterStoriesUpdates } }) => {
	const {
		title,
		heroVideo,
		heroPoster,
		heroBrief,
		aboutTheChapterNode,
		staffName,
		staffTitle,
		staffEmail,
		staffPhone,
		chapterEmailApiKey,
		featuredPrograms,
		volunteerSignupUrl,
		chapterInformation,
	} = chapter
	const chapterDonorDriveId = chapterInformation.chapterDonorDriveId.toLowerCase()
	const [events, setEvents] = useState({ details: [] })
	const [stories, setStories] = useState([])

	const storiesUpdates = []

	const heroVideoUrl = heroVideo ? heroVideo.url : ''
	const heroPosterUrl = heroPoster ? heroPoster.url : ''

	useEffect(() => {
		if (stories.length === 0) {
			realStories.edges.forEach(story => {
				const coverImage = story.node.seo.image
				const title = story.node.title
				const slug = story.node.slug
				const seo = story.node.seo
				const date = parseInt(story.node.publicationDate, 10)
				const type = 'chapter'
				const node = {
					node: { coverImage, title, slug, seo, date, type },
				}
				storiesUpdates.push(node)
			})
			chapterStoriesUpdates.edges.forEach(story => {
				const coverImage = story.node.seo.image
				const title = story.node.title
				const slug = story.node.slug
				const seo = story.node.seo
				const date = parseInt(story.node.publicationDate, 10)
				const type = 'chapter'
				const node = {
					node: { coverImage, title, slug, seo, date, type },
				}
				storiesUpdates.push(node)
			})
			storiesUpdates.sort((a, b) => {
				if (a.node.date < b.node.date) {
					return 1
				} else if (a.node.date > b.node.date) {
					return -1
				} else {
					return 0
				}
			})
			setStories(storiesUpdates)
		}
		if (events.details.length === 0) {
			fetch(
				`//aws-fetch.s3.amazonaws.com/merged-events-${chapterDonorDriveId}.json`
			)
				.then(response => {
					if (response.status >= 400) {
						throw new Error('Bad response from server')
					}
					return response.json()
				})
				.then(response => {
					const eventDetails = {
						title: 'Upcoming events',
						details: [],
					}
					response.next.forEach(event => {
						const eventObject = {
							__typename: 'Event',
							title: event.name,
							date: moment(event.startdate).format('MMMM D'),
							url: `https://afsp.donordrive.com/index.cfm?fuseaction=donorDrive.event&eventID=${event.recordid}`,
						}
						eventDetails.details.push(eventObject)
					})
					setEvents(eventDetails)
				})
		}
	}, [
		chapterStoriesUpdates,
		chapterDonorDriveId,
		realStories.edges,
		stories.length,
		events.length,
		storiesUpdates,
	])

	return (
		<LayoutChapter
			theme={styles.logo.mobileLightDesktopLight}
			instagram={chapterInformation.instagramClass}
			email={chapterEmailApiKey}
		>
			<SEO meta={chapter} />
			<HeroChapter
				title={title}
				video={heroVideoUrl}
				poster={heroPosterUrl}
				brief={heroBrief}
			/>
			<ChapterAboutContact
				title={title}
				about={aboutTheChapterNode.internal.content}
				contact={{
					name: staffName,
					title: staffTitle,
					email: staffEmail,
					phone: staffPhone,
				}}
			/>
			<CarouselDetailContainer
				content={events}
				addCSS={eventCarouselCSS}
			/>
			<FeaturedProgramsContainer resources={featuredPrograms} />
			<CTAContainer
				cta={{
					__typename: 'DatoCmsCtaWithDescription',
					heading: `Join the AFSP ${title} Chapter`,
					linkText: 'Volunteer',
					linkUrl: volunteerSignupUrl,
					external: true,
				}}
			/>
			<StoriesContainer
				header="Stories and updates"
				first={true}
				stories={stories}
				more={true}
			/>
		</LayoutChapter>
	)
}

export default Chapter

export const query = graphql`
	query($slug: String, $tag: String) {
		chapter: datoCmsChapterHomePage(slug: { eq: $slug }) {
			seoMetaTags {
				tags
			}
			title
			heroVideo {
				url
			}
			heroPoster {
				url
			}
			heroBrief
			chapterEmailApiKey
			staffName
			staffTitle
			staffEmail
			staffPhone
			aboutTheChapterNode {
				internal {
					content
				}
			}
			featuredPrograms {
				... on DatoCmsDetail {
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
			volunteerSignupUrl
			chapterInformation {
				instagramClass
				chapterDonorDriveId
			}
		}
		realStories: allDatoCmsStory(
			filter: { tags: { elemMatch: { tag: { eq: $tag } } } }
		) {
			edges {
				node {
					title
					publicationDate(formatString: "x")
					slug
					seo {
						description
						image {
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
					}
				}
			}
		}
		chapterStoriesUpdates: allDatoCmsChapterStoryUpdate(
			filter: { tags: { elemMatch: { tag: { eq: $tag } } } }
		) {
			edges {
				node {
					title
					publicationDate(formatString: "x")
					slug
					seo {
						description
						image {
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
					}
				}
			}
		}
	}
`
