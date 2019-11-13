import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

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

const Chapter = ({ data: { chapter } }) => {
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
		featuredPrograms,
		volunteerSignupUrl,
		chapterStoriesAndUpdates,
	} = chapter
	const eventsContainer = {
		details: [
			{
				__typename: 'DonorDriveEvent',
				title: 'Name of Event',
				date: 'November 1',
				url: 'https://nytimes.com',
			},
			{
				__typename: 'DonorDriveEvent',
				title: 'Name of Event',
				date: 'November 1',
				url: 'https://nytimes.com',
			},
			{
				__typename: 'DonorDriveEvent',
				title: 'Name of Event',
				date: 'November 1',
				url: 'https://nytimes.com',
			},
			{
				__typename: 'DonorDriveEvent',
				title: 'Name of Event',
				date: 'November 1',
				url: 'https://nytimes.com',
			},
		],
		title: 'Upcoming events',
	}
	let stories = []
	chapterStoriesAndUpdates.forEach(story => {
		const coverImage = story.seo.image
		const title = story.title
		const slug = story.slug
		const seo = story.seo
		const type = 'chapter'
		const node = { node: { coverImage, title, slug, seo, type } }
		stories.push(node)
	})
	return (
		<LayoutChapter logo={styles.logo.mobileLightDesktopLight}>
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
				content={eventsContainer}
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
			/>
		</LayoutChapter>
	)
}

export default Chapter

export const query = graphql`
	query {
		chapter: datoCmsChapterHomePage {
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
			chapterStoriesAndUpdates {
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
		}
	}
`
