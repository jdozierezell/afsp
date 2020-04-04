import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import fetch from 'isomorphic-fetch'
import moment from 'moment'

import LayoutChapter from '../components/LayoutChapter'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroChapter from '../components/Hero/HeroChapter'
import ChapterAboutContact from '../components/Chapter/ChapterAboutContact'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import ChapterSocials from '../components/Social/ChapterSocials'
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
		socialAccounts,
		chapterInformation,
	} = chapter
	const chapterDonorDriveId = chapterInformation.chapterDonorDriveId
		.replace(' ', '')
		.toLowerCase()
	const [events, setEvents] = useState({
		title: 'Upcoming events',
		details: [],
	})
	const [stories, setStories] = useState([])

	const storiesUpdates = []

	const heroVideoUrl = heroVideo ? heroVideo.url : ''
	const heroPosterUrl = heroPoster ? heroPoster.url : ''

	useEffect(() => {
		if (stories.length === 0 && stories[0] !== 'no stories') {
			// setStories(['no stories'])
			if (
				realStories.edges.length === 0 &&
				chapterStoriesUpdates.edges.length === 0
			) {
				setStories(['no stories'])
			} else {
				realStories.edges.forEach(story => {
					const coverImage = story.node.seo.image
					const title = story.node.title
					const slug = story.node.slug
					const seo = story.node.seo
					const date = parseInt(story.node.publicationDate, 10)
					const type = 'DatoCmsStory'
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
					const type = 'DatoCmsChapterStoryUpdate'
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
		}
		if (events.details.length === 0 && events.details[0] !== 'no events') {
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
					if (response.next) {
						const details = []
						response.next.forEach(event => {
							const eventObject = {
								__typename: 'Event',
								title: event.name,
								date: moment(event.startdate).format('MMMM D'),
								url: `https://afsp.donordrive.com/index.cfm?fuseaction=donorDrive.event&eventID=${event.recordid}`,
							}
							details.push(eventObject)
						})
						setEvents({ ...events, details })
					} else {
						setEvents({ ...events, details: ['no events'] })
					}
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
			<HelmetDatoCms seo={chapter.seoMetaTags} />
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
			<FeaturedResourcesContainer
				heading="Featured Programs"
				resources={featuredPrograms}
			/>
			<CTAContainer
				cta={{
					__typename: 'DatoCmsCtaWithDescription',
					heading: `Join the AFSP ${title} Chapter`,
					linkText: 'Volunteer',
					linkUrl: volunteerSignupUrl,
					external: true,
				}}
			/>
			<ChapterSocials socialAccounts={socialAccounts} />
			{stories[0] !== 'no stories' && (
				<StoriesContainer
					header="Stories and updates"
					first={true}
					stories={stories}
					more={true}
				/>
			)}
		</LayoutChapter>
	)
}

export default Chapter

export const query = graphql`
	query($slug: String, $tag: String) {
		chapter: datoCmsChapterHomePage(slug: { eq: $slug }) {
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			title
			heroVideo {
				url
			}
			heroPoster {
				url
			}
			heroBrief
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
				... on DatoCmsLanding {
					__typename
					title
					slug
					seo {
						image {
							url
							fluid(
								maxWidth: 600
								imgixParams: {
									auto: "format"
									fit: "crop"
									crop: "faces"
									w: "600"
									h: "370"
								}
							) {
								...GatsbyDatoCmsFluid
							}
						}
						description
					}
				}
				... on DatoCmsDetail {
					__typename
					title
					slug
					brief
					seo {
						image {
							url
							fluid(
								maxWidth: 600
								imgixParams: {
									auto: "format"
									fit: "crop"
									crop: "faces"
									w: "600"
									h: "370"
								}
							) {
								...GatsbyDatoCmsFluid
							}
						}
						description
					}
				}
			}
			volunteerSignupUrl
			socialAccounts {
				socialPlatform
				accountHandle
			}
			chapterInformation {
				instagramClass
				chapterDonorDriveId
				chapterEmailApiKey
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
							fluid(
								maxWidth: 600
								imgixParams: {
									auto: "format"
									fit: "crop"
									crop: "faces"
									w: "600"
									h: "370"
								}
							) {
								...GatsbyDatoCmsFluid
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
							url
							fluid(
								maxWidth: 600
								imgixParams: {
									auto: "format"
									fit: "crop"
									crop: "faces"
									w: "600"
									h: "370"
								}
							) {
								...GatsbyDatoCmsFluid
							}
						}
					}
				}
			}
		}
	}
`
