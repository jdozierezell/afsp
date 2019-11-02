import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import LayoutChapter from '../components/LayoutChapter'
import SEO from '../components/SEO'
import HeroChapter from '../components/Hero/HeroChapter'
import ChapterAboutContact from '../components/Chapter/ChapterAboutContact'
import CarouselDetailContainer from '../components/Carousels/CarouselDetailContainer'
import FeaturedResourcesContainer from '../components/FeaturedProgramsResources/FeaturedResourcesContainer'
import CTAWithDescription from '../components/CTAs/CTAWithDescription'
import StoriesContainer from '../components/Stories/StoriesContainer'

import { styles } from '../css/css'

const eventCarouselCSS = css``

const Chapter = ({ data: { chapter } }) => {
	console.log(chapter)
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
		featuredResources,
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
			<FeaturedResourcesContainer resources={featuredResources} />
			<CTAWithDescription
				cta={{
					heading: `Join the AFSP ${title} Chapter`,
					linkText: 'Volunteer',
					linkUrl: volunteerSignupUrl,
				}}
			/>
			<StoriesContainer
				header="Stories and Updates"
				stories={chapterStoriesAndUpdates}
			/>
		</LayoutChapter>
	)
}

export default Chapter

export const query = graphql`
	query {
		chapter: datoCmsChapterPage {
			seoMetaTags {
				tags
			}
			title
			chapterHomePage
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
			featuredResources {
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
