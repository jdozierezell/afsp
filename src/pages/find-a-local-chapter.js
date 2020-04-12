import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { graphql } from 'gatsby'
import zipcodes from 'zipcodes'
import { useQueryParams, NumberParam } from 'use-query-params'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroModelSearch from '../components/Hero/HeroModelSearch'
import SearchModelContainer from '../components/Search/SearchModelContainer'
import SearchNoResults from '../components/Search/SearchNoResults'
import CTAContainer from '../components/CTAs/CTAContainer'

import { chapterSearchResults } from '../utils/chapterSearchResults'

import { styles } from '../css/css'

const FindALocalChapter = ({ data: { search, chapters } }) => {
	const existingSearch =
		typeof window !== `undefined`
			? qs.parse(window.location.search.slice(1))
			: {}
	const [radius, setRadius] = useState(
		existingSearch.radius ? existingSearch.radius : 15
	)
	const [zip, setZip] = useState(existingSearch.zip ? existingSearch.zip : '')
	const [noResults, setNoResults] = useState(false)
	const [searchResults, setSearchResults] = useState([])
	const [query, setQuery] = useQueryParams({
		zip: NumberParam,
		radius: NumberParam,
	})

	const updateRadius = newRadius => setRadius(newRadius)

	const updateZip = newZip => {
		console.log(newZip)
		setZip(newZip)
	}

	const handleSearchClick = () => {
		setQuery({
			zip: zip,
			radius: radius,
		})
		const tempSearchResults = chapterSearchResults(chapters, {
			primaryZip: zip,
			otherZips: zipcodes.radius(zip, radius),
		})
		setSearchResults(tempSearchResults)
		if (tempSearchResults.length === 0 && zip.length !== 0) {
			setNoResults(true)
		} else {
			setNoResults(false)
		}
	}

	useEffect(() => {
		setSearchResults(
			chapterSearchResults(chapters, {
				primaryZip: zip,
				otherZips: zipcodes.radius(zip, radius),
			})
		)
	}, [])

	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={search.seoMetaTags} />
			<HeroModelSearch
				title={search.title}
				description={search.brief}
				searchType={'chapter'}
				handleSubmit={handleSearchClick}
				radius={radius}
				updateRadius={updateRadius}
				zip={zip}
				updateZip={updateZip}
			/>
			{searchResults.length >= 1 && (
				<SearchModelContainer
					chapters={searchResults}
					radius={radius}
					zip={zip}
				/>
			)}
			{noResults && <SearchNoResults type="support group" />}
			{search.callsToAction.map((item, index) => (
				<CTAContainer
					key={index}
					number={index}
					cta={item.cta.callToAction[0]}
				/>
			))}
		</Layout>
	)
}

export default FindALocalChapter

export const query = graphql`
	query {
		search: datoCmsSearchPage(slug: { eq: "find-a-local-chapter" }) {
			title
			slug
			brief
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
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
