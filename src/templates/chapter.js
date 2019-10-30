import React from 'react'
import { graphql } from 'gatsby'

import { styles } from '../css/css'

import LayoutChapter from '../components/LayoutChapter'
import SEO from '../components/SEO'
import HeroChapter from '../components/Hero/HeroChapter'
import ChapterAboutContact from '../components/Chapter/ChapterAboutContact'

const chapter = ({ data: { chapter } }) => {
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
	} = chapter
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
		</LayoutChapter>
	)
}

export default chapter

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
		}
	}
`
