import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import fetch from 'isomorphic-fetch'

import LayoutChapter from '../components/LayoutChapter'
import SEO from '../components/SEO'
import HeroChapter from '../components/Hero/HeroChapter'
import ChapterAboutContact from '../components/Chapter/ChapterAboutContact'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import FeaturedProgramsContainer from '../components/FeaturedProgramsResources/FeaturedProgramsContainer'
import CTAWithDescription from '../components/CTAs/CTAWithDescription'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const eventCarouselCSS = css``

const Chapter = ({ data: { chapter, realStories, chapterStoriesUpdates } }) => {
	const {
		title,
		useVideoInHero,
		heroVideoUrl,
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
	const chapterCode = chapter.chapterCode.toLowerCase()
	const [events, setEvents] = useState({ details: [] })
	const [stories, setStories] = useState([])

	const storiesUpdates = []

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
			storiesUpdates.forEach(story => console.log(story.node.date))
			setStories(storiesUpdates)
		}

		fetch(`//aws-fetch.s3.amazonaws.com/merged-events-${chapterCode}.json`)
			.then(response => {
				if (response.status >= 400) {
					throw new Error('Bad response from server')
				}
				return response.json()
			})
			.then(response => {
				const eventDetails = { title: 'Upcoming events', details: [] }
				response.next.forEach(event => {
					const eventObject = {
						__typename: 'Event',
						title: event.name,
						date: new Date(event.startdate).toLocaleDateString(
							'en-US',
							{
								month: 'long',
								day: '2-digit',
							}
						),
						url: `https://afsp.donordrive.com/index.cfm?fuseaction=donorDrive.event&eventID=${event.recordid}`,
					}
					eventDetails.details.push(eventObject)
				})
				setEvents(eventDetails)
			})
	}, [chapterStoriesUpdates, chapterCode])

	return (
		<LayoutChapter
			theme={styles.logo.mobileLightDesktopLight}
			instagram={chapterInformation.instagramClass}
			email={chapterEmailApiKey}
		>
			<SEO meta={chapter.seoMetaTags} />
			<HeroChapter
				title={title}
				useVideo={useVideoInHero}
				src={heroVideoUrl}
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
			<CTAWithDescription
				cta={{
					heading: `Join the AFSP ${title} Chapter`,
					linkText: 'Volunteer',
					linkUrl: volunteerSignupUrl,
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
			useVideoInHero
			heroVideoUrl
			volunteerSignupUrl
			heroImage {
				fluid(
					maxWidth: 1920
					imgixParams: {
						fm: "jpg"
						fit: "crop"
						crop: "faces"
						ar: 2.5
						w: "1920"
						blendMode: "hardlight"
						blend: "555"
					}
				) {
					...GatsbyDatoCmsFluid_tracedSVG
				}
			}
			heroBrief
			chapterCode
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
				title
				slug
				seo {
					description
					image {
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
				}
			}
			chapterInformation {
				instagramClass
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
					}
				}
			}
		}
	}
`
