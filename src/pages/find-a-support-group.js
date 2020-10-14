import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { graphql } from 'gatsby'
import zipcodes from 'zipcodes'
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

const FindASupportGroup = ({ data: { search, supportGroups } }) => {
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
	const [searchResults, setSearchResults] = useState([])
	const [countryOptions, setCountryOptions] = useState([])
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

	const supportGroupSearchResults = (supportGroups, response) => {
		const supportGroupArray = []
		if (nonus === true) {
			supportGroups.edges.forEach(supportGroup => {
				if (supportGroup.node.meetingCountry === country) {
					supportGroupArray.push([supportGroup.node])
				}
			})
		} else {
			supportGroups.edges.forEach(supportGroup => {
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
		setSearchResults(
			supportGroupSearchResults(supportGroups, {
				primaryZip: zip,
				otherZips: zipcodes.radius(zip, radius),
			})
		)
	}

	useEffect(() => {
		let countryArray = []
		let onlineArray = []
		supportGroups.edges.forEach(group => {
			if (group.node.meetingCountry !== 'United States of America') {
				countryArray.push(group.node.meetingCountry)
			}
			if (group.node.meetingType === 'Online only') {
				onlineArray.push(group.node)
			}
		})
		onlineArray = onlineArray.filter(function(el) {
			return !countryArray.includes(el)
		})
		setCountryOptions(countryArray)
		setOnlineGroups(onlineArray)
		setSearchResults(
			supportGroupSearchResults(supportGroups, {
				primaryZip: zip,
				otherZips: zipcodes.radius(zip, radius),
			})
		)
	}, [])
	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={search.seoMetaTags}
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
				countryOptions={countryOptions}
			/>
			{(searchResults.length >= 1 ||
				(onlineGroups.length >= 1 && zip.length >= 5) ||
				online) && (
				<SearchModelContainer
					supportGroups={searchResults}
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
		supportGroups: allDatoCmsSupportGroup {
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
