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
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroModelSearch from '../components/Hero/HeroModelSearch'
import SearchModelContainer from '../components/Search/SearchModelContainer'
import SearchNoResults from '../components/Search/SearchNoResults'
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
		existingSearch.nonus === 1 ? true : false
	)
	const [country, setCountry] = useState(
		existingSearch.country ? existingSearch.country : ''
	)
	const [noResults, setNoResults] = useState(false)
	const [searchResults, setSearchResults] = useState([])
	const [countryOptions, setCountryOptions] = useState([])
	const [query, setQuery] = useQueryParams({
		zip: NumberParam,
		radius: NumberParam,
		nonus: BooleanParam,
		country: StringParam,
	})

	const updateRadius = newRadius => setRadius(newRadius)

	const updateZip = newZip => setZip(newZip)

	const updateNonus = () => setNonus(!nonus)

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
			if (supportGroupArray.length === 0 && zip.length !== 0) {
				setNoResults(true)
			} else {
				setNoResults(false)
			}
		}
		return supportGroupArray
	}

	const handleSearchClick = () => {
		setQuery({
			nonus: nonus,
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
		const countryArray = []
		supportGroups.edges.forEach(group => {
			if (group.node.meetingCountry !== 'United States of America') {
				countryArray.push(group.node.meetingCountry)
			}
		})
		setCountryOptions(countryArray)
		setSearchResults(
			supportGroupSearchResults(supportGroups, {
				primaryZip: zip,
				otherZips: zipcodes.radius(zip, radius),
			})
		)
	}, [])
	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={search.seoMetaTags}>
				<html lang="en" />
			</HelmetDatoCms>
			<HeroModelSearch
				title={search.title}
				description={search.brief}
				searchType={'supportGroup'}
				handleSubmit={handleSearchClick}
				nonus={nonus}
				radius={radius}
				zip={zip}
				country={country}
				updateRadius={updateRadius}
				updateZip={updateZip}
				updateNonus={updateNonus}
				updateCountry={updateCountry}
				countryOptions={countryOptions}
			/>
			{searchResults.length >= 1 && (
				<SearchModelContainer
					supportGroups={searchResults}
					radius={radius}
					zip={zip}
					nonus={nonus}
					country={country}
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
					registrationProcess
					meetingSchedule
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
