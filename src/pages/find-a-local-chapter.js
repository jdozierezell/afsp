import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import zipcodes from 'zipcodes'
import fetch from 'isomorphic-fetch'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroChapterSearch from '../components/Hero/HeroChapterSearch'
import CTAContainer from '../components/CTAs/CTAContainer'

import { styles } from '../css/css'

const FindALocalChapter = ({ data: { search, chapters } }) => {
	// imported chapters, now need to implement filtering chapters based on zip and radius
	console.log(chapters)
	return (
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO meta={search.seoMetaTags} />
			<HeroChapterSearch
				title={search.title}
				description={search.seo.description}
			/>
			{search.callsToAction.map((item, index) => (
				<CTAContainer key={index} cta={item.cta.callToAction[0]} />
			))}
		</Layout>
	)
}

export default FindALocalChapter

export const query = graphql`
	query {
		search: datoCmsChapterSearch {
			seoMetaTags {
				tags
			}
			title
			seo {
				description
			}
			callsToAction {
				... on DatoCmsCallToAction {
					...CTAs
				}
			}
		}
		chapters: allDatoCmsChapterHomePage {
			...ChapterSearch
		}
	}
`
