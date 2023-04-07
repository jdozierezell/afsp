import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import fetch from 'isomorphic-fetch'
import dayjs from 'dayjs'

import { SEO } from '../components/SEO/SEO'
import LayoutChapter from '../components/LayoutChapter'
import HeroChapter from '../components/Hero/HeroChapter'
import ChapterAboutContact from '../components/Chapter/ChapterAboutContact'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import FeaturedResourcesContainer from '../components/FeaturedResources/FeaturedResourcesContainer'
import CTAContainer from '../components/CTAs/CTAContainer'
import StoriesContainer from '../components/Stories/StoriesContainer'
import ChapterSocials from '../components/Social/ChapterSocials'

import { styles } from '../css/css'

const Chapter = ({ data: { chapter, realStories, chapterStoriesUpdates } }) => {
	const {
		title,
		slug,
		translateIntoSpanish,
		heroVideo,
		heroPoster,
		heroBrief,
		aboutTheChapterNode,
		customButtons,
		customEvents,
		chapterStaff,
		featuredPrograms,
		volunteerSignupUrl,
		chapterStoriesAndUpdates,
		customizeStoryOrder,
		hideNationalStories,
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

	let heroVideoUrl

	if (heroVideo) {
		heroVideoUrl = heroVideo.video ? heroVideo.video.mp4Url : heroVideo.url
	}

	const heroPosterUrl = heroPoster ? heroPoster.url : ''
	useEffect(() => {
		let storiesUpdates = []
		if (stories.length === 0 && stories[0] !== 'no stories') {
			if (
				(realStories.edges.length === 0 || hideNationalStories) &&
				chapterStoriesUpdates.edges.length === 0 &&
				chapterStoriesAndUpdates.length === 0
			) {
				setStories(['no stories'])
			} else {
				chapterStoriesAndUpdates.forEach(story => {
					const __typename = 'DatoCmsChapterStoryUpdate'
					const id = story.id
					const title = story.title
					const slug = story.slug
					const seo = story.seo
					const date = parseInt(story.publicationDate, 10)
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
				if (!hideNationalStories) {
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
				}
				storiesUpdates = storiesUpdates.filter(
					(story, index, self) =>
						index ===
						self.findIndex(s => {
							return s.node.id === story.node.id
						})
				)
				if (!customizeStoryOrder) {
					storiesUpdates.sort((a, b) => {
						if (a.node.date < b.node.date) {
							return 1
						} else if (a.node.date > b.node.date) {
							return -1
						} else {
							return 0
						}
					})
				}
				setStories(storiesUpdates)
			}
		}
		if (events.details.length === 0 && events.details[0] !== 'no events') {
			fetch(
				`//aws-fetch.s3.amazonaws.com/events-cache-bust/merged-events-${chapterDonorDriveId}.json`
			)
				.then(response => {
					if (response.status >= 400) {
						throw new Error('Bad response from server')
					}
					return response.json()
				})
				.then(response => {
					if (response.next) {
						let details = []
						let formattedCustomEvents = []
						const now = dayjs().get('date')
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
						details.forEach(detail => {
							customEvents.forEach((event, index) => {
								detail.title = detail.title.trim()
								event.eventTitle = event.eventTitle.trim()
								if (event.eventTitle === detail.title) {
									details = details.filter(function (el) {
										return el.title !== event.eventTitle
									})
									detail.featured = true
								}
							})
						})
						customEvents.forEach(event => {
							const eventDate = dayjs(
								event.eventDate,
								'YYYY-MM-DD'
							)
							const removalDate = dayjs(
								event.dateToRemove,
								'YYYY-MM-DD'
							)
							if (removalDate >= now || eventDate >= now) {
								formattedCustomEvents.push({
									__typename: 'Event',
									title: event.eventTitle.trim(),
									date: eventDate.format('MMMM D'),
									url: event.eventUrl,
									featured: true,
								})
							}
						})
						setEvents({
							...events,
							details: [...formattedCustomEvents, ...details],
						})
					} else {
						setEvents({ ...events, details: ['no events'] })
					}
				})
		}
	}, [
		chapterStoriesAndUpdates,
		chapterStoriesUpdates,
		chapterDonorDriveId,
		customizeStoryOrder,
		hideNationalStories,
		realStories.edges,
		stories,
		events,
	])
	let aboutHeading,
		contactHeading,
		programsHeading,
		volunteerHeading,
		volunteerCTA,
		storiesHeading,
		buttonsAndAnchors

	if (translateIntoSpanish) {
		events.title = 'Próximos eventos'
		aboutHeading = `Acerca de la sede de la AFSP en ${title}`
		contactHeading = `Contacto de la sede:`
		programsHeading = 'Programas destacados'
		volunteerHeading = `Unirse a la sede de la AFSP en ${title}`
		volunteerCTA = 'Unirse'
		storiesHeading = 'Noticias e historias de la sede'
		buttonsAndAnchors = {
			volunteer: { text: 'Voluntariado', link: 'voluntariado' },
			events: { text: 'Eventos', link: 'eventos' },
			programs: { text: 'Programas', link: 'programas' },
			updates: { text: 'Noticias', link: 'noticias' },
		}
	} else {
		aboutHeading = `About the AFSP ${title} Chapter`
		contactHeading = `Chapter contact:`
		programsHeading = 'Featured Programs'
		volunteerHeading = `Join the AFSP ${title} Chapter`
		volunteerCTA = 'Volunteer'
		storiesHeading = 'Chapter updates and stories'
		buttonsAndAnchors = {
			volunteer: { text: 'Volunteer', link: 'volunteer' },
			events: { text: 'Events', link: 'events' },
			programs: { text: 'Programs', link: 'programs' },
			updates: { text: 'Updates', link: 'updates' },
		}
	}
	return (
		<LayoutChapter
			theme={styles.logo.mobileLightDesktopLight}
			instagram={chapterInformation.instagramClass}
			email={chapterInformation.chapterEmailApiKey}
		>
			<HeroChapter
				title={title}
				buttonsAndAnchors={buttonsAndAnchors}
				video={heroVideoUrl}
				poster={heroPosterUrl}
				brief={heroBrief}
				customButtons={customButtons}
				circleOfHopeUrl={chapterInformation.circleOfHopeUrl}
				slug={slug}
			/>
			<ChapterAboutContact
				aboutHeading={aboutHeading}
				contactHeading={contactHeading}
				about={aboutTheChapterNode.internal.content}
				contact={chapterStaff}
			/>
			<CarouselDetailContainer
				content={events}
				eventInsert={true}
				id={buttonsAndAnchors.events.link}
			/>
			<FeaturedResourcesContainer
				heading={programsHeading}
				resources={featuredPrograms}
				id={buttonsAndAnchors.programs.link}
			/>
			<CTAContainer
				cta={{
					__typename: 'DatoCmsCtaWithDescription',
					heading: volunteerHeading,
					linkText: volunteerCTA,
					linkUrl: volunteerSignupUrl,
					external: true,
				}}
				id={buttonsAndAnchors.volunteer.link}
			/>
			{socialAccounts && (
				<ChapterSocials socialAccounts={socialAccounts} title={title} />
			)}
			{stories[0] !== 'no stories' && (
				<StoriesContainer
					header={storiesHeading}
					first={true}
					stories={stories}
					more={true}
					id={buttonsAndAnchors.updates.link}
					initialDisplay="6"
				/>
			)}
			{trackingCode && (
				<div dangerouslySetInnerHTML={{ __html: trackingCode }}></div>
			)}
		</LayoutChapter>
	)
}

export default Chapter

export const Head = ({ data: { chapter } }) => {
	let metaImage,
		metaDescription = ''
	chapter.seoMetaTags.tags.forEach(tag => {
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
		about: 'suicide',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: chapter.title,
		lastReviewed: chapter.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/chapter/${chapter.slug}`,
	}

	return <SEO structuredData={structuredData} meta={chapter.seoMetaTags} />
}

export const query = graphql`
	query ($slug: String, $tag: String) {
		chapter: datoCmsChapterHomePage(slug: { eq: $slug }) {
			title
			slug
			translateIntoSpanish
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
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
			customButtons {
				buttonText
				buttonUrl
			}
			customEvents {
				eventType
				eventTitle
				eventDate
				eventUrl
				dateToRemove
			}
			chapterStaff {
				title
				phone
				name
				email
				address1
				address2
				city
				state
				zipCode
			}
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
				}
				... on DatoCmsLanding {
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
									h: "370"
									w: "600"
								}
							)
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
				}
			}
			chapterStoriesAndUpdates {
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
			customizeStoryOrder
			hideNationalStories
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
				circleOfHopeUrl
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
				}
			}
		}
	}
`
