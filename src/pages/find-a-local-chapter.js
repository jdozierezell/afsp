import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import axios from 'axios'

import Layout from '../components/Layout'
import HeroModelSearch from '../components/Hero/HeroModelSearch'
import SearchModelContainer from '../components/Search/SearchModelContainer'
import SearchNoResults from '../components/Search/SearchNoResults'
import CTAContainer from '../components/CTAs/CTAContainer'

import { styles } from '../css/css'

const FindALocalChapter = ({ data: { search }, location }) => {
	let metaImage,
		metaDescription = ''
	search.seoMetaTags.tags.forEach(tag => {
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
		'@type': 'SearchAction',
		about: 'find a local chapter of AFSP',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: search.title,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${search.slug}`,
	}

	const queryString = location.search
	const query = new URLSearchParams(queryString)
	const [radius, setRadius] = useState(
		query.get('radius') ? query.get('radius') : 15
	)
	const [zip, setZip] = useState(query.get('zip') ? query.get('zip') : '')
	const [noResults, setNoResults] = useState(false)
	const [searchResults, setSearchResults] = useState([])
	const [firstRun, setFirstRun] = useState(true)

	const updateRadius = newRadius => setRadius(newRadius)

	const updateZip = newZip => {
		setZip(newZip)
	}

	const handleSearchClick = () => {
		if (/^[0-9]{5}-?([0-9]{4})?$/g.test(zip)) {
			axios
				.post('https://serene-dusk-44738.herokuapp.com/zip-lookup', {
					zip: zip,
					radius: radius,
					source: 'chapterSearch',
					type: 'chapter',
				})
				.then(res => {
					setSearchResults(res.data.chapterArray)
					if (
						res.data.chapterArray.length === 0 &&
						zip.length !== 0
					) {
						setNoResults(true)
					} else {
						setNoResults(false)
					}
				})
			window.history.replaceState(
				{ radius: radius, zip: zip },
				`Find a chapter near ${zip} | AFSP`,
				`${
					location.origin + location.pathname
				}?radius=${radius}&zip=${zip}`
			)
		}
	}

	useEffect(() => {
		if (firstRun) {
			if (/^[0-9]{5}-?([0-9]{4})?$/g.test(zip)) {
				axios
					.post(
						'https://serene-dusk-44738.herokuapp.com/zip-lookup',
						{
							zip: zip,
							radius: radius,
							source: 'chapterSearch',
							type: 'chapter',
						}
					)
					.then(res => {
						setSearchResults(res.data.chapterArray)
					})
			}
			setFirstRun(false)
		}
	}, [firstRun, radius, zip])

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={search.seoMetaTags}
			structuredData={structuredData}
		>
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
			{noResults && <SearchNoResults type="chapter" />}
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
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			brief
			callsToAction {
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
			}
		}
	}
`
