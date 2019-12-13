import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import zipcodes from 'zipcodes'
import { useQueryParams, NumberParam } from 'use-query-params'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeroChapterSearch from '../components/Hero/HeroChapterSearch'
import CTAContainer from '../components/CTAs/CTAContainer'
import ChapterSearchResultContainer from '../components/Chapter/ChapterSearchResultContainer'

import { chapterSearchResults } from '../utils/chapterSearchResults'

import { styles } from '../css/css'

const FindALocalChapter = ({ data: { search, chapters } }) => {
	const [radius, setRadius] = useState(15)
	const [zip, setZip] = useState()
	const [searchResults, setSearchResults] = useState([])
	const [query, setQuery] = useQueryParams({
		zip: NumberParam,
		radius: NumberParam,
	})
	const handleSearchClick = () => {
		setQuery({
			zip: zip,
			radius: radius,
		})
		setSearchResults(
			chapterSearchResults(chapters, {
				primaryZip: zip,
				otherZips: zipcodes.radius(zip, radius),
			})
		)
	}
	const updateRadius = newRadius => setRadius(newRadius)
	const updateZip = newZip => setZip(newZip)

	useEffect(() => {
		if (query.zip && query.radius) {
			handleSearchClick(query.zip, query.radius)
		}
	}, [query])

	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<SEO meta={search.seoMetaTags} />
			<HeroChapterSearch
				title={search.title}
				description={search.seo.description}
				handleClick={handleSearchClick}
				radius={query.radius}
				updateRadius={updateRadius}
				zip={query.zip}
				updateZip={updateZip}
			/>
			{searchResults.length >= 1 && (
				<ChapterSearchResultContainer
					chapters={searchResults}
					radius={query.radius}
					zip={query.zip}
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
					__typename
					...CTAs
				}
			}
		}
		chapters: allDatoCmsChapterHomePage {
			...ChapterSearch
		}
	}
`
