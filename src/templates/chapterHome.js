import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import fetch from 'isomorphic-fetch'

import LayoutChapter from '../components/LayoutChapter'
import HeroChapter from '../components/Hero/HeroChapter'
import ChapterAboutContact from '../components/Chapter/ChapterAboutContact'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import ChapterSocials from '../components/Social/ChapterSocials'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const eventCarouselCSS = css``

const Chapter = ({
	data: { chapter, realStories, chapterStoriesUpdates },
	pageContext,
}) => {
	const {
		title,
		slug,
		heroVideo,
		heroPoster,
		heroBrief,
		aboutTheChapterNode,
		staffName,
		staffTitle,
		staffEmail,
		staffPhone,
		featuredPrograms,
		volunteerSignupUrl,
		socialAccounts,
		chapterInformation,
		trackingCode,
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

	let heroVideoUrl

	if (heroVideo) {
		heroVideoUrl = heroVideo.video ? heroVideo.video.mp4Url : heroVideo.url
	}

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
					const __typename = story.node.__typename
					const id = story.node.id
					const title = story.node.title
					const slug = story.node.slug
					const seo = story.node.seo
					const date = parseInt(story.node.publicationDate, 10)
					const node = {
						node: { __typename, id, title, slug, seo, date },
					}
					storiesUpdates.push(node)
				})
				chapterStoriesUpdates.edges.forEach(story => {
					const __typename = story.node.__typename
					const id = story.node.id
					const title = story.node.title
					const slug = story.node.slug
					const seo = story.node.seo
					const date = parseInt(story.node.publicationDate, 10)
					const node = {
						node: { __typename, id, title, slug, seo, date },
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
				`//aws-fetch.s3.amazonaws.com/events/merged-events-${chapterDonorDriveId}.json`
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
								__typename: event.__typename,
								title: event.title,
								date: event.date,
								url: event.thirdPartyURL
									? event.thirdPartyURL
									: event.url,
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
			email={chapterInformation.chapterEmailApiKey}
			seo={chapter.seoMetaTags}
		>
			<HeroChapter
				title={title}
				video={heroVideoUrl}
				poster={heroPosterUrl}
				brief={heroBrief}
				slug={slug}
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
				id="events"
			/>
			<FeaturedResourcesContainer
				heading="Featured Programs"
				resources={featuredPrograms}
				id="programs"
			/>
			<CTAContainer
				cta={{
					__typename: 'DatoCmsCtaWithDescription',
					heading: `Join the AFSP ${title} Chapter`,
					linkText: 'Volunteer',
					linkUrl: volunteerSignupUrl,
					external: true,
				}}
				id="volunteer"
			/>
			<ChapterSocials socialAccounts={socialAccounts} />
			{stories[0] !== 'no stories' && (
				<StoriesContainer
					header="Stories and updates"
					first={true}
					stories={stories}
					more={true}
					id="news"
				/>
			)}
			{trackingCode && (
				<div dangerouslySetInnerHTML={{ __html: trackingCode }}></div>
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
			slug
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
					id
					title
					slug
					brief
					seo {
						description
						image {
							url
							fluid(
								maxWidth: 600
								imgixParams: {
									auto: "format"
									fill: "blur"
									fit: "fill"
									h: "370"
									w: "600"
								}
							) {
								...GatsbyDatoCmsFluid
							}
						}
					}
				}
				... on DatoCmsLanding {
					id
					title
					slug
					seo {
						description
						image {
							url
							fluid(
								maxWidth: 600
								imgixParams: {
									auto: "format"
									fill: "blur"
									fit: "fill"
									h: "370"
									w: "600"
								}
							) {
								...GatsbyDatoCmsFluid
							}
						}
					}
				}
				... on DatoCmsActionCenter {
					id
					title
					slug
					seo {
						description
						image {
							url
							fluid(
								maxWidth: 600
								imgixParams: {
									auto: "format"
									fill: "blur"
									fit: "fill"
									h: "370"
									w: "600"
								}
							) {
								...GatsbyDatoCmsFluid
							}
						}
					}
				}
			}
			volunteerSignupUrl
			socialAccounts {
				socialPlatform
				accountHandle
			}
			trackingCode
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
					__typename
					id
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
									fill: "blur"
									fit: "fill"
									h: "370"
									w: "600"
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
					__typename
					id
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
									fill: "blur"
									fit: "fill"
									h: "370"
									w: "600"
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
