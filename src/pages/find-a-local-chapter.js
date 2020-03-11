import React, { useState } from 'react'
import { graphql } from 'gatsby'
import zipcodes from 'zipcodes'
import { useQueryParams, NumberParam } from 'use-query-params'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
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

	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={search.seoMetaTags} />
			<HeroChapterSearch
				title={search.title}
				description={search.seo.description}
				handleClick={handleSearchClick}
				handleSubmit={handleSearchClick}
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
			seo {
				description
			}
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
