import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import zipcodes from 'zipcodes'
import fetch from 'isomorphic-fetch'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroChapterSearch from '../components/Hero/HeroChapterSearch'
import CTAContainer from '../components/CTAs/CTAContainer'
import ChapterSearchResultContainer from '../components/Chapter/ChapterSearchResultContainer'

import {
	chapterSearchResults,
	searchChapters,
} from '../utils/chapterSearchResults'

import { styles } from '../css/css'

const FindALocalChapter = ({ data: { search, chapters } }) => {
	// imported chapters, now need to implement filtering chapters based on zip and radius
	const [radius, setRadius] = useState(15)
	const [searchResults, setSearchResults] = useState([])
	const [url, setUrl] = useState(window.location)
	const handleSearchClick = (zip, radius) => {
		setSearchResults(
			chapterSearchResults(chapters, {
				primaryZip: zip,
				otherZips: zipcodes.radius(zip, radius),
			})
		)
	}
	const updateRadius = newRadius => setRadius(newRadius)

	return (
		<Layout logo={styles.logo.mobileLightDesktopLight}>
			<SEO meta={search.seoMetaTags} />
			<HeroChapterSearch
				title={search.title}
				description={search.seo.description}
				handleClick={handleSearchClick}
				radius={radius}
				updateRadius={updateRadius}
			/>
			{searchResults.length >= 1 && (
				<ChapterSearchResultContainer
					chapters={searchResults}
					radius={radius}
				/>
			)}
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
