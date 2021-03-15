import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { graphql } from 'gatsby'
import zipcodes from 'zipcodes'
import axios from 'axios'
import {
	useQueryParams,
	NumberParam,
	StringParam,
	BooleanParam,
} from 'use-query-params'

import Layout from '../components/Layout'
import HeroModelSearch from '../components/Hero/HeroModelSearch'
import SearchModelContainer from '../components/Search/SearchModelContainer'
import CTAContainer from '../components/CTAs/CTAContainer'

import { styles } from '../css/css'

const FindASupportGroup = ({ data: { search, datoSupportGroups } }) => {
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
		about: 'find a support group',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: search.title,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${search.slug}`,
	}

	const existingSearch =
		typeof window !== `undefined`
			? qs.parse(window.location.search.slice(1))
			: {}
	const [radius, setRadius] = useState(
		existingSearch.radius ? existingSearch.radius : 15
	)
	const [zip, setZip] = useState(existingSearch.zip ? existingSearch.zip : '')
	const [nonus, setNonus] = useState(
		existingSearch.nonus === '1' ? true : false
	)
	const [online, setOnline] = useState(
		existingSearch.online === '1' ? true : false
	)
	const [country, setCountry] = useState(
		existingSearch.country ? existingSearch.country : ''
	)
	const [supportGroups, setSupportGroups] = useState([])
	const [countryGroups, setCountryGroups] = useState([])
	const [onlineGroups, setOnlineGroups] = useState([])
	// eslint-disable-next-line no-unused-vars
	const [query, setQuery] = useQueryParams({
		zip: NumberParam,
		radius: NumberParam,
		nonus: BooleanParam,
		online: BooleanParam,
		country: StringParam,
	})

	const updateRadius = newRadius => setRadius(newRadius)

	const updateZip = newZip => setZip(newZip)

	const updateNonus = () => {
		setNonus(!nonus)
		setQuery({
			nonus: !nonus,
			online: online,
			zip: zip,
			radius: radius,
			country: country,
		})
	}

	const updateOnline = () => {
		setOnline(!online)
		setQuery({
			nonus: nonus,
			online: !online,
			zip: zip,
			radius: radius,
			country: country,
		})
	}

	const updateCountry = newCountry => setCountry(newCountry)

	const supportGroupSearchResults = (datoSupportGroups, response) => {
		const supportGroupArray = []
		if (nonus === true) {
			datoSupportGroups.edges.forEach(supportGroup => {
				if (supportGroup.node.meetingCountry === country) {
					supportGroupArray.push([supportGroup.node])
				}
			})
		} else {
			datoSupportGroups.edges.forEach(supportGroup => {
				if (supportGroup.node.meetingZipPostalCode) {
					supportGroup.node.meetingZipPostalCode = supportGroup.node.meetingZipPostalCode.trim()
					if (
						supportGroup.node.meetingZipPostalCode ===
						response.primaryZip
					) {
						supportGroupArray.unshift([
							supportGroup.node,
							response.primaryZip,
						])
					} else if (
						response.otherZips.includes(
							supportGroup.node.meetingZipPostalCode
						)
					) {
						supportGroup.node['location'] = response.primaryZip
						supportGroupArray.push([
							supportGroup.node,
							response.primaryZip,
						])
					}
				}
			})
		}
		return supportGroupArray
	}

	const handleSearchClick = () => {
		setQuery({
			nonus: nonus,
			online: online,
			zip: zip,
			radius: radius,
			country: country,
		})
		// axios
		// 	.post('https://serene-dusk-44738.herokuapp.com/zip-lookup', {
		// 		zip: zip,
		// 		radius: radius,
		// 		nonus: nonus,
		// 		source: 'groupSearch',
		// 		type: 'supportGroup',
		// 	})
		// 	.then(res => {
		// 		console.log(res)
		// 		setSupportGroups(res.data.chapterArray)
		// 	})
		setSupportGroups(
			supportGroupSearchResults(datoSupportGroups, {
				primaryZip: zip,
				otherZips: zipcodes.radius(zip, radius),
			})
		)
	}

	useEffect(() => {
		axios
			.post('https://serene-dusk-44738.herokuapp.com/zip-lookup', {
				zip: zip,
				radius: radius,
				nonus: nonus,
				source: 'groupSearch',
				type: 'supportGroup',
			})
			.then(res => {
				console.log(res)
				// setSupportGroups(res.data.chapterArray)
			})

		let countryArray = []
		let onlineArray = []
		datoSupportGroups.edges.forEach(group => {
			if (
				group.node.meetingCountry !== 'United States of America' &&
				group.node.meetingCountry !== 'Not Applicable'
			) {
				countryArray.push(group.node.meetingCountry)
			}
			if (group.node.meetingType === 'Nationwide Online Group') {
				onlineArray.push(group.node)
			}
		})
		onlineArray = onlineArray.filter(function(el) {
			return !countryArray.includes(el)
		})
		setCountryGroups(countryArray)
		setOnlineGroups(onlineArray)
		setSupportGroups(
			supportGroupSearchResults(datoSupportGroups, {
				primaryZip: zip,
				otherZips: zipcodes.radius(zip, radius),
			})
		)
	}, [])
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={search.seoMetaTags}
			structuredData={structuredData}
		>
			<HeroModelSearch
				title={search.title}
				description={search.brief}
				searchType={'supportGroup'}
				handleSubmit={handleSearchClick}
				nonus={nonus}
				online={online}
				onlineGroups={onlineGroups}
				radius={radius}
				zip={zip}
				country={country}
				updateRadius={updateRadius}
				updateZip={updateZip}
				updateNonus={updateNonus}
				updateOnline={updateOnline}
				updateCountry={updateCountry}
				countryGroups={countryGroups}
			/>
			{(supportGroups.length >= 1 ||
				(onlineGroups.length >= 1 && zip.length >= 5) ||
				online) && (
				<SearchModelContainer
					supportGroups={supportGroups}
					online={online}
					onlineGroups={onlineGroups}
					radius={radius}
					zip={zip}
					nonus={nonus}
					country={country}
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

export default FindASupportGroup

export const query = graphql`
	query {
		search: datoCmsSearchPage(slug: { eq: "find-a-support-group" }) {
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
		datoSupportGroups: allDatoCmsSupportGroup {
			edges {
				node {
					supportGroupName
					slug
					supportGroupWebsite
					hostingSponsoringOrganization
					hostingSponsoringOrganizationWebsite
					groupDemographic
					newMembers
					contactName
					contactEmail
					contactPhone
					secondContactName
					secondContactEmail
					secondContactPhone
					registrationProcess
					meetingSchedule
					meetingType
					nameOfMeetingSite
					meetingCountry
					meetingAddress
					meetingCity
					meetingState
					meetingZipPostalCode
					facilitator
					attendedTraining
					costToAttend
					additionalInformation
				}
			}
		}
	}
`
